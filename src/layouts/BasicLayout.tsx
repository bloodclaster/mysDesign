import React, { useEffect, useState } from 'react';
import 'braft-editor/dist/index.css'
import { Button, Menu } from 'antd';
import { history, Link } from 'umi';
import BraftEditor from 'braft-editor'
import { getclassMessage } from '@/services/home';
const BasicLayout = (props) => {

  // const [editorState, seteditorState] = useState(BraftEditor.createEditorState(null))
  const [inlogin, setinlogin] = useState(false)
  useEffect(() => {
    getclassMessage({}).then((res) => {
      if (res.code === 200) {
        let result: any = []
        for (let key in res.data) {
          result.push({ name: key, data: res.data[key] })
        }
        setinlogin(true)
      }
    })
  }, [])
  const { Item } = Menu
  return (<div>
    <div style={{ position: 'absolute', marginLeft: '5%', marginTop: '15px' }}>Logo</div>
    {!inlogin ? <Link
      to={"/login"}
      style={{
        width: '120px',
        textAlign: 'center',
        float: 'right',
        marginTop: '5px',
        marginRight: '3%'
      }}
    >Login</Link> :
      <Link
        to={"/user"}
        style={{
          width: '120px',
          textAlign: 'center',
          float: 'right',
          marginTop: '5px',
          marginRight: '3%'
        }}
      >User</Link>}
    <Menu style={{ width: '60%', marginLeft: '10%' }} mode="horizontal">
      <Item style={{ width: '120px', textAlign: 'center' }} ><Link to="/home">Home</Link></Item>
      {/* <Item style={{ width: '120px', textAlign: 'center' }} ><Link to="/">///</Link></Item> */}
      {/* <Item style={{ width: '120px', textAlign: 'center' }} ><Link to="/">///</Link></Item> */}
    </Menu>
    <div style={{ marginLeft: '200px' }}>这是一个主页，就很空</div>

    {/* <div style={{ display: 'flex', justifyContent: 'space-around' }}>

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
    </div> */}


  </div>)
}

export default BasicLayout