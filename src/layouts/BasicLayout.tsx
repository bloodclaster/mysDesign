import React from 'react';
import { PageHeader, Button } from 'antd';

const BasicLayout = (props) => {
  const { children } = props;
  console.log(props)
  return (<div>
    <PageHeader
      onBack={() => null}
      title=""
      subTitle="Welcome"
      breadcrumb={{}}
      extra={[]}
    />
  </div>)
}

export default BasicLayout