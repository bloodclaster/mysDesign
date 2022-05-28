import Normal from "@/components/CreateCharts/EditorChart/Normal"
import { BorderBox12, BorderBox13, Decoration6, Decoration8, Decoration10 } from '@jiaminghi/data-view-react';
import { IndexPageContent, IndexPageStyle, LeftPage, LeftTopBox, TopBox, TimeBox } from "@/components/PageIndex"
import styles from './index.less'
import Increase from "@/components/CreateCharts/EditorChart/Increase";
import { Fragment, useEffect, useState } from "react";
import { historyMessage } from "@/services/demo";
import moment from "moment";
import RadarChart from "@/components/BasicEchart/RadarChart";
import RenderPieChart from "@/components/CreateCharts/EditorChart/RenderPieChart";
import NormalChart from "@/components/BasicEchart/NormalChart";
import RenderRadar from "@/components/CreateCharts/EditorChart/RenderRadar";

export default ({ }) => {

  const [data, setdata] = useState([])
  const [time, settime] = useState(moment())
  useEffect(() => {
    historyMessage({}).then(res => {
      if (res.code === 200) {
        setdata(res.data)
      }
    })
  }, [])

  if (true)
    setTimeout(() => {
      settime(moment())
    }, 1000)

  const option = {
    title: {
      text: 'World Population'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      splitLine: {
        lineStyle: {
          opacity: 0.3
        }
      },
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
    },
    series: [
      {
        name: '2011',
        type: 'bar',
        data: [18203, 23489, 29034, 104970, 131744, 630230]
      },
      {
        name: '2012',
        type: 'bar',
        data: [19325, 23438, 31000, 121594, 134141, 681807]
      }
    ]
  };
  return (<IndexPageStyle>
    <Fragment>
      <TopBox >
        <div className='top_box'>
          <Decoration10 className='top_decoration10' />
          <div className='title-box'>
            <Decoration8
              className='top_decoration8'
              color={['#568aea', '#000000']}
            />
            <div className='title'>
              <span className='title-text'>{`数据大屏示例图1`}</span>
              <Decoration6
                className='title-bototm top_decoration6'
                reverse={true}
                color={['#50e3c2', '#67a1e5']}
              />
            </div>
            <Decoration8
              reverse={true}
              className='top_decoration8'
              color={['#568aea', '#000000']}
            />
          </div>
          <Decoration10 className='top_decoration10 top_decoration10_reverse' />
          <TimeBox>
            <h3>{moment(time).format('YYYY-MM-DD HH:mm:ss')}</h3>
          </TimeBox>
        </div>
      </TopBox>
    </Fragment>
    <IndexPageContent>
      <LeftPage>
        <BorderBox13 style={{ height: 315, width: 425 }}>
          <LeftTopBox className={styles.iconfont}>
            <div style={{ height: 315, width: 415, marginTop: 3 }}>
              <Normal id={'1'} type='bar'
                data={[{
                  name: 'nale',
                  data: [
                    ['2016-8-10', 256],
                    ['2016-8-11', 556],
                    ['2016-8-12', 756],
                    ['2016-8-13', 550],
                    ['2016-8-14', 210],
                    ['2016-8-15', 310],
                    ['2016-8-16', 414],
                    ['2016-8-17', 304],
                    ['2016-8-18', 104],
                    ['2016-10-10', 100],
                    ['2016-10-11', 120],
                    ['2016-10-12', 123],
                    ['2016-10-13', 523],
                    ['2016-10-14', 223],
                    ['2016-10-15', 343],
                    ['2016-10-16', 440],
                    ['2016-10-17', 540],
                    ['2016-10-18', 500],
                    ['2017-10-10', 200],
                    ['2017-10-11', 560],
                    ['2017-10-12', 750],
                    ['2017-10-13', 580],
                    ['2017-10-14', 250],
                    ['2017-10-15', 300],
                    ['2017-10-16', 450],
                    ['2017-10-17', 300],
                    ['2017-10-18', 100],
                  ]
                }]} yAxisName={'涨幅'} stack={true} zoomTool />
            </div>
            <br />
            <NormalChart id={'leftBottom'} zoomTool={false} config={option} />
          </LeftTopBox>
        </BorderBox13>
      </LeftPage>


      <LeftPage>
        {/* <BorderBox12 style={{ height: 315, width: 425 }}> */}
        <LeftTopBox className={styles.iconfont}>
          <div style={{ height: 315, width: 615, marginTop: 3 }}>
            <Increase id={'1'}
              data={[{
                name: 'nale',
                data: [
                  ['2016-8-10', 256],
                  ['2016-8-11', 556],
                  ['2016-8-12', 756],
                  ['2016-8-13', 550],
                  ['2016-8-14', 210],
                  ['2016-8-15', 310],
                  ['2016-8-16', 414],
                  ['2016-8-17', 304],
                  ['2016-8-18', 104],
                  ['2016-10-10', 100],
                  ['2016-10-11', 120],
                  ['2016-10-12', 123],
                  ['2016-10-13', 523],
                  ['2016-10-14', 223],
                  ['2016-10-15', 343],
                  ['2016-10-16', 440],
                  ['2016-10-17', 540],
                  ['2016-10-18', 500],
                  ['2017-10-10', 200],
                  ['2017-10-11', 560],
                  ['2017-10-12', 750],
                  ['2017-10-13', 580],
                  ['2017-10-14', 250],
                  ['2017-10-15', 300],
                  ['2017-10-16', 450],
                  ['2017-10-17', 300],
                  ['2017-10-18', 100],
                ]
              }, {
                name: 'Strea',
                data: [
                  ['2016-8-10', 356],
                  ['2016-8-11', 156],
                  ['2016-8-12', 256],
                  ['2016-8-13', 350],
                  ['2016-8-14', 410],
                  ['2016-8-15', 510],
                  ['2016-8-16', 414],
                  ['2016-8-17', 304],
                  ['2016-8-18', 204],
                  ['2016-10-10', 100],
                  ['2016-10-11', 320],
                  ['2016-10-12', 423],
                  ['2016-10-13', 523],
                  ['2016-10-14', 623],
                  ['2016-10-15', 543],
                  ['2016-10-16', 640],
                  ['2016-10-17', 740],
                  ['2016-10-18', 600],
                  ['2017-10-10', 700],
                  ['2017-10-11', 860],
                  ['2017-10-12', 850],
                  ['2017-10-13', 880],
                  ['2017-10-14', 950],
                  ['2017-10-15', 700],
                  ['2017-10-16', 450],
                  ['2017-10-17', 500],
                  ['2017-10-18', 700],
                ]
              }]} yAxisName={'涨幅'} stack={true} zoomTool />
          </div>
        </LeftTopBox>
        {/* </BorderBox12> */}
      </LeftPage>


      <LeftPage>
        <BorderBox12 style={{ height: 325, width: 395, marginLeft: 10 }}>
          <LeftTopBox className={styles.iconfont}>
            <div style={{ height: 315, width: 415, paddingTop: 3 }}>
              <RenderRadar data={undefined} nameList={undefined} legend={undefined} />
            </div>
            <br />
            <br />
            <br />
            <RenderPieChart id="pie" space={[2, 83]} data={[
              { value: 1048, name: 'Search' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ]} legend={false} downloadButton={false} />
          </LeftTopBox>
        </BorderBox12>
      </LeftPage>



    </IndexPageContent>
  </IndexPageStyle >)
}