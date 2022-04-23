import { upload, getclassSortMessage, insertClassItem } from '@/services/user'
import { getclassMessage } from '@/services/home'
import { Button, Input, message, Select, Divider, Tag } from 'antd'
import { useEffect, useRef, useState } from 'react'
import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'
import styles from './index.less'
const { Option } = Select;
const { CheckableTag } = Tag;



export default ({ }) => {
  const N: any = null
  const [className, setclassName] = useState(N)
  const [introduction, setintroduction] = useState(N)
  const [sortlist, setsortlist] = useState(N)
  const [sort, setsort] = useState(N)
  const [editorState, seteditorState] = useState(N)
  const [editor, seteditor] = useState(N)
  const [classMessage, setclassMessage] = useState(N)
  const [selectclass, setselectclass] = useState([])

  const handleChange = (editorState: any) => {
    seteditorState(editorState)
  }
  useEffect(() => {
    getclassSortMessage({}).then(msg => {
      setsortlist(msg.data)
    })
    getclassMessage({}).then(msg => {
      if (msg.code !== 200)
        message.warning(msg.message)
      else {
        const data = msg.data
        let res = []
        for (let key in data) {
          res.push(data[key])
        }
        console.log(res)
        setclassMessage(res)
      }
    })
  }, [])

  const hendleChange = (tag, checked) => {
    // const { selectclass } = this.state;
    const nextSelectedTags = checked ? [...selectclass, tag] : selectclass.filter(t => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    setselectclass(nextSelectedTags);
  }

  return (<div style={{ margin: '12px' }}>
    <div style={{ display: 'flex' }}>
      <div style={{ width: '50%' }}>
        <div className={styles.inputStyle}>
          <div style={{ marginTop: '12px' }}>课程名称:</div>
          <Input size='small' style={{ margin: '12px', width: '285px' }} onChange={(e: any) => {
            setclassName(e.target.value)
          }} />
        </div>
        <div className={styles.inputStyle}>
          <div style={{ marginTop: '12px' }}>课程介绍:</div>
          <Input size='small' style={{ margin: '12px', width: '325px' }} onChange={(e: any) => {
            setintroduction(e.target.value)
          }} />
        </div>
        <div className={styles.inputStyle}>
          <div style={{ marginTop: '12px' }}>课程分类:</div>
          <Select size='small' value={sort} style={{ margin: '12px', width: '365px' }} onChange={(val) => {
            setsort(val)
          }} >
            {sortlist && sortlist.map((item: any) =>
              <Option value={item.id}>{item.classSort}</Option>)}
          </Select>
        </div>
      </div>
      <div style={{ width: '50%' }}>
        <div className={styles.inputStyle}>
          <div style={{ marginTop: '12px' }}>相关课程:</div>
        </div>
        {classMessage &&
          classMessage.map((item: any) => {
            return <div>
              <span style={{ width: '75px', display: 'inline-block' }}> {item[0].classSort}:</span>
              {
                item.map((tag: any) => {
                  return <CheckableTag
                    key={tag.id}
                    style={{ marginLeft: '4px' }}
                    checked={selectclass.indexOf(tag.id) > -1}
                    onChange={checked => hendleChange(tag.id, checked)}
                  >
                    {tag.className}
                  </CheckableTag>
                })
              }
              <Divider style={{ margin: '6px 0' }} />
            </div>
          })
        }
      </div>
    </div>
    <br />
    <BraftEditor excludeControls={['media']} value={editorState} ref={instance => {
      seteditor(instance)
    }} onChange={handleChange} />
    {/* <Button onClick={() => {
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
    }}>111</Button> */}
  </div>)
}