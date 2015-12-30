var index;

    var events = [];

    fruits = [];

/*
    self.port.on("show", function onShow() {
      rss_events();
    });*/

    self.port.on("items", function (data) {
      // Handle the message
      //fruits = data;
      var eventitems = data;
      var text = "<ul>";
      for (index = 0; index < eventitems.length; index++) {
          //text += "<li>" + fruits[index] + "</li>";
          text += "<li>" + eventitems[index].title + "</li>";
      }
      text += "</ul>";
      document.getElementById("list").innerHTML = text;
    });
