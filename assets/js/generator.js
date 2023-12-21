const base64Img = require('base64-img');

const images = [
  'assets/img/jakke1.png',
  'assets/img/jakke2.png',
  'assets/img/jakke3.png',
  'assets/img/jakke4.png'
];

images.forEach((imagePath, index) => {
  base64Img.base64(imagePath, (err, data) => {
    if (!err) {
      console.log(`Billede ${index + 1}:`);
      console.log(data);
      console.log('\n');
    } else {
      console.error(err);
    }
  });
});
