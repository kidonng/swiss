import got, { Options } from 'got'
import { NowRequest, NowResponse } from '@vercel/node'

export default async ({ query }: NowRequest, res: NowResponse) => {
  const { _url, ..._query } = query
  if (typeof _url !== 'string') {
    res.status(400)
    return res.send('No `_url` or multiple `_url` provided.')
  }

  const _res = got(_url, {
    searchParams: _query as Options['searchParams'],
  })

  for (const [name, value] of Object.entries((await _res).headers)) {
    if (name !== 'content-encoding') res.setHeader(name, value)
  }

  res.send(await _res.buffer())
}
