//vehicle_sensor.js
/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
    var groveSensor = require('jsupm_grove');
    var leds = require('./park_leds.js');
    var light = new groveSensor.GroveLight(0);
    //var t;
    var lux;
    console.log("here: "+light.value());
    
    setInterval(function() {
        lux = light.value();
        console.log("light val: " + lux);             
        if(lux < 10){
            leds.turnOn(0);
            leds.turnOff(1);
            leds.turnOff(2);
        } else if (lux >= 10 && lux <= 50) {
            leds.turnOff(0);
            leds.turnOn(1);
            leds.turnOff(2);
        } else if (lux >= 50) {
            leds.turnOff(0);
            leds.turnOff(1);
            leds.turnOn(2);
        }}, 1000);
    
    
