import { useState, memo, useCallback, useEffect, useMemo } from 'react'
import classnames from 'classnames'
import styles from './index.less'
import { Card } from 'antd'
import moment from 'moment'
import { uniq, cloneDeep } from 'lodash'
import EchartsView from '../EchartsView'
import GetCsvAndPng from '@/components/GetCsvAndPng'

const IncreaseChart = ({ getCSV, id, zoomTool, config, className, chartStyle, events, panelStyle, title, onDataZoom, downloadButton, exOption, datePicker }) => {
  const [picker, setpicker] = useState(datePicker)
  const [chart, setCart] = useState(null)
  const Btns = ['3m', 'YTD', '1y', '3y', 'All']
  const color = ["#f65454", "#50c2ee", "#45ee49", "#180d04", "#f8e71c", "#e75317", "#EB8FC9", "#f8e8f9",
    "#BD3E66", "#BFE9DF", "#D7BE10", "#00A4BB", "#AA6E91", "#A5AC61", "#C13E1F", "#984597", "#DB9988",
    "#46A112", "#FB1B0A", "#F1D9A2", "#C9CEEB", "#071B5E", "#B93FD9", "#024FB1", "#F27BA7", "#D95BB8",
    "#6004DE", "#64D35E", "#BFC4F3", "#C4E413", "#A40BC1", "#E57424"]
  // window.__systemSettings && window.__systemSettings.chartColors
  const findIndex = (allTimes: string | any[], time: string | number, type = 'start') => {
    if (time < allTimes[0])
      return 0
    else if (time > allTimes[allTimes.length - 1])
      return allTimes.length - 1
    let result = null;
    if (type === 'start') {
      for (let index = 0; index < allTimes.length && result === null; index++) {
        if (allTimes[index] === time) {
          result = index
        }
        if (allTimes[index] > time) {
          result = index
        }
      }
    } else if (type === 'end') {
      for (let index = allTimes.length; index > 0 && result === null; index--) {
        if (allTimes[index] === time) {
          result = index
        }
        if (allTimes[index] < time) {
          result = index
        }
      }
    }
    return result !== null ? Math.max(result, 0) : 0
  }
  const ZoomControl = ({ chart, allXAxis, range = '' }) => {
    const [activeBtn, setBtn] = useState('')
    const onClick = useCallback((btn) => {
      const options = chart.getOption()
      const { startValue, endValue } = options.dataZoom[0]
      if ((startValue !== 0 && endValue !== 0) && (!startValue && !endValue)) return
      let allTimes
      if (allXAxis && allXAxis.length > 0) {
        allTimes = allXAxis
      }
      else if (options.xAxis[0].data) { allTimes = options.xAxis[0].data }
      else {
        if (options.series[0].data !== undefined && options.series[0].data[0][1] !== undefined) {
          options.series.forEach((serie: { data: any[] }) => {
            serie.data.forEach((item: any[]) => {
              allTimes.push(item[0])
            })
          })
        } else {
          options.xAxis.forEach((serie: { data: any[] }) => {
            serie.data.forEach((item: any) => {
              allTimes.push(item)
            })
          })
        }
        allTimes = uniq(allTimes).sort((a, b) => a > b ? 1 : -1)
      }
      const setOption = (opt: any) => {
        chart.setOption(opt)
        zoomChange(chart, opt)()
      }
      switch (btn) {
        case '3m':
          setOption({
            dataZoom: [{
              startValue: findIndex(allTimes, +moment(allTimes[endValue]).subtract(3, 'months')),
              endValue
            }]
          })
          break;
        case 'YTD':
          const endYearStart = +moment(allTimes[endValue]).startOf('year')
          let startVal = null;//第一个有净值的日期
          for (let index = 0; index < allTimes.length && startVal === null; index++) {
            if (allTimes[index] >= endYearStart) {
              startVal = index
            }
          }
          setOption({
            dataZoom: [{
              startValue: startVal === null ? 0 : startVal,
              endValue
            }]
          })
          break;
        case '1y':
          setOption({
            dataZoom: [{
              startValue: findIndex(allTimes, +moment(allTimes[endValue]).subtract(1, 'years')),
              endValue
            }]
          })
          break;
        case '3y':
          setOption({
            dataZoom: [{
              startValue: findIndex(allTimes, +moment(allTimes[endValue]).subtract(3, 'years')),
              endValue
            }]
          })
          break;
        case 'All': {
          setOption({
            dataZoom: [{
              startValue: 0,
              endValue: allTimes.length - 1
            }]
          })
          break;
        }
      }
      setBtn(btn)
    }, [setBtn, chart])
    useEffect(() => {
      if (range) {
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
  const zoomChange = (chart: any, opt?: any) => () => {
    const options = chart.getOption()
    let { startValue, endValue } = options.dataZoom[0]
    const xAxisData = options.xAxis[0].data
    const newSeries = options.series.map((serie: { show: any; name: any; lineType: string }, index: any, series: any[]) => {
      if (!serie.show) {
        return serie
      }
      let realData: any[] = []
      series.forEach((item: { name: string; data: any[] }) => {
        if (item.name === `${serie.name}-unshow`) {
          realData = item.data
        }
      })
      const realIndexArr = realData.map(item => item[0])
      let startIndex = findIndex(realIndexArr, xAxisData[startValue], 'start'),
        endIndex = findIndex(realIndexArr, xAxisData[endValue], 'end')
      realData = cloneDeep(realData).slice(startIndex, endIndex + 1)
      setpicker([xAxisData[startValue], xAxisData[endValue]])
      let firstValue = realData[0] ? realData[0][1] : 1
      const data = realData.map((item: any[]) => {
        if (serie.lineType !== 'excessNets')
          return [`${item[0]}`, ((item[1] - firstValue) / firstValue) * 100, item[1]]
        else
          return [`${item[0]}`, item[1]]
      })
      let markArea = null
      if (options.series[0].markArea && options.series[0].markArea.data) {
        const firstData = data[0][0], endData = data[data.length - 1][0]
        markArea = {
          data: options.series[0].markArea.data.map((item: any[]) => {
            if (Number(item[0].xAxis) >= Number(firstData) && Number(item[0].xAxis) <= Number(endData)) {
              if (Number(item[1].xAxis) >= Number(firstData) && Number(item[1].xAxis) <= Number(endData))
                return item
              else return [{
                ...item[0],
              },
              {
                ...item[1],
                xAxis: endData
              }]
            } else if (Number(item[1].xAxis) >= Number(firstData) && Number(item[1].xAxis) <= Number(endData)) {
              return [{
                ...item[0],
                xAxis: firstData
              },
              {
                ...item[1]
              }]
            }
            else if (Number(item[0].xAxis) < Number(firstData) && Number(item[1].xAxis) > Number(endData)) {
              return [{
                ...item[0],
                xAxis: firstData
              },
              {
                ...item[1],
                xAxis: endData
              }]
            }
            else return
          }).filter(Boolean)
        }
      }
      return {
        ...serie,
        data,
        realData,
        markArea
      }
    })
    if (onDataZoom) {
      onDataZoom(xAxisData[startValue], xAxisData[endValue])
    }
    chart.setOption({
      ...options,
      series: newSeries,
      xAxis: options.xAxis.map((item: any, index: number) => {
        if (index === 0) return item
        return {
          ...item,
          data: cloneDeep(xAxisData).slice(startValue, endValue + 1)
        }
      }),
      ...opt
    })
  }

  const onReady = (chart: { on?: any; getOption?: () => any; setOption?: (arg0: any) => void }) => {
    if (events) { events.map((event: { name: any; fn: any }) => { chart.on(event.name, event.fn) }) }
    chart.on('dataZoom', zoomChange(chart))
    setCart({ chart })
  }

  let selected = {}, legendData = (config && config.legend && config.legend.data) ? config.legend.data : config.series.map((series: { name: any }) => series.name)
  legendData.forEach((item: any) => {
    selected = {
      ...selected,
      [`${item}-unshow`]: false
    }
  })

  let xAxisData = config.xAxis.data ? config.xAxis.data.sort((a: number, b: number) => a - b) : []

  if (!config.xAxis.data) {
    config.series.forEach((serie: any) =>
      serie.data.forEach((item: any) => {
        if (xAxisData.indexOf(Number(item[0])) === -1) {
          xAxisData.push(Number(item[0]))
        }
      })
    )
    xAxisData = xAxisData.sort((a: number, b: number) => a - b)
  }
  if (config.markAreaxAxisData) {
    config.markAreaxAxisData.forEach((item: number) => {
      if (xAxisData.indexOf(Number(item)) === -1 && xAxisData[0] < item) {
        xAxisData.push(Number(item))
      }
    })
  }
  xAxisData = xAxisData.sort((a: number, b: number) => a - b)
  const RealDataList = config.series.map((series: { data: any }) => series.data)
  const firstData = RealDataList.map((item: any[][]) => item[0] ? item[0][1] : null)
  const dataList = RealDataList.map((items: any[], index: string | number) =>
    items.map(
      (item: any[]) => [
        `${item[0]}`,
        ((item[1] - firstData[index]) / firstData[index]) * 100,
        item[1]
      ]
    )
  )
  const options = {
    ...config,
    xAxis: [{
      ...config.xAxis,
      show: false,
      data: xAxisData,
      axisLabel: { formatter: (item: any) => moment(Number(item)).format('YYYY-MM-DD') }
    }, {
      ...config.xAxis,
      gridIndex: 1,
      data: xAxisData,
      axisLabel: { formatter: (item: any) => moment(Number(item)).format('YYYY-MM-DD') }
    }],
    yAxis: [{
      ...config.yAxis,
      show: false
    }, {
      ...config.yAxis,
      gridIndex: 1
    }],
    grid: [config.grid, config.grid],
    dataZoom: {
      ...config.dataZoom,
      type: 'slider',
      bottom: 40,
      brushSelect: false,
      labelFormatter: (value: any, valueStr: string) => {
        return moment(parseInt(valueStr, 10)).format('YYYY-MM-DD')
      },
    },
    legend: {
      ...config.legend,
      icon: 'circle',
      bottom: 5,
      type: 'scroll',
      data: [...legendData],
      selected: selected
    },
    tooltip: config.tooltip ? config.tooltip : {
      trigger: 'axis',
      formatter: (params: any[]) => {
        var str = `${moment(parseInt(params[0].axisValue, 10)).format('YYYY-MM-DD')}`
        params.forEach((param: { value: string | any[]; marker: any; seriesName: any }) => {
          if (param.value.length > 2) {
            if (param.value[2] === false) {
              str += `\n<div> 
                <span> ${param.marker}${param.seriesName} :&emsp;</span>
               <span style="float:right;"> ${param.value[1].toFixed(2)} </span> 
               </div>`
            }
            else {
              str += `\n<div> 
                <span> ${param.marker}${param.seriesName} :&emsp;</span>
               <span style="float:right;">${param.value[2].toFixed(2)} (${param.value[1].toFixed(2)}%) </span> 
               </div>`
            }
          }
          else
            str += `\n<div> 
                <span> ${param.marker}${param.seriesName} :&emsp;</span>
               <span style="float:right;"> ${param.value[1].toFixed(2)}% </span> 
               </div>`
        })
        return str;
      }
    },
    series: [
      ...RealDataList.map((data: any, index: string | number) => ({
        ...config.series[index],
        show: false,
        name: legendData[index] + '-unshow',
        data: data,
        animation: false
      })),
      ...dataList.map((data: any, index: string | number) => {
        if (config.series[index].lineType === 'excessNets')
          return {
            ...config.series[index],
            show: true,
            name: legendData[index],
            data: RealDataList[index].map((item: any[]) => [`${item[0]}`, item[1]]),
            xAxisIndex: 1,
            yAxisIndex: 1,
            realData: RealDataList[index],
            animation: false,
            lineStyle: {
              normal: {
                color: color[index]
              }
            },
            itemStyle: {
              normal: {
                color: color[index]
              }
            },

          }
        else
          return {
            ...config.series[index],
            show: true,
            name: legendData[index],
            data: data,
            xAxisIndex: 1,
            yAxisIndex: 1,
            realData: RealDataList[index],
            animation: false,
            lineStyle: {
              normal: {
                color: color[index]
              }
            },
            itemStyle: {
              normal: {
                color: color[index]
              }
            },
          }
      })
    ]
  }

  if (exOption) {
    options.yAxis.push({ ...exOption.yAxis, gridIndex: 1 })
    const yAxisIndex = options.yAxis.length - 1
    exOption.series.forEach((item: { name: any }, index: any) => {
      options.legend.data.push(item.name)
      options.series.push({
        ...item,
        yAxisIndex,
        xAxisIndex: 1,
        animation: false,
        exOption: true,
        lineStyle: {
          normal: {
            color: color[dataList.length + index]
          }
        },
        itemStyle: {
          normal: {
            color: color[dataList.length + index]
          }
        },
      })
    })
  }

  const csv = getCSV ? getCSV : () => {
    let resultMap = {}
    const arr = exOption ? [...config.series, ...exOption.series] : config.series
    let nameMap = arr.map((series: { name: any }) => series.name)
    arr.forEach((serie: { name: string | number; data: any[] }) => {
      let arr = { [serie.name]: {} }
      serie.data.forEach((item: any[]) => {
        arr[serie.name] = { ...arr[serie.name], [item[0]]: item[1] }
      })
      resultMap = { ...resultMap, ...arr }
    })
    let result = '日期,' + nameMap.join(',') + '\n'
    xAxisData.forEach((date: moment.MomentInput) => {
      result += moment(date).format('YYYY-MM-DD') + ','
      nameMap.forEach((item: string | number) => {
        result += resultMap[item][date] ? resultMap[item][date] + ',' : '--,'
      })
      result += '\n'
    })
    return result
  }
  /** return */
  if (title) {
    return [<div>
      {chart && datePicker && <DatePicker.RangePicker
        size='small' style={{ position: 'absolute', right: '40px', zIndex: 100 }}
        value={[moment(picker[0]), moment(picker[1])]}
        onChange={(value) => {
          if (value[0] && value[1]) {
            setpicker(value)
            let opt = {
              dataZoom: [{
                startValue: findIndex(xAxisData, value[0].format('x'), 'start') - 1,
                endValue: findIndex(xAxisData, value[1].format('x'), 'end') + 1
              }]
            }
            chart.chart.setOption(opt)
            zoomChange(chart.chart, opt)()
          } else {
            setpicker([moment(), moment()])
            let opt = {
              dataZoom: [{
                startValue: findIndex(xAxisData, moment().format('x'), 'start'),
                endValue: findIndex(xAxisData, moment().format('x'), 'end')
              }]
            }
            chart.chart.setOption(opt)
            zoomChange(chart.chart, opt)()
          }
        }}
      />}
    </div>,
    useMemo(
      () => <Card id={id} className={classnames(styles.timechart, className)} style={{ ...panelStyle, margin: '3px' }}
        title={
          <div>
            <span>{title}</span>
            {downloadButton && chart && csv && <GetCsvAndPng
              id={id}
              chart={{
                getCSV: csv,
                getSVG: chart.chart._api.getDataURL,
                type: 'echart'
              }}
              style={{ position: 'absolute', top: '15px', right: '15px' }}
            />}
          </div>
        }
        bordered={false}
      >
        <div id={id} className={classnames(styles.timechart, className)} style={panelStyle}>
          {downloadButton && chart && csv && <GetCsvAndPng
            id={id}
            chart={{
              getCSV: csv,
              getSVG: chart.chart._api.getDataURL,
              type: 'echart'
            }}
          />}
          {chart && zoomTool && <ZoomControl chart={chart.chart} />}
          <br />
          {options && <EchartsView
            config={options}
            onReady={onReady}
            chartStyle={chartStyle}
          />}
        </div>
      </Card>
      , [chart, getCSV, id, zoomTool, config, className, chartStyle, events, panelStyle, title, onDataZoom, downloadButton, exOption, datePicker]
    )]
  }
  return [<div>
    {chart && datePicker && <DatePicker.RangePicker
      size='small' style={{ position: 'absolute', right: '40px', zIndex: 100 }}
      value={[moment(picker[0]), moment(picker[1])]}
      onChange={(value) => {
        if (value[0] && value[1]) {
          setpicker(value)
          let opt = {
            dataZoom: [{
              startValue: findIndex(xAxisData, value[0].format('x'), 'start') - 1,
              endValue: findIndex(xAxisData, value[1].format('x'), 'end') + 1
            }]
          }
          chart.chart.setOption(opt)
          zoomChange(chart.chart, opt)()
        } else {
          setpicker([moment(), moment()])
          let opt = {
            dataZoom: [{
              startValue: findIndex(xAxisData, moment().format('x'), 'start'),
              endValue: findIndex(xAxisData, moment().format('x'), 'end')
            }]
          }
          chart.chart.setOption(opt)
          zoomChange(chart.chart, opt)()
        }
      }}
    />}
  </div>,
  useMemo(
    () =>
      <div id={id} className={classnames(styles.timechart, className)} style={panelStyle}>
        {downloadButton && chart && csv && <GetCsvAndPng
          id={id}
          chart={{
            getCSV: csv,
            getSVG: chart.chart._api.getDataURL,
            type: 'echart'
          }}
        />}
        {chart && zoomTool && <ZoomControl chart={chart.chart} />}
        <br />
        {options && <EchartsView
          config={options}
          onReady={onReady}
          chartStyle={chartStyle}
        />}
      </div>
    , [chart, getCSV, id, zoomTool, config, className, chartStyle, events, panelStyle, title, onDataZoom, downloadButton, exOption, datePicker]
  )]
}
export default memo(IncreaseChart)