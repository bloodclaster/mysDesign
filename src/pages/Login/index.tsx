import { useState } from 'react';
import { Menu, Row, Col, Input, Radio, Button, Popover, PageHeader, Tooltip, message } from 'antd';
import { DownOutlined, InfoCircleOutlined } from '@ant-design/icons';
import RegisterModal from './RegisterModal';
import { login } from '@/services/user'
import styles from './index.less'
import { history } from 'umi';

const { SubMenu, Item } = Menu;
export default (second) => {
  const [current, setcurrent] = useState('frontPage')
  const [isModalVisible, setModalVisible] = useState(false);
  const [account, setaccount] = useState('')
  const [pwd, setpwd] = useState('')

  const handleClick = (e: { key: any }) => {
    console.log('click ', e);
    setcurrent(e.key)
  };
  return (<div>
    <PageHeader
      title="课 程 群"
      subTitle="Login in"
      breadcrumb={{}}
      onBack={() => window.history.back()}
      extra={[
        <Popover placement="bottom" content={(<>
          关于我们.jpg
        </>)}>
          <Button type="link">About us / 关于我们<DownOutlined /></Button>
        </Popover>
      ]}
    />
    <div ></div>
    <Row gutter={24}>
      <Col span={16} order={1}>
        <div style={{
          // backgroundColor: 'yellow',
          width: '100%', height: '600px'
        }}></div>
      </Col>
      <Col span={8} order={2}>
        <div style={{ width: '100%', height: '600px', marginLeft: '10%' }}>
          <img
            src={require('../../../public/imgLogin2.png')}
            style={{ textAlign: 'center', width: '200px', height: '200px', margin: '80px 80px 60px 70px' }}
          />
          <br />
          邮箱：<Input size="small" value={account} style={{ width: '60%' }} allowClear
            onChange={e => setaccount(e.target.value)}
            suffix={
              <Tooltip title={`测试邮箱：32151@qq.com\n密码：123`}>
                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
              </Tooltip>
            }
          />
          <br /><br />
          密码：<Input size="small" value={pwd} style={{ width: '60%' }} type='password' allowClear
            onChange={e => setpwd(e.target.value)} />
          <br /><br />
          <div style={{ display: 'flex', justifyContent: 'space-around', width: '60%', marginLeft: '10%' }}>
            <RegisterModal isModalVisible={isModalVisible} setModalVisible={setModalVisible} />
            <Button onClick={() => {
              if (account && pwd)
                login({
                  email: account,
                  password: pwd
                }).then(e => {
                  console.log(e)
                  if (e.code === 200) {
                    console.log(history)
                    localStorage.setItem('token', e.data)
                    history.push('/home');
                  }
                  else {
                    message.warning(e.message)
                  }
                })
            }}>登陆</Button>
          </div>
        </div>
      </Col>
    </Row>
  </div >)
}