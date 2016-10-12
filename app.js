init();

function init() {
    //constants
    let beerspeed = 1;


    let ctx = document.getElementById('canvas').getContext('2d');
    ctx.font = '20px monospace';
    let homerGoingRight = new Image();
    let homerGoingLeft = new Image();
    homerGoingRight.src = 'res/homer2.png';    // two sprites for walking
    homerGoingLeft.src = 'res/homer.png';      // in different directions
    let beerImg = new Image();
    beerImg.src = 'res/beer_2.png';
    let homer = {img: homerGoingRight, x: 0, y: 460}; // the player Homer
    window.addEventListener('keydown', keyboardHandler)
    let sx = 0,sy = 0, x = 0;  // sx, sy are used for cropping the spritesheet

    let beers = [{img: beerImg, x: Math.random() * 750, y: -50},
    {img: beerImg, x: Math.random() * 800, y: -450},
    {img: beerImg, x: Math.random() * 800, y: -250}]

    let beersDrunk = 0;

    main()

    function draw() {
        ctx.clearRect(0, 0, 800, 600);
        for (let beer of beers) {                             // draw the array of beers
            ctx.drawImage(beer.img, beer.x, beer.y);
        }

        ctx.drawImage(homer.img, sx * 43, sy, 43, 73, homer.x, homer.y, 86, 146);   // draw the player
        ctx.fillText(`Total Beers Drunk: ${beersDrunk}`, 15, 35);
    }


    function update() {
        for (let beer of beers) {         //update the array of beers
            beer.y += beerspeed;
            if (beer.y > 600) {
                resetBeers(beer);
            }

            if (beer.x > homer.x - 75 && beer.x < homer.x + 80 && beer.y > 365) {         //check for collision between beer and Homer
                beersDrunk++;
                resetBeers(beer)
            }

        }

        sx = Math.floor(x / 2);       //make sx between 0 and 7 because we have 8 different images in the spritesheet of Homer

        function resetBeers(beer) {
            beer.x = Math.random() * 750;
            beer.y = -100;
        }
    }

    function keyboardHandler(event) {
        if (event.code == "ArrowLeft") {
            homer.x -= 12;
            homer.img = homerGoingLeft;
            x--;                              // change the x to take different parts of the sprite
            if (x < 0) x = 15;                // x is between 0 and 15
        }
        else if (event.code == "ArrowRight") {
            homer.x += 12;
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