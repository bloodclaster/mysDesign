import request from '@/utils/request';

export async function getMessage() {
  return request(`/api/user/message`, {
    method: 'GET'
  })
}

export async function uploadCharts() {
  return request(`/api/file/excel`, {
    method: 'GET'
  })
}

export async function insertHistory(data: any) {
  return request(`/api/insertHistory`, {
    method: 'POST',
    data
  })
}

export async function historyMessage(params: any) {
  return request(`/api/historyMessage`, {
    method: 'GET',
    params
  })
}