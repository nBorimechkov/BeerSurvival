/**
 * Created by Rostislav Kolev on 12-Oct-16.
 */
let enemyItemsImages = ['beer1', 'beer2'];

let beerSpeed = 2;

function beerCrashEffect() {
    myGameArea.beersDrunk++;
    myGameArea.beersInGame--;
    removeElementFromArray(this);
}

function beerHitBottomEffect() {
    increaseWaves();
    myGameArea.beersInGame--;
    myGameArea.beersDropped++;
    removeElementFromArray(this); // подава се обекта, от който е извикан метода.
}

function beerUpdate() {
    this.speedY = beerSpeed;
    this.newPos();
}
