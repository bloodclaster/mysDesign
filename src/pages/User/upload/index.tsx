import UploadCard from "../comp/UploadCard";
import UploadNext from "../comp/uploadNext";
import React, { useState } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { Affix, Button, Dropdown, Menu } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { history } from 'umi';
import ProCard from '@ant-design/pro-card';

export default ({ }) => {
  const [page, setpage] = useState(1)
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
            <Button type='link' onClick={() => {
              history.push('/home')
            }}>
              返回首页
            </Button>
          ]
        }}
        tabBarExtraContent={
          <div style={{ display: 'flex', }}>
            {page === 2 && <Affix offsetTop={10}>
              <Button
                style={{ marginBottom: '15px', marginRight: '35px' }}
                onClick={() => {
                  setTimeout(() => { setpage(1) })
                }}>
                上一步
              </Button>
            </Affix>}
            <Affix offsetTop={10}>
              <Button
                style={{ marginBottom: '15px', marginRight: '35px' }}
                onClick={() => {
                  setTimeout(() => { setpage(2) })
                }}>
                下一步
              </Button>
            </Affix></div>}
        tabList={[{
          tab: '上传课程信息',
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
              <UploadCard />

            </ProCard>
          }
          {
            page === 2 && <ProCard style={{ minHeight: 200 }} >
              <UploadNext />

            </ProCard>
          }
        </ProCard>
      </PageContainer>
    </div>
  </div>
}