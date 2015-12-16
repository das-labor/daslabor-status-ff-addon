var buttons = require('sdk/ui/button/action');
var { setInterval } = require("sdk/timers");
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


setInterval(function(){
    var getstatus = Request({
      url: "http://das-labor.org/status/status.php?status",
      onComplete: function (response) {
        var text = response.text;
        console.log("Status: " + text);
        labor_status = text;

      }
    });
    getstatus.get();
    console.log("Laborstatus: " + labor_status);

                console.log("Laborstatus: " + labor_status);
                if(labor_status == "CLOSED"){
                    button.icon = closed_icons;
                }
                else if(labor_status == "OPEN"){
                    button.icon = open_icons;
                    button.label = "Visit 'daslabor' its open !";
                }else{
                    button.icon = icons;
                }

}, 3000);



function handleClick(state) {
  tabs.open("http://www.das-labor.org/");
   // var data = getstatus.get();
   // console.log("klick: "+ JSON.stringify(data)+" labirstatus: " + labor_status);

}
