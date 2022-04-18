import { getMessage } from "@/services/demo"
import { useState } from "react"


export default (props) => {
  const [userInf, setuserInfo] = useState(null)


  getMessage().then((message) => {
    console.log(message.data)
    setuserInfo(message.data)
  })

  return (<div>

  </div>)
}