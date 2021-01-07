const brainjs = require("brainjs");
const {loadDataset} = require("./js/utils.js");
const datasets = {
    loaded: {},
    names: ['balanced', 'byclass', 'bymerge', 'digits', 'letters', 'mnist']
}

const net = new brainjs.NeuralNetwork();
datasets.loaded.mnist = loadDataset();
console.log(datasets.loaded.mnist[134]);




