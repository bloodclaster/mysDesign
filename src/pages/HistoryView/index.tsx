import History from "@/components/History"

export default (props) => {
  const list = props.location.query.list || []
  return <History list={list} />
}