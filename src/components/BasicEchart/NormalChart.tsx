import React, { useState, memo } from 'react'
import { ZoomControl } from './toolbox'
import classnames from 'classnames'
import styles from './index.less'
import EchartsView from '../EchartsView'
import GetCsvAndPng from '../GetCsvAndPng'


const NormalChart = ({ getCSV, id, zoomTool, config, className, chartStyle, events, panelStyle }) => {
  const [chart, setCart] = useState(null)
  const onReady = (chart) => {
    if (events) {
      events.map(event => {
        chart.on(event.name, event.fn)
      })
    }
    setCart({ chart })
  }
  return (
    <div id={id} className={classnames(styles.timechart, className)} style={panelStyle}>
      {chart && getCSV && <GetCsvAndPng
        id={id}
        chart={{
          getCSV,
          getSVG: chart.chart._api.getDataURL,
          getWidth: chart.chart._api.getWidth,
          getHeight: chart.chart._api.getHeight,
          type: 'echart'
        }}
      />}
      <br />
      {chart && zoomTool && <ZoomControl chart={chart.chart} />}
      {config && <EchartsView
        config={config}
        onReady={onReady}
        chartStyle={chartStyle}
      />}
    </div>
  )
}
export default memo(NormalChart)