
$(document).ready(intializingApp);
var card_can_be_clicked = true;
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var attempts = 0;
var match_counter = 0;
var games_played = 0;

function intializingApp() {
    console.log("document is loaded");
    $(".card").on("click",card_clicked);
    $(".reset").on("click",resetGame);
}

function card_clicked() {
    if (card_can_be_clicked === false) {
        return;
    }

    if ($(this).find('.back').hasClass('hiddenSide')) {
        return;
    }
    console.log("this is working", this);
    var elementThatWasClicked = this;
    $(elementThatWasClicked).find(".back").addClass("hiddenSide");
    //add a check for both cards if theyre both equal to null/not assigned 
    //if already revealed do nothing 

    if (first_card_clicked === null) {
        first_card_clicked = elementThatWasClicked;
    }
    else {
        second_card_clicked = elementThatWasClicked;
        attempts = attempts + 1;

        if ($(second_card_clicked).find('img').attr('src') === $(first_card_clicked).find('img').attr('src')) { 
            match_counter = match_counter + 1;
            first_card_clicked = null;
            second_card_clicked = null;
            if (match_counter === total_possible_matches) {
                games_played = games_played + 1; 
                alertWinnerTheyHaveWon(); 
                setInterval(closeModal,4000); 
                ClearDeckforAnotherRound(); 
            }
        }
        else {
            card_can_be_clicked = false;
            amountOfGamesPlayed(); 
            resetCardsAfterDelay(); 
        }
        displayStats();
    }
}

function displayStats() {
    var calculatedAccuracy = (match_counter/attempts) * 100;
    if (match_counter === 0) {
        calculatedAccuracy = 0;
    }
    var formattedAccuracy = calculatedAccuracy.toFixed(2) + '%';
    $(".attempts").text(attempts);
    $(".matchCounter").text(match_counter); 
    $(".accuracyAmount").text(formattedAccuracy);
}

function amountOfGamesPlayed(){
    $(".gameValue").text(games_played);
}

function resetGame() {
    $("div").removeClass("hiddenSide");
    var attempts = 0;
    var accuracy = 0;
    var match_counter = 0;
    var games_played = 0;
    $(".gameValue").text(0); 
    $(".matchCounter").text(0); 
    $(".attempts").text(0);
    $(".accuracyAmount").text(0);
}

function resetCardsAfterDelay() {
    setTimeout(resetSelectedCards, 3000);
}


function resetSelectedCards() {
    $(first_card_clicked).find(".back").removeClass("hiddenSide");
    $(second_card_clicked).find(".back").removeClass("hiddenSide");
    first_card_clicked = null;
    second_card_clicked = null;
    card_can_be_clicked = true;
}

function resetCardsforNextRound() {
    setTimeout(clearDeckforAnotherGameWithoutHardReset, 3000);
}

function clearDeckforAnotherGameWithoutHardReset(){
    $("div").removeClass("hiddenSide");
}

function alertWinnerTheyHaveWon() {
    youHaveWonModal();
}

function youHaveWonModal(){
    document.querySelector("#modalShadow").style.display="block"; 
}

function closeModal(){
    document.querySelector("#modalShadow").style.display="none"; 
}



