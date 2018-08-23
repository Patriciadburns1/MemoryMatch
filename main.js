
$(document).ready(intializingApp);


function intializingApp() {
    console.log("document is loaded");
    const memoryMatchGame = new MemoryMatch();
}

class MemoryMatch {
    constructor() {
        this.applyClickHandlers();
        this.card_can_be_clicked = true,
        this.first_card_clicked = null,
        this.second_card_clicked = null,
        this.total_possible_matches = 9,
        this.attempts = 0,
        this.match_counter = 0,
        this.games_played = 0
    }

    applyClickHandlers() {
        $(".card").on("click", this.card_clicked.bind(this));
        $(".reset").on("click", this.resetGame.bind(this));
    }

    amountOfGamesPlayed() {
        $(".gameValue").text(this.games_played);
    }

    card_clicked(event) {
        if (this.card_can_be_clicked === false) {
            return;
        }
        
     
        if ($(event.currentTarget).find('.back').hasClass('hiddenSide')) {
            return;
        }
        this.elementThatWasClicked = event.currentTarget
        $(this.elementThatWasClicked).find(".back").addClass("hiddenSide");

        if (this.first_card_clicked === null) {
            this.first_card_clicked = this.elementThatWasClicked;
        }
        else {
            this.second_card_clicked = this.elementThatWasClicked;
            this.attempts = this.attempts + 1;

            if ($(this.second_card_clicked).find('img').attr('src') === $(this.first_card_clicked).find('img').attr('src')) {
                this.match_counter = this.match_counter + 1;
                this.first_card_clicked = null;
                this.second_card_clicked = null;
                if (this.match_counter === this.total_possible_matches) {
                    this.alertWinnerTheyHaveWon();
                    this.games_played = this.games_played + 1;
                    window.setTimeout(this.closeModal.bind(this), 4000);
                    this.resetCardsforNextRound();
                }
            }
            else {
                this.card_can_be_clicked = false;
                this.amountOfGamesPlayed();
                this.resetCardsAfterDelay();
            }
            this.displayStats();
        }
    }
    randomCard() {
        let divs = $(".grid-item");
        while (divs.length) {
            let randomIndex = (Math.random() * divs.length) >> 0;
            let element = divs[randomIndex];
            $(".grid-container").append(element);
            divs.splice(randomIndex, 1);
        }
        
    }

    resetSelectedCards() {
        $(this.first_card_clicked).find(".back").removeClass("hiddenSide");
        $(this.second_card_clicked).find(".back").removeClass("hiddenSide");
        this.first_card_clicked = null;
        this.second_card_clicked = null;
        this.card_can_be_clicked = true;
    }

    displayStats() {
        let calculatedAccuracy = (this.match_counter / this.attempts) * 100;
        // if match counter does not increment then calculatedAccuaracy does not change 
        if (this.match_counter === 0) {
            calculatedAccuracy = 0;
        }
        let formattedAccuracy = calculatedAccuracy.toFixed(2) + '%';
        $(".attempts").text(this.attempts);
        $(".matchCounter").text(this.match_counter);
        $(".accuracyAmount").text(formattedAccuracy);
        this.amountOfGamesPlayed();
    }


    resetGame() {
        $("div").removeClass("hiddenSide");
        this.attempts = 0;
        this.accuracy = 0;
        this.match_counter = 0;
        this.games_played = 0;
        $(".gameValue").text(0);
        $(".matchCounter").text(0);
        $(".attempts").text(0);
        $(".accuracyAmount").text(0);
        this.randomCard();
        this.calculatedAccuracy = 0;
    }
    resetCardsAfterDelay() {
        setTimeout(this.resetSelectedCards.bind(this), 2000);
    }

    resetCardsforNextRound() {
        setTimeout(this.clearDeckforAnotherGameWithoutHardReset.bind(this), 3000);
        this.randomCard();
    }

    clearDeckforAnotherGameWithoutHardReset() {
        $("div").removeClass("hiddenSide");
    }

    alertWinnerTheyHaveWon() {
        this.youHaveWonModal();
    }

    youHaveWonModal() {
        $("#modalShadow").show(); 
        this.match_counter = 0;
    }

    closeModal() {
       $("#modalShadow").hide(); 
    }

}













