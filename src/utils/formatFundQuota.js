import moment from 'moment'
import thousandFormatter from './thousandFormatter'

const renderDate = date => {
  if (!date) {
    return ''
  }
  return moment(new Date(date)).format('YYYYMMDD')
}

export default function formatFundQuota (quota, fund) {
  const isEN = window && window.__i18n && window.__i18n.locale === 'en'
  let value = fund[quota.value]
  if (quota.formatter) {
    return quota.formatter(fund, quota.value)
  }
  if (quota.format === 'maxDrawdownRange') {
    const { maxDrawdownStartDate, maxDrawdownEndDate } = fund
    if (!maxDrawdownEndDate && !maxDrawdownStartDate) {
      return '-'
    }
    return `${renderDate(maxDrawdownStartDate)}~${renderDate(
      maxDrawdownEndDate
    )}`
  }
  if (value === undefined || Number.isNaN(value)) {
    return '-'
  }
  if (quota.format === 'date') {
    return moment(new Date(value)).format('YYYY-MM-DD')
  }
  if (quota.format === 'text') {
    return value
  }
  value = Number(value)
  if (quota.format === 'hundredMillion') {
    return isEN
      ? `${(value / 1000000000).toFixed(2)}`
      : `${(value / 100000000).toFixed(2)}`
  }
  if (quota.format === 'commaNumber') {
    return thousandFormatter(value.toFixed(2))
  }
  if (quota.format === 'percentage') {
    return (value * 100).toFixed(2) + '%'
  }
  if (quota.format === 'dateCount') {
    if (value === 0) {
      return '-'
    }
    if (value > 1) {
      return value.toFixed(1) + (isEN ? ' year' : ' 年')
    }
    return moment.duration(value, 'year').humanize()
  }
  if (quota.isNumeric) {
    return thousandFormatter(value || '')
  }
  if (Number.isNaN(value)) {
    return fund[quota.value]
  }
  return value.toFixed(4)
}
