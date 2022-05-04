import { PageLoading } from '@ant-design/pro-layout';
import { history } from 'umi';
import BasicLayout from '@/layouts';
import { useEffect } from 'react';
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
  useEffect(() => {
    window.location.href = '/home'
  })
  return <BasicLayout {...props} />

}