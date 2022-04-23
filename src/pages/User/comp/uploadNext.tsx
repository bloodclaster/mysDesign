import { Button, Input, message, Popconfirm, Upload } from 'antd'
import ProCard from '@ant-design/pro-card';
import { useState } from 'react';
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons'


export default ({ }) => {
  const N: any = []
  const [name, setname] = useState('')
  const [link, setlink] = useState('')
  const [list, setlist] = useState(N)
  return (<div style={{ margin: '12px' }}>
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
    <div style={{ marginTop: '12px' }}>外链名称:</div>
    <Input size='small' value={name} style={{ margin: '12px', width: '285px' }} onChange={(e: any) => {
      setname(e.target.value)
    }} />
    <div style={{ marginTop: '12px' }}>外链链接:</div>
    <Input size='small' value={link} style={{ margin: '12px', width: '325px' }} onChange={(e: any) => {
      setlink(e.target.value)
    }} />
    <Button size='small' onClick={() => {
      if (list.length > 4)
        message.warning('最多上传五个外链')
      else
        if (name && link) {
          setlist([...list, {
            name, link
          }])
          setname('')
          setlink('')
        }
        else
          message.warning('请确保名称或链接不为空')
    }} style={{ margin: '12px' }}>
      添加
    </Button>
    <br />
    {
      list.map((item: any, index: number) => <div style={{ display: 'flex' }}>
        <ProCard style={{ maxWidth: 300, margin: '12px', height: '58px' }} onClick={() => {
          window.open(item.link)
        }} hoverable bordered>
          {item.name}
        </ProCard>
        <Popconfirm
          title='是否确认删除'
          okText="是"
          cancelText="取消"
          onConfirm={() => {
            setlist(list.map((item: any, i: number) => {
              if (i === index) return
              else return item
            }).filter(Boolean))
          }}
        >
          <Button
            danger size='small' style={{ marginTop: '45px' }}>删除</Button></Popconfirm>
      </div>)
    }
  </div>)
}