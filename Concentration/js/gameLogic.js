var queryString = parent.document.URL.substring(parent.document.URL.indexOf('?'), parent.document.URL.length);

var diff = queryString.substring(queryString.indexOf('diff')+5, queryString.indexOf('diff')+6);

var numberOfCards;
var numberMatch = 0;
var tries = 0;
var bestTries = 999999;
var clickDisabled = false;
var game;

if (diff == 0) {
    numberOfCards = 3;
} else if (diff == 1) {
    numberOfCards = 4;
} else if (diff == 2) {
    numberOfCards = 6;
} else if (diff == 3) {
    numberOfCards = 10;
}

//Array of cards and their contents
var cards = [
    {
        id : 0,
        txt : '★'
    }, {
        id : 1,
        txt : '☯'
    }, {
        id : 2,
        txt : '❄'
    }, {
        id : 3,
        txt : '☮'
    }, {
        id : 4,
        txt : '☀'
    }, {
        id : 5,
        txt: '☂'
    }, {
        id : 6,
        txt: '♞'
    }, {
        id : 7,
        txt: '⚐'
    }, {
        id : 8,
        txt: '☢'
    }, {
        id : 9,
        txt: '☭'
    }
];

//Initiate framework for game
window.Util =  {
  util : this,
  shuffle : function (arr) {
    var i, k, t = 0;

    for (i = arr.length - 1; i > 0; i -= 1) {
      k = Math.floor(Math.random() * i);

      //swap position
      t = arr[i];
      arr[i] = arr[k];
      arr[k] = t;
    }
  },
  
    
    Card : function Card(index) {
        var self = this;

        this.html = document.createElement('div');
        this.html.style.backgroundImage = "url('../img/cardBack.png')";
        this.html.className = 'outer_card';
        this.text = cards[index].txt;
        this.value = index;
        this.html.innerHTML =  '<h1 class="inner_card">' + this.text + '</h1>';

        this.matched = false;
        this.selected = false;

        this.html.addEventListener('click', function () {
            
            //If clicking is disabled, do nothing        
            if (clickDisabled) {
                return;
            }
            
            if (self.matched === false) {
                if (self.selected) {
                    self.selected = false;
                    self.html.classList.toggle('selected');
                    tries++;
                } else {
                    self.selected = true;
                    self.html.classList.toggle('selected');
                }
            }
            
            clickDisabled = true;
            
            window.setTimeout(function() {
                clickDisabled = false;
            }, 502);
            
        });
    }
};

//Initiate game on page load
window.onload = function() {
    function ConcentrationApp() {
        numberMatch = 0;
        this.cards = [];
        this.card1 = null;
        this.card2 = null;

        var self = this;

        this.click = function(event) {
            //Grabbing the event target and checking to see
            //what card from our index it matches

            var target = (function (t) {
                for (var i = 0; i < self.cards.length; i++) {
                    if (t === self.cards[i].html) {
                        return self.cards[i];
                    }
                }
            }(event.target));

            //Game logic
            //If the card clicked is selected
            if (this.classList.contains("selected") === true) {
                //If no card has been selected
                if (self.card1 === null) {
                    self.card1 = target;
                }
                //The first card has been selected
                else if (self.card1 !== null) {
                    self.card2 = target;
                    if (self.card1 == self.card2) {
                        self.card2 = null;
                    } else {
                        //Two cards are face up
                        if (self.card1.value === self.card2.value) {
                            self.cardMatch();
                        } else {
                            self.cardMismatch();
                        }
                    }                    
                }
                else {
                    console.log("Something is wrong!");
                }
            }
        }
        game = this;
        this.init();
    };

    ConcentrationApp.prototype.init = function() {
        
        this.cards = [];
        numberMatch = 0;
        this.card1 = null;
        this.card2 = null;
        
        for (var i = 0; i < numberOfCards; i++) {
            for (var j = 0; j < 2; j++) {
                this.cards.push(new Util.Card(i));
            }
        }

        Util.shuffle(this.cards);

        //Add the cards to the page and attach the listener
        for (var i = 0; i < this.cards.length; i++) {
            document.getElementById('gameWindow').appendChild(this.cards[i].html);
            this.cards[i].html.addEventListener('click', this.click);
        }
    };

    ConcentrationApp.prototype.cardMatch = function() {
        var self = this;
        
        tries++;

        numberMatch += 1;

        window.setTimeout(function (){
            self.card1.html.classList.add('matched');
            self.card2.html.classList.add('matched');
        }, 500);

        window.setTimeout(function() {
            self.card1.html.classList.remove('selected');
            self.card2.html.classList.remove('selected');

            self.card1 = null;
            self.card2 = null;

        }, 501);
        console.log(numberMatch);
        if (numberMatch === numberOfCards) {
            var title = document.getElementById("concentrate");
            var results = document.getElementById("results");
            
            window.setTimeout(function() {
                title.innerHTML = "You win!";
                results.innerHTML = "It took you " + tries + " matches to win. Try again?";
            }, 500);
            
            /* Reset game */
            results.onclick = function(){
                var cards = document.getElementsByClassName("matched")

                //Remove current set of cards before resetting game
                while (cards.length > 0) {
                    cards[0].parentNode.removeChild(cards[0]);
                }
                
                if (tries < bestTries) {
                    bestTries = tries;
                }
                
                tries = 0;
                
                title.innerHTML = "Best attempt: " + bestTries + " matches";
                results.innerHTML = "";
                
                //Restart game
                game.init();
            }
        }
    };

    ConcentrationApp.prototype.cardMismatch = function() {
        var self = this;
        tries++;

        window.setTimeout(function () {
            self.card1.html.classList.remove('selected');
            self.card2.html.classList.remove('selected');

            self.card1 = null;
            self.card2 = null;
        }, 500)
    }

    var game = new ConcentrationApp();
}

