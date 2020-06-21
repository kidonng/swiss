<template>
  <v-col cols="10" lg="4">
    <v-row>
      <v-text-field label="姓名" v-model="name" />
    </v-row>
    <v-row>
      <v-text-field label="准考证号" v-model="id" @blur="generateCaptchaUrl" />
    </v-row>
    <v-row align="center">
      <v-text-field label="验证码" v-model="captcha" class="pr-4" />
      <span v-if="id">
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-img
              :src="captchaUrl"
              alt="验证码"
              width="56"
              @click="generateCaptchaUrl"
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <span>点击刷新</span>
        </v-tooltip>
      </span>
    </v-row>
    <v-row class="mb-4" justify="center">
      <v-btn class="primary" @click="query">查询</v-btn>
    </v-row>
    <v-row v-if="items">
      <v-treeview :items="items" />
    </v-row>
    <!--    <v-row>-->
    <!--      <v-select label="省份" v-model="province" :items="provinces" />-->
    <!--    </v-row>-->
  </v-col>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@vue/composition-api'
import ky from 'ky'

export default defineComponent({
  name: 'cet-score',
  setup() {
    const name = ref('')
    const id = ref('')
    const captcha = ref('')
    const items = ref()
    let examTable: string[]

    const captchaUrl = ref('')
    const generateCaptchaUrl = () =>
      (captchaUrl.value = `/api/cet-score/score-captcha.ts?ik=${
        id.value
      }&${Math.random()}`)

    onMounted(async () => {
      const script = await ky(
        'https://cors-anywhere.herokuapp.com/http://cet.neea.edu.cn/cet/js/data.js'
      ).text()
      const dq = JSON.parse(script.substring(7, script.length - 2))
      examTable = [
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
        // @ts-ignore
        const t = dq.rdsub.find((t) => t.code === i)
        return t && t.tab
      })
    })

    const query = async () => {
      const index = id.value.startsWith('F')
        ? 1
        : id.value.startsWith('S')
        ? 2
        : Number(id.value[9])

      const res = await ky('/api/cet-score/score.ts', {
        searchParams: {
          Name: name.value,
          no: id.value,
          v: captcha.value,
          exam: examTable[index],
        },
      }).json<any>()

      items.value = res.error
        ? [{ name: '验证码错误' }]
        : [
            { name: `成绩报告单编号：${res.id}` },
            {
              name: '笔试成绩',
              children: [
                { name: `准考证号：${res.z}` },
                { name: `总分：${res.s}` },
                { name: `听力：${res.l}` },
                { name: `阅读：${res.r}` },
                { name: `写作和翻译：${res.w}` },
              ],
            },
            {
              name: '口试成绩',
              children: [
                { name: `准考证号：${res.kyz}` },
                { name: `等级：${res.kys}` },
              ],
            },
          ]
    }

    // const province = ref('')
    // const provinces = [
    //   { value: '11', text: '北京市' },
    //   { value: '12', text: '天津市' },
    //   { value: '13', text: '河北省' },
    //   { value: '14', text: '山西省' },
    //   { value: '15', text: '内蒙古自治区' },
    //   { value: '21', text: '辽宁省' },
    //   { value: '22', text: '吉林省' },
    //   { value: '23', text: '黑龙江省' },
    //   { value: '31', text: '上海市' },
    //   { value: '32', text: '江苏省' },
    //   { value: '33', text: '浙江省' },
    //   { value: '34', text: '安徽省' },
    //   { value: '35', text: '福建省' },
    //   { value: '36', text: '江西省' },
    //   { value: '37', text: '山东省' },
    //   { value: '41', text: '河南省' },
    //   { value: '42', text: '湖北省' },
    //   { value: '43', text: '湖南省' },
    //   { value: '44', text: '广东省' },
    //   { value: '45', text: '广西壮族自治区' },
    //   { value: '46', text: '海南省' },
    //   { value: '50', text: '重庆市' },
    //   { value: '51', text: '四川省' },
    //   { value: '52', text: '贵州省' },
    //   { value: '53', text: '云南省' },
    //   { value: '54', text: '西藏自治区' },
    //   { value: '61', text: '陕西省' },
    //   { value: '62', text: '甘肃省' },
    //   { value: '63', text: '青海省' },
    //   { value: '64', text: '宁夏回族自治区' },
    //   { value: '65', text: '新疆维吾尔自治区' },
    //   { value: '82', text: '澳门' },
    // ]

    return {
      name,
      id,
      captcha,
      items,
      captchaUrl,
      generateCaptchaUrl,
      query,
    }
  },
})
</script>
