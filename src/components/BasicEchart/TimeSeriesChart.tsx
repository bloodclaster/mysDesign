import React, {
  useState,
  useRef,
  useMemo,
  useEffect,
  memo,
  useCallback,
} from 'react'
import GetCsvAndPng from '../GetCsvAndPng'
import EchartsView from '@/components/EchartsView'
import classnames from 'classnames'
import _ from 'lodash'
import moment from 'moment'
import styles from './index.less'
import { ZoomControl } from './toolbox'
import { uniq } from 'lodash'

//非依赖的函数写到外面，可以export出去供其他地方使用
export const formatterNumber = (value: number) => {
  let absVal = Math.abs(value)
  if (absVal >= 1e11) {
    return `${value / 1e9}万亿`
  }
  if (absVal >= 1e10) {
    return `${value / 1e9}千亿`
  }
  if (absVal >= 1e9) {
    return `${value / 1e9}十亿`
  } else if (value >= 1e8) {
    return `${value / 1e8}亿`
  } else if (value >= 1e4) {
    return `${value / 1e4}万`
  }
  return value
}
const defaultToolTipFormater = (item) =>
  `<div><span>${item.marker}${item.seriesName
  }:</span> <span style="float:right;">${Number(item.value[1]).toFixed(2)}</span></div>`
const percentFormatter = (item) => {
  return `<div><span>${item.marker}${item.seriesName
    }: </span> <span style="float:right;">${item.value[2].toFixed(2)}(${item.change.toFixed(2)})</span></div>`
}
const getChange = (item, datalist, startValue) => {
  let serieStart = null,
    idx = 0
  while (serieStart === null && idx < datalist.length) {
    if (datalist[idx][0] >= startValue) {
      serieStart = datalist[idx][2]
    }
    idx++
  }
  if (serieStart === null || serieStart === undefined) {
    serieStart = datalist[0][2]
  }
  return ((item.value[2] - serieStart) / serieStart) * 100
}
const getTimeSeriesCSV = (series: any) => {
  let xAxisList: any = [],
    csvHeader = ['日期'],
    csvRows: any = [],
    columns: any = []
  series.forEach((item) => {
    csvHeader.push(item.name)
    let column = {}
    item.data.forEach((d) => {
      xAxisList.push(d[0])
      column[d[0]] = d[d.length - 1]
    })
    columns.push(column)
  })
  xAxisList = _.uniq(xAxisList).sort((a, b) => (a > b ? 1 : -1))
  xAxisList.forEach((xAxis) => {
    let row = [moment(xAxis).format('YYYY/MM/DD 00:00:00')]
    columns.forEach((column) => {
      row.push(column[xAxis] ? column[xAxis] : undefined)
    })
    csvRows.push(row.join(','))
  })
  columns = null
  xAxisList = null
  return csvHeader.join(',') + '\n' + csvRows.join('\n')
}
export const GetCsvAndPngWrapper = React.memo(
  ({ chart, className, id, getCSV }) => {
    const csv = useRef(null) //缓存导出的数据，下次导出不用重复计算
    const chartProps = useMemo(() => {
      const getCSVData = () => {
        if (csv.current) return csv.current
        const option = chart.getOption()
        const { series, xAxis, yAxis, radar } = option
        csv.current = getCSV(series, xAxis, yAxis, radar)
        return csv.current
      }
      return {
        getSVG: chart._api.getDataURL,
        getCSV: getCSVData,
        type: 'echart',
      }
    }, [chart, getCSV])
    return <GetCsvAndPng id={id} chart={chartProps} className={className} />
  }
)
/**
 * 时间序列图, 改变图表配置重新渲染请改变getConfig函数
 * @param {String} id
 * @param {Func}  getCSV 自定义导出数据
 * @param {{name: String, fn: Func}[]} events 注册的图表监听函数
 * @param {Func} getConfig   修改图表配置
 * @param {String} className
 * @param {Boolean} zoomTool
 * @param {Boolean} downloadButton 是否显示下载按钮，默认显示
 * @param {Object}  chartStyle   图表的样式，用于固定图表大小
 * @param {Object}  onDataZoom   events中dataZoom信息太少,onDataZoom会回传当前选择范围数据
 * @param {String}  xAxisType
 * @param { [{start:xAxis, end:xAxis, color:string}]...] } markArea 情景分析，区域标注
 */
const TimeSeriesChart = ({
  id,
  getCSV,
  getConfig,
  className,
  zoomTool,
  downloadButton = true,
  chartStyle,
  events,
  onDataZoom,
  xAxisType = 'category',
  markArea,
}) => {
  const allXAxis = useRef([]) //所有的x轴坐标值
  const startValue = useRef(0)
  const [chart, setCart] = useState(null)
  const [chartConfig, setChartConfig] = useState(null)
  const dataZoomChange = useCallback(
    (options) => {
      if (onDataZoom) {
        onDataZoom(options)
      }
      startValue.current =
        xAxisType === 'time'
          ? options.dataZoom[0].startValue
          : allXAxis.current[options.dataZoom[0].startValue]
    },
    [onDataZoom, xAxisType]
  )
  const onReady = (chart) => {
    chart.on('dataZoom', () => {
      const options = chart.getOption()
      dataZoomChange(options)
    })
    if (events) {
      events.map((event) => {
        chart.on(event.name, event.fn)
      })
    }
    setCart(chart)
  }
  useEffect(() => {
    let xAxis = {
      type: xAxisType,
      axisLabel: {
        formatter: (value, index) => {
          return moment(parseInt(value, 10)).format('YYYY-MM-DD')
        },
      },
      axisPointer: {
        show: true,
        type: 'line',
        lineStyle: {
          type: 'solid',
        },
      },
    }
    let dataZoom = [
      {
        type: 'slider',
        bottom: 50,
        height: 22,
        labelFormatter: (value, valueStr) => {
          return moment(parseInt(valueStr, 10)).format('YYYY-MM-DD')
        },
        brushSelect: false,
      },
    ]
    if (xAxisType === 'time') {
      xAxis = {
        type: 'time',
        axisPointer: {
          show: true,
          type: 'line',
          lineStyle: {
            type: 'solid',
          },
        },
      }
      dataZoom = [
        {
          type: 'slider',
          bottom: 50,
          height: 22,
          brushSelect: false,
          labelFormatter: (value) => {
            return moment(Math.floor(value)).format('YYYY-MM-DD')
          },
        },
      ]
    }
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
        '#91e8e1',
      ],
      grid: {
        top: 40,
        left: 10,
        right: 30,
        bottom: 100,
      },
      legend: {
        icon: 'circle',
        bottom: 15,
        data: [],
        type: 'scroll',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      yAxis: {
        nameLocation: 'center',
        nameGap: 10,
        axisLabel: {
          inside: true,
          formatter: '{value}',
        },
        position: 'left',
        type: 'value',
        name: '',
        nameRotate: 270,
      },
      xAxis,
      dataZoom,
      series: [],
      backgroundColor: '#FFFFFF',
    }
    const config = getConfig(basicConfig)
    let forMatterList = [],
      allXAxisList = [],
      series = []
    config.series.forEach((serie) => {
      allXAxisList = [
        ...allXAxisList,
        ...(serie.data || []).map((d) => Number(d[0])),
      ]
      let formater = defaultToolTipFormater
      if (serie.compare === 'percent' && !serie.formatter) {
        formater = percentFormatter
      } else if (serie.formatter) {
        formater = serie.formatter
      }
      forMatterList.push(formater)
      if (serie.compare === 'percent') {
        series.push({
          ...serie,
          data: serie.data.map((item) => [
            item[0],
            ((item[1] - serie.data[0][1]) / serie.data[0][1]) * 100,
            item[1],
          ]),
        })
      } else {
        series.push(serie)
      }
    })
    allXAxis.current = uniq(allXAxisList).sort((a, b) => (a > b ? 1 : -1))
    if (!config.tooltip.formatter) {
      config.tooltip.formatter = (values) => {
        let result = config.tooltip.header
          ? config.tooltip.header(values)
          : values[0]
            ? `<div>${moment(Number(values[0].value[0])).format(
              'YYYY-MM-DD'
            )}</div>`
            : `<div>${moment(Number(values.value[0])).format('YYYY-MM-DD')}</div>`
        if (values[0])
          values.forEach((item) => {
            const forMatter = forMatterList[item.seriesIndex],
              serie = series[item.seriesIndex]
            if (!serie || typeof forMatter !== 'function') result += ''
            else if (serie.compare === 'percent') {
              result += forMatter({
                ...item,
                change: getChange(item, serie.data, startValue.current),
              })
            } else {
              result += forMatter(item)
            }
          })
        else {
          const forMatter = forMatterList[values.seriesIndex],
            serie = series[values.seriesIndex]
          if (!serie || typeof forMatter !== 'function') result += ''
          else if (serie.compare === 'percent') {
            result += forMatter({
              ...values,
              change: getChange(values, serie.data, startValue.current),
            })
          } else {
            result += forMatter(values)
          }
        }
        return `<div style="width:auto;">${result}</div>`
      }
    }
    if (markArea && markArea[0]) {
      series[0] = {
        ...series[0],
        markArea: {
          data: markArea.map((item) => {
            return [
              {
                xAxis: item.start,
                itemStyle: item.color ? { color: item.color } : {},
              },
              { xAxis: item.end },
            ]
          }),
        },
      }
    }
    setChartConfig({
      ...config,
      series,
    })
  }, [getConfig, setChartConfig])
  useEffect(() => {
    return () => {
      if (chart) {
        chart.off('dataZoom')
      }
      if (events && chart) {
        events.forEach((event) => {
          chart.off(event.name)
        })
      }
    }
  }, [events, chart])
  return (
    <div className={classnames(styles.timechart, className)} id={id}>
      {chart && zoomTool && (
        <ZoomControl
          chart={chart}
          onDataZoom={dataZoomChange}
          xAxisType={xAxisType}
        />
      )}
      {chart && downloadButton && (
        <GetCsvAndPngWrapper
          chart={chart}
          id={id}
          className={styles.exportWapper}
          getCSV={getCSV ? getCSV : getTimeSeriesCSV}
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
export default memo(TimeSeriesChart)
