<!--
 * @Author       : zxlin
 * @Date         : 2023-11-22 11:25:56
 * @LastEditors  : zxlin
 * @LastEditTime : 2024-03-26 11:37:18
 * @FilePath     : \img-compression-plugin\README.md
 * @Description  : 
-->
# img-compression-plugin
轻量级图片压缩webpack插件
> 降低imagemin版本,解决无法拉取依赖问题
## 安装
```npm
npm i -D img-compression-plugin
```
## 使用
在`webpack.config.js`文件中使用
```js
const ImgCompressionPlugin = require('img-compression-plugin')
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
const ImgCompressionPlugin = require('img-compression-plugin')
module.exports = {
  plugins: [
    new ImgCompressionPlugin({
      fileType:['png'],
      quality:[0.3,0.6]
    })
  ]
}
```