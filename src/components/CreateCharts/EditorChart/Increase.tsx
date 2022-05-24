import IncreaseChart from "@/components/BasicEchart/IncreaseChart"
import moment from "moment"
import { memo } from "react"

const RenderChart = ({ id, data, downloadButton = false, yAxisName, stack, zoomTool, datePicker }) => {
  let xAxisData: number[] = []
  const series = data.map(item => ({
    type: 'line',
    smooth: true,
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

  const option = {
    title: {
      left: 'center',
      textStyle: {
        fontSize: 14
      }
    },
    xAxis: {
      data: xAxisData,
      boundaryGap: false
    },
    yAxis: {
      name: yAxisName,
      nameLocation: 'center',
      nameGap: 10,
      axisLabel: {
        inside: true,
        formatter: '{value}%',
      },
      splitLine: {
        lineStyle: {
          opacity: 0.3
        }
      },
      position: 'right',
      type: 'value',
      nameRotate: 270,
    },
    grid: {
      top: 40,
      left: 50,
      right: 30,
      bottom: 94
    },
    dataZoom: {
      bottom: 34,
      height: 26,
      labelFormatter: (value, valueStr) => {
        return moment(parseInt(valueStr, 10)).format('YYYY-MM-DD')
      },
      brushSelect: false
    },
    series
  }

  return <IncreaseChart
    config={option}
    id={id}
    zoomTool={zoomTool}
    downloadButton={downloadButton}
    onDataZoom={false}
    datePicker={datePicker}
  />
}
export default memo(RenderChart)