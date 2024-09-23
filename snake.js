const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let snake = [{x: 10, y: 10}]; // Yılanın başlangıç konumu
let direction = {x: 1, y: 0}; // Yılanın başlangıç yönü
let fruit = {x: 5, y: 5}; // Meyve konumu
let score = 0;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFruit();
    moveSnake();
    checkCollision();
}

function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x * 20, segment.y * 20, 18, 18);
    });
}

function drawFruit() {
    ctx.fillStyle = 'red';
    ctx.fillRect(fruit.x * 20, fruit.y * 20, 18, 18);
}

function moveSnake() {
    const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
    snake.unshift(head);
    if (head.x === fruit.x && head.y === fruit.y) {
        score++;
        placeFruit();
    } else {
        snake.pop();
    }
}

function placeFruit() {
    fruit.x = Math.floor(Math.random() * (canvas.width / 20));
    fruit.y = Math.floor(Math.random() * (canvas.height / 20));
}

function checkCollision() {
    // Duvar çarpışması veya kendine çarpma kontrolü
    if (snake[0].x < 0 || snake[0].x >= canvas.width / 20 || 
        snake[0].y < 0 || snake[0].y >= canvas.height / 20 ||
        snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y)) {
        
        // Oyun bitti mesajı
        alert("Oyun Bitti! Puanınız: " + score);
        
        // Oyunu yeniden başlatma
        resetGame();
    }
}

function resetGame() {
    // Yılanın ve meyvenin başlangıç durumunu sıfırlama
    snake = [{x: 10, y: 10}];
    direction = {x: 1, y: 0};
    score = 0;
    placeFruit();
}


window.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
            direction = {x: 0, y: -1};
            break;
        case 'ArrowDown':
            direction = {x: 0, y: 1};
            break;
        case 'ArrowLeft':
            direction = {x: -1, y: 0};
            break;
        case 'ArrowRight':
            direction = {x: 1, y: 0};
            break;
    }
});

setInterval(draw, 100); // Oyunu 100 ms'de bir güncelle
