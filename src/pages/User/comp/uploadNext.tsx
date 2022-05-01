import { Button, Input, message, Popconfirm, Upload, Table } from 'antd'
import ProCard from '@ant-design/pro-card';
import { memo, useEffect, useState } from 'react';
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons'
import { deleteField, deleteVideo, insertVideo } from '@/services/video';
import { checkClassItem } from '@/services/user';
import TabPane from '@ant-design/pro-card/lib/components/TabPane';

const uploadNext = ({ id }) => {
  const N: any = []
  const [name, setname] = useState('')
  const [link, setlink] = useState('')
  const [list, setlist] = useState(N)
  const [files, setfiles] = useState(N)
  const loadTable = () => checkClassItem(id).then((res) => {
    if (res.code === 200) {
      setfiles(res.data.files)
      setlist(res.data.videos)
    } else message.error(res.message)
  })
  useEffect(() => {
    loadTable()
  }, [])
  return (<div style={{ margin: '12px' }}>
    <Upload
      name='file'
      action={`http://101.133.144.44:8001/file/insert/ ${id}`}
      headers={{ token: localStorage.getItem('token') }}
      multiple={true}
      showUploadList={false}
      onChange={(info: any) => {
        loadTable()
        if (info.file.status === 'done') {
          message.success(`文件${info.file.name} 上传成功！`);
        } else if (info.file.status === 'error') {
          message.error(`文件${info.file.name} 上传失败`);
        }
      }}
    >
      <Button size='small' style={{ marginBottom: '12px' }} icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
    {files[0] && <Table
      size='small'
      columns={[{
        title: '文件名',
        dataIndex: 'name'
      }, {
        title: '操作',
        dataIndex: 'id',
        render: (value: any, record: any, index: number) => {
          return <Popconfirm
            title='是否确认删除'
            okText="是"
            cancelText="取消"
            onConfirm={() => {
              deleteField({
                id: record.id,
                classId: record.classId,
                address: record.address,
                name: '',
                uuid: ''
              }).then((res) => {
                if (res.code === 200) {
                  message.success('删除成功')
                } else
                  message.error(res.message)
                loadTable()
              })
            }}
          >
            <Button danger size='small' type='link'>删除</Button>
          </Popconfirm>
        }
      }]}
      dataSource={files}
    />}
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
          insertVideo({
            classId: id,
            name,
            video: link
          }).then((res) => {
            if (res.code === 200) {
              let id = res.data.id
              setlist([...list, {
                name, link, id
              }])
              setname('')
              setlink('')
            } else
              message.error(res.message)
          })
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
            deleteVideo({
              id: item.id,
              classId: id
            }).then((res) => {
              if (res.code === 200) {
                setlist(list.map((item: any, i: number) => {
                  if (i === index) return
                  else return item
                }).filter(Boolean))
              } else
                message.error(res.message)
            })
          }}
        >
          <Button
            danger size='small' style={{ marginTop: '45px' }}>删除</Button>
        </Popconfirm>
      </div>)
    }
  </div>)
}
export default memo(uploadNext)