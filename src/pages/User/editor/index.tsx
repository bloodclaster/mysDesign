import Upload from '../Upload';

export default (props) => {
  const id = props.location.query.id
  return <Upload initId={id} type={`修改`} />
}