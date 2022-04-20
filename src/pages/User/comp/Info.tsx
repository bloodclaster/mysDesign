import { getMessage, update } from '@/services/user'
import { Button, Input } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { memo, useEffect, useState } from 'react'



const Info = ({ }) => {
  const N: any = null
  const [userInf, setuserInfo] = useState(N)
  const [psw, setpsw] = useState('')
  const [repsw, setrepsw] = useState(N)
  const [name, setname] = useState(N)

  useEffect(() => {
    getMessage({}).then((message) => {
      setuserInfo(message.data)
      setname(message.data?.nickname)
    })
  }, [])

  return (<div>
    请输入修改后的名称：<Input defaultValue={userInf && userInf.nickname} style={{ width: '345px' }} value={name} onChange={(e) => { setname(e.target.value) }} />
    <br />
    <br />
    请输入修改前的密码：<Input.Password
      iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      style={{ width: '345px' }} value={psw} onChange={(e) => { setpsw(e.target.value) }} />
    <br />
    <br />
    请输入修改后的密码：<Input.Password
      iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      style={{ width: '345px' }} value={repsw} onChange={(e) => { setrepsw(e.target.value) }} />
    <br />
    <br />
    <div style={{ width: '345px' }}>
      <Button
        style={{ marginLeft: '140px' }}
        onClick={(e) => {
          if (psw && repsw && name)
            update({
              email: psw,// 这玩意是对的，某人懒得改罢了
              head: 0,
              nickname: name,
              password: repsw,
            })
        }}>确认</Button>
    </div>
  </div>)
}

export default memo(Info)