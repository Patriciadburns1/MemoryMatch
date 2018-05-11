
$(document).ready(intializingApp);
var card_can_be_clicked = true;
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;
var attempts=0; 
var accuracy=0; 
var matches=0; 


function intializingApp() {
    console.log("document is loaded");
    $(".grid-item").click(card_clicked);
    //select button then call reset game function 
    $(".reset").click(resetGame); 
}

function card_clicked(){
    if(card_can_be_clicked === false){
        return;
    }
    console.log("this is working", this);
    var elementThatWasClicked = this;
    $(elementThatWasClicked).find(".back").addClass("hiddenSide");
    //add a check for both cards if theyre both equal to null/not assigned 
    //if already revealed do nothing 
   
    if (first_card_clicked === null) {
        first_card_clicked = elementThatWasClicked;
        // elementThatWasClicked=$("").find()attr(); 
    }
    else {
        second_card_clicked=elementThatWasClicked; 
        // elementThatWasClicked=$("").find()attr();  
        // $(".grid-item").click(function()
        // {$(".grid-item").off("click")
       debugger;
        if ($(second_card_clicked).find('img').attr('src') === $(first_card_clicked).find('img').attr('src')) {
            match_counter = match_counter + 1;
            first_card_clicked = null;
            second_card_clicked = null;
            if (match_counter === total_possible_matches) {
              alertWinnerTheyHaveWon(); 
            }
        }
        else {
            card_can_be_clicked = false;
            resetCardsAfterDelay();

        }
        
    }  
}


function resetGame(){
    console.log("is this working? "); 
    $("div").removeClass("hiddenSide"); 
}

function resetCardsAfterDelay(){
 setTimeout(resetSelectedCards,5000);  
}
    

function resetSelectedCards(){
    $(first_card_clicked).find(".back").removeClass("hiddenSide");
    $(second_card_clicked).find(".back").removeClass("hiddenSide");
    first_card_clicked = null;
    second_card_clicked = null;
    card_can_be_clicked = true;
}

function alertWinnerTheyHaveWon(){
     alert("You have won!"); 
}

// all images in an array 
