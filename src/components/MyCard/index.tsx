import { Tooltip } from "antd"
import moment from "moment"
import { memo } from "react"
import styles from './index.less'
import { history } from 'umi';

const MyCard = ({ className, introduction, id, nickname, seeNum, time, style }) => {
  const onClick = () => {
    history.push(`/home/video?id=${id}`)
  }
  return <div onClick={onClick} className={styles.brp} style={style}>
    <div className={styles.insideBg}>
      <span className={styles.insideDiv}>{className}</span>
    </div>
    <div className={styles.brp2}>
      <h1>{introduction || '介绍'}</h1>
      <h2>{nickname || '作者'}</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>{seeNum || '--'}播放</h2>
        <h2>{time || '时间'}</h2>
      </div>
    </div>
  </div>
}
export default memo(MyCard)