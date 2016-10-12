/**
 * Created by Rostislav Kolev on 10-Oct-16.
 */
let c = document.getElementById('canvas'),
    ctx = c.getContext('2d'),
    cw = c.width ,
    ch = c.height,
    points = [],
    opt = {
        count: 5,
        range: {
            x: 0,
            y: 0 // вълнение
        },
        duration: {
            min: 20,
            max: 40
        },
        thickness: 10,
        strokeColor: '#444',
        level: 0.0,
        curved: true
    },
    rand = function(min, max){
        return Math.floor( (Math.random() * (max - min + 1) ) + min);
    },
    ease = function (t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t + b;
        return -c/2 * ((--t)*(t-2) - 1) + b;
    };

ctx.lineJoin = 'round';
ctx.lineWidth = opt.thickness;
ctx.strokeStyle = opt.strokeColor;

var Point = function(config){
    this.anchorX = config.x;
    this.anchorY = config.y;
    this.x = config.x;
    this.y = config.y;
    this.setTarget();
};

let colorOfOcean;
let beerColor = '#FEBD01';
let redColor = '#ed0707';

Point.prototype.setTarget = function(){
    this.initialX = this.x;
    this.initialY = this.y;
    this.targetX = this.anchorX + rand(0, opt.range.x * 2) - opt.range.x;
    this.targetY = this.anchorY + rand(0, opt.range.y * 2) - opt.range.y;
    this.tick = 0;
    this.duration = rand(opt.duration.min, opt.duration.max);
}

Point.prototype.update = function(){
    var dx = this.targetX - this.x;
    var dy = this.targetY - this.y;
    var dist = Math.sqrt(dx * dx + dy * dy);

    if(Math.abs(dist) <= 0){
        this.setTarget();
    } else {
        var t = this.tick;
        var b = this.initialY;
        var c = this.targetY - this.initialY;
        var d = this.duration;
        this.y = ease(t, b, c, d);

        b = this.initialX;
        c = this.targetX - this.initialX;
        d = this.duration;
        this.x = ease(t, b, c, d);

        this.tick++;
    }
};

Point.prototype.render = function(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
    ctx.fillStyle = '#000';
    ctx.fill();
};

var updatePoints = function(){
    var i = points.length;
    while(i--){
        points[i].update();
    }
};

var renderPoints = function(){
    var i = points.length;
    while(i--){
        points[i].render();
    }
};

var renderShape = function(){
    ctx.beginPath();
    var pointCount = points.length;
    ctx.moveTo(points[0].x, points[0].y);
    var i;
    for (i = 0; i < pointCount - 1; i++) {
        var c = (points[i].x + points[i + 1].x) / 2;
        var d = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, c, d);
    }
    ctx.lineTo(-opt.range.x - opt.thickness, ch + opt.thickness);
    ctx.lineTo(cw + opt.range.x + opt.thickness, ch + opt.thickness);
    ctx.closePath();
    ctx.fillStyle = colorOfOcean;
    ctx.fill();
    ctx.stroke();
};

var loop = function () {
    colorOfOcean = beerColor;
    if (opt.level >= 0.14) {
        colorOfOcean = redColor;
    }

    updatePoints();
    renderShape();
};

function increaseWaves() {
    if(opt.level >= 0.19)
    {
        opt.level = 0.19;
        return;
    }

    let oldLevel = opt.level;
    opt.range.x += 2.5;
    opt.range.y += 5;
    while (opt.level - oldLevel < 0.05) { // по-плавно покачване на вълната
        opt.level += 0.01;

        points = [];

        let i = opt.count + 2;
        let spacing = (cw + (opt.range.x * 2)) / (opt.count - 1);
        while (i--) {
            points.push(new Point({
                x: (spacing * (i - 1)) - opt.range.x,
                y: ch - (ch * opt.level)
            }));
        }

        updatePoints();
        renderShape();
    }
}

function reduceWaves() {
    if (opt.level <= 0)
    {
        opt.level = 0;
        return; // няма смисъл да става отрицателно
    }

    opt.range.x -= 2.5;
    opt.range.y -= 5;
    opt.level -= 0.05;

    points = [];

    let i = opt.count + 2;
    let spacing = (cw + (opt.range.x * 2)) / (opt.count - 1);
    while (i--) {
        console.log('level: ' + opt.level)
        points.push(new Point({
            x: (spacing * (i - 1)) - opt.range.x,
            y: ch - (ch * opt.level)
        }));
    }
}

let i = opt.count + 2;
let spacing = (cw + (opt.range.x * 2)) / (opt.count - 1);
while(i--){
    console.log('level: ' + opt.level)
    points.push(new Point({
        x: (spacing * (i - 1)) - opt.range.x,
        y: ch - (ch * opt.level)
    }));
}


