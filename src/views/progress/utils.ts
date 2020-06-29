import dayjs from 'dayjs'
import isLeapYear from 'dayjs/plugin/isLeapYear'
import isoWeek from 'dayjs/plugin/isoWeek'

dayjs.extend(isLeapYear)
dayjs.extend(isoWeek)

export const moments = () => {
  const now = dayjs()
  const days = [
    31,
    now.isLeapYear() ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ]
  const minute = now.second() / 60
  const hour = (now.minute() + minute) / 60
  const day = (now.hour() + hour) / 24
  const week = (now.isoWeekday() - 1 + day) / 7
  const month = (now.date() + day) / days[now.month()]
  const year = (now.month() + month) / 12

  return { now, days, minute, hour, day, week, month, year }
}
