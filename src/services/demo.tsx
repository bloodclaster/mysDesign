import request from '@/utils/request';

export async function getMessage() {
  return request(`/api/user/message`, {
    method: 'GET'
  })
}