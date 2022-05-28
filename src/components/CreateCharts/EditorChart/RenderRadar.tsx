
/**
 *  @param {json} data ={
 *    @param {string} name:'string ',
 *    @param {number[]} value :[1,2,3]
 *  }
 *  @param {string[]} nameList = ['名字1', '名字2']
 *  @param {boolean} length = boolean 
 *  @param {string} dataName = string
 */

import RadarChart from "@/components/BasicEchart/RadarChart"

export default ({ data, nameList, legend }) => {
  // const namelist = ['名字1', '名字2']
  const da = [{
    name: 'shuju1', value: [1, 2, 3]
  }, {
    name: 'shuju2', value: [2, 3, 1]
  }]
  const naLi = ['大盘价值1', '大盘价值2', '大盘价值3']
  console.log(nameList, naLi)
  const getConfig = (baseConfig) => {
    // const seriesData = (nameList ? nameList : naLi).map((name, index) => [data[index], name])
    // [[0.7, '大盘价值'], [0.2, '大盘成长'], [0.8, '小盘价值'], [0.1, '小盘成长'], [0.4, '中盘价值'], [0.6, '中盘成长']]

    return {
      ...baseConfig,
      series: [{
        type: 'radar',
        tooltip: {
          show: false
        },
        areaStyle: {
          opacity: 0
        },
        label: {
          show: true,
        },
        z: 1,
        data: data || da
      }],
      radar: [{
        radius: '75%',
        center: ["50%", "47%"],
        shape: 'circle',
        indicator: (nameList ? nameList : naLi).map(item => {
          return { name: item }
        })
      }],
      legend: legend ? {
        itemWidth: 12,
        itemHeight: 5,
        bottom: 0
      } : false
    }
  }
  return (<div>
    <RadarChart
      id="style-chart"
      getConfig={getConfig}
      downloadButton={false}

      getCSV={undefined}
      className={undefined}
      zoomTool={undefined}
      chartStyle={undefined}
      events={undefined}
    />
  </div>)
}