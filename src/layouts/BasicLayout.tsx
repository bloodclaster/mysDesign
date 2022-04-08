import React, { useState } from 'react';
import 'braft-editor/dist/index.css'
import { PageHeader, Button } from 'antd';
import BraftEditor from 'braft-editor'
const BasicLayout = (props) => {

  const [editorState, seteditorState] = useState(BraftEditor.createEditorState(null))


  return (<div>
    <PageHeader
      onBack={() => null}
      title=""
      subTitle="Welcome"
      breadcrumb={{}}
      extra={[]}
    />
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>

      <Button onClick={
        async () => { console.log('editorState save that :', editorState.toRAW(true)) }
      }
      >Save</Button>
    </div>
    <div style={{ width: '60%', marginLeft: '20%' }}>
      <BraftEditor
        value={editorState}
        onChange={editorState => seteditorState(editorState)}
      />
    </div>


  </div>)
}

export default BasicLayout