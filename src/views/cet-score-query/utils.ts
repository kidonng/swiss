import ky from 'ky'

const dataScript = 'http://cet.neea.edu.cn/cet/js/data.js'
const proxy = 'https://cors-anywhere.herokuapp.com/'

export const getData = async () => {
  const script = await ky(`${proxy}${dataScript}`).text()
  const dq = JSON.parse(script.substring(7, script.length - 2))

  return [
    ,
    'CET4-D',
    'CET6-D',
    'CJT4-D',
    'CJT6-D',
    'PHS4-D',
    'PHS6-D',
    'CRT4-D',
    'CRT6-D',
    'TFU4-D',
  ].map((i) => {
    const t = dq.rdsub.find((t: any) => t.code === i)
    return t && t.tab
  })
}

export const scoreData = {
  n: '姓名',
  x: '学校',
  id: '成绩报告单编号',
  z: '笔试准考证号',
  s: '总分',
  l: '听力',
  r: '阅读',
  w: '写作和翻译',
  kyz: '口试准考证号',
  kys: '口语等级',
}
