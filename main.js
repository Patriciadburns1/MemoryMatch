
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
    $(".card").on("click", card_clicked);
    $(".reset").on("click", resetGame);
}

//  card is clicked then compared - either matched or not 
function card_clicked() {
    if (card_can_be_clicked === false) {
        return;
    }

    if ($(this).find('.back').hasClass('hiddenSide')) {
        return;
    }
    // console.log("this is working", this);
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
                setInterval(closeModal, 4000);
                resetCardsforNextRound();
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

//function to randomize divs /cards into grid container 
function randomCard() {
    var divs = $(".grid-item");
    while (divs.length) {
        var randomIndex = (Math.random() * divs.length) >> 0;
        var element = divs[randomIndex];
        $(".grid-container").append(element);
        divs.splice(randomIndex, 1);
    }
}


// function to reset cards if they are not a match 
function resetSelectedCards() {
    $(first_card_clicked).find(".back").removeClass("hiddenSide");
    $(second_card_clicked).find(".back").removeClass("hiddenSide");
    first_card_clicked = null;
    second_card_clicked = null;
    card_can_be_clicked = true;
}

// function to display the stats of each round 
function displayStats() {
    var calculatedAccuracy = (match_counter / attempts) * 100;
    // if match counter does not increment then calculatedAccuaracy does not change 
    if (match_counter === 0) {
        calculatedAccuracy = 0;
    }
    var formattedAccuracy = calculatedAccuracy.toFixed(2) + '%';
    $(".attempts").text(attempts);
    $(".matchCounter").text(match_counter);
    $(".accuracyAmount").text(formattedAccuracy);
    amountOfGamesPlayed(); 
}

function amountOfGamesPlayed() {
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
    randomCard();
}

function resetCardsAfterDelay() {
    setTimeout(resetSelectedCards, 3000);
}

function resetCardsforNextRound() {
    setTimeout(clearDeckforAnotherGameWithoutHardReset, 3000);
    randomCard();
}

function clearDeckforAnotherGameWithoutHardReset() {
    $("div").removeClass("hiddenSide");
}

function alertWinnerTheyHaveWon() {
    youHaveWonModal();
}

function youHaveWonModal() {
    document.querySelector("#modalShadow").style.display = "block";
}

function closeModal() {
    document.querySelector("#modalShadow").style.display = "none";
}



