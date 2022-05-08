import React, { useEffect, useState } from 'react';
import 'braft-editor/dist/index.css'
import { Button, Menu } from 'antd';
import { history, Link } from 'umi';
import BraftEditor from 'braft-editor'
import { getclassMessage, getMessage } from '@/services/home';
const BasicLayout = (props) => {

  const [inlogin, setinlogin] = useState(false)
  useEffect(() => {
    getMessage().then((res) => {
      if (res.code === 200) {
        setinlogin(true)
      } else setinlogin(false)
    })
  }, [])
  const { Item } = Menu
  return (<div>
    <div style={{ position: 'absolute', marginLeft: '5%', marginTop: '15px' }}>Logo</div>
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
    <Menu style={{ width: '60%', marginLeft: '10%' }} mode="horizontal">
      <Item style={{ width: '120px', textAlign: 'center' }} ><Link to="/home">Home</Link></Item>
    </Menu>
    <div style={{ marginLeft: '200px' }}>这是一个主页，就很空</div>
  </div>)
}

export default BasicLayout