export default function base64ThumbImage(baseData, maxWidth, maxHeight) {
  if (typeof FileReader === "undefined") {
    alert("抱歉，你的浏览器不支持发送图片，请升级浏览器或切换浏览器再试！")
  } else {
    try {
      // 压缩图片需要的一些元素和对象
      var img = new Image()
      img.src = baseData
      // base64地址图片加载完毕后执行
      img.onload = function () {
        // 缩放图片需要的canvas（也可以在DOM中直接定义canvas标签，这样就能把压缩完的图片不转base64也能直接显示出来）
        var canvas = document.createElement("canvas")
        var context = canvas.getContext("2d")
        // 图片原始尺寸
        var originWidth = this.width
        var originHeight = this.height
        // 最大尺寸限制，可通过设置宽高来实现图片压缩程度
        //var maxWidth = 500;
        //var maxHeight = 400;
        // 目标尺寸
        var targetWidth = originWidth,
          targetHeight = originHeight
        // 图片尺寸超过最大值的限制
        if (originWidth > maxWidth || originHeight > maxHeight) {
          if (originWidth / originHeight > maxWidth / maxHeight) {
            // 更宽，按照宽度限定尺寸
            targetWidth = maxWidth
            targetHeight = Math.round(maxWidth * (originHeight / originWidth))
          } else {
            targetHeight = maxHeight
            targetWidth = Math.round(maxHeight * (originWidth / originHeight))
          }
        }
        // canvas对图片进行缩放
        canvas.width = targetWidth
        canvas.height = targetHeight
        // 清除画布
        context.clearRect(0, 0, targetWidth, targetHeight)
        // 图片压缩
        /*第一个参数是创建的img对象；第二三个参数是左上角坐标，后面两个是画布区域宽高*/
        context.drawImage(img, 0, 0, targetWidth, targetHeight)
        //压缩后的图片转base64 url
        //canvas.toDataURL(mimeType, qualityArgument),mimeType 默认值是'image/png';
        //qualityArgument表示导出的图片质量，只有导出为jpeg和webp格式的时候此参数才有效，默认值是0.92
        var base64_url = canvas.toDataURL("image/jpeg", 0.92) //base64 格式
        return base64_url
      }
    } catch (e) {
      alert("图片转Base64出错啦！" + e.toString())
    }
  }
}
