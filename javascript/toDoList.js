var myArray = ['Buy a new dress', 'Drink coffee', 'Complete the JS task', 'Have a real night out'];

// Om det finns något i min localstorage så hämtar den min array
if (localStorage.getItem("mySavedArray")) {
    myArray = JSON.parse(localStorage.getItem("mySavedArray"));
}
else {
    // Annars om det inte finns något i localstorage så ser vi till att det min hård kodade array
    localStorage.setItem("mySavedArray", JSON.stringify(myArray));
}

var doneArray = [];

// Om det är sant att min localstorage finns så sparas den i doneArray
if (localStorage.getItem("myDoneSavedArray")) {
    doneArray = JSON.parse(localStorage.getItem("myDoneSavedArray"));
}

function myToDoList() {
    var getArray = localStorage.getItem("mySavedArray");
    var listFromStroage = JSON.parse(getArray);
    var myUlList = '<ul>';

    // Loopar ut lista ifrån localstorage
    for (var i = 0; i < listFromStroage.length; i++) {
        myUlList += "<li class='row justify-content-center' id='" + i + "'>" + '<div class="col-4 col-md-5 text-right">' + '<button class="remove" id="' + i + '"onclick="deleteToDo(' + i + ')">Delete</button>' + "<i class='doneBox fas fa-square' onclick='moveToDone(" + i + ")'></i>" + '</div>' + " " + '<div class="col-5 col-md-7 text-left">' + "<p>" + listFromStroage[i] + "</p></div></li>";
    }

    myUlList += '</ul>';
    document.getElementById("allMyToDos").innerHTML = myUlList;

    var myFullPrintedToDone = '<ul>';
    // Loppar ut alla mina done arrays
    for (var i = 0; i < doneArray.length; i++) {
        myFullPrintedToDone += "<li class='row justify-content-center'>" + '<div class="col-4 col-md-5 text-right"><button class="remove" id="' + i + '"onclick="deleteDone(' + i + ')">Delete</button>' + "<i class='fas fa-check-square' onclick='moveToToDo(" + i + ")'  checked id='" + i + "'></i></div><div class='col-5 col-md-7 text-left'><p class='lineThrough'>" + " " + doneArray[i] + "</p></div></li>";
    }

    myFullPrintedToDone += '</ul>';
    document.getElementById("allMyDoneToDos").innerHTML = myFullPrintedToDone;
}
// En function som gör om min array till en text och sparar den i localstorage
function save() {
    localStorage.setItem("mySavedArray", JSON.stringify(myArray));
    localStorage.setItem("myDoneSavedArray", JSON.stringify(doneArray));
}
// Lägger till en todo med en input
function addToList() {
    var myValue = document.getElementById("inputText").value;
    // Om jag inte fylle in något i min input så skickas det en alurt ajj man måste fylla i den för att lägga till.
    if (myValue === " ") {
        alert("Plaase add ToDo");
    }
    // Annars lägger man till en ny todo i sin lista
    else {
        myArray.push(myValue);
        save();
        myToDoList();
    }

    document.getElementById("inputText").value = " ";
}
// Den flyttar en todo till den all done
function moveToDone(id) {
    var moveThisString = myArray.splice(id, 1);
    var turnToString = moveThisString.toString();
    doneArray.push(turnToString);
    save();

    myToDoList();
}
// Den gör så att jag kan flytta tillbaka min done todo till todolistan
function moveToToDo(id) {
    var moveThisString = doneArray.splice(id, 1);
    var turnToString = moveThisString.toString();
    myArray.push(turnToString);
    save();

    myToDoList();
}
// Så att man kan ta bort en todo
function deleteToDo(position) {
    myArray.splice(position, 1);
    save();

    myToDoList();
}
// Så att man kan ta bort en done todo
function deleteDone(position) {
    doneArray.splice(position, 1);
    save();

    myToDoList();
}
// Så att jag kan sortera mina todos A-Z
function sortMyList() {
    myArray.sort();
    save();

    myToDoList();
}
//  Så att jag kan sortera mina todos Z-A
function sortbackMyToDoList() {
    myArray.sort();
    myArray.reverse();
    
    save();

    myToDoList();
}
// När min sida har laddat så körs funktionen MyToDoList
document.addEventListener("DOMContentLoaded", function () {
    myToDoList();

    // När du trycker på knappen add körs funktionen addToList
    document.getElementById("btnAdd").addEventListener("click", function () {
        addToList();
    });

});






