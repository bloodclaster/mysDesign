import { useState } from 'react';
import { Modal, Row, Col, Input, Radio, Button, Tooltip, Avatar } from 'antd';
import { InfoCircleOutlined, UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import styles from './index.less'
import { register } from '@/services/user'

const RegisterModal = ({ isModalVisible, setModalVisible }) => {
  const [value, setValue] = useState(1);
  const [account, setaccount] = useState('')
  const [pwd, setpwd] = useState('')
  const [repwd, setrepwd] = useState('')
  const [email, setemail] = useState('')

  return (<div>
    <Button onClick={() => { setModalVisible(true) }} type="primary">注册</Button>
    <Modal
      title="注册"
      visible={isModalVisible}
      onOk={() => {
        if (account && pwd && pwd === repwd && email) {
          register({
            email: email + '.com',
            head: 0,//还没写.jpg
            manager: value,
            nickname: account,
            password: pwd,
          }).then(e => {
            console.log(e)
            // 后续。。。。。
          })
        }
        setModalVisible(false)
      }}
      onCancel={() => { setModalVisible(false) }}
      cancelText="取消"
      okText='注册'
    >
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Avatar size={64} icon={<UserOutlined />} />
      </div>
      <br />
      <div style={{ display: 'flex' }}>
        <div className={styles.inputStyle}>
          用户名：
        </div>
        <Input allowClear size="small" style={{ width: '60%' }} value={account}
          placeholder="请输入用户名"
          prefix={<UserOutlined className="site-form-item-icon" />}
          suffix={
            <Tooltip title="用户名的规范@#%¥#¥%¥@@##@#">
              <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          }
          onChange={e => setaccount(e.target.value)}
        />
      </div>
      <br /><br />
      <div style={{ display: 'flex' }}>
        <div className={styles.inputStyle}>
          密码：
        </div>
        <Input allowClear size="small" style={{ width: '60%' }} type='password' value={pwd}
          placeholder="请输入密码"
          prefix={<LockOutlined className="site-form-item-icon" />}
          suffix={
            <Tooltip title="密码的规范@#%¥#¥%¥@@##@#">
              <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          }
          onChange={e => setpwd(e.target.value)}
        />
      </div>
      <br /><br />
      <div style={{ display: 'flex' }}>
        <div className={styles.inputStyle}>
          重复密码：
        </div>
        <Input allowClear size="small" style={{ width: '60%' }} type='password' value={repwd}
          placeholder="请再次确认您的密码"
          prefix={<LockOutlined className="site-form-item-icon" />}
          suffix={
            <Tooltip title="重复确认一次您的密码">
              <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          }
          onChange={e => setrepwd(e.target.value)}
        />
      </div>
      <br /><br />
      <div style={{ display: 'flex' }}>
        <div className={styles.inputStyle}>
          邮箱：
        </div>
        <Input allowClear size="small" style={{ width: '60%' }} value={email}
          placeholder="请输入邮箱"
          prefix={<MailOutlined className="site-form-item-icon" />}
          addonAfter=".com"
          suffix={
            <Tooltip title="邮箱的规范@#%¥#¥%¥@@##@#">
              <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          }
          onChange={e => setemail(e.target.value)}
        />
      </div>
      <br /><br />
      <Radio.Group style={{ display: 'flex', justifyContent: 'space-around', width: '70%', marginLeft: '16%' }}
        onChange={e => setValue(e.target.value)} value={value}>
        <Radio value={1}>管理员</Radio>
        <Radio value={0}>学生</Radio>
      </Radio.Group>
      <br /><br />
    </Modal >
  </div >)
}
export default RegisterModal;


