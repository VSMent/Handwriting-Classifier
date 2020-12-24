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
    for (let y = 0; y <= gridResolution; y++) {
        for (let x = 0; x <= gridResolution; x += 2) {
            if (y % 2 === 0) {
                drawPixel(x, y, x * y / 3 - 6, false);
            } else {
                drawPixel(x + 1, y, x * y / 3 - 6, false);
            }
        }
    }
    dataCanvas.updatePixels();
    image(dataCanvas, 0, 0);
}

function drawPixel(x, y, color = 0, standalone = true) {
    if (!(x >= 0 && y >= 0 && x < gridResolution && y < gridResolution)) {
        return;
    }
    let v = configs.pixelate.v;
    let pixelWithDensitySize = configs.pixelate.pixelWithDensitySize;
    let realValuesPerPixelSize = configs.pixelate.realValuesPerPixelSize;
    let realValuesPerRowSize = configs.pixelate.realValuesPerRowSize;
    standalone && dataCanvas.loadPixels();
    for (let i = realValuesPerRowSize * pixelWithDensitySize * y + v - 1; i < realValuesPerRowSize * pixelWithDensitySize * (y + 1); i += v) {
        if (i % (realValuesPerRowSize) > realValuesPerPixelSize * x && i % (realValuesPerRowSize) < realValuesPerPixelSize * (x + 1)) {
            dataCanvas.pixels[i] = 255;
            dataCanvas.pixels[i - 1] = blue(color);
            dataCanvas.pixels[i - 2] = green(color);
            dataCanvas.pixels[i - 3] = red(color);
        }
    }
    if (standalone) {
        dataCanvas.updatePixels();
        image(dataCanvas, 0, 0);
    }
}