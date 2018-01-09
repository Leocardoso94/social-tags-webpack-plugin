const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackPwaManifest = require('../../../dist')

module.exports = {
  entry: '../app.js',
  output: {
    path: path.join(__dirname, '../output'),
    publicPath: '/',
    filename: '[name].[hash].bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      minify: {
        minifyCSS: true,
        minifyJS: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        preserveLineBreaks: false,
        removeAttributeQuotes: true,
        removeComments: true
      }
    }),
    new WebpackPwaManifest({
      facebook: {
        'fb:app_id': "123456789",
        'og:url': "http://example.com/page.html",
        'og:type': "website",
        'og:title': "Content Title",
        'og:image': path.resolve('src/img/book.png'),
        'og:description': "Description Here",
        'og:site_name': "Site Name",
        'og:locale': "en_US",
        'og:article:author': "",
      },
      twitter: {
        "twitter:card": "summary",
        "twitter:site": "@site_account",
        "twitter:creator": "@individual_account",
        "twitter:url": "http://example.com/page.html",
        "twitter:title": "Content Title",
        "twitter:description": "Content description less than 200 characters",
        "twitter:image": path.resolve('src/img/book.png')
      },
    })
  ]
}
