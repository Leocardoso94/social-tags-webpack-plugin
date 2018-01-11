
# social-tags-webpack-plugin



`social-tags-webpack-plugin` is a webpack plugin that generates a the meta-tags to facebook and twitter, like this:

``` html
<meta property="fb:app_id" content="123456789">
<meta property="og:url" content="http://example.com/page.html">
<meta property="og:type" content="website">
<meta property="og:title" content="Content Title">
<meta property="og:image" content="http://example.com/image.jpg">
<meta property="og:description" content="Description Here">
<meta property="og:site_name" content="Site Name">
<meta property="og:locale" content="en_US">
<meta property="article:author" content="">
<meta name="twitter:card" content="summary">
<meta name="twitter:site" content="@site_account">
<meta name="twitter:creator" content="@individual_account">
<meta name="twitter:url" content="http://example.com/page.html">
<meta name="twitter:title" content="Content Title">
<meta name="twitter:description" content="Content description less than 200 characters">
<meta name="twitter:image" content="http://example.com/image.jpg">
```


# Install
```javascript
npm install --save-dev social-tags-webpack-plugin
```

# Usage
In your `webpack.config.js`:
```javascript
// ES6+
import SocialTags from 'social-tags-webpack-plugin'

// ES5
var SocialTags = require('social-tags-webpack-plugin')

...

plugins: [
    new SocialTags({
      appUrl: 'http://example.com/',
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
```
### Test your page with :
- 🛠 [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- 🛠 [Twitter Card Validator](https://cards-dev.twitter.com/validator)
