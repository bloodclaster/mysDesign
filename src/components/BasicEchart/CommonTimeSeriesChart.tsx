import React, { useState, useCallback, useRef, memo } from 'react'
import TimeSeriesChart from './TimeSeriesChart'
import moment from 'moment'
import classnames from 'classnames'
import styles from './index.less'
import { Button } from 'antd'
import { AreaChartOutlined, LineChartOutlined } from '@ant-design/icons';
import { groupBy, uniq } from 'lodash'
export type CommonTimeSeriesChartType = {
  chartId?: String,
  funds?: Array<any>,
  ytitle?: String,
  styleBotton?: boolean,
  markArea: any,
  format?: string,
  style?: any,
  yAxis?: any
}

const CommonTimeSeriesChart: React.FC<CommonTimeSeriesChartType> = (props) => {
  const { chartId, funds, ytitle, styleBotton, format, yAxis } = props
  const chartStyle = useRef({
    height: 300
  })
  const [style, setStyle] = useState(props.style || true)
  let xAxisData: any = [];
  (funds || []).forEach(fun => {
    fun.data.forEach(item => {
      xAxisData.push(item[0])
    })
  })
  xAxisData = uniq(xAxisData).sort((a, b) => a > b ? 1 : -1)
  const getChartConfig = useCallback((config) => {
    config.yAxis.name = ytitle ? ytitle : ''
    config.yAxis = yAxis ? yAxis.map(item => {
      return {
        ...config.yAxis,
        ...item,
      }
    }) : {
      ...config.yAxis,
      axisLabel: {
        inside: true,
        formatter: format == 'percent' ? '{value}%' : '{value}'
      },
    }
    config.xAxis.boundaryGap = false
    config.series = (funds || []).map(item => {
      config.legend.data.push(item.name)
      return {
        ...item,
        data: item.data.map(item => [`${item[0]}`, item[1]]),
        type: item.type ? item.type : 'line',
        showSymbol: false,
        areaStyle: style ? null : {},
        stack: style ? null : 'x',
        formatter: (ele) => `<div>${ele.marker}<span>${ele.seriesName}: ${ele.value[1]}${format == 'percent' ? '%' : ''}</span></div>`
      }
    })
    if (config.yAxis.length > 1) {
      const allData = config.series.map(serie => ({
        data: serie.data.map((item: any[]) => Number(item[1])),
        yAxisIndex: serie.yAxisIndex,
      }))
      const res = groupBy(allData, 'yAxisIndex')
      for (let index in res) {
        let max = 0
        res[index].forEach(item => {
          max = Math.max(...item.data, max)
        })
        if (max > 50)
          max = (Number((max / 100).toFixed(0)) + 1) * 100
        else
          max = (Number((max / 10).toFixed(0)) + 1) * 10
        config.yAxis[index] = {
          ...config.yAxis[index],
          max,
          splitNumber: 5,
          interval: max / 5
        }
      }
    }
    config.xAxis.data = xAxisData
    return config
  }, [funds, style])
  // let timearr = [{ start: 1003334400000, end: 1004630400000, color: "black" }, { start: 1001433600000, end: 1003248000000 }]
  return (
    <div style={{ height: 350, position: 'relative' }}>
      <div>
        {
          styleBotton && <div style={{ position: 'absolute', right: 75, top: -5, zIndex: 100 }}>
            <Button className={classnames(styles.styleButton)} shape="circle" icon={<AreaChartOutlined />} onClick={() => setStyle(false)}></Button>
            <Button className={classnames(styles.styleButton)} shape="circle" icon={<LineChartOutlined />} onClick={() => setStyle(true)}></Button>
          </div>
        }
      </div>
      {
        funds && funds.length > 0 &&
        <TimeSeriesChart
          getConfig={getChartConfig}
          id={chartId}
          chartStyle={chartStyle.current}
          // xAxisType="time"
          // markArea={markArea ? timearr : []}
          zoomTool />
      }
    </div >
  )
}

export default memo(CommonTimeSeriesChart)
