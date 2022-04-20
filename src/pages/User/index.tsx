import { Avatar, Menu } from "antd"
import { useEffect, useState } from "react"
import { Link } from "umi"
import { UserOutlined } from '@ant-design/icons'
import { getMessage } from '@/services/user'
import UploadCard from "./comp/UploadCard"
import Info from "./comp/Info"
import BrowseHistory from "./comp/browseHistory"
import HistoryUpload from "./comp/historyUpload"
const { Item } = Menu



export default ({ }) => {
  const N: any = null
  const [login, setlogin] = useState(true)
  const [value, setvalue] = useState('set')
  const [userInf, setuserInfo] = useState(N)
  useEffect(() => { getMessage({}).then((message) => { setuserInfo(message.data) }) }, [])
  // getMessage().then((message) => {
  //   console.log(message)
  // })
  return (<div>
    <Link style={{ position: 'absolute', marginLeft: '5%', marginTop: '15px' }} to={"/"}>Logo</Link>
    {!login ? <Link
      to={"/login"}
      style={{ width: '120px', textAlign: 'center', float: 'right', marginTop: '5px', marginRight: '3%' }}
    >Login</Link> :
      <Link
        to={"/user"}
        style={{ width: '120px', textAlign: 'center', float: 'right', marginTop: '5px', marginRight: '3%' }}
      >User</Link>}
    <Menu style={{ width: '60%', marginLeft: '10%' }} selectedKeys={['home']} mode="horizontal" >
      <Item key='home' style={{ width: '120px', textAlign: 'center' }} ><Link to="/home">Home</Link></Item>
    </Menu>
    <div style={{ paddingLeft: '5%', paddingTop: '3%', display: 'flex', width: '90%' }}>
      <Avatar shape="square" size={128} icon={<UserOutlined />} />
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%' }}>
        <div style={{ marginLeft: '50px' }}>
          <span style={{ fontSize: '24px' }}>{userInf && userInf.nickname}</span><br />
          <span style={{ marginLeft: '34px' }}>账号:......</span><br />
          <span style={{ marginLeft: '34px' }}>积分:......</span><br />
        </div>
      </div>
    </div>
    <div style={{
      width: '94%', height: '540px',
      margin: '3%', marginTop: '30px'
    }}>
      <Menu selectedKeys={[value]} style={{ width: '100%', marginTop: '60px' }} mode="horizontal" >
        <Item onClick={() => setvalue('set')} style={{ marginRight: '15px' }} key='set'>账号设置</Item>
        <Item onClick={() => setvalue('download')} style={{ marginRight: '15px' }} key='download'>浏览记录</Item>
        <Item onClick={() => setvalue('historyupload')} style={{ marginRight: '15px' }} key='historyupload'>上传记录</Item>
        <Item onClick={() => setvalue('upload')} style={{ marginRight: '15px' }} key='upload'>我的上传</Item>
      </Menu>
      {value === 'set' && <div style={{ margin: '12px' }}><Info /></div>}
      {value === 'download' && <div style={{ margin: '12px' }}>
        <BrowseHistory />
      </div>}
      {value === 'historyupload' && <HistoryUpload />}
      {value === 'upload' && <UploadCard />}
    </div>

  </div >)
}
