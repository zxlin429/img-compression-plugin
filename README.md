# img-compression-plugin
轻量级图片压缩webpack插件
## 安装
```npm
npm i -D img-compression-plugin
```
## 使用
在`webpack.config.js`文件中使用
```js
const ImgCompressionPlugin = require('./plugins/ImgCompressionPlugin.js')
module.exports = {
  plugins: [
    new ImgCompressionPlugin()
  ]
}
```
## 配置
- fileType `数组` 需要压缩的图片类型 (默认为 `['png', 'jpg', 'jpeg']` )
- quality `数组` 压缩值域 (默认为 `[0.6, 0.8]` )
```js
const ImgCompressionPlugin = require('./plugins/ImgCompressionPlugin.js')
module.exports = {
  plugins: [
    new ImgCompressionPlugin({
      fileType:['png'],
      quality:[0.3,0.6]
    })
  ]
}
```