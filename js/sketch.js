let mainCanvas, gridCanvas, dataCanvas;
let gridResolution = 28;
let canvasSize, cellSize;
let configs = {
    pixelate: {
        pd: undefined, // pixel density
        v: 4,// values per pixel
        pixelWithDensitySize: undefined,
        realValuesPerPixelSize: undefined,
        realValuesPerRowSize: undefined
    }
};

function setup() {
    setupCanvases();
    setupConfigs();
    addControls();
    fill(0);
}

function draw() {

    if (mouseIsPressed && mouseButton === LEFT && (mouseX >= 0 && mouseY >= 0)) {
        dataCanvas.line(mouseX, mouseY, pmouseX, pmouseY);
        image(dataCanvas, 0, 0);
    }
}

function setupCanvases() {
    canvasSize = floor(windowHeight / gridResolution) * gridResolution;
    // Mian canvas
    mainCanvas = createCanvas(canvasSize, canvasSize);
    mainCanvas.style('position', `relative`);
    mainCanvas.style('right', `calc(${canvasSize}px - 100vw)`);
    mainCanvas.style('top', `calc((100vh - ${canvasSize}px) / 2 )`);
    mainCanvas.style('border', `1px solid black`);
    background(255);

    cellSize = mainCanvas.width / gridResolution;

    // Grid canvas
    gridCanvas = createGraphics(mainCanvas.width, mainCanvas.height);
    gridCanvas.stroke(192, 192, 192, 192);
    gridCanvas.strokeWeight(1);
    for (let i = cellSize; i < gridCanvas.width; i += cellSize) {
        gridCanvas.line(i, 0, i, gridCanvas.height);
        gridCanvas.line(0, i, gridCanvas.width, i);
    }
    image(gridCanvas, 0, 0);

    // Data canvas
    dataCanvas = createGraphics(mainCanvas.width, mainCanvas.height);
    dataCanvas.strokeWeight(cellSize);
    dataCanvas.stroke(0);

}

function setupConfigs() {
    configs.pixelate.pd = pixelDensity();
    configs.pixelate.pixelWithDensitySize = cellSize * configs.pixelate.pd;
    configs.pixelate.realValuesPerPixelSize = configs.pixelate.pixelWithDensitySize * configs.pixelate.v;
    configs.pixelate.realValuesPerRowSize = gridResolution * configs.pixelate.realValuesPerPixelSize;
    // let realValuesPerPixelsRow = realValuesPerRowSize * realValuesPerPixelSize;
}

function addControls() {
    let clearButton = createButton('Clear');
    clearButton.mousePressed(clearCanvas);
    clearButton.position(19, 19);

    let saveButton = createButton('Save');
    saveButton.mousePressed(saveImage);
    saveButton.position(19, 45);

    let pixelateButton = createButton('Pixelate');
    pixelateButton.mousePressed(pixelateImage);
    pixelateButton.position(19, 70);
}

function clearCanvas() {
    mainCanvas.background(255);
    image(gridCanvas, 0, 0);
    dataCanvas.clear();
}

function saveImage() {
    saveCanvas(dataCanvas, 'dataCanvas');
}

function pixelateImage() {
    dataCanvas.loadPixels();
    let squarePixels = [];
    for (let y = 0; y < gridResolution; y++) {
        for (let x = 0; x < gridResolution; x++) {
            let pixelValue = getPixel(x, y, false);
            squarePixels.push(pixelValue);
            drawPixel(x, y, pixelValue, false);
        }
    }
    dataCanvas.updatePixels();
    image(dataCanvas, 0, 0);
    image(gridCanvas, 0, 0);
    console.log(squarePixels);
    return squarePixels;
}

function drawPixel(x, y, color = 0, standalone = true) {
    if (!(x >= 0 && y >= 0 && x < gridResolution && y < gridResolution)) {
        return;
    }
    color = map(color, 0, 1, 0, 255);
    let v = configs.pixelate.v;
    let pixelWithDensitySize = configs.pixelate.pixelWithDensitySize;
    let realValuesPerPixelSize = configs.pixelate.realValuesPerPixelSize;
    let realValuesPerRowSize = configs.pixelate.realValuesPerRowSize;
    standalone && dataCanvas.loadPixels();
    // todo draw more efficiently (less loopping)
    for (let i = realValuesPerRowSize * pixelWithDensitySize * y + v - 1; i < realValuesPerRowSize * pixelWithDensitySize * (y + 1); i += v) {
        if (i % (realValuesPerRowSize) > realValuesPerPixelSize * x && i % (realValuesPerRowSize) < realValuesPerPixelSize * (x + 1)) {
            dataCanvas.pixels[i] = 255;
            dataCanvas.pixels[i - 1] = blue(255 - color);
            dataCanvas.pixels[i - 2] = green(255 - color);
            dataCanvas.pixels[i - 3] = red(255 - color);
        }
    }
    if (standalone) {
        dataCanvas.updatePixels();
        image(dataCanvas, 0, 0);
    }
}

function getPixel(x, y, standalone = true) {
    if (!(x >= 0 && y >= 0 && x < gridResolution && y < gridResolution)) {
        return;
    }
    let v = configs.pixelate.v;
    let pixelWithDensitySize = configs.pixelate.pixelWithDensitySize;
    let realValuesPerPixelSize = configs.pixelate.realValuesPerPixelSize;
    let realValuesPerRowSize = configs.pixelate.realValuesPerRowSize;
    standalone && dataCanvas.loadPixels();
    let value = 0;
    for (let i = realValuesPerRowSize * pixelWithDensitySize * y + v - 1; i < realValuesPerRowSize * pixelWithDensitySize * (y + 1); i += v) {
        if (i % (realValuesPerRowSize) > realValuesPerPixelSize * x && i % (realValuesPerRowSize) < realValuesPerPixelSize * (x + 1)) {
            value += map(dataCanvas.pixels[i], 0, 255, 0, 1);
        }
    }
    return value / v / cellSize / cellSize;
}