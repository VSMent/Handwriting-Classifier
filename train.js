const brainjs = require("brainjs");
const {loadDataset, drawToCli, saveNet} = require("./js/utils.js");
const datasets = {
    loaded: {},
    names: ['balanced', 'byclass', 'bymerge', 'digits', 'letters', 'mnist']
}

const net = new brainjs.NeuralNetwork();
datasets.loaded.mnistTr = loadDataset();
let trainData = [...datasets.loaded.mnistTr.slice(0, 100)];
net.train(trainData, {
    log: true
});

saveNet(net.toJSON(),'mnist100');
// console.log(datasets.loaded.mnist[134]);




