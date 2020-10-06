let square_circles = []; // array of objects
let amount = 20;

function setup() {
    createCanvas(1080, 1080);
    
    let biggest_size = width > height ? height : width;
    biggest_size *= 0.9; // max 80% of screen filled

    // Create objects
    for (let i = 0; i < amount; i++) {
        size = calculate_size(biggest_size, i);
        square_circles.push(new Square_Circle(i, size));
    }

    strokeWeight(2);
    rectMode(CENTER);

    frameRate(30);

    createLoop({duration:5, gif:{render:false, download:false, fileName:"square_circles.gif"}});
}

function draw() {
    background(255);
    for (let i = 0; i < square_circles.length; i++) {
        push();
        square_circles[i].rotate(i*animLoop.theta*0.25);
        square_circles[i].display();
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
    for (let i = 0; i < number; i++) {
        size = sqrt(0.5*size**2);
    }
    return size;
}