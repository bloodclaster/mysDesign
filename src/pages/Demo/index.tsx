import React from 'react';
import { EllipsisOutlined, InboxOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, message, Radio, Steps, Upload } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import IncreaseChart from '@/components/BasicEchart/IncreaseChart';
import moment from 'moment';
import PieChart from '@/components/BasicEchart/PieChart';
import TimeSeriesChart from '@/components/BasicEchart/TimeSeriesChart';
const { Step } = Steps;
const { Dragger } = Upload;

export default ({ id }) => {
  const [value, setValue] = React.useState(1);

  const onChange = e => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const data = [
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
  const props = {
    name: 'file',
    multiple: true,
    action: `http://101.133.144.44:8001/file/insert/${id}`,
    headers: { token: localStorage.getItem('token') },
    showUploadList: false,
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`文件${info.file.name} 上传成功！`);
        next()
      } else if (info.file.status === 'error') {
        message.error(`文件${info.file.name} 上传失败`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  const steps = [
    {
      title: '选择要生成的图表类型',
      content: <div>
        <ProCard direction="column" ghost gutter={[0, 16]}>
          <ProCard gutter={16} ghost style={{ minHeight: 200, marginBottom: '15px', marginTop: '15px' }}>
            <ProCard colSpan={8} >
              <RenderPieChart id="pie" data={[
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' }
              ]} />
            </ProCard>
            <ProCard colSpan={8} >
              <RenderIncreaseChart id='111' data={data} />
            </ProCard>

            <ProCard colSpan={8} >
              <RenderChart id='222' data={data} />
            </ProCard>
          </ProCard>
          <Radio.Group onChange={onChange} style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }} value={value}>
            <Radio value={1}>PieChart</Radio>
            <Radio value={2}>IncreaseChart</Radio>
            <Radio value={3}>NormalChart</Radio>
          </Radio.Group>

        </ProCard>
      </div>
    },
    {
      title: '上传文件',
      content: <div>
        <br />
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">点击或者将文件拖拽至此处以上传文件</p>
          <p className="ant-upload-hint">
            {/* 。。。 */}
          </p>
        </Dragger>
        <br />
      </div>
    },
    {
      title: '预览',
      content: 'Last-content',
    },
  ];

  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

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
          }
        }}
        tabBarExtraContent={<a href='/模板1.xlsx'>
          下载模板
        </a>}
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
          <ProCard gutter={16} style={{ minHeight: 200 }} >
            <Steps current={current}>
              {steps.map(item => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            <div className="steps-content">{steps[current].content}</div>
            <div className="steps-action" style={{ float: 'right' }}>
              {current < steps.length - 1 && (
                <Button type="primary" onClick={() => next()}>
                  下一步
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button type="primary" onClick={() => {
                  message.success('Processing complete!')
                }
                }>
                  完成
                </Button>
              )}
              {current > 0 && (
                <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                  上一步
                </Button>
              )}
            </div>
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
    name: '模拟数据',
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
  // downloadButton
  />
}

const RenderChart = ({ id, data }) => {
  let xAxisData: number[] = []
  const series = [{
    type: 'bar',
    name: '模拟数据',
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
          formatter: '{value}',
          z: 999
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
        labelFormatter: (value, valueStr) => {
          return moment(parseInt(valueStr, 10)).format('YYYY-MM-DD')
        },
        brushSelect: false
      },
      series,
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        icon: 'circle',
        type: 'scroll',
        top: 25
      }
    }
  }
  return <TimeSeriesChart
    getConfig={getConfig}
    id={id}
    zoomTool
    // xAxisType='time'
    downloadButton={false}
  />
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