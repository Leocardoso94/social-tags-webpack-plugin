import { buildResources, injectResources, generateHtmlTags, applyTag } from './injector'
import { processImage } from './images'

class WebpackPwaManifest {
  constructor(options = {}) {

    this.assets = null
    this.htmlPlugin = false
    const shortName = options.short_name || options.name || 'App'
    this.options = Object.assign({
      filename: 'manifest.json',
      name: 'App',
      short_name: shortName,
      orientation: 'portrait',
      display: 'standalone',
      start_url: '.',
      fingerprints: true,
      ios: false,
      publicPath: null,
      includeDirectory: true
    }, options)
  }

  apply(compiler) {
    const that = this
    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {
        if (!that.htmlPlugin) that.htmlPlugin = true


        // const tags = generateAppleTags(that.options, that.assets)
        const tags = {};

        Object.entries(that.options.facebook).forEach(fbTags => {
          const tag = {
            property: fbTags[0].trim(),
            content: fbTags[1].trim()
          }
          if (tag.property.match('image')) processImage(fbTags[1], compilation.options.output.path);
          applyTag(tags, 'meta', tag)
        });

        Object.entries(that.options.twitter).forEach(fbTags => {
          const tag = {
            name: fbTags[0].trim(),
            content: fbTags[1].trim()
          }
          if (!tag.name.match('image'))
            applyTag(tags, 'meta', tag)
        });


        htmlPluginData.html = htmlPluginData.html.replace(/(<\/head>)/i, `${generateHtmlTags(tags)}</head>`)



        callback(null, htmlPluginData)

      })
    })
    compiler.plugin('emit', (compilation, callback) => {
      if (that.htmlPlugin) {
        injectResources(compilation, that.assets, callback)
      } else {
        buildResources(that, that.options.publicPath || compilation.options.output.publicPath, () => {
          injectResources(compilation, that.assets, callback)
        })
      }
    })
  }
}

module.exports = WebpackPwaManifest
