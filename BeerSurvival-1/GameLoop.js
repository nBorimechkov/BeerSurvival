/**
 * Created by Rostislav Kolev on 10-Oct-16.
 */

let homer;
let items = [];
let lastSecondsOfBreath = undefined;

window.requestAnimFrame = function () { return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (a) { window.setTimeout(a, 1E3 / 60) } }();

function startGame() {
    homer = new component(document.getElementById(homerGoingRight),
        350,
        460,
        homerSpeedX,
        homerSpeedY,
        undefined,
        undefined,
        homerDraw,
        homerUpdate);

    window.addEventListener('keydown', keyboardHandler);
    myGameArea.start();
}

var myGameArea = {
    canvas: document.getElementById('canvas'),
    start: function () {
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.context.font = '20px monospace';
        this.beersInGame = 0;
        this.foodsInGame = 0;
        this.beersDrunk = 0;
        this.beerCounter = 0;
        this.counterToReach = 100;
        this.beersDropped = 0;
        this.level = 1;

        updateGameArea();
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function updateGameArea() {

    for (let i = 0; i < items.length; i += 1) {
        if (homer.crashWith(items[i])) {
            items[i].crashEffect();
        }
    }
    myGameArea.clear();

    generateItem();
    for (let i = 0; i < items.length; i++) {
        items[i].draw();
        items[i].update();
    }

    homer.draw();
    homerUpdate()
    loop();

    if (myGameArea.beersDrunk < 10) {
        beerSpeed = 2;      // 1 level               
    }
    else if (myGameArea.beersDrunk < 20) {
        beerSpeed = 3;         // 2 level
        myGameArea.level = 2;
    }

    else if (myGameArea.beersDrunk < 30) {
        beerSpeed = 4;     	 // 3 level
        myGameArea.level = 3;
    }
    else if (myGameArea.beersDrunk < 50) {
        beerSpeed = 5;          // 4 level
        myGameArea.level = 4;
    }
    else {
        beerSpeed = 6;          // 5 level
        myGameArea.level = 5;
    }

    if (opt.level >= 0.08) // почнал си да се давиш
    {
        if (lastSecondsOfBreath == undefined) // ако все още не е пуснат 
        {
            lastSecondsOfBreath = 10;
            startTimer();
        }
    }
    else {
        lastSecondsOfBreath = undefined; // спасил си се
    }

    myGameArea.context.fillStyle = "black";
    myGameArea.context.fillText(`Total Beers Drunk: ${myGameArea.beersDrunk}`, 15, 25);
    myGameArea.context.fillText(`Total Beers Dropped: ${myGameArea.beersDropped}`, 15, 45);
    myGameArea.context.fillText(`Level ${myGameArea.level}`, 350, 35);
    window.requestAnimFrame(updateGameArea, myGameArea.context);
}

function gameOver() {
    myGameArea.context.drawImage(document.getElementById('gameOver'), 0, 0);
    myGameArea.context.fillStyle = "black";
    myGameArea.context.fillText(`GAME OVER: ${myGameArea.beersDrunk}`, 350, 250);
}
