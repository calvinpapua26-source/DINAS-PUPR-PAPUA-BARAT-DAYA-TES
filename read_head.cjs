const fs = require('fs');
const path = 'd:/shp file/dinas-pupr-papua-barat-daya-tes/public/data/jalan nasional.json';

const stream = fs.createReadStream(path, { end: 2000 });
stream.on('data', (chunk) => {
    console.log(chunk.toString());
});
stream.on('error', (err) => {
    console.error(err);
});
