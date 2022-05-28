import React, { useEffect, useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Button, InputNumber, message, Radio, Steps, Upload } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import IncreaseChart from '@/components/BasicEchart/IncreaseChart';
import moment from 'moment';
import TimeSeriesChart from '@/components/BasicEchart/TimeSeriesChart';
import RenderPieChart from './EditorChart/RenderPieChart'
import RenderLineChart from './EditorChart/RenderLineChart';
import RenderIncreaseCharts from './EditorChart/RenderIncreaseCharts';
import TextArea from 'antd/lib/input/TextArea';
import { insertHistory } from '@/services/demo';
import { data, pie } from './data'
import RenderRadar from './EditorChart/RenderRadar';
const { Step } = Steps;
const { Dragger } = Upload;

export default ({ }) => {
  const [download, setdownload] = useState(1)
  const [legend, setlegend] = useState(1)
  const [space, setspace] = useState([2, 83])
  const [value, setValue] = useState(1);
  const [list, setlist] = useState(null)
  const [type, settype] = useState('PieChart')
  const [remark, setremark] = useState('')
  const [uploadData, setuploadData] = useState({})

  useEffect(() => {
    if (type === 'PieChart')
      setuploadData({
        origin: 'PieChart',
        download: download === 1,
        legend: legend === 1,
        data: (list || []).map((res: any) => ({
          name: res.title,
          value: res.value1
        })),
        space,
        remark
      })
  }, [download, legend, list, space, remark,])
  const props = {
    name: 'file',
    multiple: true,
    action: `http://101.133.144.44:8001/file/excel`,
    headers: { token: localStorage.getItem('token') },
    showUploadList: false,
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`文件${info.file.name} 上传成功！`);
        setlist(info.file.response.data)
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
      content: <div style={{ width: '100%', overflow: 'auto' }}>
        <ProCard direction="column" ghost gutter={[0, 16]}>
          <Radio.Group
            onChange={(e) => setValue(e.target.value)}
            style={{ flexDirection: 'row', marginTop: 20, display: 'flex', width: 1800 }}
            value={value}
          >
            <ProCard style={{ width: 450 }}  >
              <RenderIncreaseChart id='111' data={data} />
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Radio onChange={() => { settype('IncreaseChart') }} value={2}><a href="/normalchart.xlsx">点击下载IncreaseChart模板</a></Radio>
              </div>
            </ProCard>
            <ProCard style={{ width: 450 }}  >
              <RenderChart id='222' data={data} downloadButton={false} yAxisName={undefined} type={'bar'} dataName={undefined} />
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Radio onChange={() => { settype('NormalChart') }} value={3}><a href="/normalchart.xlsx">点击下载NormalChart模板</a></Radio>
              </div>
            </ProCard>

            <ProCard style={{ width: 450 }}  >
              <RenderPieChart id="pie" space={space} data={pie} legend downloadButton={false} />
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Radio onChange={() => { settype('PieChart') }} value={1}><a href="/pieChart.xlsx">点击下载PieChart模板</a></Radio>
              </div>
            </ProCard>
            <ProCard style={{ width: 450 }}  >
              <RenderRadar />
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Radio onChange={() => { settype('RadarChart') }} value={1}><a href="/normalchart.xlsx">点击下载RadarChart模板</a></Radio>
              </div>
            </ProCard>
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
          </p>
        </Dragger>
        <br />
      </div>
    },
    {
      title: '预览',
      content: <ProCard gutter={16} ghost style={{ minHeight: 200, marginBottom: '15px', marginTop: '15px' }}>
        {type === 'PieChart' && list && [
          <ProCard colSpan={16}>
            <RenderPieChart
              downloadButton={download === 1}
              legend={legend === 1}
              id="pie"
              data={list.map(res => ({
                name: res.title,
                value: res.value1
              }))} space={space} />
            <TextArea
              style={{ marginTop: 40, marginLeft: 40 }}
              showCount
              placeholder="请输入备注信息"
              allowClear
              maxLength={100}
              onChange={e => {
                setremark(e.target.value)
              }} />
          </ProCard>
          ,
          <ProCard colSpan={8}>
            <div style={{ height: '100px' }}></div>
            <div style={{ display: 'flex', margin: 15 }}>
              <div style={{ width: '50%' }}>是否需要下载</div>
              <Radio.Group
                onChange={(e) => setdownload(e.target.value)}
                style={{ display: 'flex', justifyContent: 'space-around' }}
                value={download}
              > <Radio value={1}>是</Radio>
                <Radio value={2}>否</Radio>
              </Radio.Group>
            </div>
            <div style={{ display: 'flex', margin: 15 }}>
              <div style={{ width: '50%' }}>是否需要指示器</div>
              <Radio.Group
                onChange={(e) => setlegend(e.target.value)}
                style={{ display: 'flex', justifyContent: 'space-around' }}
                value={legend}
              > <Radio value={1}>是</Radio>
                <Radio value={2}>否</Radio>
              </Radio.Group>
            </div>
            {legend === 1 &&
              <div style={{ display: 'flex', margin: 15 }}>
                <div style={{ width: '50%' }}>指示器位置设置(%)</div>
                <InputNumber size="small" value={space[0]} style={{ marginRight: 10 }} onChange={value => { setspace([Number(value), space[1]]) }}></InputNumber>
                <InputNumber size="small" value={space[1]} style={{ marginRight: 10 }} onChange={value => { setspace([space[0], Number(value)]) }}></InputNumber>
              </div>
            }
          </ProCard>]}
        {type === 'NormalChart'
          && list &&
          <RenderLineChart data={list} id={'LineChart'} setuploadData={setuploadData} />
        }
        {type === 'IncreaseChart'
          && list &&
          <RenderIncreaseCharts id={'IncreaseChart'} data={list} setuploadData={setuploadData} />
        }
      </ProCard>,
    },
  ];

  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setspace([2, 83])
    setCurrent(current - 1);
  };

  return (
    <div
      style={{
        background: '#F5F7FA',
        margin: 24,
        height: '100%'
      }}
    >
      <PageContainer
        tabProps={{
          type: 'editable-card',
          hideAdd: true,
          onEdit: (e, action) => console.log(e, action),
        }}
      >
        <ProCard direction="column" ghost gutter={[0, 16]} style={{ minHeight: 700 }}>
          <ProCard gutter={16} style={{ minHeight: 200, marginTop: 12 }} >
            <Steps current={current}>
              {steps.map(item => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            <div className="steps-content">{steps[current].content}</div>
            <div className="steps-action" style={{ float: 'right' }}>
              {current < steps.length - 2 && (
                <Button type="primary" onClick={() => next()}>
                  下一步
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button type="primary" onClick={() => {
                  insertHistory(uploadData).then((res) => {
                    if (res.code === 200) {
                      message.success('保存成功!')
                      setTimeout(() => {
                        window.location.reload()
                      }, 1500)
                    }
                  })
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

const RenderChart = ({ id, data, downloadButton, legend = true, yAxisName, type, dataName }) => {
  let xAxisData: number[] = []
  const series = [{
    type: type || 'bar',
    name: dataName || '模拟数据',
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
      legend: legend ? {
        icon: 'circle',
        type: 'scroll',
        top: 25
      } : false
    }
  }
  return <TimeSeriesChart
    getConfig={getConfig}
    id={id}
    zoomTool
    // xAxisType='time'
    downloadButton={downloadButton}
  />
}

