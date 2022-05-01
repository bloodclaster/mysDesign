import MyCard from "@/components/MyCard"
import { getMessage } from "@/services/demo"
import { useState } from "react"


export default (props) => {
  const [userInf, setuserInfo] = useState(null)

  return (<div>
    MyCard:
    <MyCard />
  </div>)
}