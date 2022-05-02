import { useState } from 'react'
import EchartsView from '../EchartsView'
import GetCsvAndPng from '../GetCsvAndPng'

export default ({ id, getCSV, chartStyle, events, getConfig }) => {
  const [chart, setCart] = useState('')
  const onReady = (chart) => {
    if (events) {
      events.map((event) => {
        chart.on(event.name, event.fn)
      })
    }
    setCart({ chart })
  }

  const baseConfig = {
    series: {
      type: 'treemap',
      /**
       * @data :[{
       * | @name: `name`,
       * | @value : value,
       * | @children : [{
       * | | @name : `name`
       * | | @value : value,
       * | | @itemStyle : { @color : `color`}
       * | }, {}...]
       * }],
       */
      roam: false,
      nodeClick: false,
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 1,
      },
      tooltip: {},
      width: '95%',
      breadcrumb: { show: false },
    },
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        let str =
          params.marker + params.data.name + '&emsp;&emsp;' + params.data.value
        if (params.data.name === undefined) return
        return str
      },
    },
  }

  const config = getConfig(baseConfig)
  const csv = getCSV
    ? getCSV
    : () => {
        let strMaker = (data: any) => {
          let str = ''
          data.forEach((serie: any) => {
            if (serie.children) str += strMaker(serie.children)
            else if (serie.value) str += serie.name + ',' + serie.value + '\n'
            console.log(str)
          })
          return str
        }
        let res = '名称\n' + strMaker(config.series.data)
        return res
      }

  return (
    <div>
      {chart && csv && (
        <GetCsvAndPng
          id={id}
          chart={{
            getCSV: csv,
            getSVG: chart.chart._api.getDataURL,
            getWidth: chart.chart._api.getWidth,
            getHeight: chart.chart._api.getHeight,
            type: 'echart',
          }}
          getCSV={csv}
        />
      )}
      <EchartsView onReady={onReady} config={config} chartStyle={chartStyle} />
    </div>
  )
}
