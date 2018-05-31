import {
  buildResources,
  injectResources,
  generateHtmlTags,
  applyTag,
} from './injector';
import processImage from './process_image';

if (!Object.entries) {
  Object.entries = function entries(obj) {
    const ownProps = Object.keys(obj);
    let i = ownProps.length;
    const resArray = new Array(i); // preallocate the Array

    while (i--) {
      resArray[i] = [ownProps[i], obj[ownProps[i]]];
    }
    return resArray;
  };
}

class SocialTagsPlugin {
  constructor(options = {}) {
    this.htmlPlugin = false;
    this.options = Object.assign({
      publicPath: null,
    }, options);
  }

  apply(compiler) {
    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('html-webpack-plugin-before-html-processing', (htmlPluginData, callback) => {
        if (!this.htmlPlugin) this.htmlPlugin = true;

        const tags = {};

        Object.entries(Object.assign(this.options.facebook, this.options.twitter))
          .forEach((socialTags) => {
            const isTwitterOrFacebookTag = socialTags[0].match('twitter') ? 'name' : 'property';

            const tag = {
              [isTwitterOrFacebookTag]: socialTags[0].trim(),
              content: socialTags[1].trim(),
            };


            if (tag[isTwitterOrFacebookTag].match('image')) {
              const dash = this.options.appUrl.slice(-1).match(/\/|\\/g) ? '' : '/';

              tag.content = (this.options.appUrl + dash + socialTags[1].replace(/^.*[\\\/]/, '')).trim();
              applyTag(tags, 'meta', tag);
              processImage(socialTags[1], compilation.options.output.path);
            } else {
              applyTag(tags, 'meta', tag);
            }
          });

        htmlPluginData.html = htmlPluginData.html.replace(/(<\/head>)/i, `${generateHtmlTags(tags)}</head>`);


        callback(null, htmlPluginData);
      });
    });
    compiler.plugin('emit', (compilation, callback) => {
      if (this.htmlPlugin) {
        injectResources(compilation, this.assets, callback);
      } else {
        buildResources(this, compilation.options.output.publicPath, () => {
          injectResources(compilation, this.assets, callback);
        });
      }
    });
  }
}

module.exports = SocialTagsPlugin;
