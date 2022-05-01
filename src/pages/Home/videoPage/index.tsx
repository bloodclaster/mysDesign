import { getvidioMessage } from "@/services/home"
import { Spin } from "antd"
import { useEffect, useState } from "react"

export default (props) => {
  const [text, settext] = useState('')
  const [loading, setloading] = useState(true)

  useEffect(() => {
    getvidioMessage(props.location.query.id, {}).then((msg) => {
      console.log(msg)
      settext(msg.dataa?.text)
      setloading(false)
    })
  }, [])
  return (<div>
    <Spin spinning={loading}>
      {text && <div dangerouslySetInnerHTML={{ __html: text.text }}></div>}
    </Spin>
  </div>)
}