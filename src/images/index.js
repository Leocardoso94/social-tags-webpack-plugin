import fs from 'fs';

export const processImage = (imagePath, publicPath) => {
  const filename = imagePath.replace(/^.*[\\\/]/, '');
  fs.readFile(imagePath, (err, data) => {
    if (err) throw err;


    setTimeout(() => {
      fs.writeFile(`${publicPath}/${filename}`, data, (err2) => {
        if (err2) throw err;
      });
    }, 1000);
  });
};
