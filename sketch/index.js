const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 50;

let painting = false;
let tool = 'pen';
let color = '#000000';
let brushSize = 2;
let startX, startY;

function startPosition(e) {
    painting = true;
    startX = e.clientX;
    startY = e.clientY - 50;
    if (tool === 'pen' || tool === 'eraser') {
        draw(e);
    }
}

function endPosition() {
    painting = false;
    ctx.beginPath();
}

function draw(e) {
    if (!painting) return;

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';

    if (tool === 'pen') {
        ctx.strokeStyle = color;
    } else if (tool === 'eraser') {
        ctx.strokeStyle = '#ffffff';
    }

    ctx.lineTo(e.clientX, e.clientY - 50);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY - 50);
}

function drawShape(e) {
    if (!painting) return;

    const currentX = e.clientX;
    const currentY = e.clientY - 50;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = color;

    if (tool === 'rectangle') {
        ctx.strokeRect(startX, startY, currentX - startX, currentY - startY);
    } else if (tool === 'circle') {
        ctx.beginPath();
        const radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
        ctx.arc(startX, startY, radius, 0, Math.PI * 2);
        ctx.stroke();
    }
}

function addText(e) {
    if (!painting) return;

    const text = prompt('Enter text:');
    if (text) {
        ctx.font = `${brushSize * 5}px Arial`;
        ctx.fillStyle = color;
        ctx.fillText(text, e.clientX, e.clientY - 50);
    }
    painting = false;
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', (e) => {
    if (tool === 'pen' || tool === 'eraser') {
        draw(e);
    } else if (tool === 'rectangle' || tool === 'circle') {
        drawShape(e);
    }
});

canvas.addEventListener('click', (e) => {
    if (tool === 'text') {
        addText(e);
    }
});

document.getElementById('pen').addEventListener('click', () => {
    tool = 'pen';
});

document.getElementById('eraser').addEventListener('click', () => {
    tool = 'eraser';
});

document.getElementById('rectangle').addEventListener('click', () => {
    tool = 'rectangle';
});

document.getElementById('circle').addEventListener('click', () => {
    tool = 'circle';
});

document.getElementById('text').addEventListener('click', () => {
    tool = 'text';
});

document.getElementById('color-picker').addEventListener('input', (e) => {
    color = e.target.value;
});

document.getElementById('brush-size').addEventListener('input', (e) => {
    brushSize = e.target.value;
});

document.getElementById('clear').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
