// Your code will go here
// open up your console - if everything loaded properly you should see 0.9.0
console.log('ml5 version:', ml5.version);
// module aliases
var Engine = Matter.Engine,
    // Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Axes = Matter.Axes,
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
var maxAppleCount = 8;
var applesCollected = 0;


function levelSampleSetup() {
    levelSetup();
}

function levelSetup(){
    var options = {
        isStatic: true,
        angle: Math.PI * 0.06,
    };
    //ground
    boxes.push(new Box("ground",width/2, height, width, 100, { isStatic: true, angle: Math.PI  }));
    //level Platforms
    boxes.push(new Box("left",90 , 100, 200, 50, { isStatic: true, angle: Math.PI * 0.06}));
    boxes.push(new Box("right",width-50 , 350, 200, 50, { isStatic: true, angle: Math.PI * 0.03}));
    //goal to take ball to
    goalBall = new Ball("goalBall",width, 300, 100, 0, {r:0,g:200,b:0},{isStatic: true} );
    //regular grounds
    groundBall.push(new Ball("goalBall",-100, 550, 100, 0, {r:50,g:150,b:0},{isStatic: true} ));
    groundBall.push(new Ball("goalBall",-200, 550, 100, 0, {r:50,g:150,b:0},{isStatic: true} ));
    groundBall.push(new Ball("goalBall",-300, 550, 100, 0, {r:50,g:150,b:0},{isStatic: true} ));
    groundBall.push(new Ball("goalBall",-400, 550, 100, 0, {r:50,g:150,b:0},{isStatic: true} ));
    groundBall.push(new Ball("goalBall",-500, 550, 100, 0, {r:50,g:150,b:0},{isStatic: true} ));
    groundBall.push(new Ball("goalBall",0, 550, 100, 0, {r:50,g:150,b:0},{isStatic: true} ));
    groundBall.push(new Ball("goalBall",100, 550, 100, 0, {r:50,g:200,b:0},{isStatic: true} ));
    groundBall.push(new Ball("goalBall",200, 550, 100, 0, {r:50,g:150,b:0},{isStatic: true} ));
    groundBall.push(new Ball("goalBall",300, 550, 100, 0, {r:50,g:200,b:0},{isStatic: true} ));
    groundBall.push(new Ball("goalBall",400, 550, 100, 0, {r:50,g:150,b:0},{isStatic: true} ));
    groundBall.push(new Ball("goalBall",500, 550, 100, 0, {r:50,g:200,b:0},{isStatic: true} ));
    groundBall.push(new Ball("goalBall",600, 550, 100, 0, {r:50,g:150,b:0},{isStatic: true} ));
    groundBall.push(new Ball("goalBall",700, 550, 100, 0, {r:50,g:200,b:0},{isStatic: true} ));
    groundBall.push(new Ball("goalBall",800, 550, 100, 0, {r:50,g:150,b:0},{isStatic: true} ));
    groundBall.push(new Ball("goalBall",900, 550, 100, 0, {r:50,g:200,b:0},{isStatic: true} ));
    groundBall.push(new Ball("goalBall",1000, 550, 100, 0, {r:50,g:150,b:0},{isStatic: true} ));
    groundBall.push(new Ball("goalBall",1100, 550, 100, 0, {r:50,g:200,b:0},{isStatic: true} ));
    groundBall.push(new Ball("goalBall",1200, 550, 100, 0, {r:50,g:150,b:0},{isStatic: true} ));

    groundLookBall.push(new Ball("goalBall",50, 555, 100, 0, {r:50,g:175,b:0},{isStatic: true} ));
    groundLookBall.push(new Ball("goalBall",150, 555, 100, 0, {r:50,g:200,b:0},{isStatic: true} ));
    groundLookBall.push(new Ball("goalBall",250, 555, 100, 0, {r:50,g:175,b:0},{isStatic: true} ));
    groundLookBall.push(new Ball("goalBall",350, 555, 100, 0, {r:50,g:200,b:0},{isStatic: true} ));
    groundLookBall.push(new Ball("goalBall",450, 555, 100, 0, {r:50,g:175,b:0},{isStatic: true} ));
    groundLookBall.push(new Ball("goalBall",550, 555, 100, 0, {r:50,g:200,b:0},{isStatic: true} ));
    groundLookBall.push(new Ball("goalBall",650, 555, 100, 0, {r:50,g:175,b:0},{isStatic: true} ));
    groundLookBall.push(new Ball("goalBall",750, 555, 100, 0, {r:50,g:200,b:0},{isStatic: true} ));

}

function arminmatterSetup(){
    createCanvas(800, 600);
    engine = Engine.create();
    world = engine.world;
    //Engine.run(engine);

    var options = {
        isStatic: true,
        angle: Math.PI * 0.06,
    };

    levelSampleSetup();

    arms.push(new ArmBox(width / 2, height / 2, 250, 50, { isStatic: true, angle: Math.PI }));
    arms.push(new ArmBox(width / 2, height / 2, 250, 50, { isStatic: true, angle: Math.PI }));
}

function radians_to_degrees(radians) {
    var pi = Math.PI;
    return radians * (180 / pi);
}


function arminmatterDraw(){
    Engine.update(engine);

    for (var i = 0; i < boxes.length; i++) {
        boxes[i].show();
    }

    arms[0].show();
    arms[0].translateToPoint(pose.rightWrist.x, pose.rightWrist.y);
    let a = atan2(pose.rightWrist.y - height / 2, pose.rightWrist.x - width / 2);
    arms[0].rotate(a);

    arms[1].show();
    arms[1].translateToPoint(pose.leftWrist.x, pose.leftWrist.y);
    let b = atan2(pose.leftWrist.y - height / 2, pose.leftWrist.x - width / 2);
    arms[1].rotate(b);
    
    levelSampleDraw();
}

function levelSampleDraw(){
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

    for (var i = 0; i < balls.length; i++) {
        balls[i].show();

        for (let index = 0; index < groundBall.length; index++) {
            if(groundBall[index].intersectsCircle(balls[i]) ){
                console.debug("fault!");
                //delete ball afterward
                balls[i].removeFromWorld();
                balls.splice(i,1);
            }
        }
        
        if(goalBall.intersectsCircle(balls[i]) ){
            console.debug("point!");
            applesCollected++;
            //delete ball afterward
            balls[i].removeFromWorld();
            balls.splice(i,1);
        }
    }

    console.log("applecount " + appleCount );
    if(appleCount <= maxAppleCount ){
        balls.push(new Ball("apple",random(50, 100), 25, random(20, 70), random(10, 40), {r:200,g:0,b:0}));
        appleCount++;
    }

    strokeWeight(1);
    fill(0);
    textSize(25);
    text("Apples Collected: " + applesCollected
    , width - 300, 25, width, height); // Text wraps within text box
}




/////////////////
function ArmBox(x, y, w, h, options) {
    //make matter.js body
    var options = {
        isStatic: true,
        angle: Math.PI * 0.06,
        friction: 1,
        restition: 1,
    };
    
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
        fill(130,87,81);
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

    this.translateToPoint = function (px,py) {
        Body.translate(this.body, {
            x: px - this.body.position.x 
            , y: py - this.body.position.y
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
    this.body.friction= 1;
    this.body.restitution= 1;
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
        if(label == "right" || label == "left"){
            fill(91,57,56);
        }
        else{fill(63,255,0);}
        rect(0, 0, this.w, this.h);
        pop();
    };
}

function Ball(label,x, y, w, h,color, options) {
    this.body = Bodies.circle(x, y, w/2)//, h, options);
    this.body.friction= 1;
    this.body.restitution= 1;
    if(options){this.body.isStatic = options.isStatic;}
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
        strokeWeight(1);
        stroke(255);
        fill(color.r,color.g,color.b);
        ellipse(0, 0, this.w); //, this.h);
        pop();
    };

    this.intersectsCircle = function(other){
        if(!other) return false;

        var d = dist(this.body.position.x, this.body.position.y, other.body.position.x, other.body.position.y);
        if (d-10 < this.w/2 + other.w/2) {
          return true;
        } else {
          return false;
        }
    }

    this.removeFromWorld = function(){
        World.remove(world, this.body);
        appleCount--;
    }

    this.isOffScreen = function (){
        var pos = this.body.position;
        if(pos.y > height + 100){
            return true;
        }
        else    {
            return false;
        }

    }
}