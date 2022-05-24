import React, { useState, useCallback, useEffect, memo } from 'react'
import EchartsView from '@/components/EchartsView'
import styles from './index.less'
import classnames from 'classnames'

import { GetCsvAndPngWrapper } from './TimeSeriesChart'
//非依赖的函数写到外面，可以export出去供其他地方使用
const getRadarChartCsv = (series, xAxis, yAxis, radar) => {
  let csvHeader = ['类别']
  radar[0].indicator.forEach((item) => {
    csvHeader.push(item.name)
  })

  let result = csvHeader.join(',') + '\n'
  series[0].data.forEach((item) => {
    result += item.name + ','
    item.value.forEach((value) => {
      result += value + ','
    })
    result += '\n'
  })
  return result
}
/**
 * 雷达图, 改变图表配置重新渲染请改变getConfig函数
 * @param {String} id
 * @param {Func}  getCSV 自定义导出数据
 * @param {{name: String, fn: Func}[]} events 注册的图表监听函数
 * @param {Func} getConfig   修改图表配置
 * @param {String} className
 * @param {Boolean} zoomTool
 * @param {Boolean} downloadButton 是否显示下载按钮，默认显示
 * @param {Object}  chartStyle   图表的样式，用于固定图表大小
 */
const RadarChart = ({ id, getCSV, getConfig, className, zoomTool, downloadButton = true, chartStyle, events,
}) => {
  const [chart, setCart] = useState(null)
  const [chartConfig, setChartConfig] = useState(null)
  const onReady = useCallback(
    (chart) => {
      if (events) {
        events.map((event) => {
          chart.on(event.name, event.fn)
        })
      }
      setCart(chart)
    },
    [setCart]
  )
  useEffect(() => {
    const config = getConfig({
      tooltip: {
        trigger: 'item',
        position: 'bottom',
      },
      legend: {
        right: 20,
      },
      radar: [],
      series: [],
    })
    let newSeries = [],
      indicator = config.radar[0].indicator,
      list = config.series[0].data

    config.series[0].data.forEach((item) => {
      item.value.forEach((val, index) => {
        let serie = {
          type: 'radar',
          label: {
            show: false,
          },
          lineStyle: {
            color: 'transparent',
          },
          areaStyle: {
            color: 'transparent',
          },
          symbol: 'none',
        }

        const arr = new Array(item.value.length)
        arr.splice(index, 1, val)
        newSeries.push({
          ...serie,
          data: [
            {
              name: item.name,
              value: arr,
            },
          ],
          tooltip: {
            trigger: 'item',
            show: true,
            formatter() {
              let result = `<div>${indicator[index].name}</div>`
              list.forEach((item) => {
                result += `<div>${item.name}: ${item.value[index].toFixed(
                  4
                )}</div>`
              })
              return `<div style="width:auto;font-size:12px;">${result}</div>`
            },
          },
          z: 2,
        })
      })
    })
    setChartConfig({
      ...config,
      series: [...config.series, ...newSeries],
    })
  }, [getConfig, setChartConfig])
  useEffect(() => {
    return () => {
      if (events && chart) {
        events.forEach((event) => {
          chart.off(event.name)
        })
      }
    }
  }, [events, chart])
  return (
    <div className={classnames(styles.timechart, className)} id={id}>
      {chart && downloadButton && (
        <GetCsvAndPngWrapper
          chart={chart}
          id={id}
          className={styles.exportWapper}
          getCSV={getCSV ? getCSV : getRadarChartCsv}
        />
      )}
      {chartConfig && (
        <EchartsView
          config={chartConfig}
          onReady={onReady}
          chartStyle={chartStyle}
        />
      )}
    </div>
  )
}
export default memo(RadarChart)
