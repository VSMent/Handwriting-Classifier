const brainjs = require("brainjs");
const {loadDataset, drawToCli, saveNet, loadNet, topNPredictions} = require("./js/utils.js");
const datasets = {
    loaded: {},
    names: ['balanced', 'byclass', 'bymerge', 'digits', 'letters', 'mnist']
}

const net = new brainjs.NeuralNetwork();
const dateBefore = new Date();

datasets.loaded.balancedTr = loadDataset('train', 'balanced');
// let trainData = [...datasets.loaded.mnistTr.slice(0, 100)];
let trainData = [...datasets.loaded.balancedTr];
net.train(trainData, {
    log: true,
    errorThresh: 0.003,
});

const dateAfter = new Date();
const seconds = Math.floor((dateAfter - (dateBefore)) / 1000);
const minutes = Math.floor(seconds / 60);
const hours = Math.floor(minutes / 60);
console.log(`It took ${hours}:${minutes}:${seconds} to train net`)
saveNet(net.toJSON(), 'balanced_003');

// balanced
// Total errors: 3361 from 18800
// Error rate: 0.17877659574468086

net.fromJSON(loadNet('balanced_003'));

datasets.loaded.balancedTe = loadDataset('test', 'balanced');
let testData = [...datasets.loaded.balancedTe];
let error = 0;
for (let i = 0; i < testData.length; i++) {
    let o = Object.keys(testData[i].output)[0];
    let r = topNPredictions(net.run(testData[i].input), 1)[0][0];
    if (o !== r) {
        // console.log(o, topNPredictions(net.run(testData[i].input), 5));
        // drawToCli(testData[i].input);
        error++;
    }
}
console.log(`Total errors: ${error} from ${testData.length}\nError rate: ${error / testData.length}`);




