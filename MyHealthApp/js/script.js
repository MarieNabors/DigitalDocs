

//listener event, executes function when button clicked
$("#button").on("click", function (event){
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

   
   
})// event listener 





