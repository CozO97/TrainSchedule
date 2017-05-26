// Initialize Firebase
var config = {
    apiKey: "AIzaSyCJ1ijXNZmGjNQO8SoK8CfHbGhX4o5OJCo",
    authDomain: "trainschedule-12d46.firebaseapp.com",
    databaseURL: "https://trainschedule-12d46.firebaseio.com",
    projectId: "trainschedule-12d46",
    storageBucket: "trainschedule-12d46.appspot.com",
    messagingSenderId: "1036250135605"
};
firebase.initializeApp(config);

var database = firebase.database();



$("#addTrain").on("click", function(event) {
    event.preventDefault();
    //user input
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = moment($("#firstTrain").val().trim(), "LT").format("HH:mm");
    var frequency = $("#frequency").val().trim();

    var nTrain = {
        name: trainName,
        destin: destination,
        first: firstTrain,
        rate: frequency
    };

    //push data to database
    database.ref().push(nTrain);
    console.log(nTrain.name);
    console.log(nTrain.place);
    console.log(nTrain.first);
    console.log(nTrain.rate);

    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrain").val("");
    $("#frequency").val("");
});

database.ref().on("child_added", function(childsnapshot) {
    console.log(childsnapshot.val());
    var trainName = childsnapshot.val().name;
    var destination = childsnapshot.val().destin;
    var firstTrain = childsnapshot.val().first;
    var frequency = childsnapshot.val().rate;

    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    var tFrequency = frequency;

    // Time is 3:30 AM
    var firstTime = firstTrain;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


    // Add each train's data into the table

    $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tMinutesTillTrain + "</td><td>" + "<button class ='delete btn btn-danger'>Remove </button> " + "</td></tr>");

});


$('table').on('click', 'button', function() {
    $(this).closest('tr').remove();
});
$('#upDate').on("click", ".info", function() {
    childsnapshot();
});
