import TimeSeriesChart from "@/components/BasicEchart/TimeSeriesChart"
import ProCard from "@ant-design/pro-card"
import { Input, Radio, Select } from "antd"
import moment from "moment"
import { useEffect, useState } from "react"
import { cloneDeep } from "lodash"
import TextArea from "antd/lib/input/TextArea"
import Normal from "./Normal"
const RenderLineChart = ({ data, id, setuploadData }) => {
  const [listNumber, setlistNumber] = useState(1)
  const [nameList, setnameList] =
    useState(['legendName1', 'legendName2', 'legendName3', 'legendName4', 'legendName5'])
  const [download, setdownload] = useState(1)
  const [legend, setlegend] = useState(1)
  const [stack, setstack] = useState(1)
  const [zoomTool, setzoomTool] = useState(1)
  const [type, settype] = useState('line')
  const [remark, setremark] = useState('')
  const [yName, setyName] = useState('增长幅度')
  const n = [0, 1, 2, 3, 4]
  const res = data.map((item: any) => {
    let obj = {}
    n.slice(0, listNumber).forEach(number => {
      obj = {
        ...obj,
        [nameList[number]]: Number(item[`value${number + 1}`])
      }
    })
    return ({
      date: item.title,
      ...obj
    })
  })

  const [resuledata, setresuledata] = useState(nameList.slice(0, listNumber).map((item: any) => {
    return {
      name: item,
      data: res.map((data: any) => [
        data.date, data[item]
      ])
    }
  }))
  useEffect(() => {
    setresuledata(nameList.slice(0, listNumber).map((item: any) => {
      return {
        name: item,
        data: res.map((data: any) => [
          data.date, data[item]
        ])
      }
    }))
  }, [nameList, listNumber])

  useEffect(() => {
    setuploadData({
      origin: 'LineChart',
      data: resuledata,
      yName,
      download: download === 1,
      legend: legend === 1,
      stack: stack === 1,
      type,
      zoomTool: zoomTool === 1,
      remark
    })
  }, [resuledata, yName, download, legend, stack, type, zoomTool, remark])

  return <div>
    <ProCard gutter={16}>
      <ProCard colSpan={16}>
        <Normal
          data={resuledata}
          id={id}
          yAxisName={yName}
          downloadButton={download === 1}
          legend={legend === 1}
          stack={stack === 1}
          type={type}
          zoomTool={zoomTool === 1}
        />
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
      <ProCard colSpan={8}>
        <div style={{ display: 'flex', marginBottom: 12 }}>
          <div style={{ width: 160 }}>
            {`请输入数据列的数量:`}
          </div>
          <Select size='small' style={{ width: 215 }} onChange={(value) => { setlistNumber(value + 1) }}>
            {n.map(item => <Select.Option size='small' key={item} value={item}>
              {item + 1}
            </Select.Option>)}
          </Select>
        </div>
        {n.slice(0, listNumber).map((number: any) => {
          return <div style={{ display: 'flex', marginBottom: 12 }}>
            <div style={{ width: 160 }}>{`请输入数据列${number + 1}的名称:`}</div>
            <Input
              size='small'
              defaultValue={nameList[number]}
              onChange={(e) => {
                let list = cloneDeep(nameList)
                list[number] = e.target.value
                setnameList(list)
              }}
              style={{ width: 215 }} />
          </div>
        })}
        <div style={{ display: 'flex', marginBottom: 12 }}>
          <div style={{ width: 160 }}>{`请输入y轴的名称:`}</div>
          <Input
            size='small'
            onChange={(e) => {
              setyName(e.target.value)
            }}
            style={{ width: 215 }} />
        </div>
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
        <div style={{ display: 'flex', margin: 15 }}>
          <div style={{ width: '50%' }}>是否需要缩放</div>
          <Radio.Group
            onChange={(e) => setzoomTool(e.target.value)}
            style={{ display: 'flex', justifyContent: 'space-around' }}
            value={zoomTool}
          > <Radio value={1}>是</Radio>
            <Radio value={2}>否</Radio>
          </Radio.Group>
        </div>
        <div style={{ display: 'flex', margin: 15 }}>
          <div style={{ width: '50%' }}>是否堆叠</div>
          <Radio.Group
            onChange={(e) => setstack(e.target.value)}
            style={{ display: 'flex', justifyContent: 'space-around' }}
            value={stack}
          > <Radio value={1}>是</Radio>
            <Radio value={2}>否</Radio>
          </Radio.Group>
        </div>
        <div style={{ display: 'flex', margin: 15 }}>
          <div style={{ width: '50%' }}>选择要生成的图表类型</div>
          <Radio.Group
            onChange={(e) => settype(e.target.value)}
            style={{ display: 'flex', justifyContent: 'space-around' }}
            value={type}
          > <Radio value={'line'}>折线图</Radio>
            <Radio value={'bar'}>柱状图</Radio>
          </Radio.Group>
        </div>
      </ProCard>
    </ProCard>
  </div >
}
export default (RenderLineChart)