/**
 * Created by Rostislav Kolev on 12-Oct-16.
 */
let friendlyItemsImages = ['res/steak.png', 'res/fries2.png', 'res/peanut.jpg'];

let mezeSpeed = 3;


function mezeCrashEffect() {
    reduceWaves();
}

function mezeHitBottom() {
    let food = Math.floor(Math.random() * 3); // връща 0 или 1. С това ще вземем индекса от масива със снимки на бири
    this.img.src = friendlyItemsImages[food]; // сменяме снимката на мезето
    this.x = Math.random() * 750;
    this.y = -100;
}

function mezeUpdate() {
    this.speedY = mezeSpeed;
    this.newPos();
}