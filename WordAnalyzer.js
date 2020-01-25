// \u0303 = ̃ 
function createWord(begin) {
    var newWord = begin;

    if (newWord == "") {
        newWord = getWordBeginning();
        if(newWord.length == 1 || (newWord.length == 2 && newWord.includes("\u0303"))) {
            return newWord;
        }
    }

    while (true) {
        var lastTwoChars = getTwoLastChar(newWord);
        var nextChar = addChar(newWord, lastTwoChars);
        newWord += nextChar;
        if(endOfWord(nextChar)) {
            break;
        }
    }
    return newWord;
}

function getWordBeginning() {
    var keys = Object.keys(phonemeAnalysis);
    var len = keys.length;
    var rand = Math.floor(Math.random()*len);
    var firstPhoneme = keys[rand];
    return firstPhoneme + getNextChar(firstPhoneme);
}

function getNextChar(newWord) {
    var nextPossibilities = getNextPossibilities(newWord);
    var randomNextCharRank = getRandomCharRank(nextPossibilities);
    var sumOfPreviousCharRank = 0;
    var keys = Object.keys(nextPossibilities);
    var nextChar = "";

    $.each(keys, function(index, value) {
        if(sumOfPreviousCharRank > randomNextCharRank) {
            return false;
        } else {
            nextChar = value;
        }
        sumOfPreviousCharRank += nextPossibilities[value];
    });

    return nextChar;
}

function getNextPossibilities(word) {
    var lastLetter = word.substring(word.length - 1, word.length);
    if(lastLetter == "\u0303") {
        lastLetter = word.substring(word.length - 2, word.length);
    }
    var nextPossibilities = phonemeAnalysis[lastLetter];
    return nextPossibilities;
}

function getTwoLastChar(newWord) {
    var lastTwoChars = newWord.substring(newWord.length - 2, newWord.length);
    if(lastTwoChars.includes("\u0303")) {
        lastTwoChars = newWord.substring(newWord.length - 3, newWord.length);
    }
    return lastTwoChars;
}

function addChar(newWord, lastTwoChars) {
    var nextChar = getNextChar(newWord);
    if(!hasVowel(lastTwoChars)) {
        while(!hasVowel(nextChar)) {
            nextChar = getNextChar(newWord);
        }
    } else if(!hasConsone(lastTwoChars)) {
        while(!hasConsone(nextChar)) {
            nextChar = getNextChar(newWord);
        }
    }
    return nextChar;
}

function hasConsone(lastTwoChars) {
    return lastTwoChars.includes("l") ||
        lastTwoChars.includes("b") ||
        lastTwoChars.includes("p") ||
        lastTwoChars.includes("m") ||
        lastTwoChars.includes("d") ||
        lastTwoChars.includes("t") ||
        lastTwoChars.includes("n") ||
        lastTwoChars.includes("v") ||
        lastTwoChars.includes("f") ||
        lastTwoChars.includes("g") ||
        lastTwoChars.includes("k") ||
        lastTwoChars.includes("z") ||
        lastTwoChars.includes("s") ||
        lastTwoChars.includes("ʁ") ||
        lastTwoChars.includes("χ") ||
        lastTwoChars.includes("ʃ") ||
        lastTwoChars.includes("ʒ") ||
        lastTwoChars.includes("ð") ||
        lastTwoChars.includes("θ");
}

function hasVowel(lastTwoChars) {
    return lastTwoChars.includes("a") ||
        lastTwoChars.includes("ɑ̃") ||
        lastTwoChars.includes("e") ||
        lastTwoChars.includes("i") ||
        lastTwoChars.includes("ø") ||
        lastTwoChars.includes("ɛ") ||
        lastTwoChars.includes("ɛ̃") ||
        lastTwoChars.includes("o") ||
        lastTwoChars.includes("u") ||
        lastTwoChars.includes("y") ||
        lastTwoChars.includes("ɔ̃");
}

function endOfWord(character) {
    return character == "";
}

function replacePhonemes(newWord) {
    return newWord
    .replace(/ɑ̃/g, "an")
    .replace(/e/g, "é")
    .replace(/ɛ̃/g, "in")
    .replace(/ɛ/g, "è")
    .replace(/ɔ̃/g, "on")
    .replace(/u/g, "ou")
    .replace(/ø/g, "œ")
    .replace(/y/g, "u")
    .replace(/ʁ/g, "R")
    .replace(/χ/g, "r")
    .replace(/ʃ/g, "ch")
    .replace(/ʒ/g, "j")
    .replace(/ð/g, "TH")
    .replace(/θ/g, "th");
}

function getRandomCharRank(possibilities) {
    var sumOfTrigramsFrequency = getSumOfPossibilitiesFrequency(possibilities);
    return Math.random() * sumOfTrigramsFrequency + 1;
}

function getSumOfPossibilitiesFrequency(possibilities) {
    var sumFrequencies = 0;
    var keys = Object.keys(possibilities);

    $.each(keys, function(index, value) {
        sumFrequencies += possibilities[value];
    });

    return sumFrequencies;
}