import React, {  useCallback, useEffect, useState } from 'react'
import classnames from 'classnames'
import styles from './index.less'
import moment from 'moment'
import { uniq } from 'lodash'
const Btns = ['3m', 'YTD', '1y', '3y', 'All']
export const findIndex = (allTimes, time, zoomStyle) => {
  let result = null;
  for (let index = 0; index < allTimes.length && result === null; index++) {
    if(zoomStyle === 'next') {
      if(allTimes[index] === time || allTimes[index] > time) {
        result = index+1
      }
    } else {
      if(allTimes[index] === time) {
        result = index
      }
      if(allTimes[index] > time) {
        result = index-1
      }
    }
    
  }
  return result !== null ? Math.max(result, 0) : 0
}
//previous
export const ZoomControl = ({ chart, onDataZoom, xAxisType = 'category', allXAxis, range = '', zoomStyle = 'previous' }) => {
  const [activeBtn, setBtn] = useState('')
  const onClick = useCallback((btn) => {
    const options = chart.getOption()
    const { startValue, endValue } = options.dataZoom[0]
    if ((startValue !== 0 && endValue !== 0) && (!startValue && !endValue)) return
    let allTimes = []
    if (allXAxis && allXAxis.length > 0) {
      allTimes = allXAxis
    }
    else if (options.xAxis[0].data) { allTimes = options.xAxis[0].data }
    else {
      if (options.series[0].data !== undefined && options.series[0].data[0][1] !== undefined) {
        options.series.forEach(serie => {
          serie.data.forEach(item => {
            allTimes.push(item[0])
          })
        })
      } else {
        options.xAxis.forEach(serie => {
          serie.data.forEach(item => {
            allTimes.push(item)
          })
        })
      }
      allTimes = uniq(allTimes).sort((a,b) => a > b ? 1 : -1)
    }
    const setOption = (opt) => {
      if(onDataZoom) {
        onDataZoom({
          ...options,
          ...opt
        })
      }
      chart.setOption(opt)
    }
    switch(btn) {
      case '3m':
        setOption({
          dataZoom: [{
            startValue: xAxisType === 'time'
              ? +moment(endValue).subtract(3, 'months')
              : findIndex(allTimes, +moment(allTimes[endValue]).subtract(3, 'months'), zoomStyle),
            endValue
          }]
        })
        break;
      case 'YTD':
        const endYearStart = xAxisType === 'time'
          ? +moment(endValue).startOf('year')
          : +moment(allTimes[endValue]).startOf('year')
        let startVal = null;//第一个有净值的日期
        for (let index = 0; index < allTimes.length && startVal === null; index++) {
          if(allTimes[index] >= endYearStart) {
            startVal = xAxisType === 'time' ? allTimes[index] : index
          }
        }
        setOption({
          dataZoom: [{
            startValue: startVal === null
              ? (xAxisType === 'time' ? startValue : 0)
              : startVal,
            endValue
          }]
        })
        break;
      case '1y':
        setOption({
          dataZoom: [{
            startValue: xAxisType === 'time'
              ? +moment(endValue).subtract(1, 'years')
              : findIndex(allTimes, +moment(allTimes[endValue]).subtract(1, 'years'), zoomStyle),
            endValue
          }]
        })
        break;
      case '3y':
        setOption({
          dataZoom: [{
            startValue: xAxisType === 'time'
              ? +moment(endValue).subtract(3, 'years')
              : findIndex(allTimes, +moment(allTimes[endValue]).subtract(3, 'years'), zoomStyle),
            endValue
          }]
        })
        break;
      case 'All': {
        setOption({
          dataZoom: [{
            startValue: xAxisType === 'time' ? allTimes[0] : 0,
            endValue: xAxisType === 'time' ? allTimes[allTimes.length-1]: allTimes.length-1
          }]
        })
        break;
      }
    }
    setBtn(btn)
  }, [setBtn, chart])
  useEffect(() => {
    if(range) {
      setTimeout(() => {
        onClick(range)
      }, 500)
    }
  }, [])
  return (
    <div className={classnames(styles.zoomControl, 'flex justify-center align-center')}>
      <div>缩放: </div>
      {
        Btns.map(btn => (
          <div key={btn}
            className={classnames(styles.btn, {
              [styles.active]: activeBtn === btn
            })}
            onClick={() => onClick(btn)}
          >{btn}</div>
        ))
      }
    </div>
  )
}
