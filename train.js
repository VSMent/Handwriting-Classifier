const brainjs = require("brainjs");
const {loadDataset, drawToCli, saveNet, loadNet, topNPredictions} = require("./js/utils.js");
const datasets = {
    loaded: {},
    names: ['balanced', 'byclass', 'bymerge', 'digits', 'letters', 'mnist']
}

const net = new brainjs.NeuralNetwork();

// datasets.loaded.mnistTr = loadDataset();
// let trainData = [...datasets.loaded.mnistTr.slice(0, 100)];
// net.train(trainData, {
//     log: true,
//     errorThresh: 0.005
// });
// saveNet(net.toJSON(), 'mnist100');

net.fromJSON(loadNet('mnist'))

datasets.loaded.mnistTe = loadDataset('test');
let testData = [...datasets.loaded.mnistTe];
let error = 0;
for (let i = 0; i < testData.length; i++) {
    let o = Object.keys(testData[i].output)[0];
    let r = topNPredictions(net.run(testData[i].input), 1)[0][0];
    if (o !== r) {
        console.log(o, topNPredictions(net.run(testData[i].input), 5));
        drawToCli(testData[i].input);
        error++;
    }
}
console.log(`Total errors: ${error} from ${testData.length}\nError rate: ${error / testData.length}`);




