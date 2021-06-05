/*
 * Flags2 - A web game where you are trying to find the neighbors of a random country.
 * Copyright (C) 2021 Flags2 developers
 * 
 * This program is free software: you can redistribute it and/or modify it under the terms 
 * of the GNU Affero General Public License as published by the Free Software Foundation, 
 * either version 3 of the License, or (at your option) any later version.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
 * See the GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */
/* Insert your code */
"use strict"
/**
 * - Για λόγους ευκολίας μας οι σημειώσεις είναι στα Ελληνικά. Αυτό θα αλλάξει στο τέλος.
 * - Στις σημειώσεις υπάρχουν κάποιες λέξεις κλειδιά που αρχίζουν με @ και αυτές χρειάζονται για να μπορεί αργότερα το <https://jsdoc.app/> ή και άλλα εργαλεία να δημιουργήσει documentation βάσει του κώδικα. Επίσης αν χρησιμοποιείτε VS Code και βάλετε το mouse πάνω στην κλάση εμφανίζονται οι σημειώσεις υπό μορφή βοήθειας.
 * - Οι κλάσεις και οι μέθοδοι είναι υπό κατασκευή. Μπορεί στην πορεία να αλλάξει κάτι.
 * Ο λόγος που άλλαξα τις κλάσεις είναι για την ομαλότερη μετάβαση στην έκδοση 2.
 */


/*********************************
* Δηλώσεις σταθερών - μεταβλητών *
*********************************/
const urlCountry = 'https://restcountries.eu/rest/v2/name/';
const urlCode = 'https://restcountries.eu/rest/v2/alpha/';
const myCountryFlagDiv = document.getElementById("my-country-flag");
const myCountryNameDiv = document.getElementById("my-country-name");
const neighboursPanelDiv = document.getElementById("neighbours-panel");



/*******************
* Δηλώσεις κλάσεων *
*******************/
/**
 * @class
 * @classdesc Κλάση για την δημιουργία χώρας.
 * @param {string} code3 Είναι ο 3ψήφιος κωδικός χώρας
 * @example greece = new Country("GRC");
 * @author George Varelas <prophitis@gmail.com>
 */
class Country {
  constructor(code3) {
    this.code3 = code3;
    this.name = allCountries[code3].name // Το όνομα της χώρας το παίρνει μέσα από τον πίνακα allCountries και χρειάζεται για να εμφανίζεται στην σελίδα.
    this.flag = country2emoji2(allCountries[this.code3].code2) // Την σημαία την παίρνει μέσα από τον πίνακα allCountries και τη μετατρέπει σε χαρακτήρα. Χρειάζεται για να εμφανίζεται στην σελίδα.
  }
}

/**
 * @class 
 * @classdesc Κλάση για την δημιουργία χώρας με την οποία παίζουμε σε κάθε γύρο. Κληρονομεί την Country.
 * @param {string} code3 Είναι ο 3ψήφιος κωδικός χώρας
 * @example greece = new PlayingCountry("GRC");
 * @author George Varelas <prophitis@gmail.com>
 */
class PlayingCountry extends Country {
  constructor(code3) {
    super(code3) // Χρειάζεται για να έχει πρόσβαση στη code3 που βρίσκεται στην Country
  }
  /**
  * @method Εμφανίζει το όνομα και την σημαία της χώρας με την οποία παίζουμε, στην σελίδα.
  */
  display() {
    myCountryFlagDiv.innerHTML = this.flag
    myCountryNameDiv.innerHTML = this.name 
  }
}

/** 
 * @class 
 * @classdesc Κλάση για την δημιουργία γειτονικής χώρας. Κληρονομεί την Country.
 * @param {string} code3 Είναι ο 3ψήφιος κωδικός χώρας
 * @param {boolean} isReal Είναι πραγματικός γείτονας ή όχι? true/false.
 * @example greece = new Neighbour("GRC", true);
 * @author George Varelas <prophitis@gmail.com>
 */
class Neighbour extends Country {
  constructor(code3, isReal) {
    super(code3)
    this.isReal = isReal
    this.createElement() //CHECK
  }
  /**
  * @method Εμφανίζει το όνομα και την σημαία της γειτονικής χώρας (ή μη) στην σελίδα.
  */
  display() {
    neighboursPanelDiv.appendChild(this.createElement())
  }
  /**
  * @method Δημιουργεί ένα νέο <div> που περιέχει την σημαία και το όνομα της χώρας καθώς και ένα id με το όνομα της χώρας. Επίσης τις κλάσεις "neighbour" και ("neighbour-is-Real" ή "neighbour-is-not-Real") για μορφοποίηση.
  * @param {nothing}  
  * @examble <div id="neighbour-GRC" class="neighbour neighbour-is-Real"><div>🇬🇷</div><div>Greece</div></div>
  * @returns {string} Επιστρέφει το element που δημιούργησε.
  */
  createElement() {
    let element = document.createElement("div")
    element.setAttribute("id", "neighbour-" + this.code3)
    let flagdiv = document.createElement("div")
    flagdiv.innerHTML = this.flag
    element.appendChild(flagdiv)
    let namediv = document.createElement("div")
    namediv.innerHTML = this.name
    element.appendChild(namediv)
    element.classList.add("neighbour")
    // Έλεγχος για το αν είναι πραγματικός γείτονας ή όχι και δημιουργία ανάλογης κλάσης HTML.
    if (this.isReal) {
        element.classList.add("neighbour-is-Real")
    } else {
        element.classList.add("neighbour-is-not-Real")
    }
    return element
  }
}

/**
 * Θα χρειαστεί και μια κλάση Game που θα περιέχει το σκορ, τους γύρους κ.α. Είναι υπό κατασκευή.
 */

class Game {
  constructor() {
    this.score = 0
    this.round = 1
    this.PlayingCountry = null
    this.playedCountries = new Array()
    this.reset()

  }

  reset() {
    this.score = 0
    this.round = 1
    this.playedCountries = new Array()

  }
}









/**
 * Αυτό το κώδικα τον αφήνω για λόγους σύγκρισης με τον νέο κώδικα. Σε δεύτερη φάση θα διαγραφεί από εδώ και κάτω.
 */


/** 
// Όλες οι χώρες θα έχουν αυτή την δομή.
class Country {
  constructor(name="", code2="", code3="") {
    this.name = name;
    this.code2 = code2;
    this.code3 = code3;
    this.hasBorders = false;
    this.flag = ""; // CHECK Είμαι υπό σκέψη για το αν χρειάζεται αυτό.
  }
}
// Εκτός από την τρέχουσα χώρα που θα έχει και το borders (ένα πίνακα με τις χώρες που συνορεύει).
class CurrentCountry extends Country {
  constructor(borders) {
    super(borders) //CHECK
    this.borders = [] //CHECK
  }
  //noOfBorders = length
  get noOfBorders() { //Επιστρέφει τον αριθμό των χωρών που συνορεύει.
    console.log(this.borders.length);
    return this.borders.length;
  }
}

// Κλάση για να μετράμε το score.
class Score {
  constructor() {
    this.score = 0;
  }
  get value() {
    return this.score
  }
  get increase() { 
    this.score += 5;
  }
  get decrease() {
    this.score -= 3;
  }
}

let myCountry = new CurrentCountry();
*/