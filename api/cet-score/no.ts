import got from 'got'
import { NowRequest, NowResponse } from '@vercel/node'

export default async (
  { query, headers: { cookie } }: NowRequest,
  { json }: NowResponse
) => {
  const { provinceCode, IDNumber, Name, verificationCode } = query

  const {
    body: { Message }
  } = await got.post('http://cet-bm.neea.cn/Home/ToQueryTestTicket', {
    headers: { cookie },
    form: {
      provinceCode,
      IDTypeCode: 1,
      IDNumber,
      Name,
      verificationCode
    },
    responseType: 'json'
  })

  json(Message.startsWith('[') ? JSON.parse(Message) : Message)
}
