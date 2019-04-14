
var racer;
var racerSize = 25;
var fieldW = 280;
var fieldH = 490;

function startGame() {
    racer = new component(racerSize, racerSize, "purple", fieldW/2-racerSize/2, fieldH-racerSize*2);
    gameField.start();
}

var gameField = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = fieldW;
        this.canvas.height = fieldH;
        this.context = this.canvas.getContext("2d");
		document.getElementById("game").appendChild(this.canvas);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = gameField.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }    
}

function updateGameArea() {
    gameField.clear();
    racer.newPos();    
    racer.update();
}

function moveup() {
    racer.speedY -= 1; 
}

function movedown() {
    racer.speedY += 1; 
}

function moveleft() {
    racer.speedX -= 1; 
}

function moveright() {
    racer.speedX += 1; 
}