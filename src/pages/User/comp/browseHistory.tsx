import { getHistoryMessage } from '@/services/video'
import { Button, Input, Row, Col, Spin, Pagination } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { memo, useEffect, useState } from 'react'
import MyCard from '@/components/MyCard';


const BrowseHistory = ({ }) => {
  const N: any = null

  const [history, sethistory] = useState(N)
  const [page, setpage] = useState(1)
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
      {history &&
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', margin: 12 }}>
          {history.slice((page - 1) * 10, page * 10).map((item: any) => <MyCard {...item} style={{ marginLeft: '24px' }} />)}
        </div>}
      {history && <Pagination
        style={{ float: 'right', marginRight: '18px' }}
        defaultCurrent={1} total={history.length}
        defaultPageSize={10} onChange={(page, pageSize) => {
          setpage(page)
        }}
      />}
    </Spin >
  </div >)
}

export default memo(BrowseHistory)