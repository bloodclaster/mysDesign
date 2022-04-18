import { getHistoryMessage } from '@/services/video'
import { Button, Input, Row, Col } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { memo, useEffect, useState } from 'react'



const BrowseHistory = ({ }) => {
  const N: any = null

  const [history, sethistory] = useState(N)
  useEffect(() => {
    getHistoryMessage({}).then((res) => {
      console.log(res)
      sethistory(res.data)
    })
  }, [])

  return (<div>
    <Row gutter={24}>
      <Col span={0.3}></Col>
      <Col span={10}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <img style={{ height: '96px' }} src={require('../../../../public/img1.png')}></img>
            <div>
              22
            </div>
          </div>
          <div style={{}}>
            111
          </div>
        </div>
      </Col>
      <Col span={1}></Col>
      <Col span={10}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <img style={{ height: '96px' }} src={require('../../../../public/img1.png')}></img>
          <div style={{}}>
            111
          </div>
        </div>
      </Col>
    </Row>
  </div>)
}

export default memo(BrowseHistory)