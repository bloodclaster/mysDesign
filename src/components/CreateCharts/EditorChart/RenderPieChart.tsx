import PieChart from "@/components/BasicEchart/PieChart"
import { memo } from "react"

const RenderPieChart = ({ id, data, downloadButton, legend, space }) => {
  const length = Number((data.length / 2).toFixed(0))
  const getConfig = (baseConfig: any) => {
    return {
      ...baseConfig,
      legend: legend ? [
        {
          orient: 'vertical',
          left: `${space[0]}%`,
          top: 'center',
          itemGap: 40,
          data: data.slice(0, length).map(i => i.name)
        }, {
          orient: 'vertical',
          left: `${space[1]}%`,
          top: 'center',
          itemGap: 40,
          data: data.slice(length).map(i => i.name)
        }] : false,
      series: [
        {
          type: 'pie',
          radius: ['34%', '67%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          labelLine: {
            show: false
          },
          data
        }
      ],
      tooltip: {
        trigger: 'item',
        formatter(value) {
          return `<div style="width:auto;">
      <div>${value.marker}<span>${value.data.name}: ${(value.data.value)}</span></div>
    </div>`
        }
      }
    }
  }
  return (
    <PieChart getConfig={getConfig} id={id} downloadButton={downloadButton} />
  )
}
export default memo(RenderPieChart)