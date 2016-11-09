"use strict";

(function FancyDiceRoller() {

  var VIEW = document.querySelector('section.main');
  var MAGIC_ITEM_ARRAY = [10, 50, 100];

  var MagicItemTableRoll = (function MagicItemTableRoll() {

    function MagicItemTableRoll(options) {
      this.button = null;
      this.d100DiceRoll = null;
      this.firstD4DiceRoll = null;
      this.secondD4DiceRoll = null;

      this.init(options);
    }

    MagicItemTableRoll.prototype.init = function init(options) {
      this.button = options.button;

      this.button.removeEventListener('click', this.onClick.bind(this));
      this.button.addEventListener('click', this.onClick.bind(this));

    }

    MagicItemTableRoll.prototype.onClick = function onClick() {

      // Store all dice rolls
      this.d100DiceRoll = this.diceRoll(100);
      this.firstD4DiceRoll = this.diceRoll(4);
      this.secondD4DiceRoll = this.diceRoll(4);

      console.warn('d100 = ' + this.d100DiceRoll);
      console.warn('d10 = ' + this.d10DiceRoll);
      console.warn('First d4 = ' + this.firstD4DiceRoll);
      console.warn('Second d4 = ' + this.secondD4DiceRoll);

      // If the dice rolled a 1, 50 or 100 roll on the magic item table
      if (MAGIC_ITEM_ARRAY.indexOf(this.d100DiceRoll) > -1) {
        this.d10DiceRoll = this.diceRoll(10);

        if (this.d10DiceRoll === 10) {
          this.d10Result = this.resultToLetters(this.d10DiceRoll);
        }

      } else {

        // Roll first D4 to determine item or explosion

        if (this.firstD4DiceRoll === 4) {

          if (this.secondD4DiceRoll < 4) {

          }
        } else {
          
        }
      }

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