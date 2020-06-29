export function IDVerification(id: string): string | null
export function IDVerification(id: string, verification: string): boolean | null
export function IDVerification(id: string, verification?: string) {
  if (id.length !== 17) return null

  // https://zh.wikipedia.org/wiki/%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E5%85%AC%E6%B0%91%E8%BA%AB%E4%BB%BD%E5%8F%B7%E7%A0%81
  const sum = [...id].reduce(
    (sum, digit, index) => (sum += 2 ** (17 - index) * Number(digit)),
    0
  )
  const _code = 12 - (sum % 11)
  const code = _code === 10 ? 'x' : String(_code)

  return verification ? verification === code : code
}
