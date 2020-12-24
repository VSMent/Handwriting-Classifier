let conf = {
    mainCanvas: undefined,
    gridCanvas: undefined,
    dataCanvas: undefined,
    gridResolution: 28,
    canvasSize: undefined,
    cellSize: undefined,
    pix: {
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
        conf.dataCanvas.line(mouseX, mouseY, pmouseX, pmouseY);
        image(conf.dataCanvas, 0, 0);
    }
}

function setupCanvases() {
    conf.canvasSize = floor(windowHeight / conf.gridResolution) * conf.gridResolution;
    // Mian canvas
    conf.mainCanvas = createCanvas(conf.canvasSize, conf.canvasSize);
    conf.mainCanvas.style('position', `relative`);
    conf.mainCanvas.style('right', `calc(${conf.canvasSize}px - 100vw)`);
    conf.mainCanvas.style('top', `calc((100vh - ${conf.canvasSize}px) / 2 )`);
    conf.mainCanvas.style('border', `1px solid black`);
    background(255);

    conf.cellSize = conf.mainCanvas.width / conf.gridResolution;

    // Grid canvas
    conf.gridCanvas = createGraphics(conf.mainCanvas.width, conf.mainCanvas.height);
    conf.gridCanvas.stroke(192, 192, 192, 192);
    conf.gridCanvas.strokeWeight(1);
    for (let i = conf.cellSize; i < conf.gridCanvas.width; i += conf.cellSize) {
        conf.gridCanvas.line(i, 0, i, conf.gridCanvas.height);
        conf.gridCanvas.line(0, i, conf.gridCanvas.width, i);
    }
    image(conf.gridCanvas, 0, 0);

    // Data canvas
    conf.dataCanvas = createGraphics(conf.mainCanvas.width, conf.mainCanvas.height);
    conf.dataCanvas.strokeWeight(conf.cellSize);
    conf.dataCanvas.stroke(0);

}

function setupConfigs() {
    conf.pix.pd = pixelDensity();
    conf.pix.pixelWithDensitySize = conf.cellSize * conf.pix.pd;
    conf.pix.realValuesPerPixelSize = conf.pix.pixelWithDensitySize * conf.pix.v;
    conf.pix.realValuesPerRowSize = conf.gridResolution * conf.pix.realValuesPerPixelSize;
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
    conf.mainCanvas.background(255);
    image(conf.gridCanvas, 0, 0);
    conf.dataCanvas.clear();
}

function saveImage() {
    saveCanvas(conf.dataCanvas, 'dataCanvas');
}

function pixelateImage() {
    conf.dataCanvas.loadPixels();
    let squarePixels = [];
    for (let y = 0; y < conf.gridResolution; y++) {
        for (let x = 0; x < conf.gridResolution; x++) {
            let pixelValue = getPixel(x, y, false);
            squarePixels.push(pixelValue);
            drawPixel(x, y, pixelValue, false);
        }
    }
    conf.dataCanvas.updatePixels();
    image(conf.dataCanvas, 0, 0);
    image(conf.gridCanvas, 0, 0);
    console.log(squarePixels);
    return squarePixels;
}

function drawPixel(x, y, color = 0, standalone = true) {
    if (!(x >= 0 && y >= 0 && x < conf.gridResolution && y < conf.gridResolution)) {
        return;
    }
    color = map(color, 0, 1, 0, 255);
    let v = conf.pix.v;
    let pixelWithDensitySize = conf.pix.pixelWithDensitySize;
    let realValuesPerPixelSize = conf.pix.realValuesPerPixelSize;
    let realValuesPerRowSize = conf.pix.realValuesPerRowSize;
    standalone && conf.dataCanvas.loadPixels();
    // todo draw more efficiently (less loopping)
    for (let i = realValuesPerRowSize * pixelWithDensitySize * y + v - 1; i < realValuesPerRowSize * pixelWithDensitySize * (y + 1); i += v) {
        if (i % (realValuesPerRowSize) > realValuesPerPixelSize * x && i % (realValuesPerRowSize) < realValuesPerPixelSize * (x + 1)) {
            conf.dataCanvas.pixels[i] = 255;
            conf.dataCanvas.pixels[i - 1] = blue(255 - color);
            conf.dataCanvas.pixels[i - 2] = green(255 - color);
            conf.dataCanvas.pixels[i - 3] = red(255 - color);
        }
    }
    if (standalone) {
        conf.dataCanvas.updatePixels();
        image(conf.dataCanvas, 0, 0);
    }
}

function getPixel(x, y, standalone = true) {
    if (!(x >= 0 && y >= 0 && x < conf.gridResolution && y < conf.gridResolution)) {
        return;
    }
    let v = conf.pix.v;
    let pixelWithDensitySize = conf.pix.pixelWithDensitySize;
    let realValuesPerPixelSize = conf.pix.realValuesPerPixelSize;
    let realValuesPerRowSize = conf.pix.realValuesPerRowSize;
    standalone && conf.dataCanvas.loadPixels();
    let value = 0;
    for (let i = realValuesPerRowSize * pixelWithDensitySize * y + v - 1; i < realValuesPerRowSize * pixelWithDensitySize * (y + 1); i += v) {
        if (i % (realValuesPerRowSize) > realValuesPerPixelSize * x && i % (realValuesPerRowSize) < realValuesPerPixelSize * (x + 1)) {
            value += map(conf.dataCanvas.pixels[i], 0, 255, 0, 1);
        }
    }
    return value / v / conf.cellSize / conf.cellSize;
}