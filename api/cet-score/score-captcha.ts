import got from 'got'
import { NowRequest, NowResponse } from '@vercel/node'

export default async ({ query }: NowRequest, res: NowResponse) => {
  const { ik } = query as Record<string, string>

  const { body: hash, headers } = await got(
    'http://cache.neea.edu.cn/Imgs.do',
    {
      headers: {
        referer: 'http://cet.neea.edu.cn/',
      },
      searchParams: {
        c: 'CET',
        ik,
      },
    }
  )

  const result = {
    imgs: (hash: string) => `http://cet.neea.edu.cn/imgs/${hash}.png`,
  }
  const { body } = await got(eval(hash), {
    responseType: 'buffer',
  })

  res.status(200)
  res.setHeader('content-type', 'image/jpg')
  res.setHeader('set-cookie', headers['set-cookie']!)
  res.end(body)
}
