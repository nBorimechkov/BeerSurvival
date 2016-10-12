/**
 * Created by Rostislav Kolev on 12-Oct-16.
 */
let friendlyItemsImages = ['meze1', 'meze2', 'meze3'];

let mezeSpeed = 3;

function mezeCrashEffect() {
    reduceWaves();
    myGameArea.foodsInGame--;
    removeElementFromArray(this);
    
}

function mezeHitBottom() {
    myGameArea.foodsInGame--;
    removeElementFromArray(this);
}

function mezeUpdate() {
    this.speedY = mezeSpeed;
    this.newPos();
}