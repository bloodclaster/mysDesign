import { upload, getclassSortMessage, insertClassItem } from '@/services/user'
import { Button, Input, Select } from 'antd'
import { useEffect, useRef, useState } from 'react'
import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'
import styles from './index.less'
const { Option } = Select;
export default ({ }) => {
  const N: any = null
  const [className, setclassName] = useState(N)
  const [introduction, setintroduction] = useState(N)
  const [sortlist, setsortlist] = useState(N)
  const [sort, setsort] = useState(N)
  const [editorState, seteditorState] = useState(N)
  const [editor, seteditor] = useState(N)
  const handleChange = (editorState: any) => {
    seteditorState(editorState)
  }
  useEffect(() => {
    getclassSortMessage({}).then(msg => {
      setsortlist(msg.data)
    })
  }, [])
  return (<div style={{ margin: '12px' }}>
    <div className={styles.inputStyle}>
      <div style={{ marginTop: '12px' }}>课程名称:</div>
      <Input style={{ margin: '12px', width: '285px' }} onChange={(e: any) => {
        setclassName(e.target.value)
      }} />
    </div>
    <div className={styles.inputStyle}>
      <div style={{ marginTop: '12px' }}>课程介绍:</div>
      <Input style={{ margin: '12px', width: '365px' }} onChange={(e: any) => {
        setintroduction(e.target.value)
      }} />
    </div>
    <div className={styles.inputStyle}>
      <div style={{ marginTop: '12px' }}>课程分类:</div>
      <Select value={sort} style={{ margin: '12px', width: '365px' }} onChange={(val) => {
        setsort(val)
      }} >
        {sortlist && sortlist.map((item: any) =>
          <Option value={item.id}>{item.classSort}</Option>)}
      </Select>
    </div>
    <br />
    <BraftEditor value={editorState} ref={instance => {
      seteditor(instance)
    }} onChange={handleChange} />
    <Button onClick={() => {
      insertClassItem({
        className,
        introduction,
        sort,
        text: editorState.toHTML(),
        id: '',
        seeNum: '',
        time: '',
        user: ''
      })
    }}>111</Button>
  </div>)
}