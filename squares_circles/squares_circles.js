let squares_circles = []; // Array of objects
let amount = 20; // The amount of objects

function setup() {
    // createCanvas(1080, 1080);
    
    createCanvas(windowWidth, windowHeight); // Uncomment this line for max size in your browser
    let biggest_size = width > height ? height : width; // The biggest possible size to fit on the canvas
    biggest_size *= 0.9; // max 90% of screen filled

    // Create objects
    for (let i = 0; i < amount; i++) {
        size = calculate_size(biggest_size, i);
        squares_circles.push(new Square_Circle(i, size));
    }

    strokeWeight(2);
    rectMode(CENTER);

    frameRate(60);

    // Set both render and download to true for automatically creating and downloading the gif file
    // createLoop({duration:5, gif:{render:false, download:false, fileName:"square_circles.gif"}});
}

function draw() {
    background(255);
    for (let i = 0; i < squares_circles.length; i++) {
        push();
        // squares_circles[i].rotate(i*animLoop.theta*0.25);
        squares_circles[i].rotate(i*(TWO_PI*frameCount/60/5)*0.25);
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
        this.rotation = rotation
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
        let square_color = color(255, 0, 0);
        let circle_color = color(0, 0, 255);
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
        size = size/sqrt(2); // Use 45 degree angle values (1, 1, sqrt(2))
    }
    return size;
}