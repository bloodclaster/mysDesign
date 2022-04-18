import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { history } from 'umi';
import BasicLayout from '@/layouts';
import { register, login, update } from '../services/user'
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
  return <BasicLayout {...props} />

}