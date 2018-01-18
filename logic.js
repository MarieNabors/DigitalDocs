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

    var aryLoginInfo = [];

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
                //console.log(data.email, data.password);

 document.forms["register"].reset();
            }
        };
    });


    database.ref().on("child_added", function(childSnapshot) {
        // Log everything that's coming out of snapshot

        aryLoginInfo.push({
            email: childSnapshot.val().email,
            password: childSnapshot.val().password
        });

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
            loggedIn = false;
            aryLoginInfo.forEach(function(item) {
                if (item.email == $('#loginEmail').val()) {
                    if (item.password == $('#loginPassword').val()) {
                        loggedIn = true;
                    }
                }
            });

            if (loggedIn) {
                $('#loginForm').trigger('reset');
                window.open('MyHealthApp/index.html') /*opens the target page while Id & password matches*/
            } else {
                alert("Error Password or Username") /*displays error message*/
            }
        }
    }); //do login
   
});