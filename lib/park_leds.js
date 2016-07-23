// park_leds.js
/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

var groveSensor = require('jsupm_grove');
    
var ledR = new groveSensor.GroveLed(2);
var ledB = new groveSensor.GroveLed(5);
var ledG = new groveSensor.GroveLed(6);
var spaces = [ledR, ledB, ledG];

function resetLEDs() {
    ledR.off();
    ledB.off();
    ledG.off();
}

function turnOn(pspace) { 
  spaces[pspace].on();
}

function turnOff(pspace) { 
  spaces[pspace].off();
}

exports.turnOn = turnOn;
exports.turnOff = turnOff;
exports.resetLEDs = resetLEDs;