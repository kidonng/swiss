import got from 'got'
import { NowRequest, NowResponse } from '@vercel/node'

export default async (
  { query, headers: { cookie } }: NowRequest,
  { json }: NowResponse
) => {
  const { exam, no, Name, v } = query as Record<string, string>

  const { body } = await got('http://cache.neea.edu.cn/cet/query', {
    headers: {
      referer: 'http://cet.neea.edu.cn/',
      cookie,
    },
    searchParams: {
      data: [exam, no, Name].join(),
      v,
    },
  })

  const result = {
    callback: (cb: string) => cb,
  }
  json(eval(body))
}
