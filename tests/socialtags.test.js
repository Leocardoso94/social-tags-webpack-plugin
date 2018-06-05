import { buildExample, getHtmlContent, socialOptions } from './test-utils';

const htmlparser = require('htmlparser2');

const { facebook, twitter } = socialOptions;


describe('SocialTags', () => {
  let html = '';
  beforeEach(async () => {
    await buildExample();
    html = await getHtmlContent();
  });
  it('should create the correcy meta tags', () => {
    expect(1).toBe(1);

    const parser = new htmlparser.Parser({
      onopentag(name, attribs) {
        if (name === 'meta') {
          if (attribs.property && !attribs.property.match('image')) {
            expect(facebook[attribs.property]).toBe(attribs.content);
          }
          if (attribs.name && !attribs.name.match('image')) {
            expect(twitter[attribs.name]).toBe(attribs.content);
          }
        }
      },

    }, { decodeEntities: true });
    parser.write(html);
    parser.end();
  });
});

