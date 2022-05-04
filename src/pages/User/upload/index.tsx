import UploadCard from "../comp/UploadCard";
import UploadNext from "../comp/uploadNext";
import React, { memo, useState } from 'react';
import { deleteClassItem, insertClassItem, checkClassItem, updateClassItem } from '@/services/user'
import { Affix, Button, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { history } from 'umi';
import ProCard from '@ant-design/pro-card';
import Header from "@/pages/Header";
export type AnalysisType = {
  initId?: number,
  type?: string
}
const Upload: React.FC<AnalysisType> = ({ initId, type = `上传` }) => {
  const [page, setpage] = useState(1)
  const [id, setid] = useState(initId || null)
  const [data, setdata] = useState(null)

  return <div>
    <Header title={page === 1 ? `${type}课程信息` : `${type}外链及文件`} />
    <div
      style={{
        background: '#F5F7FA',
      }}
    >
      <PageContainer
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
                完成
              </Button>
            </Affix>}
          </div>}
        tabProps={{
          type: 'editable-card',
          hideAdd: true,
          onEdit: (e, action) => console.log(e, action),
        }}
      >
        <ProCard direction="column" ghost gutter={[0, 16]} style={{ paddingBottom: '24px' }}>
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
export default memo(Upload)
