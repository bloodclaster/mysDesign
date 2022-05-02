import React, { memo } from 'react'
// import the core library.
import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'

// 引入柱状图图表，图表后缀都为 Chart
import {
  BarChart,
  LineChart,
  PieChart,
  RadarChart,
  TreemapChart,
  GaugeChart,
  MapChart,
  ScatterChart,
} from 'echarts/charts'
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  ToolboxComponent,
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  MarkAreaComponent,
} from 'echarts/components'
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { SVGRenderer } from 'echarts/renderers'

// Register the required components
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  ToolboxComponent,
  LineChart,
  BarChart,
  LabelLayout,
  UniversalTransition,
  SVGRenderer,
  TreemapChart,
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  PieChart,
  RadarChart,
  MarkAreaComponent,
  GaugeChart,
  ScatterChart,
  MapChart,
])

const EchartSView = ({ config, onReady, chartStyle = {}, onEvent = {} }) => {
  return (
    <ReactEChartsCore
      echarts={echarts}
      option={config}
      notMerge={true} // 是否不跟之前设置的 option 进行合并，默认为 false，即表示合并。如果为 true，表示所有组件都会被删除，然后根据新 option 创建所有新组件。
      lazyUpdate={true} // 设置完 option 后是否不立即更新图表，默认为 false，即同步立即更新。如果为 true，则会在下一个 animation frame 中，才更新图表。
      onChartReady={onReady} // when the chart is ready, will callback the function with the echarts object as it's paramter.
      onEvents={onEvent} // binding the echarts event, will callback with the echarts event object, and the echart object as it's paramters. e.g: { 'click': this.onClick, ... }
      opts={{
        locale: 'zh',
        renderer: 'svg',
      }} // object, will be used when initial echarts instance by echarts.init.
      style={chartStyle} // the style of echarts div
    />
  )
}
export default memo(EchartSView)
