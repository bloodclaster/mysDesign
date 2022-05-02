import React, { useCallback } from 'react'
import TimeSeriesChart from './TimeSeriesChart'
import uniqby from 'lodash/uniqby'
/**
 * 面积堆叠图，echart堆叠时未处理没值的情况，统计加到这里处理
 * @returns 
 */
const AreaStackChart = ({ id, data, tags, zoomTool, downloadButton = true, chartStyle }) => {
  const getConfig = useCallback((config) => {
    let dataMap: any = {}, xAxisData: any[] = [];
    config.legend.selected = {}
    const types = tags.reverse()
    types.forEach(tag => {
      let configData = data[tag]
      if (configData.visible === false) {
        configData = configData.data
        config.legend.selected[tag] = false
      } else {
        config.legend.selected[tag] = true
      }
      dataMap[tag] = {}
      config.legend.data.push(tag)
      configData.forEach(item => {
        dataMap[tag][item[0]] = item[1]
        xAxisData.push(item[0])
      })
    })
    xAxisData = uniqby(xAxisData).sort((a, b) => a > b ? 1 : -1)
    config.series = types.map((tag, index) => {
      return {
        name: tag,
        data: xAxisData.map(time => dataMap[tag][time] ? [time, dataMap[tag][time]] : [time, 0]),
        type: 'line',
        showSymbol: false,
        stack: 'area',
        areaStyle: {},
        formatter: (item) => {
          if (item.value === 0) return ''
          return `<div>${item.marker}<span>${item.seriesName}: ${item.value.toFixed(2)}%</span></div>`
        }
      }
    })
    config.color = config.color.slice(0, types.length).reverse()
    config.yAxis.max = 100
    return config
  }, [tags, data])
  return <TimeSeriesChart getConfig={getConfig}
    id={id}
    chartStyle={chartStyle}
    zoomTool={zoomTool}
    downloadButton={downloadButton}
    xAxisType="category" />
}

export default AreaStackChart