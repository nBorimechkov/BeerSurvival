/**
 * Created by Rostislav Kolev on 12-Oct-16.
 */
    //constants
let homerGoingRight = 'homerRight';    // two sprites for walking
let homerGoingLeft = 'homerLeft';

let homerSpeedX = 15;
let homerSpeedY = 0;

let sx = 0,sy = 0, x = 0;  // sx, sy are used for cropping the spritesheet

function homerDraw() {
    ctx.drawImage(homer.img, sx * 43, sy, 43, 73, homer.x, homer.y, 86, 146);   // draw the player
}

function homerUpdate() {
    this.speedX = homerSpeedX;
    this.speedY = homerSpeedY;
}