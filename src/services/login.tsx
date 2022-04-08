// import request from '@/utils/request';
import request from 'umi-request';

export async function register(data: {
  email: string,
  head: number,
  // id: number,
  manager: number,
  nickname: string,
  password: string,
}) {
  return request('/api/user/register', {
    method: 'POST',
    data
  });
}

export async function login(data: {
  email: string,
  password: string,
  manager: number
}) {
  return request('/api/user/login', {
    method: 'POST',
    data
  });
}

export async function update(data: {
  email: string,
  head: number,
  nickname: string,
  password: string,
}) {
  return request('/api/user/update', {
    method: 'POST',
    data
  });
}
