import MyCard from "@/components/MyCard"
import Header from "@/pages/Header"
import { getclassMessage, getMessage, getvidioMessage } from "@/services/home"
import { deleteField, downloadFile } from "@/services/video"
import ProCard from "@ant-design/pro-card"
import { PageContainer } from "@ant-design/pro-layout"
import { Button, message, Popconfirm, Spin, Table } from "antd"
import { useEffect, useState } from "react"
import { history } from 'umi';

export default (props) => {
  const [text, settext] = useState('')
  const [loading, setloading] = useState(true)
  const [relatedClass, setrelatedClass] = useState([])
  const [videos, setvideos] = useState([])
  const [files, setfiles] = useState([])
  useEffect(() => {
    loadTable()
  }, [props.location.query.id])
  const loadTable = () => getvidioMessage(props.location.query.id, {}).then((msg) => {
    if (msg.code === 200) {
      settext(msg.data?.text)
      setrelatedClass(msg.data?.relatedClass)
      setvideos(msg.data.videos)
      setfiles(msg.data.files)
      setloading(false)
    } else message.error(res.message)
  })
  return (<Spin spinning={loading}>
    <Header title={``} />
    <PageContainer
      header={{
        title: <div style={{ paddingLeft: '24px', marginTop: 12, fontSize: 32, zIndex: 2, paddingBottom: 2 }}>{text.className}</div>,
        ghost: true
      }}
      tabBarExtraContent={<div style={{ paddingRight: '24px', color: '#949494' }}>
        {text.introduction}
      </div>}
    >
      <ProCard direction="column" ghost gutter={[0, 16]} style={{ padding: 24 }}>
        {text && <div id='id' dangerouslySetInnerHTML={{ __html: text.text }}></div>}
      </ProCard>
      {relatedClass[0] && <ProCard direction="column" ghost gutter={[0, 16]} style={{ padding: 24 }}>
        <div>相关课程：</div>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {relatedClass.map(item => <MyCard {...item} />)}
        </div>
      </ProCard>}
      {videos[0] && <ProCard direction="column" ghost gutter={[0, 16]} style={{ padding: 24 }}>
        <div>相关外链：</div>
        {videos.map((item: any) => <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          <ProCard style={{ maxWidth: 300, margin: '12px', height: '58px' }} onClick={() => {
            window.open(item.video)
          }} hoverable bordered>
            {item.name}
          </ProCard>
        </div>)}
      </ProCard>}
      {files[0] && <ProCard direction="column" ghost gutter={[0, 16]} style={{ padding: 24 }}>
        <div>相关文件：</div>
        <Table
          size='small'
          columns={[{
            title: '文件名',
            dataIndex: 'name'
          }, {
            title: '操作',
            dataIndex: 'id',
            render: (value: any, record: any, index: number) => {
              return <Button size='small' onClick={() => {
                downloadFile({
                  id: record.id,
                  classId: record.classId,
                  address: record.address,
                  name: record.name,
                  uuid: record.uuid
                })
              }} type='link'>下载</Button>
            }
          }]}
          dataSource={files}
        />
      </ProCard>}
    </PageContainer>
  </Spin>)
}