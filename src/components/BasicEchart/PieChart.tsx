import React, { useState, useCallback, useEffect, memo } from 'react'
import classnames from 'classnames'
import styles from './index.less'
import EchartsView from '../EchartsView'
import { GetCsvAndPngWrapper } from './TimeSeriesChart'
//非依赖的函数写到外面，可以export出去供其他地方使用
const getPieChartCSV = (series) => {
  let xAxisList: any = [],
    csvHeader: any = ['类别'],
    csvRows: any = [],
    columns: any = []
  series.forEach((item) => {
    csvHeader.push(item.name)
    let column: any = {}
    item.data.forEach((d) => {
      xAxisList.push(d.name)
      column[d.name] = d.value
    })
    columns.push(column)
  })
  xAxisList.forEach((xAxis) => {
    let row = [xAxis]
    columns.forEach((column) => {
      row.push(column[xAxis] ? column[xAxis] : undefined)
    })
    csvRows.push(row.join(','))
  })
  columns = null
  xAxisList = null
  const result = csvHeader.join(',') + '\n' + csvRows.join('\n')
  return result
}

/**
 * 饼图, 改变图表配置重新渲染请改变getConfig函数
 * @param {String} id
 * @param {Func}  getCSV 自定义导出数据
 * @param {{name: String, fn: Func}[]} events 注册的图表监听函数
 * @param {Func} getConfig   修改图表配置
 * @param {String} className
 * @param {Boolean} zoomTool
 * @param {Boolean} downloadButton 是否显示下载按钮，默认显示
 * @param {Object}  chartStyle   图表的样式，用于固定图表大小
 */
const PieChart = ({ id, getCSV, getConfig, className, downloadButton = true, chartStyle, events, }) => {
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
      color: [
        '#7cb5ec',
        '#90ed7d',
        '#f7a35c',
        '#8085e9',
        '#f15c80',
        '#e4d354',
        '#2b908f',
        '#f45b5b',
        '#91e8e1',
      ],
      tooltip: {
        trigger: 'item',
        formatter(value) {
          return `<div style="width:auto;">
            <div>${value.seriesName}</div>
            <div>${value.marker}<span>${value.data.name}: ${(
              value.data.value * 100
            ).toFixed(2)}%</span></div>
          </div>`
        },
      },
      legend: {
        show: false,
        orient: 'vertical',
        left: 'left',
      },
      series: [],
      backgroundColor: '#FFFFFF',
    })
    setChartConfig(config)
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
          getCSV={getCSV ? getCSV : getPieChartCSV}
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
export default memo(PieChart)
