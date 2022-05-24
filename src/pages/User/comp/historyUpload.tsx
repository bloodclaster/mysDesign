import { downloadFile } from "@/services/video";
import { Upload, message, Button, Pagination, Spin, Table, Popconfirm, Radio } from "antd";
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons'
import { memo, useEffect, useState } from "react";
import { uploadHistoryMessage } from '@/services/video'
import { history } from 'umi'
import { deleteClassItem } from "@/services/user";
import MyCard from "@/components/MyCard";

const historyUpload = ({ }) => {
  const N: any = null
  const [page, setpage] = useState(1)
  const [history, sethistory] = useState(N)
  const [loading, setloading] = useState(true)

  const loadHistory = () => {
    setloading(true)
    uploadHistoryMessage({}).then((res) => {
      if (res.data) {
        console.log(res.data)
        sethistory(res.data)
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
    render: () => { return <Radio /> }
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
      {/* {history && [<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', margin: 12 }}>
        {history.slice((page - 1) * 10, page * 10).map((item: any) => {
          return <div>
            <DownloadCard
              loadHistory={loadHistory}
              uid={item.id}
              item={item}
            />
          </div>
        })}
      </div>,
      <Pagination
        style={{ float: 'right', marginRight: '18px' }}
        defaultCurrent={1} total={history.length}
        defaultPageSize={12} onChange={(page, pageSize) => {
          setpage(page)
        }}
      />]} */}
      <Table size='small' columns={column} dataSource={[{
        name: '测试用图1'
      }, {
        name: '测试用图2'
      }, {
        name: '测试用图3'
      }, {
        name: '测试用图4'
      }, {
        name: '测试用图5'
      }, {
        name: '测试用图6'
      }, {
        name: '测试用图7'
      }, {
        name: '测试用图8'
      }]} />
      <div >
        <div style={{ float: 'right' }}>
          <Button style={{ margin: 12 }}>生成报表</Button>
          <Button style={{ margin: 12 }}>生成数据大屏</Button>
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