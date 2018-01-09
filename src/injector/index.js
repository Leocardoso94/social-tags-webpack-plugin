import path from 'path'
import generateFingerprint from '../helpers/fingerprint'
import { joinURI } from '../helpers/uri'
import { processImage } from '../icons'
import except from '../helpers/except'

const voidTags = [
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'keygen',
  'link',
  'menuitem',
  'meta',
  'param',
  'source',
  'track',
  'wbr'
]

// const appleTags = {
//   'apple-touch-icon': 'link',
//   'apple-touch-startup-image': 'link',
//   'apple-mobile-web-app-title': 'meta',
//   'apple-mobile-web-app-capable': 'meta',
//   'batata1': 'meta',
//   'batata2': 'meta',
//   'batata3': 'meta',
//   'batata4': 'meta'
// }


export function buildResources(_this, publicPath, callback) {
  if (_this.assets && _this.options.inject) { // already cached and ready to inject
    callback()
  } else {
    publicPath = publicPath || ''

    callback()

  }
}

export function injectResources(compilation, assets, callback) {
  if (assets) {
    for (let asset of assets) {
      compilation.assets[asset.output] = {
        source: () => asset.source,
        size: () => asset.size
      }
    }
  }
  callback()
}

export function applyTag(obj, tag, content) {
  if (!content) return

  if (obj[tag]) {
    if (Array.isArray(obj[tag])) {

      obj[tag].push(content)

    } else {

      obj[tag] = [obj[tag], content]

    }
  } else {
    obj[tag] = content

  }
}

export function generateHtmlTags(tags) {
  let html = ''
  for (let tag in tags) {
    const attrs = tags[tag]
    if (Array.isArray(attrs)) {
      for (let a of attrs) {
        html = `${html}${generateHtmlTags({
          [tag]: a
        })}`
      }
    } else {
      html = `${html}<${tag}`
      for (let attr in attrs) {
        html = `${html} ${attr}="${attrs[attr]}"`
      }
      html = voidTags.indexOf(tag) === -1 ? `${html}></${tag}>` : `${html} />`
    }
  }

  return html
}
