import got from 'got'
import { NowRequest, NowResponse } from '@vercel/node'

export default async ({ query: { number } }: NowRequest, res: NowResponse) => {
  const { json, status } = res

  try {
    let num: number
    if (typeof number === 'string') {
      num = parseInt(number)
      res.setHeader('Cache-Control', 's-maxage=31536000')
    } else {
      const random = await got('https://www.random.org/integers/', {
        searchParams: {
          num: 1,
          min: 0,
          max: 33170, // 33171 questions
          col: 1,
          base: 10,
          format: 'plain',
          rnd: 'new',
        },
      }).text()
      num = parseInt(random)
    }

    // https://www.reddit.com/r/xkcd/comments/35gp1g/whytxt/
    const questions = await got(
      'https://cdn.jsdelivr.net/gh/1995eaton/GoogleQuery/xkcd-why.txt'
    ).text()
    const question = questions.split('\n')[num]

    json({ number: num, question })
  } catch (e) {
    status(500)
    json(e)
  }
}
