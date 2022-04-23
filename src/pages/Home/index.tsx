import { history, Link } from 'umi';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { getMessage, getclassMessage, getvidioMessage } from "@/services/home"
import { Card, Avatar, Button, Menu, Row, Col } from 'antd';
import { memo, useEffect, useState } from "react";
const { Meta } = Card;
const { Item } = Menu

const Home = ({ }) => {
  const N: any = null
  const [message, setmessage] = useState(N)
  const [inlogin, setinlogin] = useState(false)
  useEffect(() => {
    getclassMessage({}).then((res) => {
      if (res.code === 200) {
        let result: any = []
        for (let key in res.data) {
          result.push({ name: key, data: res.data[key] })
        }
        setmessage(result)
        setinlogin(true)
      }
    })
  }, [])

  const [login, setlogin] = useState(true)
  const imgBox = [
    require('../../../public/img1.png'),
    require('../../../public/imgLogin.png'),
    require('../../../public/img2.jpeg'),
    require('../../../public/imgLogin2.png')
  ]
  return message && (<div>
    <Link style={{ position: 'absolute', marginLeft: '5%', marginTop: '15px' }} to={"/"}>Logo</Link>
    {!inlogin ? <Link
      to={"/login"}
      style={{
        width: '120px',
        textAlign: 'center',
        float: 'right',
        marginTop: '5px',
        marginRight: '3%'
      }}
    >Login</Link> : [<Link
      to={"/user"}
      style={{
        width: '120px',
        textAlign: 'center',
        float: 'right',
        marginTop: '5px',
        marginRight: '3%'
      }}
    >User</Link>, <Link
      to={"/home/upload"}
      style={{
        width: '120px',
        textAlign: 'center',
        float: 'right',
        marginTop: '5px',
        marginRight: '3%'
      }}
    >Upload</Link>]}
    <Menu style={{ width: '60%', marginLeft: '10%' }} selectedKeys={['home']} mode="horizontal" >
      <Item key='home' style={{ width: '120px', textAlign: 'center' }} ><Link to="/home">Home</Link></Item>
    </Menu>
    {message.map((msg: any) => [<div style={{ marginLeft: '10%', marginTop: '1%' }}>
      {msg.name}
    </div>, <Row gutter={[24, 24]} style={{ marginLeft: '12%', marginTop: '40px', width: '84%' }}>
      {msg.data.map((item: any) => <Col xs={12} sm={8} md={8} lg={8} xl={5} xxl={5}>
        <RenderCard
          imgUrl={imgBox[2]}
          {...item}
        />
      </Col>)}
    </Row >])}
  </div >)
}

const RenderCard = ({ imgUrl, className, head, nickname, introduction, id }) => {
  return <Card
    cover={
      <img
        alt="example"
        src={imgUrl}
        onClick={() => {
          history.push(`/home/video?id=${id}`)
        }}
      // style={{ height: '140px', width: '190px' }}
      />
    }
    actions={[
      // <EditOutlined key="edit" />,
      // <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      // avatar={<Avatar size={32} src={require('../../../public/imgLogin.png')} />}
      title={className}
      description={<div style={{ float: 'right', fontSize: 10 }}>{introduction || '这个人很懒没写介绍'}</div>}
    />
  </Card >
}

export default memo(Home)