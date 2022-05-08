import { getMessage } from "@/services/home"
import { Menu } from "antd"
import { useEffect, useState } from "react"
import { Link } from "umi"
import { imgList } from "../data"
export default ({ title }) => {

  const [inlogin, setinlogin] = useState(false)
  const [userMsg, setmas] = useState(null)
  useEffect(() => {
    getMessage().then((res) => {
      if (res.code === 200) {
        setinlogin(true)
        setmas(res.data)
      } else setinlogin(false)
    })
  }, [])
  return (<div>
    <div style={{ position: 'absolute', marginLeft: '1%', marginTop: '7px', fontSize: '20px' }}>{title}</div>
    {!inlogin ? <Link
      to={"/login"}
      style={{
        width: '120px',
        textAlign: 'center',
        float: 'right',
        marginTop: '15px',
        marginRight: '3%'
      }}
    >Login</Link> : [<Link
      to={"/user"}
      style={{
        width: '120px',
        textAlign: 'center',
        float: 'right',
        marginTop: '15px',
        marginRight: '3%'
      }}
    >
      {/* 缺个头像 */}
      {userMsg && <img style={{ width: 25, height: 25, borderRadius: '50%', marginRight: 3, marginTop: -2 }} src={imgList[userMsg.head]} />}
      {userMsg && userMsg.nickname}</Link>,
    inlogin && <Link
      to={"/home/upload"}
      style={{
        width: '120px',
        textAlign: 'center',
        float: 'right',
        marginTop: '15px',
        marginRight: '3%'
      }}
    >Upload</Link>]}
    <Menu style={{ width: '67%', marginLeft: '10%' }} mode="horizontal">
      <Menu.Item style={{ width: '120px', textAlign: 'center' }} ><Link to="/home">Home</Link></Menu.Item>
    </Menu>
  </div>)
}