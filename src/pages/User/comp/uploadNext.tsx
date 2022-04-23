import { Button, Input, message, Popconfirm } from 'antd'
import ProCard from '@ant-design/pro-card';
import { useState } from 'react';



export default ({ }) => {
  const N: any = []
  const [name, setname] = useState('')
  const [link, setlink] = useState('')
  const [list, setlist] = useState(N)
  return (<div style={{ margin: '12px' }}>
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