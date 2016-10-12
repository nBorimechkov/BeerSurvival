init();

function init() {
    //constants
    let beerSpeed = 2;
    let mezeSpeed = 3;

    let ctx = document.getElementById('canvas').getContext('2d');
    ctx.font = '20px monospace';
    let homerGoingRight = new Image();
    let homerGoingLeft = new Image();
    homerGoingRight.src = 'res/homer2.png';    // two sprites for walking
    homerGoingLeft.src = 'res/homer.png';      // in different directions

    let beerImg = new Image();
    beerImg.src = 'res/beer_2.png';
    let friesImg = new Image();
    friesImg.src = 'res/fries2.png';
    let peanutImg = new Image();
    peanutImg.src = 'res/potato5.png';

    let homer = {img: homerGoingRight, x: 350, y: 460}; // the player Homer
    window.addEventListener('keydown', keyboardHandler);
    let sx = 0,sy = 0, x = 0;  // sx, sy are used for cropping the spritesheet

    let beers = [{img: beerImg, x: Math.random() * 750, y: -50},
                 {img: beerImg, x: Math.random() * 700, y: -450},
                 {img: beerImg, x: Math.random() * 650, y: -250}];

    let mezeta = [{img: friesImg, x: Math.random() * 750, y: -100}];

    let beersDroppedShown = 0;
    let beersDropped = 0;
    let beersDrunk = 0;
    let level = 0;


    main();



    function draw() {
        ctx.clearRect(0, 0, 800, 600);

        for (let beer of beers) {                             // draw the array of beers
            ctx.drawImage(beer.img, beer.x, beer.y);
            ctx.fillStyle = "rgba(255,255,0,0.3)";
            ctx.fillRect(0, 600 - (beersDropped * 20), 800, 20 * beersDropped);        // draw beer on the floor
        }

        for (let meze of mezeta) {
            ctx.drawImage(meze.img, meze.x, meze.y, 120, 70)
        }

        ctx.drawImage(homer.img, sx * 43, sy, 43, 73, homer.x, homer.y, 86, 146);   // draw the player
        ctx.fillStyle = "black";
        ctx.fillText(`Total Beers Drunk: ${beersDrunk}`, 15, 25);
        ctx.fillText(`Total Beers Dropped: ${beersDroppedShown}`, 15, 45);
        ctx.fillText(`Level ${level}`, 350, 35);


    }

    function update() {

        if(beersDrunk < 10)
            beerSpeed = 3;      // 1 level

        else if( beersDrunk < 20){
            beerSpeed = 4;         // 2 level
            level = 2;
        }

        else if( beersDrunk < 30){
            beerSpeed = 5.5;     	 // 3 level
            level = 3;
        }
        else if( beersDrunk < 50){
            beerSpeed = 7;          // 4 level
            level = 4;
        }

        for (let beer of beers) {         //update the array of beers
            beer.y += beerSpeed;
            if (beer.y > 560) {
                beersDropped++;
                beersDroppedShown++;
                resetArr(beer);
            }

            if (beer.x > homer.x - 50 && beer.x < homer.x +50 && beer.y > 365) {         //check for collision between beer and Homer
                beersDrunk++;
                resetArr(beer)
            }
        }

        for (let meze of mezeta) {         //update the array of mezeta
            meze.y += mezeSpeed;
            if (meze.y > 600) {
                resetArr(meze);
            }

            if (meze.x > homer.x - 50 && meze.x < homer.x +50 && meze.y > 365) {         //check for collision between meze and Homer
                beersDropped--;
                resetArr(meze)
            }

        }

        sx = Math.floor(x / 2);       //make sx between 0 and 7 because we have 8 different images in the spritesheet of Homer

        function resetArr(element) {
            element.x = Math.random() * 750;
            element.y = -100;
        }
    }

    function keyboardHandler(event) {
        if (event.code == "ArrowLeft") {
            if(homer.x > 10) {
                homer.x -= 15;
            }
            homer.img = homerGoingLeft;
            x--;                              // change the x to take different parts of the sprite
            if (x < 0) x = 15;                // x is between 0 and 15
        }
        else if (event.code == "ArrowRight") {
            if(homer.x < 720) {
                homer.x += 15;
            }
            homer.img = homerGoingRight;
            x++;                            // change the x to take different parts of the sprite
            if (x >= 16) x = 0;             // x is between 0 and 15
        }
    }

    function main() {
        update();
        draw();

        requestAnimationFrame(main);
    }
}