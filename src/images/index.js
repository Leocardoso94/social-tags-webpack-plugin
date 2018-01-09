import fs from 'fs'
import mime from 'mime'
import { joinURI } from '../helpers/uri'
import generateFingerprint from '../helpers/fingerprint'
import IconError from '../errors/IconError'


export const processImage = (imagePath, publicPath, callback) => {
  console.log(publicPath);

  fs.readFile(imagePath, (err, data) => {
    if (err) throw err;

    fs.writeFile(publicPath + '/teste.png', (err) => {
      if (err) throw err;

    })
  });
}
