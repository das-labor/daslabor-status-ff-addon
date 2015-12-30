var index;

    var events = [];

    fruits = [];

/*
    self.port.on("show", function onShow() {
      rss_events();
    });*/
    self.port.on("status",function (message) {
      if (message == "CLOSED") {
        var test = "Sry, its closed"
      }else if (message == "OPEN") {
        var text = "Hey, visit the labor its open"
      }else{
        var text = "Well, its broken call the labor by phone;)"
      }
      document.getElementById("labor-status").innerHTML = text;
    })

    self.port.on("items", function (data) {
      // Handle the message
      //fruits = data;
      var eventitems = data;
      var text = "<ul>";
      for (index = 0; index < eventitems.length; index++) {
          //text += "<li>" + fruits[index] + "</li>";
          text += "<li>" + "<a href='"+eventitems[index].link+"' target='_blank'>"+eventitems[index].description +"</a>" +"</li>";
      }
      text += "</ul>";
      document.getElementById("list").innerHTML = text;
    });
