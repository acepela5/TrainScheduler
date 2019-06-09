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
     var destination = $("#destination").val().trim();
     var firstTrainTime = $("#firstTrainTime").val().trim();
     var frequency = $("#frequency").val().trim();

     //  if the text boxes are not filled in, the user will be notified
         if (!trainName || !destination || !firstTrainTime || !frequency){
         alert("Please fill in all text boxes")
         }
     // if not a number is added to frequency, the user will be notified
         else if (isNaN(frequency)){
         alert("Please type a valid number")
         }
         else{
            var newTrain = {
            trainName: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency
            }
         }   
// pushes information to firbase
     database.ref().push(newTrain);
    
    //  clears textbox after form submitted
     function clearText() {
        $("textarea").val("");
     }
     
     clearText()
 });


 //  Materialize JS
 $('#trainName').val();
 M.textareaAutoResize($('#trainName'));

 $('#destination').val();
 M.textareaAutoResize($('#destination'));

 $('#frequency').val();
 M.textareaAutoResize($('#frequency'));

 $('#firstTrainTime').val();
 M.textareaAutoResize($('#firstTrainTime'));

 
 database.ref().on("child_added", function(snapshot){
    
    // get the value from the snapshot
     var sv = snapshot.val();

    // Changing HTML to reflect new data
     var trainName = snapshot.val().trainName;
     var destination = snapshot.val().destination;
     var frequency = snapshot.val().frequency;

    //jquery to append to your html table
     var tr=$("<tr>");

     var td1=$("<td>");
     td1.text(trainName)
     tr.append(td1)

     var td2=$("<td>");
     td2.text(destination)
     tr.append(td2)

     var td3=$("<td>");
     td3.text(frequency)
     tr.append(td3)



     var tFrequency = sv.frequency;

     var firstTime = sv.firstTrainTime;

     var firstTimeConverted = moment(firstTime, "HH:mm")

     var currentTime = moment();
     console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

     var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

     if(diffTime < 0){
        diffTime = diffTime * -1 
     }

     var tRemainder = diffTime % tFrequency;

     var tMinutesTillTrain = tFrequency - tRemainder;

     var nextTrain = moment().add(tMinutesTillTrain, "minutes");


     var td4=$("<td>")
     td4.text(moment(nextTrain).format("HH:mm"))
     tr.append(td4)

     var td5=$("<td>");
     td5.text(tMinutesTillTrain)
     tr.append(td5)


     $("tbody").append(tr);


        // handles errors
     }, function(errorObject) {
     console.log("Errors Handled: " + errorObject.code);
     });
 // assuming train stop at midnight (last train)
 // if (diffTime < 0){
 //     nextTrain = firstTime
 //     diffTime = diffTime * -1 
 // }

//  https://itsolutionstuff.com/post/automatically-refresh-or-reload-a-page-using-jquery-exampleexample.html
   setTimeout(function(){
       location.reload();
   },60000);

});
