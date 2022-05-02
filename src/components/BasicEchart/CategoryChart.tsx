import React, { useState, useCallback, useEffect, memo } from 'react'
import EchartsView from '../EchartsView'
import classnames from 'classnames'
import styles from './index.less'
import { GetCsvAndPngWrapper } from './TimeSeriesChart'

const defaultToolTipFormater = (item) => `<div>${item.marker}<span>${item.seriesName.length < 24 ? item.seriesName : item.seriesName.slice(0, 24) + '...'} : ${(Array.isArray(item.value) ? item.value[1] : item.value).toFixed(2)}%</span></div>`

const getCategoryCSV = (series, xAxis, yAxis) => {
  let xAxisList = xAxis[0].data || yAxis[0].data || [], csvHeader = ['类别'], csvRows = [], columns = []
  series.forEach(item => {
    csvHeader.push(item.name)
    let column = {}
    item.data.forEach((val, idx) => {
      column[xAxisList[idx]] = val
    })
    columns.push(column)
  })
  xAxisList.forEach(xAxis => {
    let row = [xAxis]
    columns.forEach(column => {
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
 * 类目轴图, 改变图表配置重新渲染请改变getConfig函数
 * @param {String} id
 * @param {Func}  getCSV 自定义导出数据
 * @param {{name: String, fn: Func}[]} events 注册的图表监听函数
 * @param {Func} getConfig   修改图表配置
 * @param {String} className
 * @param {Boolean} zoomTool
 * @param {Boolean} downloadButton 是否显示下载按钮，默认显示
 * @param {Object}  chartStyle   图表的样式，用于固定图表大小
 */
const CategoryChart = ({ id, getCSV, getConfig, className, zoomTool, downloadButton = true, chartStyle, events }) => {
  const [chart, setCart] = useState(null)
  const [chartConfig, setChartConfig] = useState(null)
  const onReady = useCallback((chart) => {
    if (events) {
      events.map(event => {
        chart.on(event.name, event.fn)
      })
    }
    setCart(chart)
  }, [setCart])
  useEffect(() => {
    const basicConfig = {
      color: [
        '#7cb5ec',
        '#90ed7d',
        '#f7a35c',
        '#8085e9',
        '#f15c80',
        '#e4d354',
        '#2b908f',
        '#f45b5b',
        '#91e8e1'
      ],
      grid: {
        top: 10,
        left: 60,
        right: 10,
        bottom: 70
      },
      legend: {
        icon: 'circle',
        bottom: 1,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      yAxis: {
        nameLocation: 'center',
        nameGap: 10,
        axisLabel: {
          inside: false,
          formatter: '{value}%'
        },
        position: 'right',
        type: 'value',
        name: ''
      },
      xAxis: {
        type: 'category',
        data: [],
        axisPointer: {
          show: true,
          type: 'line',
          lineStyle: {
            type: 'solid'
          }
        }
      },
      series: [],
      backgroundColor: '#FFFFFF'
    }
    const config = getConfig(basicConfig)
    let forMatterList = []
    if (!config.tooltip.isSimple && !config.tooltip.formatter) {
      config.series.forEach(serie => {
        forMatterList.push(serie.formatter ? serie.formatter : defaultToolTipFormater)
      })
      config.tooltip.formatter = (values) => {
        let result = config.tooltip.header ? config.tooltip.header(values) : `<div>${values[0].name}</div>`
        values.forEach(item => {
          const forMatter = forMatterList[item.seriesIndex]
          if (item.value)
            result += forMatter(item)
        })
        return `<div style="width:auto;font-size:12px;">${result}</div>`
      }
    }
    setChartConfig(config)
  }, [getConfig, setChartConfig])
  useEffect(() => {
    return () => {
      if (events && chart) {
        events.forEach(event => {
          chart.off(event.name)
        })
      }
    }
  }, [events, chart])
  return (
    <div className={classnames(styles.timechart, className)} id={id}>
      {
        chart && downloadButton && <GetCsvAndPngWrapper chart={chart} id={id} className={styles.exportWapper} getCSV={getCSV ? getCSV : getCategoryCSV} />
      }
      {
        chartConfig && <EchartsView config={chartConfig} onReady={onReady} chartStyle={chartStyle} />
      }
    </div>
  )
}
export default memo(CategoryChart)