var buttons = require('sdk/ui/button/action');
var { ToggleButton } = require("sdk/ui/button/toggle");
var { setInterval } = require("sdk/timers");
var { setTimeout } = require("sdk/timers");
var tabs = require("sdk/tabs");
var Request = require("sdk/request").Request;
var panels = require("sdk/panel");
var self = require("sdk/self");
var {Cc, Ci} = require("chrome");

var txt, parser, xmlDoc;

var eventitems = [];

    //fruits = ["Banana", "Orange", "Apple", "Mango","meh"];



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


  function rss_events(){
    //eventitems = [];
  var events = Request({
        url: "http://www.das-labor.org/termine.rss",
        onComplete: function (response) {
          var text = response.text;
          //console.log("Events " + text);

          //var parser = new DOMParser();
          var parser = Cc["@mozilla.org/xmlextras/domparser;1"].createInstance(Ci.nsIDOMParser);
          //xmlDoc = parser.parseFromString(text,"text/xml");
          var xml = parser.parseFromString(response.text, "application/xml");

          //xmlDoc = response.text;
          /*var x = xmlDoc.getElementsByTagName("title");
          for (i = 0; i <x.length; i++) {
            // do something for each node
              console.log("z",i," ",x[i]);
            }*/
            var item = xml.getElementsByTagName("item");
          console.log("item",item);
          var dates =[]
          for (i = 0; i <item.length; i++) {
            /*console.log(
                  "\n >>>"
                  + item[i].getElementsByTagName("title")[0].childNodes[0].nodeValue + "\n"
                  + item[i].getElementsByTagName("description")[0].childNodes[0].nodeValue + "\n"
                  + item[i].getElementsByTagName("link")[0].childNodes[0].nodeValue + "\n"
                  + "########################################\n"
              );*/
            dates.push({
              "title" : item[i].getElementsByTagName("title")[0].childNodes[0].nodeValue,
              "description" : item[i].getElementsByTagName("description")[0].childNodes[0].nodeValue,
              "link" : item[i].getElementsByTagName("link")[0].childNodes[0].nodeValue
            });
          }
          eventitems = dates;
          console.log("nach push event",eventitems,"\n");
          panel.port.emit("items",eventitems);
        }
      });
      events.get();
  };



var button2 = ToggleButton({
  id: "my-button",
  label: "my button",
  icon: icons,
  onChange: handleChange
});

var panel = panels.Panel({

  contentURL: self.data.url("panel.html"),
  contentScriptFile: self.data.url("panel.js"),
  onHide: handleHide
});

function handleChange(state) {
  if (state.checked) {
    panel.show({
      position: button2
    });
  }
}



panel.on("show",function(){
  //panel.port.emit("früchte",fruits);
   rss_events();
  console.log("onshow",eventitems);
  //panel.port.emit("items",rss_events());
});

function handleHide() {
  button2.state('window', {checked: false});
}




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
    get_labor_status();
  return get_labor_status();
}, 3000)


/* check status every xxx minutes
*/
setInterval(function(){
    console.log("interval status" + labor_status);
    //rss_events();
    return get_labor_status();
//}, 1*60*1000);
}, 1000*100);


function handleClick(state) {
  tabs.open("http://www.das-labor.org/");
   // var data = getstatus.get();
}
