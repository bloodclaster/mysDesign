import { useState, useEffect, memo } from 'react'
import EchartsView from '../EchartsView'


/**
 * 饼图, 改变图表配置重新渲染请改变gaugeConfig
 * @param {String} id
 * @param {Object} gaugeConfig   图表配置
 * @param {String} className
 * @param {Object}  chartStyle   图表的样式，用于固定图表大小
 * @param {{name: String, fn: Func}[]} events 注册的图表监听函数
 */
const GaugeChart = ({ id, gaugeConfig, className, chartStyle, events }) => {
  const [chart, setCart] = useState(null)
  const [chartConfig, setChartConfig] = useState(null)
  const onReady = (chart) => {
    if (events) {
      events.map(event => {
        chart.on(event.name, event.fn)
      })
    }
    setCart(chart)
  }
  useEffect(() => {
    const config = {
      series: [
        {
          type: 'gauge',
          radius: '75%',
          startAngle: 180,
          endAngle: 0,
          splitNumber: 1,
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          pointer: {
            show: false
          },
          detail: {
            fontSize: 25,
            fontWeight: 'bold',
            offsetCenter: [0, '-10%'],
            formatter: value => value.toFixed(1),
            valueAnimation: true
          },
          ...gaugeConfig
        }
      ],
    }
    setChartConfig(config)
  }, [gaugeConfig])
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
    <div className={className} id={id}>
      {
        chartConfig && <EchartsView config={chartConfig} onReady={onReady} chartStyle={chartStyle} />
      }
    </div>
  )
}
export default memo(GaugeChart)
