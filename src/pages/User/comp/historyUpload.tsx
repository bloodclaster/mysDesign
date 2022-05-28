import { downloadFile } from "@/services/video";
import { Upload, message, Button, Pagination, Spin, Table, Popconfirm, Radio, Checkbox } from "antd";
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons'
import { memo, useEffect, useState } from "react";
import { uploadHistoryMessage } from '@/services/video'
import { history } from 'umi'
import { deleteClassItem } from "@/services/user";
import MyCard from "@/components/MyCard";

const historyUpload = ({ }) => {
  const N: any = null
  const [page, setpage] = useState(1)
  const [historys, sethistorys] = useState(N)
  const [loading, setloading] = useState(true)
  const [list, setlist] = useState([])

  const loadHistory = () => {
    setloading(true)
    uploadHistoryMessage({}).then((res) => {
      if (res.data) {
        console.log(res.data)
        sethistorys(res.data)
        setloading(false)
      } else {
        message.error(res.message)
        setloading(false)
      }
    })
  }
  useEffect(() => {
    loadHistory()
  }, [])

  const column = [{
    title: '选择',
    // fixed: 'left',
    width: '90px',
    dataIndex: 'id',
    render: (text: any, record: any, index: any) => {
      return <Checkbox
        onChange={(e) => {
          console.log(list, e.target.value)
          if (e.target.checked)
            setlist([...list, e.target.value])
          else
            setlist(list.filter(id => id !== text))
        }} key={text} value={text} />
    }
  }, {
    title: '名称',
    dataIndex: 'name'
  }, {
    title: '操作', width: '150px', dataIndex: 'operate',
    render: (text: any, obj: any) => {
      return [
        <a style={{ marginLeft: '8px' }} onClick={() => {
        }}>修改</a>,
        <Popconfirm title={`是否确实删除`}
          onConfirm={() => {

          }}>
          <a style={{ marginLeft: '8px' }} >删除</a>
        </Popconfirm>
      ]
    }
  }]

  return (
    <Spin tip="Loading..." size="large" style={{ width: '100%', height: '100%', marginTop: '60px' }} spinning={loading}>
      <Table size='small' columns={column} dataSource={[{
        name: '测试用图1',
        id: '001'
      }, {
        name: '测试用图2',
        id: '002'
      }, {
        name: '测试用图3',
        id: '003'
      }, {
        name: '测试用图4',
        id: '004'
      }, {
        name: '测试用图5',
        id: '005'
      }, {
        name: '测试用图6',
        id: '006'
      }, {
        name: '测试用图7',
        id: '007'
      }, {
        name: '测试用图8',
        id: '008'
      }]} />
      <div >
        <div style={{ float: 'right' }}>
          <Button onClick={() => {
            history.push(`/history?list=${list}`)
          }} style={{ margin: 12 }}>生成报表</Button>
          <Button onClick={() => {

          }} style={{ margin: 12 }}>生成数据大屏</Button>
        </div>
      </div>
    </Spin >
  )
}

const DownloadCard = ({ uid, loadHistory, item }) => {
  return (<div style={{
    display: 'flex',
    flexDirection: 'column'
  }}  >
    <div>
      <MyCard {...item} style={{ marginLeft: '24px' }} />
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: -12 }}>
      <Button type='ghost' size='small' onClick={() => {
        history.push(`/home/editor?id=${uid}`)
      }}>修改</Button>
      <Button type='ghost' size='small' onClick={() => {
        deleteClassItem(uid).then(res => {
          if (res.code === 200) {
            message.success('删除成功')
            loadHistory()
          } else {
            message.error(res.message)
          }
        })
      }}>删除</Button>
    </div>
  </div>)
}
export default memo(historyUpload)