var index;

var events = [];




    self.port.on("status",function (message) {
      if (message == "CLOSED") {
        //var text = "Sry, its closed";
        var text = "<a href='https://www.das-labor.org/' target='blank'>Sry, its closed</a>";


      }else if (message == "OPEN") {
        //var text = "Hey, visit the labor its open";
        var text = "<a href='https://www.das-labor.org/' target='blank'>Hey, visit the labor its open/a>";

      }else{
        var text = "Well, its broken! Call the labor by phone;)";
      }
      document.getElementById("labor-status").innerHTML = text;
    });

    self.port.on("items", function (data) {

      var eventitems = data;
      var text = "<ul>";
      for (index = 0; index < eventitems.length; index++) {

          text += "<li>" + "<a href='"+eventitems[index].link+"' target='_blank'>"+eventitems[index].description +"</a>" +"</li>";
      }
      text += "</ul>";
      document.getElementById("list").innerHTML = text;
    });
