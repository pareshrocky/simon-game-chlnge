let gamePattern = [];  //system choice
let userClickedPattern=[]; //user choice 
const buttonColors=["red","green","yellow","blue"] 
let gameStatus = false; //set to false as initially game has not yet started
let gameLevel = 0;  // Level count

//Automatically determines and store random color sequence.
function nextSequence(){
    userClickedPattern=[]//User choosen color array must get empty before triggering next level as it will again validate for each color of user's with respective system color from start.
    gameLevel++; //level will increase if user successfully passed each level
    $("#level-title").text("Level "+gameLevel)  //assigning updated heading according to current level
    let randomNumber = Math.floor(Math.random()*4); //pick number between 1-4
    let randomChoosenColor= buttonColors[randomNumber]; //pick color from buttonColors as per random index
    gamePattern.push(randomChoosenColor);//store colour pattern in an array
    let assignedButton = $("#"+randomChoosenColor);  // picked specific button through color class name.
    playSound("./sounds/"+randomChoosenColor+".mp3"); //play sound for specified button  
    assignedButton.fadeOut(100).fadeIn(100); //button animation effect
    
}
console.log(gamePattern);
//Global function to play sound
function playSound(sound){
    let audio = new Audio(sound);
    audio.play();
}

//Function used to show animation on clicked buttons
function animatePress(currColor){
    let animateBtn=$("."+currColor);
    animateBtn.addClass("pressed") // Adding pressed class in btn element
    setTimeout(()=>{
        animateBtn.removeClass("pressed"); // removing pressed class in btn element after delay of 100ms to show animated effect.
    }, 100);
}

function checkAnswer(chkIndexVal){
    if(userClickedPattern[chkIndexVal] === gamePattern[chkIndexVal]){
        console.log("check is success"); // After comparing each user choosen color to it's respective system choosen color. 
        if(userClickedPattern.length === gamePattern.length){
            //This if is added when user passed a particular level then next level will get triggered with a delay of 1000ms/1s.
            setTimeout(()=>{
                nextSequence()
            },1000)
        }    
    }else{
        console.log("Check got Failed as user has choosen " + userClickedPattern[chkIndexVal] + " color and system has " + gamePattern[chkIndexVal] + " color for given index " + chkIndexVal);
        $("body").addClass("game-over") // Added a game over animation effect
        playSound("./sounds/wrong.mp3") 
        setTimeout(()=>{
            $("body").removeClass("game-over") 
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart") //heading is updated as game is now over.
        restart()
    }
}

//Reseting necessary variables to restart a game. Will call after game is over.
function restart(){
    gameLevel =0;
    gameStatus=false;
    gamePattern=[];
}

//Click event handler for user clicked buttons
$('.btn').on('click',function(){
    let userChoosenColor = $(this).attr('id'); //chosen button 
    userClickedPattern.push(userChoosenColor); //stored in user choice array
    playSound("./sounds/"+userChoosenColor+".mp3"); //playing sound
    animatePress(userChoosenColor); //calling animate function for animation
    let indexVal = userClickedPattern.length-1; //taking index to validate each user choosen color item with system choosen color item
    checkAnswer(indexVal)  // validating choosen color
})

//Starting game on keypress event
$(document).on("keypress",function(e){
    if(!gameStatus){ //checking gamestatus so that keypress gets triggered only once otherwise it will restart everytime when a key event is triggered.
        gameStatus = true 
        $("#level-title").text("Level "+gameLevel) //changing title to level 0 when game starts
        nextSequence()  // System choosen colors will get triggered for first time.  
    }
})

