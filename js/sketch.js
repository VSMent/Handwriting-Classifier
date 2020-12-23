let mainCanvas;
let gridResolution = 28;
let cellSize;

function setup() {
    setupCanvas();
    drawGrid(mainCanvas, gridResolution);
    fill(0);
    strokeWeight(cellSize);
}

function draw() {

    if (mouseIsPressed) {
        line(mouseX, mouseY, pmouseX, pmouseY);
    }
}

function setupCanvas() {
    mainCanvas = createCanvas(windowHeight, windowHeight);
    mainCanvas.style('right', `calc(${windowHeight}px - 100%)`);
    mainCanvas.style('position', `relative`);
    mainCanvas.style('border-left', `1px solid black`);
    mainCanvas.background(255);
}

function drawGrid(canvas, resolution) {
    cellSize = canvas.width / resolution;

    push();
    canvas.stroke(192, 192, 192, 192);
    canvas.strokeWeight(1);

    for (let x = cellSize; x < canvas.width; x += cellSize) {
        canvas.line(x, 0, x, canvas.height);
        canvas.line(0, x, canvas.width, x);
    }

    pop();
}