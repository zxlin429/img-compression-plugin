const { RawSource } = require('webpack-sources')
const defaultFileType = ['png', 'jpg', 'jpeg'] // 默认图片类型
const defaultQuality = [0.1, 0.5] // 默认压缩值域
const moduleCache = {}
/**
 * 源码转换为buffer
 * @param {String|Buffer} source 源码
 * @returns {Buffer}
 */
function getBufferFromSource(source) {
  return Buffer.from(source)
}
/**
 * 压缩图片
 * @param {String|Buffer} source 源码
 * @returns {Buffer}
 */
async function imageGzip(source, quality = defaultQuality, { imagemin, imageminJpegtran, imageminPngquant }) {
  const bufferFile = getBufferFromSource(source)
  let res
  try {
    res = await imagemin.buffer(bufferFile, {
      plugins: [
        imageminJpegtran(),
        imageminPngquant({
          quality: quality,
        }),
      ],
    })
  } catch (err) {
    console.log('图片压缩失败error:', err)
    res = void 0
  }
  return res
}
module.exports = class ImgCompressionPlugin {
  constructor(option = {}) {
    /**
     * option 配置项
     * @param {Array} option.fileType 图片类型
     * @param {Number} option.quality 压缩值域(0-1之间,压缩比在这个区间内才会进行压缩)
     */
    this.option = option
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync('img-compression-plugin', async (compilation, callback) => {
      const imagemin = await import('imagemin')
      const imageminJpegtran = await import('imagemin-jpegtran')
      const imageminPngquant = await import('imagemin-pngquant')
      const fileArr = Object.keys(compilation.assets).filter(assetId => (this.option.fileType || defaultFileType).includes(assetId.slice(assetId.lastIndexOf('.') + 1)))
      for (let assetId of fileArr) {
        if (moduleCache[assetId]) {
          compilation.updateAsset(assetId, new RawSource(getBufferFromSource(moduleCache[assetId])))
        } else {
          const source = compilation.assets[assetId].source()
          let res = await imageGzip(source, this.quality, { imagemin: imagemin.default, imageminJpegtran: imageminJpegtran.default, imageminPngquant: imageminPngquant.default })
          if (res) {
            moduleCache[assetId] = res
            compilation.updateAsset(assetId, new RawSource(getBufferFromSource(res)))
          }
        }
      }
      callback()
    })
  }
}