"use strict";

(function FancyDiceRoller() {

  var VIEW = document.querySelector('section.main');
  var OUTPUT = VIEW.querySelector('.output');
  var IMAGE = VIEW.querySelector('img');
  var MAGIC_ITEM_ARRAY = [10, 50, 100];
  var FIRST_D4_ATTEMPT = {
    1: 'Gems',
    2: 'Art',
    3: 'Metals',
    4: 'Explodes'
  };
  var SECOND_D4_ATTEMPT = {
    1: 'Goods',
    2: 'Goods',
    3: 'Goods',
    4: 'Magic Item'
  }

  var diceRoll = new Audio('media/dice-roll.mp3');
  var gems = new Audio('media/junkrat.mp3');
  var art = new Audio('media/art.mp3');
  var metals = new Audio('media/metals.mp3');
  var goods = new Audio('media/goods.mp3');
  var magicItem = new Audio('media/magic-item.mp3');

  var MagicItemTableRoll = (function MagicItemTableRoll() {

    function MagicItemTableRoll(options) {
      this.button = options.button;
      this.d100DiceRoll = null;
      this.firstD4DiceRoll = null;
      this.secondD4DiceRoll = null;
      this.d10DiceRoll = null;
      this.d10Result = null;
      this.d100Successful = null;
      this.onClick = this.onClick.bind(this);

      this.button.removeEventListener('click', this.onClick, false);
      this.button.addEventListener('click', this.onClick, false);
      diceRoll.removeEventListener('ended', this.showOutput.bind(this), false);
      diceRoll.addEventListener('ended', this.showOutput.bind(this), false);
    }

    MagicItemTableRoll.prototype.onClick = function onClick() {

      // Reset shizzle
      OUTPUT.innerHTML = '';
      IMAGE.src = "";
      OUTPUT.classList.remove('fade');
      IMAGE.classList.remove('fade');

      // Stop diceRoll if audio is playing
      if (!diceRoll.paused && !diceRoll.ended && 0 < diceRoll.currentTime) {
        diceRoll.pause();
        diceRoll.currentTime = 0;
      }

      // Stop gems if audio is playing
      if (!gems.paused && !gems.ended && 0 < gems.currentTime) {
        gems.pause();
        gems.currentTime = 0;
      }

      // Stop art if audio is playing
      if (!art.paused && !art.ended && 0 < art.currentTime) {
        art.pause();
        art.currentTime = 0;
      }

      // Stop art if audio is playing
      if (!metals.paused && !metals.ended && 0 < metals.currentTime) {
        metals.pause();
        metals.currentTime = 0;
      }

      // Stop goods if audio is playing
      if (!goods.paused && !goods.ended && 0 < goods.currentTime) {
        goods.pause();
        goods.currentTime = 0;
      }

      // Stop magicItem if audio is playing
      if (!magicItem.paused && !magicItem.ended && 0 < magicItem.currentTime) {
        magicItem.pause();
        magicItem.currentTime = 0;
      }

      diceRoll.play();

      this.rollThemBones();

    }

    MagicItemTableRoll.prototype.rollThemBones = function rollThemBones() {

      // Reset all dice and results when the button has been clicked
      this.d100DiceRoll = 0;
      this.firstD4DiceRoll = 0;
      this.secondD4DiceRoll = 0;
      this.d10DiceRoll = 0;
      this.d10Result = 0;
      this.d100Successful = 0;

      // Roll initial d100
      this.d100DiceRoll = this.diceRoll(100);
      console.warn('d100 = ' + this.d100DiceRoll);

      this.d100Successful = MAGIC_ITEM_ARRAY.indexOf(this.d100DiceRoll) > -1;

      // If the dice rolled a 1, 50 or 100 roll on the magic item table
      if (this.d100Successful) {

        this.d10DiceRoll = this.diceRoll(10);
        console.warn('d10 = ' + this.d10DiceRoll);

        if (this.d10DiceRoll === 10) {

          this.d10Result = this.resultToLetters(this.d10DiceRoll);
          console.warn('Magic Table Letter = ' + this.d10Result);

        }

      } else {

        this.firstD4DiceRoll = this.diceRoll(4);
        console.warn('First D4 = ' + this.firstD4DiceRoll);

        if (this.firstD4DiceRoll === 4) {

          this.secondD4DiceRoll = this.diceRoll(4);
          console.warn('Second D4 = ' + this.secondD4DiceRoll);

        }
      }

    }

    MagicItemTableRoll.prototype.showOutput = function showOutput() {

      var self = this;

      var outputString = '';

      // Determine D100 roll
      outputString += 'On the D100 roll, you got a <span class="highlight">' + this.d100DiceRoll + '</span>';

      if (this.d100Successful) {
        outputString += ' and you successfully made it onto the magic item selection table! Good job buddy.<br />';
        outputString += 'Your D10 got you a <span class="highlight">' + this.d10DiceRoll + '</span> which gives you the letter <span class="highlight">' + this.d10Result.toUpperCase() + '</span>.';
      } else {
        outputString += '... Didn\'t make it onto the magic items tables. You suck.<br />';
        outputString += 'Your first D4 roll got you a <span class="highlight">' + this.firstD4DiceRoll + '</span>';
        if (this.firstD4DiceRoll === 4) {
          outputString += '... BOOM IT FUCKING BLEW UP SON!!! HAHAHA!!!!<br />';
          outputString += 'The second D4 was a <span class="highlight">' + this.secondD4DiceRoll + '</span> which gives you ';

          if(SECOND_D4_ATTEMPT[this.secondD4DiceRoll] === "Goods") {
            outputString += 'some <span class="highlight">' + SECOND_D4_ATTEMPT[this.secondD4DiceRoll].toLowerCase() + '</span>.';

            setTimeout(function () {
              goods.play();
              IMAGE.src = "images/goods.png";
            }, 200);
          } else {
            outputString += ' a <span class="highlight">' + SECOND_D4_ATTEMPT[this.secondD4DiceRoll] + '</span>!';

            setTimeout(function () {
              magicItem.play();
              IMAGE.src = "images/magic-item.jpg";
            }, 200);
          }
        } else {
          outputString += ' which gives you some <span class="highlight">' + FIRST_D4_ATTEMPT[this.firstD4DiceRoll].toLowerCase() + '</span>.';

          setTimeout(function () {
            if (FIRST_D4_ATTEMPT[self.firstD4DiceRoll] === "Gems") {
              gems.play();
              IMAGE.src = "images/gems.png";
            } else if (FIRST_D4_ATTEMPT[self.firstD4DiceRoll] === "Art") {
              art.play();
              IMAGE.src = "images/art.png";
            } else {
              IMAGE.src = "images/metals.png";
              metals.play();
            }
          }, 200);
        }
      }

      setTimeout(function () {
        IMAGE.classList.add('fade');
      }, 300);

      OUTPUT.innerHTML = outputString;
      OUTPUT.classList.add('fade');

    }

    MagicItemTableRoll.prototype.resultToLetters = function resultToLetters(num) {
      var mod = num % 26,
        pow = num / 26 | 0,
        out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z');
      return pow ? toLetters(pow) + out : out;
    }

    MagicItemTableRoll.prototype.diceRoll = function diceRoll(max) {
      return Math.round(Math.random() * (max - 1)) + 1;
    }

    return MagicItemTableRoll;
  } ());

  var magicItemTable = new MagicItemTableRoll({
    'button': VIEW.querySelector('button')
  });

})();