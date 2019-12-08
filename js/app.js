

    const array = [
        "fa fa-diamond",
        "fa fa-paper-plane-o",
        "fa fa-anchor",
        "fa fa-bolt",
        "fa fa-cube",
        "fa fa-leaf",
        "fa fa-bicycle",
        "fa fa-bomb",
        "fa fa-diamond",
        "fa fa-paper-plane-o",
        "fa fa-anchor",
        "fa fa-bolt",
        "fa fa-cube",
        "fa fa-leaf",
        "fa fa-bicycle",
        "fa fa-bomb"
    ];

    let x = {};

   // random sgffle for card
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
    }
// start the game
    function GameeCards() {
        x.heldPic = [];
        x.moveCards = 0;
        x.matchPic = 0;
        x.timeFunction && clearInterval(x.timeFunction);
        x.seconds = -1;
        x.stars = 3;
        document.querySelector(".moves").textContent = "0";
        document.querySelector(".seconds").textContent = "0";


        const Allcards = document.querySelectorAll(".card");
        Array.from(Allcards).forEach(card => (card.className = "card"));
        /**@type {NodeList} */
        const El = document.querySelectorAll(".stars i");
        El.forEach(
            /** @param {HTMLElement} star*/
            star => (star.style.color = "#FFFF00")
        );

     
        const i = document.querySelectorAll(".card > i");
        setTimeout(() => {
            shuffle(array).forEach((element, index) => {
                i[index].className = element;
            });
            document.querySelector(".deck").addEventListener("click", control);
            document
                .querySelector(".restart")
                .addEventListener("click", GameeCards, {once: true});
        }, 200);
    }
//reduce the stars and change color
    function reduceStar() {
        let i;
        if (x.stars === 3) {
            i = 0;
        } else if (x.stars === 2) {
            i = 1;
        }
        const elementStar = document.querySelectorAll(".stars i")[i];
        // @ts-ignore
        elementStar.style.color = "black";
        x.stars -= 1;
    }
//count number of move and display it
    function moveCounter() {
        x.moveCards += 1;
        let starmove = String(x.moveCards);
        const moveElement = document.querySelector(".moves");
        // @ts-ignore
        moveElement.textContent = starmove.padStart(1, "0");
    }
//    timer if the value of t true the game work 
    function Timer(t = true) {
        if (!t) {
            clearInterval(x.timeFunction);
            return;
        }
        if (x.seconds === -1) {
            x.timeFunction = setInterval(Timer, 1000);
        }
        x.seconds += 1;
        let secondsStr = String(x.seconds);
        // @ts-ignore
        document.querySelector(".seconds").textContent = secondsStr.padStart(1, "0" );
    }
    
    function openPic(e) {
        e.target.className = "card open show";
    }

   
    function Symbol1(eventTarget) {
        return eventTarget.querySelector("i").className;
    }

    function checkValue() {
        return x.heldPic[0] === x.heldPic[2];
    }
    
    function heldPic(icon, eventTarget) {
        x.heldPic = [...x.heldPic, icon, eventTarget];
    }

    function matchCards() {
        x.heldPic[1].className = "card open match";
        x.heldPic[3].className = "card open match";
        x.heldPic = [];
        x.matchPic += 1;
    }

    function closeCards() {
        setTimeout(function pause() {
            x.heldPic[1].className = "card";
            x.heldPic[3].className = "card";
            x.heldPic = [];
        }, 600);
    }

  
       function win() {
        document.querySelector(".deck").removeEventListener("click", control);
        Timer(false);


        
        // Get the modal
        const modal = document.getElementById("myModal");

        
        const d = document.getElementsByClassName("close")[0];

        modal.style.display = "block";
        /** */
        function displayNone() {
            modal.style.display = "none";
        }

        // When the user clicks on <span> (x), close the modal
        d.addEventListener("click", displayNone, {once: true});
        /**
         * @param {object} event
         */
        function windowClick(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        }
        // When the user clicks anywhere outside of the modal, close it
        window.addEventListener("click", e => windowClick(e), {once: true});

       
        const movesModal = document.querySelector(".moves-modal");

   
        const secondsModal = document.querySelector(".seconds-modal");

      
        const starsModal = document.querySelector(".stars-modal");

        // Get play again class
        const playAgain = document.querySelector(".play-again");
        movesModal.textContent = x.moveCards;
        secondsModal.textContent = x.seconds;
        starsModal.textContent = x.stars;
        /** */
        function restart() {
            modal.style.display = "none";
            GameeCards();
        }

        // Page reloads when user clicks play again button
        playAgain.addEventListener("click", restart, {once: true});
    }
  
    function control(e) {
        const eventTarget = e.target;
        if (x.seconds === -1) {
            Timer();
        }
        if (x.heldPic.length === 4) {
            return;
        }
        if (eventTarget && eventTarget.className === "card") {
            openPic(e);
        } else {
            return;
        }
        const icon = Symbol1(eventTarget);
        heldPic(icon, eventTarget);
        if (x.heldPic.length === 2) {
            return;
        }
        moveCounter();
        if (x.moveCards === 16 || x.moveCards === 32) {
            reduceStar();
        }
        const match = checkValue();
        if (match) {
            matchCards();
        } else {
            closeCards();
            return;
        }
        if (x.matchPic === 8) {
            
     setTimeout(() => {
        win();
     }, 1000);       
        }
    }

    GameeCards();

