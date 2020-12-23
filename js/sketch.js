let mainCanvas, gridCanvas, dataCanvas;
let gridResolution = 28;
let canvasSize, cellSize;
let configs = {
    pixelate: {
        set: false,
        pd, // pixel density
        v: 4,// values per pixel
        pixelWithDensitySize,
        realValuesPerPixelSize,
        realValuesPerRowSize
    }
};

function setup() {
    setupCanvases();
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
    // mainCanvas.style('width', `${canvasSize*10}px`);
    // mainCanvas.style('height', `${canvasSize*10}px`);
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
    if (!configs.pixelate.set) {
        configs.pixelate.set = true;
        configs.pixelate.pd = pixelDensity();
        configs.pixelate.pixelWithDensitySize = cellSize * configs.pixelate.pd;
        configs.pixelate.realValuesPerPixelSize = configs.pixelate.pixelWithDensitySize * configs.pixelate.v;
        configs.pixelate.realValuesPerRowSize = gridResolution * configs.pixelate.realValuesPerPixelSize;
        // let realValuesPerPixelsRow = realValuesPerRowSize * realValuesPerPixelSize;
    }

    let v = configs.pixelate.v;
    let pixelWithDensitySize = configs.pixelate.pixelWithDensitySize;
    let realValuesPerPixelSize = configs.pixelate.realValuesPerPixelSize;
    let realValuesPerRowSize = configs.pixelate.realValuesPerRowSize;

    dataCanvas.loadPixels();
    let canvasPixelCount = dataCanvas.pixels.length;
    let squarePixels = [];
    for (let i = v - 1; i <= canvasPixelCount; i += v) {
        // r -3
        // g -2
        // b -1
        // a

        if (
            (i % (realValuesPerRowSize) > realValuesPerPixelSize * 9 && i % (realValuesPerRowSize) < realValuesPerPixelSize * 10)
            && (i > realValuesPerRowSize * pixelWithDensitySize * 5 && i < realValuesPerRowSize * pixelWithDensitySize * 6)
        ) {
            dataCanvas.pixels[i] = 255;
            dataCanvas.pixels[i - 1] = 0;
            dataCanvas.pixels[i - 2] = 0;
            dataCanvas.pixels[i - 3] = 255;
            squarePixels.push(i);
        }
    }
    dataCanvas.updatePixels();
    image(dataCanvas, 0, 0);
}