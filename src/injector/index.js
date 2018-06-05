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
  'wbr',
];

export function buildResources(_this, publicPath, callback) {
  if (_this.assets && _this.options.inject) {
    // already cached and ready to inject
    callback();
  } else {
    publicPath = publicPath || '';

    callback();
  }
}

export function injectResources(compilation, assets, callback) {
  if (assets) {
    Object.values(assets).forEach((asset) => {
      compilation.assets[asset.output] = {
        source: () => asset.source,
        size: () => asset.size,
      };
    });
  }
  callback();
}

export function applyTag(obj, tag, content) {
  if (!content) return;

  if (obj[tag]) {
    if (Array.isArray(obj[tag])) {
      obj[tag].push(content);
    } else {
      obj[tag] = [obj[tag], content];
    }
  } else {
    obj[tag] = content;
  }
}

export function generateHtmlTags(tags) {
  let html = '';
  Object.entries(tags).forEach(([tag, attrs]) => {
    if (Array.isArray(attrs)) {
      Object.values(attrs).forEach((a) => {
        html = `${html}${generateHtmlTags({ [tag]: a })}`;
      });
    } else {
      html = `${html}<${tag}`;
      Object.entries(attrs).forEach(([key, value]) => {
        html = `${html} ${key}="${value}"`;
      });
      html = voidTags.indexOf(tag) === -1 ? `${html}></${tag}>` : `${html} />`;
    }
  });

  return html;
}
