$(document).ready(function() {
    //initialize the firebase app
    var config = {
        apiKey: "AIzaSyCcuQm2T0_WH16tciNHbtih9hbnqyZ1uQ8",
        authDomain: "myhealth-5761f.firebaseapp.com",
        databaseURL: "https://myhealth-5761f.firebaseio.com",
        projectId: "myhealth-5761f",
        storageBucket: "myhealth-5761f.appspot.com",
        messagingSenderId: "158391104495"
    };
    firebase.initializeApp(config);

    //create firebase references
    var database = firebase.database();

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
            console.log(response);

        });
    };


    //Register
    $('#doRegister').on('click', function(e) {
        e.preventDefault();
        $('#registerModal').modal('hide');
        $('#messageModalLabel').html("hello");
        $('#messageModal').modal('show');
        var data = {
            email: $('#registerEmail').val(), //get the email from Form
            firstName: $('#registerFirstName').val(), // get firstName
            lastName: $('#registerLastName').val(), // get lastName            
            password: $('#registerPassword').val(), //get the pass from Form
            cPassword: $('#registerConfirmPassword').val(), //get the confirmPass from Form
        }
        if (data.email != '' && data.password != '' && data.cPassword != '') {
            if (data.password == data.cPassword) {

                database.ref().push(data);
                console.log(data.email, data.password);

            }
        };
    });


    database.ref().on("child_added", function(childSnapshot) {
        email = email;
        password = password;
        var authKey = new Array[email, password]; //this one way of declaring array in javascript
        // Log everything that's coming out of snapshot
        console.log(childSnapshot.val().email);
        console.log(childSnapshot.val().password);

        // Handle the errors
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
    //Login
    $('#doLogin').on('click', function(e) {
        e.preventDefault();
        $('#loginModal').modal('hide');
        $('#messageModalLabel').html("login");
        $('#messageModal').modal('show');

        if ($('#loginEmail').val() != '' && $('#loginPassword').val() != '') {
            //login the user
            var data = {
                email: $('#loginEmail').val(),
                password: $('#loginPassword').val()
            };
            database.ref().on("value", function(snapshot) {
                var snapEmail = snapshot.val().email;
                var snapPassword = snapshot.val().password;
                console.log(snapshot.val().email);
                console.log(snapshot.val().password);

                function check(form) { /*function to check userid & password*/
                    /*the following code checkes whether the entered userid and password are matching*/
                    if (data.email == snapEmail && data.password == snapPassword) {
                        window.open('dashboard.html') /*opens the target page while Id & password matches*/
                    } else {
                        alert("Error Password or Username") /*displays error message*/
                    }
                }
            });
        }
    }); //do login
    //listener event, executes function when button clicked
    $("#button").on("click", function(event) {
            event.preventDefault();

            //set variables
            var weight = 0;
            var height = 0;

            //grabs user input
            weight = $("#weight").val().trim();
            height = $("#height").val().trim();

            //clean text boxes
            $("#weight").val("");
            $("#height").val("");

            console.log(height);
            console.log(weight);

            //the math part
            bmi = (weight / (height * height) * 703);
            console.log(bmi);

            //this will display only 2 numbers after the "." 33.33
            var shortResult = bmi.toFixed(2);
            var comment = "";


            // if statment will display a comment acordently to the result of your BMI
            if (10 <= shortResult && shortResult < 14.9) {
                comment = "You are seriously underweight!";
            } else if (15 <= shortResult && shortResult < 18.4) {
                comment = "You are slightly underweight.";
            } else if (18.5 <= shortResult && shortResult < 24.9) {
                comment = "You are healthy!";
            } else if (25 <= shortResult && shortResult < 29.9) {
                comment = "You are slightly overweight.";
            } else if (30 <= shortResult && shortResult < 39.9) {
                comment = "You are obese!";
            } else if (40 <= shortResult && shortResult < 49.9) {
                comment = "You are seriously obese!";
            }

            console.log(shortResult);
            console.log(comment);



            //getting the result and displaying it
            document.getElementById("results").innerHTML = shortResult + " % " + comment;

            //pushing information to the firebase
            firebase.database().ref().push({
                shortResult: shortResult,
                comment: comment



            }); //firebase ref() push()

        }) // event listener 
});