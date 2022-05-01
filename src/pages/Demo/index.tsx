import MyCard from "@/components/MyCard"
import { getMessage } from "@/services/demo"
import { useState } from "react"


export default (props) => {
  const [userInf, setuserInfo] = useState(null)

  return (<div>
    MyCard:
    <MyCard className={'undefined'} introduction={undefined} id={undefined} nickname={undefined} seeNum={undefined} time={undefined} style={undefined} />
  </div>)
}