import fs from 'fs';

const writeImage = (publicPath, filename, data) => new Promise((resolve, reject) => {
  fs.writeFile(`${publicPath}/${filename}`, data, (err) => {
    err ? reject(err) : resolve({ sucess: true });
  });
});

const readImage = imagePath => new Promise((resolve, reject) => {
  fs.readFile(imagePath, (err, data) => {
    err ? reject(err) : resolve(data);
  });
});

const processImage = async (imagePath, publicPath) => {
  try {
    const filename = imagePath.replace(/^.*[\\/]/, '');
    const data = await readImage(imagePath);
    await writeImage(publicPath, filename, data);
  } catch (error) {
    console.error(error);
  }
};


export default processImage;
