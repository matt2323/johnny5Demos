var five = require("johnny-five");
var EtherPortClient = require("etherport-client").EtherPortClient;
var firmata = require('firmata');
var net = require('net');


var options = {   
  host: '192.168.1.187',  // IP of ESP board
  port: 3030  
};

var client = net.connect(options, function() {

  var socketClient = this;

  var io = new firmata.Board(socketClient);
  io.once('ready', function(){
      console.log('IO Ready');
      io.isReady = true;
      var board = new five.Board({io: io, repl: true});
      board.on('ready', function(){
        var led = new five.Led(13);
        //led.blink(500);
        
        this.repl.inject({
          led: led
        });
      });
  });

});
