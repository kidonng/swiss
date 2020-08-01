// https://www.zhihu.com/question/381784377/answer/1099438784
const table = 'fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF'
const indices = [11, 10, 3, 8, 4, 6]
const xor = 177451812
const add = 8728348608
const _BV = ['B', 'V', '1', , , '4', , '1', , '7', ,]
export const reg = /^((av)?\d+|BV((?=[^0IOl])\w){10})$/

export const AVtoBV = (AV: string) => {
  const sum = (Number(AV.replace(/^av/, '')) ^ xor) + add
  const BV = indices
    .reduce((tokens, index, exp) => {
      tokens[index] = table[Math.floor(sum / 58 ** exp) % 58]
      return tokens
    }, _BV)
    .join('')

  return BV
}

export const BVtoAV = (BV: string) => {
  const sum = indices.reduce(
    (sum, index, exp) => (sum += table.indexOf(BV[index]) * 58 ** exp),
    0
  )
  const AV = (sum - add) ^ xor

  return `av${AV}`
}
