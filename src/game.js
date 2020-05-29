




function setup() {
    poseSetup();
    arminmatterSetup();
    
    img = loadImage('https://i.imgur.com/cSvMeQA.png'); // Load the image
    trees = loadImage('https://i.imgur.com/4h4atkW.png'); // Load the image
    flowers = loadImage('https://i.imgur.com/yJ07ADV.png');
}

function draw() {
    background(128, 212, 249);

    // Displays the image at its actual size at point (0,0)
    
    image(trees, 0, 0);
    poseDraw();
    if (pose) {
        
        arminmatterDraw();
        image(flowers, 0, 0);
    }
    else {
        background(51);
        console.log("could not find pose");
        let a = 'Hamster in the Mirror';
        fill(217, 174, 36);
        textSize(65);
        text(a, 100, 100, width - 100, height - 100); // Text wraps within text box

        let s = 'Stand in front of the camera to play!';
        fill(128, 212, 249);
        textSize(50);
        text(s, 200, 300, width - 200, height - 200); // Text wraps within text box


        let love = 'Ammar - @amadhammer';
        fill(128, 212, 249);
        textSize(10);
        text(love, width - 150, height - 20, width - 50, height - 10); // Text wraps within text box
    }
}



