// Your code will go here
// open up your console - if everything loaded properly you should see 0.9.0
console.log('ml5 version:', ml5.version);
// module aliases
var Engine = Matter.Engine,
    // Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Axes = Matter.Axes,
    Events = Matter.Events,
    Body = Matter.Body;
var engine;
var world;

var boxes = [];
var balls = [];
var goalBall;
var groundBall = [];
var groundLookBall = [];
var arms = [];

var appleCount = 0;
var maxAppleCount = 3;
var applesCollected = 0;

function setup() {
    createCanvas(800, 600);
    engine = Engine.create();
    world = engine.world;
    //Engine.run(engine);

    var options = {
        isStatic: true,
        angle: Math.PI * 0.06,
    };

    //arm
    arms.push(new ArmBox(width / 2, height / 2, 250, 50, { isStatic: true, angle: Math.PI }));


    trees = loadImage('https://i.imgur.com/4h4atkW.png'); // Load the image
    flowers = loadImage('https://i.imgur.com/yJ07ADV.png');
    levelSetup();
}



function levelSetup() {
    var options = {
        isStatic: true,
        angle: Math.PI * 0.06,
    };
    //ground
    boxes.push(new Box("ground", width / 2, height, width, 100, { isStatic: true, angle: Math.PI }));
    //level Platforms
    boxes.push(new Box("left", 90, 100, 200, 50, { isStatic: true, angle: Math.PI * 0.06 }));
    boxes.push(new Box("right", width, 350, 200, 50, { isStatic: true, angle: Math.PI * 0.03 }));
    //goal to take ball to
    goalBall = new Ball("goalBall", width, 300, 100, 0, { r: 0, g: 200, b: 0 }, { isStatic: true });
    //regular grounds
    groundBall.push(new Ball("groundBall", -100, 550, 100, 0, { r: 50, g: 150, b: 0 }, { isStatic: true }));
    groundBall.push(new Ball("groundBall", -200, 550, 100, 0, { r: 50, g: 150, b: 0 }, { isStatic: true }));
    groundBall.push(new Ball("groundBall", -300, 550, 100, 0, { r: 50, g: 150, b: 0 }, { isStatic: true }));
    groundBall.push(new Ball("groundBall", -400, 550, 100, 0, { r: 50, g: 150, b: 0 }, { isStatic: true }));
    groundBall.push(new Ball("groundBall", -500, 550, 100, 0, { r: 50, g: 150, b: 0 }, { isStatic: true }));
    groundBall.push(new Ball("groundBall", 0, 550, 100, 0, { r: 50, g: 150, b: 0 }, { isStatic: true }));
    groundBall.push(new Ball("groundBall", 100, 550, 100, 0, { r: 50, g: 200, b: 0 }, { isStatic: true }));
    groundBall.push(new Ball("groundBall", 200, 550, 100, 0, { r: 50, g: 150, b: 0 }, { isStatic: true }));
    groundBall.push(new Ball("groundBall", 300, 550, 100, 0, { r: 50, g: 200, b: 0 }, { isStatic: true }));
    groundBall.push(new Ball("groundBall", 400, 550, 100, 0, { r: 50, g: 150, b: 0 }, { isStatic: true }));
    groundBall.push(new Ball("groundBall", 500, 550, 100, 0, { r: 50, g: 200, b: 0 }, { isStatic: true }));
    groundBall.push(new Ball("groundBall", 600, 550, 100, 0, { r: 50, g: 150, b: 0 }, { isStatic: true }));
    groundBall.push(new Ball("groundBall", 700, 550, 100, 0, { r: 50, g: 200, b: 0 }, { isStatic: true }));
    groundBall.push(new Ball("groundBall", 800, 550, 100, 0, { r: 50, g: 150, b: 0 }, { isStatic: true }));
    groundBall.push(new Ball("groundBall", 900, 550, 100, 0, { r: 50, g: 200, b: 0 }, { isStatic: true }));
    groundBall.push(new Ball("groundBall", 1000, 550, 100, 0, { r: 50, g: 150, b: 0 }, { isStatic: true }));
    groundBall.push(new Ball("groundBall", 1100, 550, 100, 0, { r: 50, g: 200, b: 0 }, { isStatic: true }));
    groundBall.push(new Ball("groundBall", 1200, 550, 100, 0, { r: 50, g: 150, b: 0 }, { isStatic: true }));

    groundLookBall.push(new Ball("groundBall", 50, 555, 100, 0, { r: 50, g: 175, b: 0 }, { isStatic: true }));
    groundLookBall.push(new Ball("groundBall", 150, 555, 100, 0, { r: 50, g: 200, b: 0 }, { isStatic: true }));
    groundLookBall.push(new Ball("groundBall", 250, 555, 100, 0, { r: 50, g: 175, b: 0 }, { isStatic: true }));
    groundLookBall.push(new Ball("groundBall", 350, 555, 100, 0, { r: 50, g: 200, b: 0 }, { isStatic: true }));
    groundLookBall.push(new Ball("groundBall", 450, 555, 100, 0, { r: 50, g: 175, b: 0 }, { isStatic: true }));
    groundLookBall.push(new Ball("groundBall", 550, 555, 100, 0, { r: 50, g: 200, b: 0 }, { isStatic: true }));
    groundLookBall.push(new Ball("groundBall", 650, 555, 100, 0, { r: 50, g: 175, b: 0 }, { isStatic: true }));
    groundLookBall.push(new Ball("groundBall", 750, 555, 100, 0, { r: 50, g: 200, b: 0 }, { isStatic: true }));

}

function mousePressed() {

}

function radians_to_degrees(radians) {
    var pi = Math.PI;
    return radians * (180 / pi);
}

function draw() {

    background(128,212,249);
    // Displays the image at its actual size at point (0,0)
    image(trees, 0, 0);



    fill(25);
    textSize(25);
    text("Apples Collected: " + 25
        , width - 400, 25, width, height);


    Engine.update(engine);

    goalBall.show()

    for (let index = 0; index < groundBall.length; index++) {
        groundBall[index].show();
    }
    for (let index = 0; index < groundLookBall.length; index++) {
        groundLookBall[index].show();
    }

    for (var i = 0; i < boxes.length; i++) {
        boxes[i].show();
    }

    for (var i = 0; i < arms.length; i++) {
        arms[i].show();
        arms[i].translateToMouse();
        //arms[i].changeWidth(distanceBetweenMouseXAndSpriteCenter, distanceBetweenMouseYAndSpriteCenter);
        let a = atan2(mouseY - height / 2, mouseX - width / 2);
        arms[i].rotate(a);
    }

    for (var i = 0; i < balls.length; i++) {
        balls[i].show();

        for (let index = 0; index < groundBall.length; index++) {
            if (groundBall[index].intersectsCircle(balls[i])) {
                console.debug("fault!");
                //delete ball afterward
                balls[i].removeFromWorld();
                balls.splice(i, 1);
            }
        }

        if (goalBall.intersectsCircle(balls[i])) {
            console.debug("point!");
            applesCollected++;
            //delete ball afterward
            balls[i].removeFromWorld();
            balls.splice(i, 1);
            balls.push(new Ball("apple", random(50, 100), 25, random(20, 70), random(10, 40), { r: 200, g: 0, b: 0 }));
        }
    }

    if (appleCount <= 3) {
        balls.push(new Ball("apple", random(50, 100), 25, random(20, 70), random(10, 40), { r: 180, g: 0, b: 0 }));
        appleCount++;
    }

        // Displays the image at its actual size at point (0,0)
        image(flowers, 0, 0);
}

function BallCollisionWithGround() {

}



/////////////////
function ArmBox(x, y, w, h, options) {
    var options = {
        isStatic: true,
        angle: Math.PI * 0.06,
        friction: 1,
        restitution: 1,
    };

    //make matter.js body
    this.body = Bodies.rectangle(x, y, w, h, options);

    this.hOriginal = h;
    this.wOriginal = w;

    this.w = w;
    this.h = h;
    World.add(world, this.body);

    this.show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        strokeWeight(1);
        stroke(255);
        fill(127);
        //draw p5 box
        rect(0, 0, this.w, this.h);
        pop();
    };

    this.changeWidth = function (xDistanceFromPoint, yDistanceFromPoint) {
        //change the p5 drawing
        this.w = getMatterWidth(this.body.bounds);
        this.h = getMatterHeight(this.body.bounds);

        let m = Math.max();

        //change physical
        Body.scale(this.body
            , pixelToScale(xDistanceFromPoint, this.w) * 2
            , 1);
    }

    this.translateToMouse = function () {

        var postx = (this.body.position.x)     ///(mouseX - this.body.position.x) + 100; // - (mouseX + this.body.position.x
        var posToBe = ((width / 2) - (mouseX)) / 2;

        var howMuchToAdjust = mouseX + posToBe;

        // console.log("posToBe " + posToBe);
        // console.log("this.body.position.x " + this.body.position.x);
        // console.log("howMuchToAdjust " , howMuchToAdjust );
        var yy = 0;
        Body.translate(this.body, {
            x: mouseX - this.body.position.x
            , y: mouseY - this.body.position.y
        });
    }




    this.rotate = function (r) {
        Body.setAngle(this.body, r);
    }
}

function pixelToScale(distance, size) {
    console.log("pixelToScale " + distance / size)

    if (size <= 0) {
        return 1;
    }

    return distance / size;
}


function getMatterWidth(bounds) {
    //max.x - min.x
    return ((bounds.max.x - bounds.min.x) <= 0) ? 1
        : (bounds.max.x - bounds.min.x);
}

function getMatterHeight(bounds) {
    //max.x - min.x
    return bounds.max.y - bounds.min.y;
}

function Box(label, x, y, w, h, options) {
    this.label = label;
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.body.friction = 1;
    this.body.restitution = 1;
    this.w = w;
    this.h = h;
    World.add(world, this.body);

    this.show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        strokeWeight(1);
        stroke(255);
        if (label == "right" || label == "left") {
            fill(91, 57, 56);
        }
        else { fill(63, 255, 0); }
        rect(0, 0, this.w, this.h);
        pop();
    };
}

function Ball(label, x, y, w, h, color, options) {
    this.body = Bodies.circle(x, y, w / 2)//, h, options);
    this.body.friction = 1;
    this.body.restitution = 1;
    if (options) { this.body.isStatic = options.isStatic; }
    this.label = label;
    this.w = w;

    World.add(world, this.body);

    this.show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        strokeWeight(2);
        stroke(255);
        fill(color.r, color.g, color.b);
        ellipse(0, 0, this.w); //, this.h);
        pop();
    };

    this.intersectsCircle = function (other) {
        if (!other) return false;

        var d = dist(this.body.position.x, this.body.position.y, other.body.position.x, other.body.position.y);
        if (d - 10 < this.w / 2 + other.w / 2) {
            return true;
        } else {
            return false;
        }
    }

    this.removeFromWorld = function () {
        World.remove(world, this.body);
        appleCount--;
    }

    this.isOffScreen = function () {
        var pos = this.body.position;
        if (pos.y > height + 100) {
            return true;
        }
        else {
            return false;
        }

    }
}