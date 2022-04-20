import { getHistoryMessage } from '@/services/video'
import { Button, Input, Row, Col, Spin } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { memo, useEffect, useState } from 'react'



const BrowseHistory = ({ }) => {
  const N: any = null

  const [history, sethistory] = useState(N)
  const [loading, setloading] = useState(true)
  useEffect(() => {
    getHistoryMessage({}).then((res) => {
      console.log(res)
      if (res.data) {
        sethistory(res.data)
        setloading(false)
      }
    })
  }, [])

  return (<div>
    <Spin tip="Loading..." size="large" style={{ width: '100%', height: '100%', marginTop: '60px' }} spinning={loading}>
      {history && <div style={{ paddingLeft: '35px' }}>
        <Row gutter={24}>
          {history.map((item: any) => [
            <Col span={7}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <img style={{ height: '96px', marginBottom: '12px' }} src={require('../../../../public/img1.png')}></img>
                  <div style={{
                    width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                  }}>
                    <div>
                      {item.className}
                    </div>
                    <div>
                      <div style={{ float: 'right', fontSize: '12px', color: '#d4d4d4', paddingBottom: '11px' }}>{item.introduction}</div>
                    </div>
                  </div>
                </div>

              </div>
            </Col>,
            <Col span={1}></Col>])}
        </Row>
      </div>}
    </Spin >
  </div >)
}

export default memo(BrowseHistory)