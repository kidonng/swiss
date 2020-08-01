import { NowRequest, NowResponse } from '@vercel/node'

const iframe = (url: string) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <style>
        body,
        iframe {
          height: 100vh;
          width: 100vw;
        }
        
        body {
          margin: 0;
        }
        
        iframe {
          border: 0;
        }
      </style>
    </head>
    <body>
      <iframe src="${url}"></iframe>
    </body>
  </html>
`

export default ({ query }: NowRequest, res: NowResponse) => {
  const { hash, ..._query } = query
  const searchParams = new URLSearchParams(
    _query as Record<string, string>
  ).toString()

  res.setHeader('Content-Type', 'text/html')
  res.send(iframe(`https://viewer.diagrams.net/?${searchParams}#${hash}`))
}
