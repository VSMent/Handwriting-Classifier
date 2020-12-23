let mainCanvas;
let gridResolution = 28;

function setup() {
    setupCanvas();
    drawGrid(mainCanvas, gridResolution);
}

function draw() {
    // background(0);
}

function setupCanvas() {
    mainCanvas = createCanvas(windowHeight, windowHeight);
    mainCanvas.style('right', `calc(${windowHeight}px - 100%)`);
    mainCanvas.style('position', `relative`);
    mainCanvas.style('border-left', `1px solid black`);
    mainCanvas.background(255);
}

function drawGrid(canvas, resolution) {
    let cWStep = canvas.width / resolution;
    let cHStep = canvas.height / resolution;

    push();
    canvas.stroke(192, 192, 192);
    canvas.strokeWeight(1);

    for (let x = cWStep; x < canvas.width; x += cWStep) {
        canvas.line(x, 0, x, canvas.height);
    }
    for (let y = cHStep; y < canvas.height; y += cHStep) {
        canvas.line(0, y, canvas.width, y);
    }

    pop();
}