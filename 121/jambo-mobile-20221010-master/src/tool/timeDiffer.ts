// 多久之前
export function TimeDifference(stamp?: number) {
  let differ = ''
  if (stamp) {
    if (typeof stamp === 'number') {
      const now = new Date().getTime()
      const poor = now - stamp
      const minutes = poor / 1000 / 60
      if (minutes < 60) {
        differ = `${minutes.toFixed(0)} min ago`
      } else if (60 <= minutes && minutes < 1440) {
        differ = `${(minutes / 60).toFixed(0)} hour ago`
      } else {
        differ = `${(minutes / 60 / 24).toFixed(0)} day ago`
      }
    }
  } else {
    differ = 'Not Started'
  }
  return differ
}
// 距离下次时间
export function TimeDifference1(stamp?: number) {
  let text = ''
  if (typeof stamp === 'number') {
    const t = 7 * 24 * 60 * 60 * 1000 + stamp
    const now = new Date().getTime()
    const poor = t - now
    if (0 < poor) {
      const minutes = poor / 1000 / 60
      if (minutes < 60) {
        text = `${minutes.toFixed(0)} minutes`
      } else if (60 <= minutes && minutes < 1440) {
        text = `${(minutes / 60).toFixed(0)} hours`
      } else {
        text = `${(minutes / 60 / 24).toFixed(0)} days`
      }
    }
  }
  return text
}