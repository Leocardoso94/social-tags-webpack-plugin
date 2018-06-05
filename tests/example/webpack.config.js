const HtmlWebPackPlugin = require('html-webpack-plugin');
const SocialTags = require('../../dist');

module.exports = {
  module: {
    rules: [{
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: false,
        },
      }],
    }],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new SocialTags({
      appUrl: 'http://example.com/',
      facebook: {
        'fb:app_id': '123456789',
        'og:url': 'http://example.com/page.html',
        'og:type': 'website',
        'og:title': 'Content Title',
        'og:image': 'src/img/book.png',
        'og:description': 'Description Here',
        'og:site_name': 'Site Name',
        'og:locale': 'en_US',
        'og:article:author': '',
      },
      twitter: {
        'twitter:card': 'summary',
        'twitter:site': '@site_account',
        'twitter:creator': '@individual_account',
        'twitter:url': 'http://example.com/page.html',
        'twitter:title': 'Content Title',
        'twitter:description': 'Content description less than 200 characters',
        'twitter:image': './src/img/book.png',
      },
    }),
  ],
};
