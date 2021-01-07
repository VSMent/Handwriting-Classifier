const fs = require('fs');

function loadDataset(type = 'train', name = 'mnist') {
    const imageBytes = 784;
    const ds = [];
    const labels = fs.readFileSync(`./EMNIST/${name}/emnist-${name}-${type}-labels-idx1-ubyte`).slice(8);
    const images = fs.readFileSync(`./EMNIST/${name}/emnist-${name}-${type}-images-idx3-ubyte`).slice(16);
    for (let i = 0; i < labels.length; i++) {
        ds.push({
            output: {[labels[i]]: 1},
            input: rotate(scaleDown(images.slice(i * imageBytes, (i + 1) * imageBytes)))
        });
    }
    return ds;
}

function scaleDown(arr) {
    let newArr = [];
    for (let element of arr) {
        newArr.push(element / 255);
    }
    return newArr;
}

function drawToCli(image) {
    const shades = ' .:-=+*#%@';
    console.log(`+${'-'.repeat(28)}+`);
    for (let i = 0; i < 28; i++) {
        let line = '';
        for (let j = 0; j < 28; j++) {
            let value = image[i * 28 + j];
            value = value !== 0 ? value - 0.0001 : value;
            value = Math.floor(value * 10);
            line += shades[value];
        }
        console.log(`|${line}|`);
    }
    console.log(`+${'-'.repeat(28)}+`);
}

function rotate(arr) {
    let newArr = [];
    for (let i = 0; i < 28; i++) {
        for (let j = 0; j < 28; j++) {
            newArr[j * 28 + i] = arr[i * 28 + j];
        }
    }
    return newArr;
}

function saveNet(jsonObj, name = 'net') {
    fs.writeFileSync(`./json/${name}.json`, JSON.stringify(jsonObj));
    console.log(`Network was successfully saved to "${name}.json"`)
}

module.exports = {
    loadDataset,
    drawToCli,
    saveNet
}