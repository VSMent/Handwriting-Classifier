// provide optional config object (or undefined). Defaults shown.
const config = {
    binaryThresh: 0.5,
    hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
    activation: 'sigmoid', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
    leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu'
};

// function toArray(string) { // normalize
//     if (string.length !== 7 * 7) throw new Error('string in wrong size');
//     return string.split('').map(toNumber);
// }
//
// function toNumber(character) {
//     return character === '#' ? 1 : 0;
// }
//
// function logImage(array) {
//     if (array.length !== 7 * 7) throw new Error('array in wrong size');
//     for (let i = 0; i < 7; i++) {
//         let str = '';
//         for (let j = 0; j < 7; j++) {
//             str += array[i * 7 + j];
//         }
//         console.log(`'${str}'`);
//     }
// }

// const zero = toArray(
//     '#######' +
//     '#     #' +
//     '#     #' +
//     '#     #' +
//     '#     #' +
//     '#     #' +
//     '#######'
// );
// const one = toArray(
//     '   #   ' +
//     '   #   ' +
//     '   #   ' +
//     '   #   ' +
//     '   #   ' +
//     '   #   ' +
//     '   #   '
// );
// const two = toArray(
//     '#######' +
//     '#     #' +
//     '      #' +
//     '     # ' +
//     '   #   ' +
//     ' #     ' +
//     '#######'
// );
// const three = toArray(
//     '#######' +
//     '      #' +
//     '      #' +
//     ' ######' +
//     '      #' +
//     '      #' +
//     '#######'
// );
// const four = toArray(
//     '#     #' +
//     '#     #' +
//     '#     #' +
//     '#######' +
//     '      #' +
//     '      #' +
//     '      #'
// );
// const five = toArray(
//     '#######' +
//     '#      ' +
//     '#      ' +
//     '#######' +
//     '      #' +
//     '      #' +
//     '#######'
// );
// const six = toArray(
//     '      #' +
//     '    #  ' +
//     '  #    ' +
//     ' ######' +
//     '#     #' +
//     '#     #' +
//     '#######'
// );
// const seven = toArray(
//     '#######' +
//     '     # ' +
//     '    #  ' +
//     '   #   ' +
//     '  #    ' +
//     ' #     ' +
//     '#      '
// );
// const eight = toArray(
//     '#######' +
//     '#     #' +
//     '#     #' +
//     '#######' +
//     '#     #' +
//     '#     #' +
//     '#######'
// );
// const nine = toArray(
//     '#######' +
//     '#     #' +
//     '#     #' +
//     '###### ' +
//     '    #  ' +
//     '   #   ' +
//     ' #     '
// );
// create a simple feed forward neural network with backpropagation
const net = new brain.NeuralNetwork();
// const trainingData = [
//     {input: zero, output: {zero: 1}},
//     {input: one, output: {one: 1}},
//     {input: two, output: {two: 1}},
//     {input: three, output: {three: 1}},
//     {input: four, output: {four: 1}},
//     {input: five, output: {five: 1}},
//     {input: six, output: {six: 1}},
//     {input: seven, output: {seven: 1}},
//     {input: eight, output: {eight: 1}},
//     {input: nine, output: {nine: 1}}
// ];

// net.train(trainingData);

// const output = net.run([1, 0]); // [0.987]
// console.log(output);
// const result = brain.likely(toArray(
//     '#######' +
//     '#     #' +
//     '#     #' +
//     '##  ###' +
//     '#     #' +
//     '#     #' +
//     '### ###'
// ), net);
// console.log(result);
// const randomData = [
//     "   ####  ####  ###  ## # ## #  ## #    # ##     #",
//     "##  ## ###     # # #      # #  #  #    # #   ### ",
//     "## ## ##    ### ###      # # # #   ##  ## ##    #",
//     "## ## # ##    #   ##    # #   #   # # ##  #    ##",
//     "  # ##     ## # ###  # ##    ## #####  # ##  ### ",
//     "            ## #  ## # ##   # ##   # #  # ##    #",
//     "   # #  #### # # ###  ## # ### # ##   ## ##    # ",
//     "   ## ## ##  # ## # # #### ##  # ############ #  ",
//     "#    ##  ## ## #  # #    ####  # ## #    #  ##   ",
//     "### ## #  # # ##  ##  ##  # #   ## ##  # #   ##  ",
// ];
// for (const randomDatum of randomData) {
//     console.log(brain.likely(toArray(randomDatum), net));
//     console.log(net.run(toArray(randomDatum)));
//     logImage(randomDatum);
//
// }


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