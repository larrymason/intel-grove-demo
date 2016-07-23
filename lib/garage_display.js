// garage_display.js
/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

var lcd = require('jsupm_i2clcd');
var gate = require('./gate.js');
var display = new lcd.Jhd1313m1(0, 0x3E, 0x62);
var sp_avail = 3;
var t;
    
var init_display = function() {
  display.setColor(45, 45, 100);
  display.clear();
  display.setCursor(0,0);
  display.write('Parking Status');
  display.setCursor(1,0);
  display.write('Spaces Open: ' + sp_avail + '  ');
};

var updateAvailable = function(op, num) {
    if (op === 'add') {
        sp_avail += num;
    } else if (op === 'sub') {
        sp_avail -= num;
    }
    if (sp_avail === 0) {
      setLotFull();    
    } else {
      init_display();
    }
};

var setLotFull = function() {
  display.setColor(200, 50, 50);
  //display.autoScroll();
  display.setCursor(0,0);
  display.write('Parking Status');
  display.setCursor(1,0);
  display.write('Lot Full Go Away');
  gate.setLotFull(true);
};

var setMessage = function(messLines) {
    console.log('Message on Info Display: ' + messLines);
    display.setCursor(0,0);
    display.write(messLines[0]);
    if (messLines.length > 1) {
      display.setCursor(1,0);
      display.write(messLines[1]);
    } else {
      display.write('                ');  // clear line 2
    }
    
};

var reset = function() {
    sp_avail = 3;
    init_display();
};

 /* Scrolling the display
 */
   function loop(bool,count){
       if(count){
        t=setTimeout(function(){
            display.scroll (bool);
            count--;
            loop(bool,count);
        }, 300);
       }
    }
    
    function scroll(text){
        console.log(text);
         var x= text.length - 16;
        loop(true,x);
    }

exports.init_display = init_display;
exports.updateAvailable = updateAvailable;
exports.setMessage = setMessage;
exports.reset = reset;
    

