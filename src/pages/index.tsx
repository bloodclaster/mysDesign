import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { history } from 'umi';
import BasicLayout from '@/layouts';
import { register } from '../services/login'
const loginPath = '/user/login';

export const initialStateConfig = {
  loading: <PageLoading />,
};


export async function getInitialState() {
  if (history.location.pathname !== loginPath) {
    return {
      settings: {},
    };
  }
  return {
    settings: {},
  };
}

export default (props) => {
  // console.log(props)
  register({
    "email": "123@qq.com",
    "head": 0,
    "id": 0,
    "manager": 0,
    "nickname": "测试，密码为123",
    "password": "123"
  }).then((e) => {
      console.log(e)
    })
  return <BasicLayout {...props} />

}