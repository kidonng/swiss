import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'

dayjs.extend(isoWeek)

// Android version for each device
export const devices = {
  wayne: '9.0',
  begonia: '10.0',
}
export const server = 'https://hugeota.d.miui.com'

export const version = () => {
  let now = dayjs()
  // New version is released after 16 o'clock on Mon. - Thu.
  if (now.isoWeekday() > 4) now = now.isoWeekday(4)
  else if (now.hour() < 16) now = now.isoWeekday(now.isoWeekday() - 1)
  // Versions released before 2020 use the last digit of the year
  // Versions released after 2020 use the last two digits of the year
  const year = now.year() - (now.year() >= 2020 ? 2000 : 2010)

  return now.format(`${year}.M.D`)
}
