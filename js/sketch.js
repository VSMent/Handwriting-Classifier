// provide optional config object (or undefined). Defaults shown.
const config = {
    binaryThresh: 0.5,
    hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
    activation: 'sigmoid', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
    leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu'
};

// create a simple feed forward neural network with backpropagation
const net = new brain.NeuralNetwork(config);

net.train([
    { input: [0, 0], output: [0] },
    { input: [0, 1], output: [1] },
    { input: [1, 0], output: [1] },
    { input: [1, 1], output: [0] },
]);

const output = net.run([1, 0]); // [0.987]
console.log(output);

// TODO learn
// TODO https://www.youtube.com/watch?v=HerCR8bw_GE&list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA&ab_channel=TheCodingTrain   p5 js
// TODO https://www.youtube.com/watch?v=XJ7HLz9VYz0&list=PLRqwX-V7Uu6Y7MdSCaIfsxc561QI0U0Tb&index=1&ab_channel=TheCodingTrain   ml
// TODO https://www.youtube.com/watch?v=UaKab6h9Z0I&list=PLRqwX-V7Uu6YPSwT06y_AEYTqIwbeam3y&index=25&ab_channel=TheCodingTrain  work with pixels
// TODO https://www.youtube.com/watch?v=6E6XecoTRVo  brain.js

// TODO build NN

// TODO train
// TODO mnist
// TODO other datasets?
// TODO user input?

// TODO publish

// TODO mobile friendly?