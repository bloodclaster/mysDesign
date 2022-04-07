
import { useState } from 'react';
import { Modal, Row, Col, Input, Radio, Button, Tooltip } from 'antd';
import { InfoCircleOutlined, UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import styles from './index.less'
const RegisterModal = ({ isModalVisible, setModalVisible }) => {
  const [value, setValue] = useState(1);


  return <div>
    <Button onClick={() => { setModalVisible(true) }} type="primary">注册</Button>
    <Modal
      title="注册"
      visible={isModalVisible}
      onOk={() => {
        // 注册成功后的操作
        setModalVisible(false)
      }}
      onCancel={() => { setModalVisible(false) }}
      cancelText="取消"
      okText='注册'
    >
      <div style={{ display: 'flex' }}>
        <div className={styles.inputStyle}>
          用户名：
        </div>
        <Input size="small" style={{ width: '60%' }}
          placeholder="请输入用户名"
          prefix={<UserOutlined className="site-form-item-icon" />}
          suffix={
            <Tooltip title="用户名的规范@#%¥#¥%¥@@##@#">
              <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          }
        />
      </div>
      <br /><br />
      <div style={{ display: 'flex' }}>
        <div className={styles.inputStyle}>
          密码：
        </div>
        <Input size="small" style={{ width: '60%' }} type='password'
          placeholder="请输入密码"
          prefix={<LockOutlined className="site-form-item-icon" />}
          suffix={
            <Tooltip title="密码的规范@#%¥#¥%¥@@##@#">
              <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          }
        />
      </div>
      <br /><br />
      <div style={{ display: 'flex' }}>
        <div className={styles.inputStyle}>
          重复密码：
        </div>
        <Input size="small" style={{ width: '60%' }} type='password'
          placeholder="请再次确认您的密码"
          prefix={<LockOutlined className="site-form-item-icon" />}
          suffix={
            <Tooltip title="重复确认一次您的密码">
              <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          } />
      </div>
      <br /><br />
      <div style={{ display: 'flex' }}>
        <div className={styles.inputStyle}>
          邮箱：
        </div>
        <Input size="small" style={{ width: '60%' }}
          placeholder="请输入邮箱"
          prefix={<MailOutlined className="site-form-item-icon" />}
          suffix={
            <Tooltip title="邮箱的规范@#%¥#¥%¥@@##@#">
              <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          }
        />
      </div>
      <br /><br />
      <Radio.Group style={{ display: 'flex', justifyContent: 'space-around', width: '70%', marginLeft: '16%' }}
        onChange={e => setValue(e.target.value)} value={value}>
        <Radio value={1}>管理员</Radio>
        <Radio value={2}>学生</Radio>
      </Radio.Group>
      <br /><br />
    </Modal >
  </div >
}
export default RegisterModal;


