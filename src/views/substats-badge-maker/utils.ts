// https://substats.spencerwoo.com/api.html
export const sources = (
  queryKey: string
): Record<
  string,
  {
    text: string
    label: () => string
    logo: string
    labelColor: string
    color: string
    suffix: string
    link: () => string
  }
> => ({
  github: {
    text: 'GitHub',
    label: () => 'GitHub Followers',
    logo: 'github',
    labelColor: '282c34',
    color: '181717',
    suffix: '',
    link: () => `https://github.com/${queryKey}`,
  },
  telegram: {
    text: 'Telegram',
    label: () => `@${queryKey}`,
    logo: 'telegram',
    labelColor: '282c34',
    color: '2CA5E0',
    suffix: ' members',
    link: () => `https://t.me/${queryKey}`,
  },
  twitter: {
    text: 'Twitter',
    label: () => 'Twitter',
    logo: 'twitter',
    labelColor: '282c34',
    color: '1da1f2',
    suffix: ' followers',
    link: () => `https://twitter.com/${queryKey}`,
  },
})

export type Source = keyof ReturnType<typeof sources>

export const badge = ({
  source,
  queryKey,
}: {
  source: Source
  queryKey: string
}) => {
  const { text, label, logo, labelColor, color, suffix, link } = sources(
    queryKey
  )[source]

  const apiBase = new URL('https://api.spencerwoo.com/substats/')
  apiBase.search = new URLSearchParams({
    source,
    queryKey,
  }).toString()
  const api = apiBase.toString()

  const imageBase = new URL('https://img.shields.io/badge/dynamic/json')
  imageBase.search = new URLSearchParams({
    label: label(),
    logo,
    query: '$.data.totalSubs',
    url: api,
    longCache: 'true',
    labelColor,
    color,
    ...(suffix ? { suffix } : {}),
  }).toString()
  const image = imageBase.toString()

  const markdown = `[![${text}](${image})](${link()})`

  return { image, link, markdown }
}
