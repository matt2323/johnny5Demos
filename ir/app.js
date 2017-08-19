var five = require("johnny-five");
var gcm = require('node-gcm');
var key  =  require('./key.json'); 
//var SolarCalc = require('solar-calc');
// var hue = require("node-hue-api"),
//     HueApi = hue.HueApi,
//     lightState = hue.lightState;


var board = new five.Board({port:"COM3"});




board.on('ready', () =>{
    var motion = new five.Motion(9);

    motion.on("calibrated", () => {
      console.log("calibrated", Date.now());
    });

    motion.on("motionstart", () => {
        sendPush();   
        //hallwayOnOff(5)
    });
});

function sendPush(){
    var message = new gcm.Message({
        data: { key1: 'lights' }
    });

    // Set up the sender with you API key, prepare your recipients' registration tokens.
    var sender = new gcm.Sender(key.apiKey);
    var regTokens = [''];

    sender.send(message, { registrationTokens: regTokens }, function (err, response) {
        if(err) console.error(err);
        else    console.log(response);
    });
}



// var host = "192.168.1.114",
//     username = "apiKey",
//     api = new HueApi(host, username),
//     state = lightState.create();



// function hallwayOnOff(min){
//     if(useLights()){
//         api.setLightState(5, state.on(), function(err, result) {
//             if (err) throw err;
//         });
//         api.setLightState(3, state.on(), function(err, result) {
//             if (err) throw err;
//         });


//         setTimeout( ()=>{ 
//             api.setLightState(5, state.off(), function(err, result) {
//                 if (err) throw err;
//             });
//             api.setLightState(3, state.off(), function(err, result) {
//                 if (err) throw err;
//             });
//         },  1000*60*min);
//     }

// }

// function useLights(){
//     var d = new Date();
//     d.setDate(d.getDate() + 1);
//     var tomorrow =  new SolarCalc(d,43.217502,-77.429431);
//     var today = new SolarCalc(new Date(),43.217502,-77.429431);
//     var now = new Date();
  
//     if( now < tomorrow.sunrise.addHours(2)  &&
//         now > today.sunset.addHours(-2) )
//     {
//         return true; 
//     }
//     return false; 
// }
