import UploadCard from "../comp/UploadCard";
import UploadNext from "../comp/uploadNext";
import React, { useEffect, useState } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { getSelecrFile, getSelecrVideo, deleteClassItem, insertClassItem, checkClassItem, updateClassItem } from '@/services/user'
import { Affix, Button, Dropdown, Menu, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { history } from 'umi';
import ProCard from '@ant-design/pro-card';
import { insertVideo } from "@/services/video";

export default ({ }) => {
  const [page, setpage] = useState(1)
  const [id, setid] = useState(null)
  const [data, setdata] = useState(null)
  const [linkdata, setlinkdata] = useState(null)

  return <div>
    <div
      style={{
        background: '#F5F7FA',
      }}
    >
      <PageContainer
        header={{
          title: '上传',
          ghost: true,
          extra: [
            <Button size='small' type='link' onClick={() => {
              history.push('/home')
            }}>
              返回首页
            </Button>
          ]
        }}
        tabBarExtraContent={
          <div style={{ display: 'flex', }}>
            {page === 1 && id &&
              <Affix offsetTop={10}>
                <Button size='small'
                  style={{ marginBottom: '15px', marginRight: '35px' }}
                  danger
                  onClick={() => {
                    deleteClassItem(id).then(res => {
                      if (res.code === 200) {
                        message.success('删除成功')
                        window.location.reload()
                      } else {
                        message.error(res.message)
                      }
                    })
                  }}>
                  删除
                </Button>
              </Affix>}
            {page === 1 && <Affix offsetTop={10}>
              <Button size='small'
                style={{ marginBottom: '15px', marginRight: '35px' }}
                onClick={() => {
                  if (!id)
                    insertClassItem(data).then(res => {
                      if (res.code === 200) {
                        setid(res.data)
                        setTimeout(() => { setpage(2) })
                      } else {
                        message.error(res.message)
                      }
                    })
                  else {
                    checkClassItem(id).then((res) => {
                      updateClassItem({
                        classItem: {
                          ...data.classItem,
                          id
                        },
                        relatedClass: data.relatedClass || []
                      })
                      if (res.code === 200)
                        setTimeout(() => { setpage(2) })
                    })
                  }
                }}>
                下一步
              </Button>
            </Affix>}
            {page === 2 && <Affix offsetTop={10}>
              <Button size='small'
                style={{ marginBottom: '15px', marginRight: '35px' }}
                onClick={() => {
                  setTimeout(() => { setpage(1) })
                }}>
                上一步
              </Button>
            </Affix>}
            {page === 2 && <Affix offsetTop={10}>
              <Button size='small'
                type='primary'
                style={{ marginBottom: '15px', marginRight: '35px' }}
                onClick={() => {
                  history.push('/home')
                }}>
                上传
              </Button>
            </Affix>}
          </div>}
        tabList={[{
          tab: page === 1 ? `上传课程信息` : `上传外链及文件`,
          key: 'base',
          closable: false,
        }]}
        tabProps={{
          type: 'editable-card',
          hideAdd: true,
          onEdit: (e, action) => console.log(e, action),
        }}
      >
        <ProCard direction="column" ghost gutter={[0, 16]}>
          {
            page === 1 && <ProCard style={{ minHeight: 200 }} >
              <UploadCard setdata={setdata} id={id} />
            </ProCard>
          }
          {
            page === 2 && <ProCard style={{ minHeight: 200 }} >
              <UploadNext id={id} />
            </ProCard>
          }
        </ProCard>
      </PageContainer>
    </div>
  </div>
}