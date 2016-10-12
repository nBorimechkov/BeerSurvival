function defaultDraw() {
    let c = document.getElementById('canvas'),
        ctx = c.getContext('2d');
    ctx.drawImage(this.img, this.x, this.y, 50, 70);
}

function removeElementFromArray(element) {
    let index = items.findIndex(indexOfElement);

    if(index != -1)
    {
        items.splice(index, 1);
    }

    function indexOfElement(el, index, array) {
        if (el.y == element.y) {
            return true;
        }

        return false;
    }
}

function keyboardHandler(event) {
    if (event.code == "ArrowLeft") {
        if (homer.x > 10) {
            homer.x -= 15;
        }
        homer.img = document.getElementById(homerGoingRight);
        x--;                              // change the x to take different parts of the sprite
        if (x < 0) x = 15;                // x is between 0 and 15
    }
    else if (event.code == "ArrowRight") {
        if (homer.x < 720) {
            homer.x += 15;
        }
        homer.img = document.getElementById(homerGoingLeft);
        x++;                            // change the x to take different parts of the sprite
        if (x >= 16) x = 0;             // x is between 0 and 15
    }
}

function generateItem() {
    myGameArea.beerCounter++;
    if (myGameArea.beersInGame < 3 && myGameArea.beerCounter >= myGameArea.counterToReach) {
        let beer = Math.round(Math.random()); // връща 0 или 1. С това ще вземем индекса от масива със снимки на бири
        items.push(
            new component(document.getElementById(enemyItemsImages[beer]),
                Math.random() * 700, -450,
                0,
                beerSpeed,
                beerCrashEffect,
                beerHitBottomEffect,
                defaultDraw,
                beerUpdate));

        myGameArea.beersInGame++;
        myGameArea.beerCounter = 0;
    }

    if (myGameArea.foodsInGame < 1) {
        let food = Math.floor(Math.random() * 3); // връща 0 или 1. С това ще вземем индекса от масива със снимки на бири
        items.push(new component(document.getElementById(friendlyItemsImages[food]),
            Math.random() * 700,
            0,
            0,
            mezeSpeed,
            mezeCrashEffect,
            mezeHitBottom,
            defaultDraw,
            mezeUpdate));

        myGameArea.foodsInGame++;
    }
}


function component(img, x, y, speedX, speedY, crashEffect, hitBottomEffect, draw, update) {
    this.speedX = speedX;
    this.speedY = speedY;
    this.x = x;
    this.y = y;
    this.img = img;
    this.update = update;
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.hitBottom != undefined)
            this.hitBottom();
    }
    this.hitBottom = function () {
        var rockbottom = myGameArea.canvas.height - this.img.height;
        if (this.y > rockbottom) {
            this.hitBottomEffect();
        }
    }
    this.crashWith = function (otherobj) {
        let myleft = this.x;
        let myright = this.x + (this.img.width);
        let mytop = this.y;
        let mybottom = this.y + (this.img.height);
        let otherleft = otherobj.x;
        let otherright = otherobj.x + (otherobj.img.width);
        let othertop = otherobj.y;
        let otherbottom = otherobj.y + (otherobj.img.height);
        let crash = false;
        
        if (myright > otherleft && myleft < otherleft && otherbottom > mytop)
        {
            crash = true;
        }

        return crash;
    }
    this.crashEffect = crashEffect; // функция да дали ще намалява или увеличава вълната.
    this.hitBottomEffect = hitBottomEffect;
    this.draw = draw;
}

function startTimer()
{
    setInterval(function () {
        if(lastSecondsOfBreath != undefined)
        {
            secondsAsMessage = parseInt(lastSecondsOfBreath % 60, 10);
            secondsAsMessage = secondsAsMessage < 10 ? "0" + secondsAsMessage : secondsAsMessage;

            if (--lastSecondsOfBreath < 0) {
                gameOver();
            }
        }           
    }, 1000);
}