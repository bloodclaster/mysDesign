import request from '@/utils/request';

//  插入
export function insertVideo(data: any) {
  return request(`/api/video/insert`, {
    method: 'POST',
    data
  })
}
//  查询
export function selectVideo(id: any) {
  return request(`/api/video/selectVideo/${id}`, {
    method: 'POST',
  })
}
//  删除
export function deleteVideo(data: any) {
  return request(`/api/video/delVideo`, {
    method: 'POST',
    data
  })
}
export function deleteField(data: any) {
  return request(`/api/file/delFile`, {
    method: 'POST',
    data
  })
}
// 文件下载
// file / downloadFile
/**
 * {
    "address": "/home/file/b8254f789580425e9ced748f8a207710.psd",
    "classId": 0,
    "id": 0,
    "name": "模板123.psd",
    "uuid": ""
}
 */

export function downloadFile(params: any) {
  return request(`/api/file/downloadFile`, {
    method: 'GET',
    params,
    // responseType: 'blob'
  })
}
// classUploadHistoryMessage
export async function uploadHistoryMessage(params: any) {
  return request(`/api/classUploadHistoryMessage`, {
    method: 'Get',
    params
  })
}

export async function getHistoryMessage(params: any) {
  return request(`/api/classHistoryMessage`, {
    method: 'Get',
    params
  })
}
