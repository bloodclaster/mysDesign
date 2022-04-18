import request from '@/utils/request';

export async function getMessage() {
  return request(`/api/user/message`, {
    method: 'GET'
  })
}

export async function getclassMessage(params: any) {
  return request(`/api/classMessage`, {
    method: 'GET',
    params
  })
}

export async function getvidioMessage(id: any, params: any) {
  return request(`/api/class/selectClassItemById/${id}`, {
    method: 'GET',
    params
  })
}