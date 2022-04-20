import { downloadFile } from "@/services/video";
import { Upload, message, Button, Pagination, Spin } from "antd";
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons'
import { memo, useEffect, useState } from "react";
import { uploadHistoryMessage } from '@/services/video'

const historyUpload = ({ }) => {
  const N: any = null
  const [page, setpage] = useState(1)
  const [history, sethistory] = useState(N)
  const [loading, setloading] = useState(true)

  useEffect(() => {
    uploadHistoryMessage({}).then((res) => {
      if (res.data) {
        console.log(res.data)
        sethistory(res.data)
        setloading(false)
      }
    })
  }, [])

  return (
    <Spin tip="Loading..." size="large" style={{ width: '100%', height: '100%', marginTop: '60px' }} spinning={loading}>
      <div style={{ margin: '12px', display: 'flex' }}>
        <Upload
          name='file'
          action={`http://101.133.144.44:8001/file/insert/ ${2}`}
          headers={{ token: localStorage.getItem('token'), }}
          onRemove={(file) => {
            console.log('remove---', file)
          }}
          multiple={true}
          onChange={(info: any) => {
            if (info.file.status !== 'uploading') {
              console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
              message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
              message.error(`${info.file.name} file upload failed.`);
            }
          }}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        <Button onClick={() => {
          downloadFile({
            address: "/home/file/4aba09143cb3466383946d984486c205.png",
            classId: 0,
            id: 0,
            name: "imgLogin.png",
            uuid: ""
          }).then((message => console.log(message)))
        }}
          icon={<DownloadOutlined />}>点击下载xxxxx
        </Button>
      </div>
      {history && [<div style={{ display: 'flex', flexWrap: 'wrap', height: '380px' }}>
        {history.map((item: any) => {
          return <div>
            <DownloadCard
              penalStyle={{ height: "120px", width: "322px", padding: '8px', display: 'flex', paddingBottom: '14px' }}
              uid={item.uid}
              title={item.className}
              illustrate={item.introduction}
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
      />]}
    </Spin>
  )
}

const DownloadCard = ({ penalStyle, uid, title, illustrate }) => {
  return (<div style={penalStyle} >
    <img src={require('../../../../public/img1.png')} style={{ height: '96px', width: '164px' }} />
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
      <div style={{ marginLeft: '7px', fontSize: '14px' }}>{title}</div>
      <div style={{ marginLeft: '7px', display: 'flex', flexDirection: 'column', fontSize: '12px', color: '#d4d4d4' }}>
        <div>{uid}:{illustrate}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button size='small' onClick={() => {

          }}>修改</Button>
          <Button size='small' onClick={() => {

          }}>删除</Button>
        </div>
      </div>
    </div>
  </div>)
}
export default memo(historyUpload)