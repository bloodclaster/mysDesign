import { upload, getclassSortMessage, insertClassItem, checkClassItem } from '@/services/user'
import { getclassMessage } from '@/services/home'
import { Button, Input, message, Select, Divider, Tag } from 'antd'
import { memo, useEffect, useRef, useState } from 'react'
import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'
import styles from './index.less'
const { Option } = Select;
const { CheckableTag } = Tag;



const UploadCard = ({ setdata, id }) => {
  const N: any = null
  const [className, setclassName] = useState(N)
  const [introduction, setintroduction] = useState(N)
  const [sortlist, setsortlist] = useState(N)
  const [sort, setsort] = useState(N)
  const [editorState, seteditorState] = useState(N)
  const [editor, seteditor] = useState(N)
  const [classMessage, setclassMessage] = useState(N)
  const [selectclass, setselectclass] = useState([])


  useEffect(() => {
    if (id)
      checkClassItem(id).then((res) => {
        const { text, relatedClass } = res?.data
        console.log(text)
        setclassName(text.className)
        setintroduction(text.introduction)
        setsort(text.sort)
        seteditorState(BraftEditor.createEditorState(text.text))
        setselectclass(relatedClass.map((item: any) => item.id))
      })
  }, [])
  useEffect(() => {
    setdata({
      classItem: {
        className,
        introduction,
        sort,
        text: editorState && editorState.toHTML(),
        id: '',
        seeNum: '',
        time: '',
        user: ''
      },
      relatedClass: selectclass
    })
  }, [className, introduction, sort, editorState, selectclass])

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
        setclassMessage(res)
      }
    })
  }, [])

  const hendleChange = (tag, checked) => {
    const nextSelectedTags: any = checked ? [...selectclass, tag] : selectclass.filter(t => t !== tag);
    setselectclass(nextSelectedTags);
  }

  return (<div style={{ margin: '12px' }}>
    <div style={{ display: 'flex' }}>
      <div style={{ width: '50%' }}>
        <div className={styles.inputStyle}>
          <div style={{ marginTop: '12px' }}>????????????:</div>
          <Input size='small' value={className} style={{ margin: '12px', width: '285px' }} onChange={(e: any) => {
            setclassName(e.target.value)
          }} />
        </div>
        <div className={styles.inputStyle}>
          <div style={{ marginTop: '12px' }}>????????????:</div>
          <Input size='small' value={introduction} style={{ margin: '12px', width: '325px' }} onChange={(e: any) => {
            setintroduction(e.target.value)
          }} />
        </div>
        <div className={styles.inputStyle}>
          <div style={{ marginTop: '12px' }}>????????????:</div>
          <Select size='small' value={sort} style={{ margin: '12px', width: '365px' }} onChange={(val) => {
            setsort(val)
          }} >
            {sortlist && sortlist.map((item: any) =>
              <Option value={item.id}>{item.classSort}</Option>)}
          </Select>
        </div>
      </div>
      <div style={{ width: '50%', height: 150, overflow: 'auto' }}>
        <div className={styles.inputStyle}>
          <div style={{ marginTop: '12px' }}>????????????:</div>
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
export default memo(UploadCard)