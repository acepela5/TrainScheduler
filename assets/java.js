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

  var db = firebase.database();

 $("#addTrain").on("click", function(){
     var trainName = $("#trainName").val().trim();
     var desination = $("#desination").val().trim();
     var frequency = $("#frequency").val().trim();
     var firstTrainTime = $("#nextArrival").val().trim();
     
    var newTrain = {
        trainName: trainName,
        desination: desination,
        frequency: frequency,
        firstTrainTime: firstTrainTime,
    }

    db.ref().push(newTrain);

    // alert - user that info is input
    // clear boxes of input form
// append info to table

 })

// moment.js library - understand how to read the minutes and calcutate how many minutes between

//  what is happening
// be added to the table - dynamic rows with the information
// create a firebas listener
db.ref().on("child_added", function(snapshot){
    console.log(snapshot.val())
    // get the value from the snapshot
    // jquery to append to you html table
    // need mooment.js to calculate the next train and the remaind minutes

})
// bonus - refresh page every minute to update table - reference table or page