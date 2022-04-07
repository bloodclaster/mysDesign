import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { history } from 'umi';
import BasicLayout from '@/layouts';
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
  console.log(props)
  return <BasicLayout {...props} />

}