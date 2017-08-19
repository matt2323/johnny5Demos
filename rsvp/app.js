var cheerio = require('cheerio');

var request = require('request');

var five = require("johnny-five"),
  board, lcd;
var url = 'https://www.meetup.com/meetup-group-BkuJclOW/events/242270697/'


board = new five.Board({ port: "COM4" });

board.on("ready", function() {

  lcd = new five.LCD({
    // LCD pin name  RS  EN  DB4 DB5 DB6 DB7
    // Arduino pin # 7    8   9   10  11  12
    pins: [7, 8, 9, 10, 11, 12],

    rows: 2,
    cols: 16

  });

  request(url,  (error, response, body) => {
      if(error){
          console.log('error:', error);
          console.log('statusCode:', response && response.statusCode); 
      }

      var $ = cheerio.load(body)

      var rvsp = $('.rsvp-count-going').text(); 
      lcd.print(rvsp + " people");
      console.log(rvsp); 
  });

  this.repl.inject({
    lcd: lcd
  });
});
