import { Avatar, Menu, Upload, message, Button, Table, Pagination } from "antd"
import { useEffect, useState } from "react"
import { Link } from "umi"
import { UserOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons'
import { getMessage } from '@/services/user'
import { downloadFile } from "@/services/video"
import UploadCard from "./comp/UploadCard"
import Info from "./comp/Info"
import BrowseHistory from "./comp/browseHistory"
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
  const [rows, setrows] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 21, 12, 1, 2, 41, 51, 61, 71, 81, 91, 101, 211, 12])
  const [page, setpage] = useState(1)
  const columns = [

  ]
  return (<div>
    <Link style={{ position: 'absolute', marginLeft: '5%', marginTop: '15px' }} to={"/"}>Logo</Link>
    {!login ? <Link
      to={"/login"}
      style={{
        width: '120px',
        textAlign: 'center',
        float: 'right',
        marginTop: '5px',
        marginRight: '3%'
      }}
    >Login</Link> :
      <Link
        to={"/user"}
        style={{
          width: '120px',
          textAlign: 'center',
          float: 'right',
          marginTop: '5px',
          marginRight: '3%'
        }}
      >User</Link>}
    <Menu style={{ width: '60%', marginLeft: '10%' }} selectedKeys={['home']} mode="horizontal" >
      <Item key='home' style={{ width: '120px', textAlign: 'center' }} ><Link to="/home">Home</Link></Item>
      {/* <Item key='111' style={{ width: '120px', textAlign: 'center' }} ><Link to="/">///</Link></Item> */}
      {/* <Item key='222' style={{ width: '120px', textAlign: 'center' }} ><Link to="/">///</Link></Item> */}
    </Menu>
    <div style={{ paddingLeft: '5%', paddingTop: '3%', display: 'flex', width: '90%' }}>
      <Avatar shape="square" size={128} icon={<UserOutlined />} />
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%' }}>
        <div style={{ marginLeft: '50px' }}>
          <span style={{ fontSize: '24px' }}>{userInf && userInf.nickname}</span><br />
          <span style={{ marginLeft: '34px' }}>账号:......</span><br />
          <span style={{ marginLeft: '34px' }}>积分:......</span><br />
        </div>
        {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button style={{ marginLeft: '15px' }}>Antd-1</Button>
          <Button style={{ marginLeft: '15px' }}>Antd-2</Button>
          <Button style={{ marginLeft: '15px' }}>Antd-3</Button>
        </div> */}
      </div>
    </div>
    <div style={{
      width: '94%', height: '540px',
      // backgroundColor: 'yellow',
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
      {value === 'historyupload' && [<div style={{ margin: '12px', display: 'flex' }}>
        <Upload
          name='file'
          action={`http://101.133.144.44:8001/file/insert/ ${2}`}
          headers={{
            token: localStorage.getItem('token'),
          }}
          onRemove={(file) => {
            console.log('remove---', file)
          }}
          multiple={true}
          onChange={(info: any) => {
            if (info.file.status !== 'uploading') {
              console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
              message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
              message.error(`${info.file.name} file upload failed.`);
            }
          }}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        <Button onClick={() => {
          downloadFile({
            address: "/home/file/4aba09143cb3466383946d984486c205.png",
            classId: 0,
            id: 0,
            name: "imgLogin.png",
            uuid: ""
          }).then((message => console.log(message)))
        }}
          icon={<DownloadOutlined />}>点击下载xxxxx
        </Button>
      </div>,
      <div style={{ display: 'flex', flexWrap: 'wrap', height: '380px' }}>
        {rows.slice(12 * (page - 1), 12 * page).map((uid) => <DownloadCard penalStyle={{
          height: "120px", width: "322px", padding: '8px', display: 'flex', paddingBottom: '14px'
        }} uid={uid} title={'这真的是一个标题罢了'} illustrate={'区区说明罢了，无需多问'} />)}
      </div>,
      <Pagination
        style={{ float: 'right', marginRight: '18px' }}
        defaultCurrent={1} total={rows.length}
        defaultPageSize={12} onChange={(page, pageSize) => {
          setpage(page)
        }}
      />
      ]}
      {value === 'upload' && <UploadCard />}
    </div>

  </div >)
}

const DownloadCard = ({ penalStyle, uid, title, illustrate }) => {

  return (<div style={penalStyle} >
    <img src={require('../../../public/img1.png')} style={{ height: '96px', width: '164px' }} />
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ marginLeft: '7px', fontSize: '14px' }}>{title}</div>
      <div style={{ marginLeft: '7px', display: 'flex', flexDirection: 'column', fontSize: '12px', color: '#d4d4d4' }}>
        <div>{uid}:{illustrate}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button size='small' onClick={() => {

          }}>下载</Button>
          <Button size='small' onClick={() => {

          }}>删除</Button>
        </div>
      </div>
    </div>
  </div>)
}