
$(document).ready(intializingApp);
var card_can_be_clicked = true;
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;
var attempts=0; 
var accuracy=0; 


function intializingApp() {
    console.log("document is loaded");
    $(".grid-item").click(card_clicked);
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
       
        if ($(second_card_clicked).find('img').attr('src') === $(first_card_clicked).find('img').attr('src')) {
            match_counter = match_counter + 1;
            first_card_clicked = null;
            second_card_clicked = null;
            if (match_counter === total_possible_matches) {
               //function to have alert 
                alert("You have won!");
            }
        }
        else {
            card_can_be_clicked = false;
            resetCardsAfterDelay();

        }
        
    }  
}
function resetGame(){
    //reset variables to default
    //return cards to unflipped state
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
