let squares_circles = []; // Array of objects
let amount = 20; // The amount of objects
let createGif = false;
let duration = 30;
let fps = 60;

function setup() {
    if (createGif) {
        createCanvas(1080, 1080);
    } else {    
        createCanvas(windowWidth, windowHeight); // Uncomment this line for max size in your browser
    }
    
    let biggest_size = width > height ? height : width; // The biggest possible size to fit on the canvas
    biggest_size *= 0.9; // max 90% of screen filled

    // Create objects
    for (let i = 0; i < amount; i++) {
        size = calculate_size(biggest_size, i);
        squares_circles.push(new Square_Circle(i, size));
    }

    strokeWeight(2);
    noFill();
    rectMode(CENTER);
    
    frameRate(fps);

    // Set both render and download to true for automatically creating and downloading the gif file
    if (createGif) {
        createLoop({duration:duration, gif:{render:true, download:true, fileName:"square_circles_speeding_up.gif"}});
        console.log("Gif enabled");
    }
}

function draw() {
    background(0);
    for (let i = 0; i < squares_circles.length; i++) {
        push();
        let speed;
        if (createGif) {
            speed = i*animLoop.theta**sqrt(2);
        } else {
            speed = i*(TWO_PI*frameCount/fps/duration)**sqrt(2);
        }
        squares_circles[i].rotate(speed);
        if (i == squares_circles.length -1) {
            console.log(speed);
        }
        squares_circles[i].display();
        pop();
    }
}

class Square {
    constructor(size, color) {
        this.size = size;
        this.color = color;
        this.rotation = 0;
    }

    rotate(rotation) {
        this.rotation = rotation;
    }

    display() {
        stroke(this.color);
        push();
        translate(width/2, height/2);
        rotate(this.rotation);
        translate(-width/2, -height/2);
        square(width/2, height/2, this.size);
        pop();
    }
}

class Circle {
    constructor(size, color) {
        this.size = size;
        this.color = color;
    }

    display() {
        stroke(this.color);
        circle(width/2, height/2, this.size);
    }
}

class Square_Circle {
    constructor(number, size) {
        this.number = number;
        this.size = size;
        let square_color = color(255);
        let circle_color = color(255);
        this.square = new Square(this.size, square_color);
        this.circle = new Circle(this.size, circle_color);
    }

    rotate(rotation) {
        this.square.rotate(rotation);
    }

    display() {
        this.square.display();
        this.circle.display();
    }
}

function calculate_size(biggest_size, number) {
    size = biggest_size;
    for (let i = 0; i < number; i++) { // Repeate until you got the size for this specific object
        size = sqrt(0.5*size**2); // Use the Pythagorean theorem to calculate the new size
    }
    return size;
}