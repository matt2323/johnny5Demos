var five = require("johnny-five");
var board = new five.Board({ port: "COM3" });

var led; 

board.on("ready", function() {
    led = new five.Led(11);
    led.blink(500);

    this.repl.inject({
    led: led
    });
});


board.on("exit", function() {
    led.off();
});