import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Dropdown, Menu, Button } from 'antd'
import classnames from 'classnames'
import downloadAsBlob from '../../utils/downloadAsBlob'
import formatFundQuota from '../../utils/formatFundQuota'
import base64ThumbImage from '../../utils/base64ThumbImage'
import { DownloadOutlined } from '@ant-design/icons'
import styles from './GetCsvAndPng.less'
export default class GetCsvAndPng extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    chart: PropTypes.object,
    heads: PropTypes.array,
    results: PropTypes.array,
    quotas: PropTypes.array,
    data: PropTypes.array,
    noExpo: PropTypes.bool,
  }

  onSelect = ({ key }) => {
    // 增加下载图片清晰度配置
    const SVGParam = {
      chart: {
        width: 1200,
        height: 600,
        cssWidth: 1200,
        cssHeight: 600,
        sourceWidth: 1200,
        sourceHeight: 600,
      },
    }
    const { id, chart } = this.props
    if (key === 'exportCSV') {
      const chartCSV = chart.getCSV()
      this.seriesToCsv(id, chartCSV)
    }
    if (key === 'exportPNG') {
      if (chart.type === 'echart') {
        const base64 = chart.getSVG({
          type: 'jpg',
          pixelRatio: 1,
          backgroundColor: '#fff',
        })
        this.downloadFileByBase64(base64, id) //调用
        return
      }
    }
  }

  dataURLtoBlob = (dataurl) => {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = window.atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
  }

  //下载图片到本地
  downloadFile = (url, name) => {
    var a = document.createElement('a')
    a.setAttribute('href', url)
    a.setAttribute('download', name)
    a.setAttribute('target', '_blank')
    let clickEvent = document.createEvent('MouseEvents')
    clickEvent.initEvent('click', true, true) //模拟点击
    a.dispatchEvent(clickEvent)
  }

  downloadFileByBase64 = (base64, name) => {
    var myBlob = this.dataURLtoBlob(base64)
    var myUrl = URL.createObjectURL(myBlob)
    this.downloadFile(myUrl, name) //base64：传入base64  name:为下载图片名字，自定义
  }

  svgToPng = (id, chartSVG) => {
    // const cv = document.createElement('canvas')
    // cv.style.display = 'none'
    // document.getElementById(id).appendChild(cv)
    // console.log('canvg',canvg)
    // canvg(cv, chartSVG) //eslint-disable-line
    // const pngData = cv
    //   .toDataURL('image/png')
    //   .replace('image/png', 'image/octet-stream')
    // const aLink = document.createElement('a')
    // aLink.download = `${id}.png`
    // aLink.href = pngData
    // aLink.click()
    // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    //   window.navigator.msSaveOrOpenBlob(cv.msToBlob(), `${id}.png`);
    // }
  }

  seriesToCsv = (id, chartCSV) => {
    const { heads, results, quotas, data, noExpo } = this.props
    if (heads && results) {
      const csv = [heads, ...results].join('\n')
      return downloadAsBlob(csv, `${id}.csv`)
    }
    if (quotas && data) {
      const headers = quotas.map((item) => item.name)
      const finalResult = data.map((item) => {
        return quotas
          .map((quota) =>
            quota.isNumeric || quota.format === 'commaNumber'
              ? item[quota.value]
              : formatFundQuota(quota, item)
          )
          .join(',')
      })
      finalResult.unshift(headers)
      const csv = finalResult.join('\n')
      return downloadAsBlob(csv, `${id}.csv`)
    }
    if (noExpo) {
      const lines = chartCSV.split('\n')
      const head = lines[0]
      const result = lines.slice(1).map((item) =>
        item
          .split(',')
          .map((one) => {
            const num = Number(one)
            if (isNaN(num)) {
              return one
            }
            return this.toNonExponential(num)
          })
          .join(',')
      )
      const csv = [head, ...result].join('\n')
      return downloadAsBlob(csv, `${id}.csv`)
    }
    downloadAsBlob(chartCSV, `${id}.csv`)
  }

  toNonExponential = (num) => {
    const m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/)
    return num.toFixed(Math.max(0, (m[1] || '').length - m[2]))
  }

  render () {
    const { id } = this.props
    const menu = (
      <Menu onClick={this.onSelect} style={{ width: 100 }}>
        <Menu.Item key={'exportCSV'}>下载数据</Menu.Item>
        <Menu.Item key={'exportPNG'}>下载图片</Menu.Item>
      </Menu>
    )
    return (
      <div className={classnames(styles.buttonWapper, 'js-hidden no-print')}>
        <Dropdown overlay={menu} trigger={['hover']}>
          <Button size="small">
            <DownloadOutlined></DownloadOutlined>
          </Button>
        </Dropdown>
      </div>
    )
  }
}
