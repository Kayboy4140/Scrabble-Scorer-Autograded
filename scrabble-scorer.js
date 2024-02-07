// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
   let score = 0;

	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
      
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
         score += Number(pointValue);
		 }
 
	  }
	}
	return score;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let word = input.question("Let's play some scrabble! Enter a word: ");
   return word;
};

function simpleScorer(word) {
   word = word.toUpperCase();
   let score = 0;
   for (i=0; i<word.length; i++) {
      score += 1;
   }
   return score;
}

function vowelBonusScorer(word) {
   let score = 0;
   word = word.toUpperCase();
   let wordArray = word.split('');
   for (i=0; i<wordArray.length; i++) {
      if (wordArray[i] === 'A' || wordArray[i] === 'E' || wordArray[i] === 'I' || wordArray[i] === 'O' || wordArray[i] === 'U') {
         score += 3;
      } else {
         score += 1
      }
   }
   return score
}

function scrabbleScorer(word) {
   word = word.toLowerCase();
	// let letterPoints = "";
   let score = 0;

	for (let i = 0; i < word.length; i++) {
 
	  for (let key in newPointStructure) {
      
		 if (key === word[i]) {
			// letterPoints += `Points for '${word[i]}': ${key}\n`
         score += newPointStructure[key];
		 }
	  }
	}
	return score;
}

const scoringAlgorithms = [
   {
      name: "Simple Score",
      description: "Each letter is worth 1 point",
      scorerFunction: simpleScorer
   },
   {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer
   },
   {
      name: "Scrabble",
      description: "The traditional scoring algorithm",
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt() {
   let word = input.question("Let's play some scrabble! Enter a word: ");
   console.log();
   console.log(`Three scoring algorithm methods are given below:\n0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}\n1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}\n2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}`);
   console.log();
   let userChoice = Number(input.question("Which scoring algorithm would you like to use? "));
   if (userChoice === 0) {
      console.log(`Score for '${word}': ${simpleScorer(word)}`);
   } else if (userChoice === 1) {
      console.log(`Score for '${word}': ${vowelBonusScorer(word)}`);
   } else if (userChoice === 2) {
      console.log(`Score for '${word}': ${scrabbleScorer(word)}`);
   }
}

function transform(oldPointStructure) {
   let newObject = {};
   for (item in oldPointStructure) {
      for (i=0; i<oldPointStructure[item].length; i++) {
         newObject[oldPointStructure[item][i].toLowerCase()] = Number(item); 
      }
   }
   return newObject
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   // initialPrompt();
   scorerPrompt();
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
