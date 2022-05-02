import React from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import IncreaseChart from '@/components/BasicEchart/IncreaseChart';
import moment from 'moment';
import PieChart from '@/components/BasicEchart/PieChart';
import TimeSeriesChart from '@/components/BasicEchart/TimeSeriesChart';

export default ({ }) => {
  const data = [
    ['2016-4-10', 250],
    ['2016-4-11', 550],
    ['2016-4-12', 750],
    ['2016-4-13', 550],
    ['2016-4-14', 450],
    ['2016-4-15', 350],
    ['2016-4-16', 450],
    ['2016-4-17', 150],
    ['2016-4-18', 150],

    ['2016-6-10', 238],
    ['2016-6-11', 538],
    ['2016-6-12', 738],
    ['2016-6-13', 530],
    ['2016-6-14', 230],
    ['2016-6-15', 340],
    ['2016-6-16', 447],
    ['2016-6-17', 347],
    ['2016-6-18', 147],

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

    ['2018-10-10', 200],
    ['2018-10-11', 560],
    ['2018-10-12', 750],
    ['2018-10-13', 580],
    ['2018-10-14', 250],
    ['2018-10-15', 300],
    ['2018-10-16', 450],
    ['2018-10-17', 300],
    ['2018-10-18', 100],

    ['2019-10-10', 200],
    ['2019-10-11', 560],
    ['2019-10-12', 750],
    ['2019-10-13', 580],
    ['2019-10-14', 250],
    ['2019-10-15', 300],
    ['2019-10-16', 450],
    ['2019-10-17', 300],
    ['2019-10-18', 100]
  ]
  return (
    <div
      style={{
        background: '#F5F7FA',
      }}
    >
      <PageContainer
        header={{
          title: 'base test demo',
          ghost: true,
          breadcrumb: {
            routes: [{
              path: '/',
              breadcrumbName: '当前页面',
            },
            ],
          },
          extra: [
            <Button key="1" >
              按钮
            </Button>,
            <Dropdown
              key="dropdown"
              trigger={['click']}
              overlay={
                <Menu>
                </Menu>
              }
            >
              <Button key="4" style={{ padding: '0 8px' }}>
                <EllipsisOutlined />
              </Button>
            </Dropdown>,
          ],
        }}
        tabBarExtraContent="测试页面"
        tabList={[{
          tab: '基本信息',
          key: 'base',
          closable: false,
        }]}
        tabProps={{
          type: 'editable-card',
          hideAdd: true,
          onEdit: (e, action) => console.log(e, action),
        }}
      >
        <ProCard direction="column" ghost gutter={[0, 16]}>
          <ProCard style={{ minHeight: 200 }} />
          <ProCard gutter={16} ghost style={{ minHeight: 200, marginBottom: '15px', marginTop: '15px' }}>
            <ProCard colSpan={16} >
              <RenderIncreaseChart id='111' data={data} />
            </ProCard>
            <ProCard colSpan={8} >
              <RenderPieChart id="pie" data={[
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' }
              ]} />
            </ProCard>

          </ProCard>
          <ProCard colSpan={24} >
            <RenderChart id='222' data={data} />
          </ProCard>
        </ProCard>
      </PageContainer>
    </div>
  )
}
const RenderIncreaseChart = ({ id, data }) => {
  let xAxisData: number[] = []
  const series = [{
    type: 'line',
    name: 'name',
    data: data.map((item: any[]) => {
      xAxisData.push(+moment(item[0]))
      return [+moment(item[0]), item[1]]
    }),
    showSymbol: false,
    yAxisIndex: 0,
    animation: false,
  }]

  const option = {
    title: {
      left: 'center',
      textStyle: {
        fontSize: 14
      }
    },
    xAxis: {
      data: xAxisData,
    },
    yAxis: {
      name: '增长幅度',
      nameLocation: 'center',
      nameGap: 10,
      axisLabel: {
        inside: true,
        formatter: '{value}%',
        z: 999
      },
      position: 'right',
      type: 'value',
      nameRotate: 270,
    },
    grid: {
      top: 40,
      left: 60,
      right: 30,
      bottom: 100
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
    zoomTool
    downloadButton />
}

const RenderChart = ({ id, data }) => {
  let xAxisData: number[] = []
  const series = [{
    type: 'line',
    name: 'name',
    data: data.map((item: any[]) => {
      xAxisData.push(+moment(item[0]))
      return [+moment(item[0]), item[1]]
    }),
    showSymbol: false,
    yAxisIndex: 0,
    animation: false,
  }]

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
        boundaryGap: false
      },
      yAxis: {
        ...basicConfig.yAxis,
        name: '增长幅度',
        nameLocation: 'center',
        nameGap: 10,
        axisLabel: {
          inside: true,
          formatter: '{value}%',
          z: 999
        },
        position: 'right',
        type: 'value',
        nameRotate: 270,
      },
      grid: {
        ...basicConfig.grid,
        top: 40,
        left: 60,
        right: 30,
        bottom: 100
      },
      dataZoom: {
        ...basicConfig.dataZoom,
        bottom: 34,
        height: 26,
        labelFormatter: (value, valueStr) => {
          return moment(parseInt(valueStr, 10)).format('YYYY-MM-DD')
        },
        brushSelect: false
      },
      series,
      tooltip: {
        trigger: 'axis',
      }
    }
  }
  return <TimeSeriesChart
    getConfig={getConfig}
    id={id}
    zoomTool
    xAxisType='time'
    downloadButton />
}
const RenderPieChart = ({ id, data }) => {
  const length = Number((data.length / 2).toFixed(0))
  const getConfig = (baseConfig: any) => {
    return {
      ...baseConfig,
      legend: [
        {
          orient: 'vertical',
          left: '2%',
          top: 'center',
          itemGap: 40,
          data: data.slice(0, length).map(i => i.name)
        }, {
          orient: 'vertical',
          left: '83%',
          top: 'center',
          itemGap: 40,
          data: data.slice(length).map(i => i.name)
        }],
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
    <PieChart getConfig={getConfig} id={id} downloadButton={false} />
  )
}