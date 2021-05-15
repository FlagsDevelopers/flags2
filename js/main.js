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

// Όλες οι χώρες θα έχουν αυτή την δομή
class Country {
  constructor(name="", code2="", code3="") {
    this.name = name;
    this.code2 = code2;
    this.code3 = code3;
    this.hasBorders = false;
    this.flag = ""; // Είμαι υπό σκέψη για το αν χρειάζεται αυτό.
  }
}
// Εκτός από την τρέχουσα χώρα που θα έχει και το borders (ένα πίνακα με τις χώρες που συνορεύει).
class CurrentCountry extends Country {
  constructor(borders) {
    super(borders)
    this.borders = []
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
  increaseScore() {
    this.score += 5;
  }
  decreaseScore() {
    this.score -= 3;
  }
}

