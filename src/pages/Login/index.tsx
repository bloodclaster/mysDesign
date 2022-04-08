import { useState } from 'react';
import { Menu, Row, Col, Input, Radio, Button, Popover, PageHeader } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import RegisterModal from './RegisterModal';
import { login } from '@/services/login'
import styles from './index.less'

const { SubMenu, Item } = Menu;
export default (second) => {
  const [current, setcurrent] = useState('frontPage')
  const [value, setValue] = useState(1);
  const [isModalVisible, setModalVisible] = useState(false);
  const [account, setaccount] = useState('')
  const [pwd, setpwd] = useState('')

  const handleClick = (e: { key: any }) => {
    console.log('click ', e);
    setcurrent(e.key)
  };
  return (<div>
    <PageHeader
      onBack={() => null}
      title="课 程 群"
      subTitle="Login in"
      breadcrumb={{}}
      extra={[
        <Popover placement="bottom" content={(<>
          关于我们.jpg<DownOutlined />
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
            src={value === 1 ? require('../../../public/imgLogin.png') : require('../../../public/imgLogin2.png')}
            style={{ textAlign: 'center', width: '200px', height: '200px', margin: '80px 80px 60px 70px' }}
          />
          <br />
          账号：<Input size="small" value={account} style={{ width: '60%' }}
            onChange={e => setaccount(e.target.value)} />
          <br /><br />
          密码：<Input size="small" value={pwd} style={{ width: '60%' }} type='password'
            onChange={e => setpwd(e.target.value)} />
          <br /><br />
          <Radio.Group style={{ display: 'flex', justifyContent: 'space-around', width: '60%', marginLeft: '10%' }}
            onChange={e => setValue(e.target.value)} value={value}>
            <Radio value={1}>管理员</Radio>
            <Radio value={0}>学生</Radio>
          </Radio.Group>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-around', width: '60%', marginLeft: '10%' }}>
            <RegisterModal isModalVisible={isModalVisible} setModalVisible={setModalVisible} />
            <Button onClick={() => {
              if (account && pwd)
                login({
                  email: account,
                  password: pwd,
                  manager: value
                }).then(e => {
                  console.log(e)
                  // 根据返回的东西确定接下来要咋办
                })
            }}>登陆</Button>
          </div>
        </div>
      </Col>
    </Row>
  </div>)
}