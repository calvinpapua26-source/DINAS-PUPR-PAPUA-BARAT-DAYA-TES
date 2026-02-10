const fs = require('fs');
const path = 'd:/shp file/dinas-pupr-papua-barat-daya-tes/public/data/jalan nasional.json';

const fd = fs.openSync(path, 'r');
const buffer = Buffer.alloc(100000);
fs.readSync(fd, buffer, 0, 100000, 0);
const content = buffer.toString();
const propIndex = content.indexOf('"properties":');
if (propIndex !== -1) {
    console.log(content.substring(propIndex, propIndex + 1000));
} else {
    console.log('Properties not found in first 100KB');
}
fs.closeSync(fd);
