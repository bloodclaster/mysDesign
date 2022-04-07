import request from '@/utils/request';

export async function register(data: {
  email: string,
  head: number,
  id: number,
  manager: number,
  nickname: string,
  password: string,
}) {
  return request('/user/register', {
    method: 'POST',
    data
  });
}

export async function login(data: {
  email: string,
  password: string,
}) {
  return request('/user/login', {
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
  return request('/user/update', {
    method: 'POST',
    data
  });
}
