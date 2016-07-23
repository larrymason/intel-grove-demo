//gate.js
/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

var Uln200xa_lib = require('jsupm_uln200xa');
var infoDisplay = require('./garage_display.js');

// Instantiate a Stepper motor on a ULN200XA Darlington Motor Driver
// This was tested with the Grove Geared Step Motor with Driver
// Instantiate a ULN2003XA stepper object

var myUln200xa_obj = new Uln200xa_lib.ULN200XA(4096, 8, 9, 10, 11);
var gateIsClosed = true;
var lotFull = false;

// go clockwise to open
myUln200xa_obj.open = function() {
  if (gateIsClosed && ! lotFull) {
    myUln200xa_obj.setSpeed(6); // 5 RPMs
    myUln200xa_obj.setDirection(Uln200xa_lib.ULN200XA.DIR_CW);
    infoDisplay.setMessage(['Gate Opening']);
    //io.emit('gate change', gateIsClosed);
    console.log("90 degree revolution clockwise.");
    myUln200xa_obj.stepperSteps(1024);
    gateIsClosed = false;
  }
};

// go counterclockwise to close
myUln200xa_obj.close = function() {
  if (! gateIsClosed) {
    console.log("90 degree revolution counter clockwise");
    myUln200xa_obj.setDirection(Uln200xa_lib.ULN200XA.DIR_CCW);
    infoDisplay.setMessage(['Gate Closing']);
    //io.emit('gate change', gateIsClosed);
    myUln200xa_obj.stepperSteps(1024);
    gateIsClosed = true;
  }
};

function openGate() {
  myUln200xa_obj.open();  
}    

function closeGate() {
  myUln200xa_obj.close();
} 

function updateStatus(addSpace) {
  if (addSpace) {
    infoDisplay.updateAvailable('add',1);
  } else {
    if (!lotFull) {
      infoDisplay.updateAvailable('sub',1);
    }
  }    
}

function pulse(isEntering) {
  openGate();
  setTimeout(function() {
      closeGate();
      setTimeout(updateStatus(!isEntering),5000);
  }, 3000);
}

function setLotFull(bool) {
  lotFull = bool;    
}

function resetGarage() {
    lotFull = false;
    infoDisplay.reset();
}

exports.openGate = openGate;
exports.closeGate = closeGate;
exports.pulse = pulse;
exports.setLotFull = setLotFull;
exports.resetGarage = resetGarage