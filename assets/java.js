$(document).ready(function(){

var firebaseConfig = {
    apiKey: "AIzaSyDIe9l7AALkLkH5PiXloWMd35ir5W3FAOY",
    authDomain: "trainscheduler-3ab75.firebaseapp.com",
    databaseURL: "https://trainscheduler-3ab75.firebaseio.com",
    projectId: "trainscheduler-3ab75",
    storageBucket: "trainscheduler-3ab75.appspot.com",
    messagingSenderId: "410370824239",
    appId: "1:410370824239:web:0b19bdff052fe0d4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
// creates a variable to reference the database
  var database = firebase.database();

// Capturing the button click
 $("#addTrain").on("click", function(){

// preventing multiple submission after pressing the button
event.preventDefault();

// Initial Variables & grabbing values from text-boxes
     var trainName = $("#trainName").val().trim();
     var desination = $("#desination").val().trim();
     var firstTrainTime = $("#firstTrainTime").val().trim();
     var frequency = $("#frequency").val().trim();
     
     
    var newTrain = {
        trainName: trainName,
        desination: desination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
        
    }
// pushes information to firbase
    database.ref().push(newTrain);

    // alert - user that info is input
    // clear boxes of input form
// append info to table

 });





database.ref().on("child_added", function(snapshot){
    // get the value from the snapshot
    var sv = snapshot.val();

    console.log('sv', sv);
    

    // console.log(sv.trainName);
    // console.log(sv.desination);
    // console.log(sv.firstTrainTime);
    // console.log(sv.frequency);

    // Changing HTML to reflect new data
var trainName = snapshot.val().trainName;
var desination = snapshot.val().desination;
var firstTrainTime = snapshot.val().firstTrainTime;
var frequency = snapshot.val().frequency;

$("#table-name").text(trainName);
$("#table-destination").text(desination);
$("#table-frequency").text(frequency);
    //jquery to append to you html table

var tr=$("<tr>");

var td1=$("<td>");
td1.text(trainName)
tr.append(td1)

var td2=$("<td>");
td2.text(desination)
tr.append(td2)

var td3=$("<td>");
td3.text(frequency)
tr.append(td3)


var tFrequency = sv.frequency;

var firstTime = sv.firstTrainTime;

var firstTimeConverted = moment(firstTime, "HH:mm")
console.log(firstTimeConverted);

var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

var tRemainder = diffTime % tFrequency;
console.log(tRemainder);


var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
//starttime
//frequency




var td4=$("<td>");
td4.text(moment(nextTrain).format("hh:mm"))
tr.append(td4)

var td5=$("<td>");
td5.text(tMinutesTillTrain)
tr.append(td5)


$("tbody").append(tr);

// handles errors
}, function(errorObject) {
    console.log("Errors Handled: " + errorObject.code);
});
// Assumption
var tFrequency = 10;

var firstTime = "14:50";

var firstTimeConverted = moment(firstTime, "HH:mm")
console.log(firstTimeConverted);

var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

var tRemainder = diffTime % tFrequency;
console.log(tRemainder);


var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
// bonus - refresh page every minute to update table - reference table or page
// moment.js library - understand how to read the minutes and calcutate how many minutes between

//  what is happening
// be added to the table - dynamic rows with the information
// create a firebas listener
//     // need mooment.js to calculate the next train and the remaind minutes

});
// clean up logs, maybe look into adding 
// edge case - prevent user from adding non numbers 
// if to clean adding future time