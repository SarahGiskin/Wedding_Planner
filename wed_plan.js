//this is a program to make an interactive web page for a wedding planner
//last edited by Sarah Giskin 8/26/21

//turn on strict mode
'use strict';

//ready function 
$(document).ready(function() {
    
    //event handler function to process first form data
    $('#myForm').on('submit', function(e) {
        //prevent page from refreshing when form is submitted
        e.preventDefault(); 

        //reset result box div with each submission
        $('#result_box').html('');
        
        //make elements variable
        let elements = this.elements;

        //get user's name and put into new variable
        let userName = elements.namedItem('userName'); 
        userName = $(userName); 
        let uName = userName.val(); 

        //get user's spouse name and put into new variable
        let otherName = elements.namedItem('otherName'); 
        otherName = $(otherName); 
        let oName = otherName.val(); 

        //get user's wedding date and put into new variable
        let wedDate = elements.namedItem('wedDate'); 
        wedDate = $(wedDate); 
        let wDate = wedDate.val(); 

        //get user's vibe selection value 
        let vibeCheck = elements.namedItem('vibe');     
        vibeCheck = $(vibeCheck); 
        let vibeVal = vibeCheck.val(); 
        
            //turn vibe value into numerical score
            let vibeNum
            
            if (vibeVal == "zero") {
                vibeNum = 0;
            }
            else if (vibeVal == "one") {
                vibeNum = 1;
            }
            else if (vibeVal == "two") {
                vibeNum = 2;
            }
            else {
                vibeNum = 0; 
            }
        

        //get user's venue selection value 
        let venVal = $('input[name="venue"]:checked').val();
            
            //turn venue value into numerical score
            let venNum; 

            if (venVal == "zero") {
                venNum = 0;
            }
            else if (venVal == "two") {
                venNum = 2;
            }
            else {
                venNum = 0; 
            }
            
        
        //get user's color selection value 
        let colorCheck = elements.namedItem('colorScheme');     
        colorCheck = $(colorCheck); 
        let colorVal = colorCheck.val(); 
        
            //turn color value into numerical score
            let colorNum; 

            if (colorVal == "zero") {
                colorNum = 0;
            }
            else if (colorVal == "one") {
                colorNum = 1;
            }
            else if (colorVal == "two") {
                colorNum = 2;
            }
            else {
                colorNum = 0; 
            }    
        

        //take cost input and assign score
        let costCheck = elements.namedItem('cost');     
        costCheck = $(costCheck); 
        let costVal = costCheck.val(); 

            //turn cost value into numerical score
            let costNum;    

            if (costVal <= 62) {
                costNum = 0;
            }
            else if (costVal > 62 && costVal < 89 ) {
                costNum = 1;
            }
            else if (costVal >= 89) {
                costNum = 2;
            }
            else {
                costNum = 0; 
            }


        //get user's meal selection value 
        let mealVal = $('input[name="meal"]:checked').val();
            
            //turn meal value into numerical score
            let mealNum;
            
            if (mealVal == "zero") {
                mealNum = 0;
            }
            else if (mealVal == "two") {
                mealNum = 2;
            }
            else {
                mealNum = 0; 
            }
        
        
        //request variable to hold ajax result
        let request = $.ajax({
        method: 'GET',
        url: 'packages.json'
        }); //end request

        //create object from some user inputs
        const client = {
            name: uName,
            spouse: oName, 
            date: wDate, 
            } //end client object 
        
        //add up score
        let score = (vibeNum + venNum + colorNum + costNum + mealNum); 
        
        
        //function to run if request completes
        request.done(function(data){
            //if score is less than or equal to 3
            if (score <= 3) {
                //1st package JSON data into js object
                const firstP = data.first;
                
                //call function to print results to page
                printRes(client, firstP); 
                
                //change appearance of page after results display 
                changeCSS();    //call function 
                $("#result_box").css("background-color", "silver");
                $("#heading").css("background-color", "silver");
            } //end if
        
            //if score is btwn 4-6
            else if (score >= 4 && score <= 6) {
                //2nd package JSON data into js object
                const secP = data.second;

                //call function to print results to page
                printRes(client, secP); 
                  
                //change appearance of page after results display 
                changeCSS();    //call function 
                $("#result_box").css("background-color", "goldenrod"); 
                $("#heading").css("background-color", "goldenrod");     
            } //end if
        
            //if score is more than or equal to 7
            else if (score >= 7) {
                //3rd package JSON data into js object
                const thirdP = data.third;

                //call function to print results to page
                printRes(client, thirdP); 
                 
                //change appearance of page after results display 
                changeCSS();    //call function 
                $("#result_box").css("background-color", "white");
                $("#heading").css("background-color", "white");
            } //end if 

            //if score is none of the above, you have a problem
            else {
                $('#result_box').append('<p>' + "Error: Please try again!" + '</p>'); 
            } //end else 

        }); //end request done function
        

        //function to run if request fails to complete
        request.fail(function(response){
            console.log('ERROR ' + response.statusText);
        }); //end request fail function


        //function to print user results
        function printRes(person, pack) {
            //print results to page
            $('#result_box').append('<p>' + "Hello " + person.name + ", congrats on your engagement to " 
            + person.spouse + "! We are so excited to help you plan a magical wedding on " + person.date 
            + ". Based on your answers your best match is our " + pack.package 
            + " wedding package! That means the vibe of your wedding will be " + pack.vibe 
            + ", the venue will be " + pack.venue + ", and the meal will be a " + pack.meal 
            + ". The color scheme will include " + pack.color + ", and all of this will only cost $"
            + pack.cost + " per wedding guest! Contact us to get signed up asap." + '</p>');
        } //end printRes function 


        //function to change css styles when results are displayed 
        function changeCSS(){
            $("body").css("background-color", "violet");
            $("h1").css("color", "darkslategrey");
        } //end change css function

    }); //end event handler


    //event handler function to process second form data
    $('#newForm').on('submit', function(e) {
        //prevent page from refreshing when form is submitted
        e.preventDefault(); 

        //reset result box div with each submission
        $('#result_box2').html('');
        
        //make elements variable
        let elements = this.elements;

        //place 1st destination in variable
        let aDest = elements.namedItem('hMoon1'); 
        aDest = $(aDest); 
        let dest1 = aDest.val(); 

        //place 2nd destination in variable
        let bDest = elements.namedItem('hMoon2'); 
        bDest = $(bDest); 
        let dest2 = bDest.val(); 

        //place 3rd destination in variable
        let cDest = elements.namedItem('hMoon3'); 
        cDest = $(cDest); 
        let dest3 = cDest.val(); 
        
        //add user inputs to array 
        let dest = [dest1, dest2, dest3]; 
       
        $('#result_box2').append('<p>' + "You are interested in taking a honeymoon to..." + '</p>'); 
        $('#result_box2').append('<ul id = "myList" >' + '</ul>'); 
        

        //loop to iterate destination array creating list items
        let i = 0;
        while(i < dest.length){   
            $('#myList').append('<li>' + dest[i] + '</li>'); 
            i++; 
        } //end for loop

        //call function to calculate random int, assign result to variable 
        let myNum = rando(0, 2); 

        //use myNum as array index to determine honeymoon location 
        let honeyMoon = dest[myNum]; 

        //print results to page 
        $('#result_box2').append('<p>' + "Contact us now to book a fabulous deal on a honeymoon to " 
        + honeyMoon + "!" + '</p>'); 

        function rando(low, high){
            //random number to select array index
            let min = Math.ceil(low);
            let max = Math.floor(high);
            let myNum = Math.floor(Math.random() * (max - min + 1) + min);
            return myNum; 
        } //end rando function
    
    }); //end event handler

    
    //variable for button to reveal wedding cake, call show cake function
    let myButton = $('#cake_button');   
    myButton.on('click', showCake);

    //function to expose hidden cake image 
    function showCake(){
        $('#cakePic').removeClass('hidden');
    } //end show cake function 

    let i = 0;
    //to run when cake image is clicked, call next cake function
    $('#cakePic').click(nextCake); 
    
    
    //function to replace cake image 
    function nextCake(){
        //cakeArray variable to hold cake photo sources 
        let cakeArray = ["cake_2.jpg", "cake_3.jpg", "cake_4.jpg", "cake_5.jpg", "cake_6.jpg", 
        "cake_7.jpg", "cake_8.jpg", "cake_9.jpg", "cake_1.jpg"];
       
        $('#cakePic').attr('src', cakeArray[i]);
        i++;

        //if statement to reset i to 0, if it is equal to or bigger than array 
        if(i >= cakeArray.length){
            i = 0;
        } //end if

    } //end next cake function 
   

}); //end ready function