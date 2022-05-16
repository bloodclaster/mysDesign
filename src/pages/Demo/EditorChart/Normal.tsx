import TimeSeriesChart from "@/components/BasicEchart/TimeSeriesChart"
import moment from "moment"
import { memo } from "react"

const RenderChart = ({ id, data, downloadButton = false, legend = true, yAxisName, type = 'line', stack, zoomTool }) => {
  let xAxisData: number[] = []
  const series = data.map(item => ({
    type: type,
    name: item.name,
    data: item.data.map((item: any[]) => {
      xAxisData.push(+moment(item[0]))
      return [+moment(item[0]), item[1]]
    }),
    showSymbol: false,
    yAxisIndex: 0,
    animation: false,
    stack: stack ? 'Total' : false,
  }))

  const getConfig = (basicConfig) => {
    return {
      title: {
        left: 'center',
        textStyle: {
          fontSize: 14
        }
      },
      xAxis: {
        ...basicConfig.xAxis,
        boundaryGap: type === 'bar' ? true : false
      },
      yAxis: {
        ...basicConfig.yAxis,
        name: yAxisName,
        nameLocation: 'center',
        nameGap: 10,
        axisLabel: {
          inside: true,
          formatter: '{value}',
        },
        position: 'right',
        type: 'value',
        nameRotate: 270,
      },
      grid: {
        ...basicConfig.grid,
        top: 60,
        left: 60,
        right: 30,
        bottom: 80
      },
      dataZoom: {
        ...basicConfig.dataZoom,
        bottom: 19,
        height: 26,
        labelFormatter: (value: any, valueStr: string) => {
          return moment(parseInt(valueStr, 10)).format('YYYY-MM-DD')
        },
        brushSelect: false
      },
      series,
      tooltip: {
        trigger: 'axis',
      },
      legend: legend ? {
        icon: 'circle',
        type: 'scroll',
        top: 25
      } : false
    }
  }
  return <TimeSeriesChart
    getConfig={getConfig}
    id={id}
    zoomTool={zoomTool}
    downloadButton={downloadButton}
  />
}

export default memo(RenderChart)