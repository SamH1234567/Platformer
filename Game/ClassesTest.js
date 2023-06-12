/*

    A class is a 'blueprint' for creating objects.
        Define properties and/or methods.

    A constructor is a special method for assigning properties.
        Automatically called when creating an object.
*/

class Car{

    constructor(make, model, year, colour){
        this.make = make;
        this.model = model;
        this.year = year;
        this.colour = colour;
    }

    drive(){
        console.log("You drive the car");
    }

    brake(){
        console.log("You step on the brakes");
    }

    WhatIsThis(){
        return this
    }
}

let player1 = new Car("Ford", "Mustang", 2022, "red");
let player2 = new Car("Chevy", "Corvette", 2020, "blue");

player1.drive();
player2.brake();

console.log(player1.make)

console.log(player1.WhatIsThis())