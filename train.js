const brainjs = require("brainjs");
const {loadDataset, drawToCli, saveNet, loadNet} = require("./js/utils.js");
const datasets = {
    loaded: {},
    names: ['balanced', 'byclass', 'bymerge', 'digits', 'letters', 'mnist']
}

const net = new brainjs.NeuralNetwork();

// datasets.loaded.mnistTr = loadDataset();
// let trainData = [...datasets.loaded.mnistTr.slice(0, 100)];
// net.train(trainData, {
//     log: true
// });
// saveNet(net.toJSON(), 'mnist100');

net.fromJSON(loadNet('mnist100'))

datasets.loaded.mnistTe = loadDataset('test');
let testData = [...datasets.loaded.mnistTe];
for (let i = 0; i < testData.length; i++) {
    console.log(testData[i].output, net.run(testData[i].input));
    break;
}

// console.log(datasets.loaded.mnist[134]);




