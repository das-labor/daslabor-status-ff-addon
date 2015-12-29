var index;
    var text = "<ul>";
    var fruits = ["Banana", "Orange", "Apple", "Mango","meh"];
    for (index = 0; index < fruits.length; index++) {
        text += "<li>" + fruits[index] + "</li>";
    }
    text += "</ul>";
    document.getElementById("list").innerHTML = text;
