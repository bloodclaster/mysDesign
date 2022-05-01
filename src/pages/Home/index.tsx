import { history, Link } from 'umi';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { getMessage, getclassMessage, getvidioMessage } from "@/services/home"
import { Avatar, Button, Menu, Row, Col } from 'antd';
import { memo, useEffect, useState } from "react";
import MyCard from '@/components/MyCard';
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
    {message.map((msg: any) => [
      <div style={{ marginLeft: '10%', marginTop: '1%' }}>
        {msg.name}
      </div>,
      <div style={{ display: 'flex', marginLeft: '9%', width: "82%", flexDirection: 'row', flexWrap: 'wrap' }}>
        {msg.data.map((item: any) =>
          <MyCard
            imgUrl={imgBox[2]}
            {...item}
          />
        )}
      </div>
    ])}
  </div >)
}

export default memo(Home)