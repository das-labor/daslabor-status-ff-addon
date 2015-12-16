var buttons = require('sdk/ui/button/action');
var { setInterval } = require("sdk/timers");
var { setTimeout } = require("sdk/timers");
var tabs = require("sdk/tabs");
var Request = require("sdk/request").Request;

var labor_status = "";

var icons = {
    "16": "./laborlogo_16.png",
    "32": "./laborlogo_32.png",
    "64": "./laborlogo_64.png"
  };


var open_icons = {
    "16": "./laborlogo_open_16.png",
    "32": "./laborlogo_open_32.png",
    "64": "./laborlogo_open_64.png"
  };

var closed_icons = {
    "16": "./laborlogo_closed_16.png",
    "32": "./laborlogo_closed_32.png",
    "64": "./laborlogo_closed_64.png"
  };

var button = buttons.ActionButton({
  id: "labor-link",
  label: "Visit daslabor",

  icon: icons,
  onClick: handleClick
});



/*
Laborstatus:
    OPEN CLOSED

*/

function get_labor_status(){
    var getstatus = Request({
      url: "http://das-labor.org/status/status.php?status",
      onComplete: function (response) {
        var text = response.text;
        console.log("Status: " + text);
        labor_status = text;
         console.log("Laborstatus: " + labor_status);
        if(labor_status == "CLOSED"){
            button.icon = closed_icons;
        }
        else if(labor_status == "OPEN"){
            button.icon = open_icons;
            button.label = 'Visit "das labor" its open !';
        }else{
            button.icon = icons;
        }
      }
    });
    getstatus.get();
    console.log("Laborstatus: " + labor_status);

    /*console.log("Laborstatus: " + labor_status);
    if(labor_status == "CLOSED"){
        button.icon = closed_icons;
    }
    else if(labor_status == "OPEN"){
        button.icon = open_icons;
        button.label = "Visit 'daslabor' its open !";
    }else{
        button.icon = icons;
    }
    */

}
/* check status on Addon start
*/
//get_labor_status();
setTimeout(function() {
    console.log("timeout status" + labor_status);
    //get_labor_status()
  return get_labor_status();
}, 3000)


/* check status every xxx minutes
*/
setInterval(function(){
    console.log("interval status" + labor_status);
    return get_labor_status();
}, 1*60*1000);



function handleClick(state) {
  tabs.open("http://www.das-labor.org/");
   // var data = getstatus.get();
}
