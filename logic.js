// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCcuQm2T0_WH16tciNHbtih9hbnqyZ1uQ8",
    authDomain: "myhealth-5761f.firebaseapp.com",
    databaseURL: "https://myhealth-5761f.firebaseio.com",
    projectId: "myhealth-5761f",
    storageBucket: "myhealth-5761f.appspot.com",
    messagingSenderId: "158391104495"
  };
  firebase.initializeApp(config);
    
function humanApi() {
    
    var queryURL = "https://api.humanapi.co/v1/human?access_token=demo";
    //Create AJAX call for the demoData
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        
        $("#1").text(`Blood Pressuer: ${response.bloodPressure.systolic}/${response.bloodPressure.diastolic}`);
        $("#2").text(`Heart Rate: ${response.bloodPressure.heartRate}`);
        $("#3").text(`BMI: ${response.bmi.value}`);
        $("#4").text(`Body Fat: ${response.bodyFat.value}`);
        //console.log("systolic: ", response.bloodPressure.systolic);
        //console.log("diastolic:", response.bloodPressure.diastolic);
        //console.log("heartRate:", response.bloodPressure.heartRate);
        //console.log("bmi:", response.bmi.value);
        //console.log("bodyFat:", response.bodyFat.value);
});
};
var humanApidata = humanApi();
console.log(humanApidata);