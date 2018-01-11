import { buildResources, injectResources, generateHtmlTags, applyTag } from './injector';
import { processImage } from './images';

if (!Object.entries)
  Object.entries = function (obj) {
    var ownProps = Object.keys(obj),
      i = ownProps.length,
      resArray = new Array(i); // preallocate the Array

    while (i--)
      resArray[i] = [ownProps[i], obj[ownProps[i]]];
    return resArray;
  };

class SocialTagsPlugin {
  constructor(options = {}) {

    this.htmlPlugin = false;
    this.options = Object.assign({
      publicPath: null,
      url: 'https://freecourses.github.io/'
    }, options);
  }

  apply(compiler) {
    const that = this;
    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {
        if (!that.htmlPlugin) that.htmlPlugin = true;


        // const tags = generateAppleTags(that.options, that.assets)
        const tags = {};

        Object.entries(Object.assign(that.options.facebook, that.options.twitter)).forEach(socialTags => {
          const isTwitterOrFacebookTag = socialTags[0].match('twitter') ? 'name' : "property";

          const tag = {
            [isTwitterOrFacebookTag]: socialTags[0].trim(),
            content: socialTags[1].trim()
          };


          if (tag[isTwitterOrFacebookTag].match('image')) {
            tag.content = (that.options.appUrl + socialTags[1]).trim();
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
      if (that.htmlPlugin) {
        injectResources(compilation, that.assets, callback);
      } else {
        buildResources(that, compilation.options.output.publicPath, () => {
          injectResources(compilation, that.assets, callback);
        });
      }
    });
  }
}

module.exports = SocialTagsPlugin;
