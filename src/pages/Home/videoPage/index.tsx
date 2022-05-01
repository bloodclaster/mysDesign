import MyCard from "@/components/MyCard"
import { getvidioMessage } from "@/services/home"
import ProCard from "@ant-design/pro-card"
import { PageContainer } from "@ant-design/pro-layout"
import { Button, Spin } from "antd"
import { useEffect, useState } from "react"
import { history } from 'umi';

export default (props) => {
  const [text, settext] = useState('')
  const [loading, setloading] = useState(true)
  const [relatedClass, setrelatedClass] = useState([])
  const [videos, setvideos] = useState([])
  useEffect(() => {
    getvidioMessage(props.location.query.id, {}).then((msg) => {
      settext(msg.data?.text)
      setrelatedClass(msg.data?.relatedClass)
      setvideos(msg.data.videos)
      setloading(false)
    })
  }, [props.location.query.id])
  return (<Spin spinning={loading}>
    <PageContainer
      header={{
        title: <div style={{ paddingLeft: '24px', marginTop: 12, fontSize: 32 }}>{text.className}</div>,
        ghost: true,
        extra: [
          <Button size='small' type='link' onClick={() => {
            history.push('/home')
          }}>
            返回首页
          </Button>
        ]
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
    </PageContainer>
  </Spin>)
}