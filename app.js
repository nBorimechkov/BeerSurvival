init();

function init() {
    //constants
    let beerspeed = 1.3;


    let ctx = document.getElementById('canvas').getContext('2d');
    ctx.font = '20px monospace';
    let homerGoingRight = new Image();
    let homerGoingLeft = new Image();
    homerGoingRight.src = 'res/homer2.png';    // two sprites for walking
    homerGoingLeft.src = 'res/homer.png';      // in different directions
   
    let homer = {img: homerGoingRight, x: 0, y: 460}; // the player Homer
    window.addEventListener('keydown', keyboardHandler);
	let sx = 0,sy = 0, x = 0;  // sx, sy are used for cropping the spritesheet
    
	let beerImg = new Image();
    beerImg.src = 'res/beer_2.png';
	let fries = new Image();
	fries.src = 'res/fries.png';
	let steak = new Image();
	steak.src = 'res/steak.png';
	let peanut = new Image();
	peanut.src = 'res/peanut.png';
	
	

    let beers = [{img: beerImg, x: Math.random() * 750, y: -50},
    {img: beerImg, x: Math.random() * 800, y: -450},
    {img: beerImg, x: Math.random() * 800, y: -250}]
	
	
    let friess = [{img: fries, x: Math.random() * 750, y: -50}];
    let peanuts = [{img: peanut, x: Math.random() * 750, y: -50}];
    let steaks = [{img: steak, x: Math.random() * 750, y: -50}];

	let level = 1;
    let beersDrunk = 0;
	let beersMissed = 0;

    main()

    function draw() {
        ctx.clearRect(0, 0, 800, 600);
        for (let beer of beers) {                             // draw the array of beers
            ctx.drawImage(beer.img, beer.x, beer.y);
        }
		
		for (let beer of beers) {                             // draw the array of fries
		
			if(beer)
            ctx.drawImage(beer.img, beer.x, beer.y);
        }
		
	   

        ctx.drawImage(homer.img, sx * 43, sy, 43, 73, homer.x, homer.y, 86, 146);   // draw the player
        ctx.fillText(`Total Beers Drunk: ${beersDrunk}`, 15, 35);
	    ctx.fillText(`Missed Beers: ${beersMissed}`, 600, 35);
	    ctx.fillText(`Level ${level}`, 350, 35);

    
	}

	
    function update() {
		
			if(beersDrunk < 2)
					beerspeed= 1.3;      // 1 level
			else if( beersDrunk <5){
				beerspeed = 1.5;         // 2 level
				level = 2;
			}
						
			else if( beersDrunk <10){
				beerspeed = 1.7;     	 // 3 level
				level = 3;
			}
			else if( beersDrunk <15){
				beerspeed = 2;          // 4 level
				level = 4;
			}
			
			
			
        for (let beer of beers) {         //update the array of beers
            beer.y += beerspeed;
            if (beer.y > 600) {
                resetBeers(beer);
            }

            if (beer.x > homer.x - 75 && beer.x < homer.x + 80 && beer.y > 365) {         //check for collision between beer and Homer
                beersDrunk++;
                resetBeers(beer)
            }
			else if(beer.y > 450){
				beersMissed++;
				resetBeers(beer);
				
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
            homer.x -= 30;
            homer.img = homerGoingLeft;
            x--;                              // change the x to take different parts of the sprite
            if (x < 0) x = 15;                // x is between 0 and 15
        }
        else if (event.code == "ArrowRight") {
            homer.x += 30;
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