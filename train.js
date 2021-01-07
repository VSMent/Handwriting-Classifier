const brainjs = require("brainjs");
const {loadDataset,drawToCli} = require("./js/utils.js");
const datasets = {
    loaded: {},
    names: ['balanced', 'byclass', 'bymerge', 'digits', 'letters', 'mnist']
}

const net = new brainjs.NeuralNetwork();
datasets.loaded.mnist = loadDataset();
drawToCli(datasets.loaded.mnist[5].input);
console.log(datasets.loaded.mnist[5].output);
// console.log(datasets.loaded.mnist[134]);




