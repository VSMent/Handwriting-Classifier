let mainCanvas, gridCanvas, dataCanvas;
let gridResolution = 28;
let cellSize;

function setup() {
    setupCanvases();
    addControls();
    fill(0);
}

function draw() {

    if (mouseIsPressed && (mouseX >= 0 && mouseY >= 0)) {
        dataCanvas.line(mouseX, mouseY, pmouseX, pmouseY);
        image(dataCanvas, 0, 0);
    }
}

function setupCanvases() {
    // Mian canvas
    mainCanvas = createCanvas(windowHeight, windowHeight);
    mainCanvas.style('right', `calc(${windowHeight}px - 100%)`);
    mainCanvas.style('position', `relative`);
    mainCanvas.style('border-left', `1px solid black`);
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
}

function clearCanvas() {
    mainCanvas.background(255);
    image(gridCanvas, 0, 0);
    dataCanvas.clear();
}

function saveImage() {
    saveCanvas(dataCanvas, 'dataCanvas');
}