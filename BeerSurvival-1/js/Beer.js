/**
 * Created by Rostislav Kolev on 12-Oct-16.
 */
let enemyItemsImages = ['res/beer_2.png', 'res/beer_1.png'];

let beerSpeed = 2;

function beerCrashEffect() {
    myGameArea.beersDrunk++;
}

function beerHitBottomEffect() {
    increaseWaves();
    myGameArea.beersInGame--;
    myGameArea.beersDropped++;
    let beer = Math.round(Math.random()); // връща 0 или 1. С това ще вземем индекса от масива със снимки на бири
    this.img.src = enemyItemsImages[beer]; // сменяме снимката на бирата
    this.x = Math.random() * 750;
    this.y = -450;
}

function beerUpdate() {
    this.speedY = beerSpeed;
    this.newPos();
}