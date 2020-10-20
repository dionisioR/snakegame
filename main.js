let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let diretction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {
    context.fillStyle = "lightgreen";
    //context.fillRect(EixoX, EixoY, Comprimento, Altura);
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarSnake() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && diretction != 'right') diretction = "left";
    if (event.keyCode == 38 && diretction != 'down') diretction = "up";
    if (event.keyCode == 39 && diretction != 'left') diretction = "right";
    if (event.keyCode == 40 && diretction != 'up') diretction = "down";
}

function iniciarJogo() {

    if (snake[0].x > 15 * box && diretction == 'right') snake[0].x = 0;
    if (snake[0].x < 0 && diretction == 'left') snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && diretction == 'down') snake[0].y = 0;
    if (snake[0].y < 0 && diretction == 'up') snake[0].y = 16 * box;

    for(let i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("FIM DE JOGO   :(");
        }
    }

    criarBG();
    criarSnake();
    drawFood();
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (diretction == 'right') snakeX += box;
    if (diretction == 'left') snakeX -= box;
    if (diretction == 'up') snakeY -= box;
    if (diretction == 'down') snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }else{
        food.x = Math.floor(Math.random()*15+1) * box;
        food.y = Math.floor(Math.random()*15+1) * box;
    }

    //snake.pop();  // retira o último elemento do array

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}


let jogo = setInterval(iniciarJogo, 250);
