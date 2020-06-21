import got from 'got'
import { NowRequest, NowResponse } from '@vercel/node'

export default async (req: NowRequest, res: NowResponse) => {
  const { body, headers } = await got(
    'http://cet-bm.neea.cn/Home/VerifyCodeImg',
    {
      responseType: 'buffer'
    }
  )

  res.status(200)
  res.setHeader('content-type', 'image/jpg')
  res.setHeader('set-cookie', headers['set-cookie'])
  res.end(body)
}
