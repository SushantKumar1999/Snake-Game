//GAME LOOP INIT 
// DRAW 
//UPDATE
window.onload = init;

function init() {
    canvas = document.getElementById("mycanvas");
    pen = canvas.getContext('2d');
    W = canvas.width;
    H = canvas.height;
    score = 1;
    game_over = false;
    food = getrandomfood();
    // console.log(pen);
    snake = {
        init_length: 5,
        color: "blue",
        cells: [],
        direction: "right",
        createsnake: function () {
            for (var i = this.init_length - 1; i >= 0; i--) {
                this.cells.push({
                    x: i,
                    y: 0
                })
            }
        },
        drawsnake: function () {
            for (var i = 0; i < this.cells.length; i++) {
                pen.fillStyle = this.color;
                pen.strokeStyle = "black";
                pen.lineWidth = 3;
                pen.strokeRect(this.cells[i].x * 10, this.cells[i].y * 10, 10, 10);
                pen.fillRect(this.cells[i].x * 10, this.cells[i].y * 10, 10, 10);
            }
        },
        updatesnake: function () {

            var headX = this.cells[0].x;
            var headY = this.cells[0].y;


            if (headX == food.x && headY == food.y) {
                food = getrandomfood();
                score++
            } else {
                this.cells.pop();
            }
            if (this.direction == "right") {
                nextHeadX = headX + 1;
                nextheadY = headY;
            } else if (this.direction == "left") {
                nextHeadX = headX - 1;
                nextheadY = headY;
            } else if (this.direction == "down") {
                nextHeadX = headX;
                nextheadY = headY + 1;
            } else if (this.direction == "up") {
                nextHeadX = headX;
                nextheadY = headY - 1;
            }
            this.cells.unshift({
                x: nextHeadX,
                y: nextheadY
            });
            var last_x = Math.round(W / 10);
            var last_y = Math.round(H / 10);
            if (this.cells[0].y < -1 || this.cells[0].x < -1 || this.cells[0].y >= last_y ||
                this.cells[0].x >= last_x) {
                window.alert("game over and your score is: " + score);
                game_over = true;
            }

        }
    }

    snake.createsnake()
    //adding event listener
    function keypressed(e) {
        console.log(e);
        if (e.key === "l") {
            snake.direction = "right";
        } else if (e.key === "j") {
            snake.direction = "left";
        } else if (e.key === "k") {
            snake.direction = "down";
        } else if (e.key === "i") {
            snake.direction = "up";
        }
    }
    document.addEventListener('keypress', keypressed);
}

function draw() {
    // console.log("DRAW")
    pen.clearRect(0, 0, W, H);
    snake.drawsnake();
    //drawing food
    pen.fillStyle = food.color;
    pen.fillRect(food.x * 10, food.y * 10, 10, 10)
    pen.fillStyle = "white";
    pen.font = "14px Roboto";
    pen.fillText = ("SCORE : " + score, 20, 20);

}

function update() {
    snake.updatesnake();
}

function getrandomfood() {
    foodX = Math.round(Math.random() * (W - 10) / 10);
    foodY = Math.round(Math.random() * (H - 10) / 10);
    foodcolor = ["white ", "blue", "yellow", "brown"];
    var i = Math.round(Math.random() * foodcolor.length);
    var food = {
        x: foodX,
        y: foodY,
        color: foodcolor[i]
    }
    return food;
}

function gameloop() {
    draw();
    update();
    if (game_over == true) {
        clearInterval(f);
    }

}

// init();

var f = setInterval(gameloop, 100);
