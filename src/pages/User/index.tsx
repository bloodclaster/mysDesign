import { Avatar, Button, Input, Menu, message, Modal, Select } from "antd"
import { useEffect, useState } from "react"
import { Link } from "umi"
import { UserOutlined } from '@ant-design/icons'
import { getMessage, updateNOH } from '@/services/user'
import Upload from "./upload"
import Info from "./comp/Info"
import BrowseHistory from "./comp/browseHistory"
import HistoryUpload from "./comp/historyUpload"
import Header from "../Header"
import { imgList } from "../data"
const { Item } = Menu

export default ({ }) => {
  const N: any = null
  const [value, setvalue] = useState('set')
  const [userInf, setuserInfo] = useState(N)
  const [visible, setvisible] = useState(false)
  const [head, sethead] = useState(N)
  const [name, setname] = useState(N)
  const loadInfo = () => {
    getMessage({}).then((message) => {
      setuserInfo(message.data)
      sethead(message.data.head)
      setname(message.data.nickname)
    })
  }
  useEffect(() => {
    loadInfo()
  }, [])
  return (<div>
    <Header title={``} />
    <div style={{ paddingLeft: '5%', paddingTop: '3%', display: 'flex', width: '90%' }}>
      <Avatar src={userInf && imgList[userInf.head]} shape="square" size={128} icon={<UserOutlined />} />
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%' }}>
        <div style={{ marginLeft: '50px' }}>
          <span style={{ fontSize: '24px' }}>{userInf && userInf.nickname}</span><br />
          <span style={{ marginLeft: '34px' }}>邮箱:{userInf && userInf.email}</span><br />
          <span style={{ marginLeft: '34px' }}> </span><br /><br />
          {userInf && <Button size='small' onClick={() => {
            setvisible(true)
            sethead(userInf.head)
            setname(userInf.nickname)
          }} style={{ marginLeft: '34px' }}>
            修改用户名及头像</Button>}<Button danger size='small' onClick={() => {
            }} style={{ marginLeft: '34px' }}>
            退出登录</Button>
        </div>
      </div>
    </div>
    <div style={{
      width: '94%', height: '540px',
      margin: '3%', marginTop: '30px'
    }}>
      <Menu selectedKeys={[value]} style={{ width: '100%', marginTop: '60px' }} mode="horizontal" >
        <Item onClick={() => setvalue('set')} style={{ marginRight: '15px' }} key='set'>账号设置</Item>
        {/* <Item onClick={() => setvalue('download')} style={{ marginRight: '15px' }} key='download'>浏览记录</Item> */}
        <Item onClick={() => setvalue('historyupload')} style={{ marginRight: '15px' }} key='historyupload'>上传记录</Item>
      </Menu>
      {value === 'set' && <div style={{ margin: '12px' }}><Info /></div>}
      {value === 'download' && <div style={{ margin: '12px' }}><BrowseHistory /></div>}
      {value === 'historyupload' && <HistoryUpload />}
    </div>
    <Modal destroyOnClose title="修改用户名及头像"
      onOk={() => {
        // *****
        updateNOH({
          nickname: name,
          head,
          email: "",
          id: '',
          manager: '',
          password: ""

        }).then((res) => {
          if (res.code === 200) {
            setTimeout(() => loadInfo(), 200)
            setvisible(false)
          } else message.error(res.message)
        })

      }}
      onCancel={() => setvisible(false)}
      visible={visible}>
      <div style={{ display: 'flex' }}>
        <Avatar src={userInf && imgList[head]} shape="square" size={128} icon={<UserOutlined />} />
        <div style={{ marginLeft: '34px' }} >
          昵称：<br />
          <Input size='small' onChange={e => { setname(e.target.value) }} value={name} />
          <br />
          <br />
          <br />
          头像：
          {imgList.map((img, index) => <img
            style={{ width: 25, height: 25, borderRadius: '50%', margin: 2, marginTop: 0 }}
            src={imgList[index]}
            onClick={() => {
              sethead(index)
            }}
            key={index} />)}
        </div>
      </div>
    </Modal>
  </div >)
}
