var five = require("johnny-five");
var board = new five.Board({ port: "COM3" });
 
board.on("ready", function() {
    var proximity = new five.Proximity({
        controller: "HCSR04",
        pin: 2
    });
    var led = new five.Led.RGB({
        pins: {
                red: 6,
                green: 5,
                blue: 3
            }
    });

    proximity.on("data", function() {
        if( this.in < 4 ){
            led.on().color("red");
        }else if( this.in < 10){
            led.on().color("Orange");
        }else if (this.in < 24){
            led.on().color("green");
        }else{
            led.off(); 
        }

    });

});
