import fs from 'fs';

const util = require('util');
const exec = util.promisify(require('child_process').exec);

export const buildExample = () => exec('cd tests/example/ && npx webpack');

export const getHtmlContent = () => new Promise((resolve, reject) => {
  fs.readFile('tests/example/dist/index.html', (err, html) => {
    err ? reject(err) : resolve(html.toString());
  });
});

export const socialOptions = {
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
};

