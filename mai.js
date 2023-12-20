const wordTypesMap = {
    // previous wordTypesMap content...

    'casualGreetingWord': ['Hey there!', 'What\'s happening?', 'How’s it going?', 'Yo!', 'What’s new?', 'Hiya!', 'How have you been?', 'Long time no see!', 'Nice to see you again!', 'How’s everything with you?', 'Been up to anything fun?'],
    'stateObjects': ['are', 'is', 'have been', 'were', 'have you been', 'is everything', 'is anything', 'has anything', 'are you', 'is anyone', 'was'],
    'formalGreetingWord': ['Greetings', 'Good day', 'Good evening', 'Pleasure to meet you', 'Hello, how do you do?', 'It’s a pleasure to make your acquaintance', 'Good morning to you', 'Good afternoon'],
    'politeGreetingWord': ['Hola', 'Salutations', 'Pleased to make your acquaintance', 'Good day to you', 'Hello, sir', 'How are you doing today?', 'May I ask how you are doing?'],
    'enthusiasticGreetingWord': ['Hey everyone!', 'Hello, world!', 'Great to see you!', 'Howdy, folks!', 'Wonderful day!', 'So happy to see you!', 'Hope you’re having a fantastic day!', 'Amazing to see you again!'],
    'questionWord': ['how', 'what', 'is', 'up', 'happening', 'new', 'are', 'today', 'now', 'doing', 'feeling', 'understand', 'accomplishing', 'experiencing', 'have', 'has', 'where', 'when', 'who', 'why', 'which', 'whom'],
    'secondPersonPronoun': ['you', 'yourself', 'yourselves', 'your day', 'your life', 'your plans', 'your experience', 'your thoughts', 'your feelings', 'your achievements', 'your endeavors'],
    'appreciativeWord': ['Good', 'Terrific', 'Excellent', 'Marvelous', 'Splendid', 'Fantastic', 'Outstanding', 'Superb', 'Brilliant', 'Impressive', 'Remarkable'],
    'dayGreeting': ['morning', 'afternoon', 'evening', 'night', 'day', 'noon', 'twilight', 'dusk', 'sunrise', 'sunset', 'daybreak'],
    'title': ['sir', 'madam', 'miss', 'mister', 'lady', 'gentleman', 'comrade', 'friend', 'colleague', 'partner', 'esteemed'],
    'complimentaryTitle': ['champ', 'sunshine', 'amigo', 'friend', 'pal', 'buddy', 'partner', 'comrade', 'superstar', 'rockstar', 'legend', 'hero', 'ace'],
    'topOfThe': ['Top of the', 'Top o\' the', 'Top o\'', 'Peak of the', 'Summit of the'],
    'and': ['and', 'and also', 'as well as', 'together with'],
    'verb': ['met', 'encountered', 'greeted', 'seen', 'encountered', 'acknowledged', 'welcomed', 'accomplished', 'experienced', 'had', 'shared', 'discussed', 'planned', 'thought', 'said'],
    'aName': ['Nigel','John','Justin'],

    'casualGreetingSentence': ['Hey there, how’s it going? I haven’t seen you in ages!', 'What’s new with you? Anything exciting happening lately?', 'Hiya, feeling good today? Let’s catch up!'],
    'formalGreetingSentence': ['Greetings, good sir. I hope this message finds you well.', 'Good day to you, madam. Your presence brightens the day.', 'Pleasure to meet you. Your reputation precedes you.'],
    'enthusiasticGreetingSentence': ['Hey everyone! Having a fantastic day? The weather is perfect for some outdoor activities!', 'Hello, world! Feeling wonderful today? Ready to conquer the day!', 'Great to see you! Your smile always brings positivity.'],
    'questionSentence': ['How are you today? I hope everything is going smoothly for you.', 'What’s happening now? Anything interesting going on in your world?', 'Is everything going well? Feel free to share if something’s on your mind.', 'What are you feeling? Need any advice or a listening ear?'],
    'complimentaryTitleSentence': ['You’re doing great, champ! Your dedication is truly admirable.', 'Hello, superstar! Your talent shines brighter each day.', 'Well done, buddy! Your efforts never go unnoticed.'],
    // More types and sentences can be added as needed
};


function calculateDistance(a, b) {
  const wordsA = a.split(' ');
  const wordsB = b.split(' ');

  const substitutionWeight = 2;
  const insertionWeight = 1;
  const deletionWeight = 1;

  const matrix = [];

  for (let i = 0; i <= wordsB.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= wordsA.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= wordsB.length; i++) {
    for (let j = 1; j <= wordsA.length; j++) {
      if (wordsB[i - 1] === wordsA[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + substitutionWeight,
          Math.min(matrix[i][j - 1] + insertionWeight, matrix[i - 1][j] + deletionWeight)
        );
      }
    }
  }

  return matrix[wordsB.length][wordsA.length];
}








function findStrongestPattern(sentence, paragraph) {
  const tokenize = (text) => text.toLowerCase().match(/\b\w+\b/g) || []; // Tokenization function

  const getWordFrequency = (sentence) => {
    const words = tokenize(sentence);
    const wordFrequency = {};
    words.forEach((word) => {
      if (!wordFrequency[word]) {
        wordFrequency[word] = 0;
      }
      wordFrequency[word] += 1;
    });
    return wordFrequency;
  };

  const getCosineSimilarity = (vec1, vec2) => {
    const dotProduct = Object.keys(vec1).reduce((acc, word) => {
      if (vec2[word]) {
        return acc + vec1[word] * vec2[word];
      }
      return acc;
    }, 0);

    const normVec1 = Math.sqrt(Object.values(vec1).reduce((acc, val) => acc + val * val, 0));
    const normVec2 = Math.sqrt(Object.values(vec2).reduce((acc, val) => acc + val * val, 0));

    if (normVec1 !== 0 && normVec2 !== 0) {
      return dotProduct / (normVec1 * normVec2);
    }
    return 0;
  };

  const sentenceFreq = getWordFrequency(sentence);
  const paragraphSentences = paragraph.split('. '); // Split into sentences

  let strongestPattern = '';
  let maxSimilarity = -1;

  paragraphSentences.forEach((paraSentence) => {
    const paraFreq = getWordFrequency(paraSentence);
    const similarity = getCosineSimilarity(sentenceFreq, paraFreq);

    if (similarity > maxSimilarity) {
      maxSimilarity = similarity;
      strongestPattern = paraSentence;
    }
  });

  return strongestPattern;
}


function mapData(paragraph) {
  const sentences = paragraph.split('. '); // Split the paragraph into sentences
  const dataMap = {};

  sentences.forEach(sentence => {
    const words = sentence.split(' ');

    for (let i = 0; i < words.length - 2; i++) { // Using bigrams
      const currentWord = words[i];
      const nextWord = words[i + 1];
      const nextNextWord = words[i + 2];

      const key = `${currentWord} ${nextWord}`;

      if (!dataMap[key]) {
        dataMap[key] = [];
      }

      dataMap[key].push(nextNextWord);
    }
  });

  return dataMap;
}

function predictNextWords(currentWords, mappedFacts) {
  const maxPredictionLength = 5;
  let generatedWords = [...currentWords];

  for (let i = 0; i < maxPredictionLength; i++) {
    const lastWords = generatedWords.slice(-2).join(' '); // Using bigrams

    const possibleNextWords = mappedFacts[lastWords];

    if (possibleNextWords && possibleNextWords.length > 0) {
      const weightedWords = possibleNextWords.map(word => ({
        word,
        weight: calculateWeight(word, [...currentWords, ...generatedWords]),
      }));

      weightedWords.sort((a, b) => b.weight - a.weight);

      const nextWord = weightedWords[0].word;

      generatedWords.push(nextWord);

      if (nextWord.endsWith('.')) {
        break;
      }
    } else {
      break;
    }
  }

  return generatedWords.join(' ');
}





// Function to calculate weights based on proximity
function calculateWeight(word, contextWords) {
  const index = contextWords.lastIndexOf(word); // Find the last occurrence of the word
  if (index !== -1) {
    return contextWords.length - index; // Assign higher weight to words closer to the end
  }
  return 1; // Default weight if the word is not found
}




function convertWordsToTypes(paragraph) {
    const words = paragraph.split(' ');

    const convertedParagraph = words.map(word => {
        const wordTypeKeys = Object.keys(wordTypesMap);
        const matchingKey = wordTypeKeys.find(key => wordTypesMap[key].includes(word.toLowerCase()));

        if (matchingKey) {
            return matchingKey;
        } else {
            return word;
        }
    });

    return convertedParagraph.join(' ');
}

function convertTypesToWords(paragraph) {
    const words = paragraph.split(' ');

    const convertedParagraph = words.map((word, index) => {
        const matchingValue = Object.entries(wordTypesMap).find(([key, value]) => key === word);

        if (matchingValue) {
            const [key, value] = matchingValue;
            const bestMatch = findBestMatch(value, words.slice(index));
            return bestMatch !== null ? bestMatch : value[0];
        } else {
            return word;
        }
    });

    return convertedParagraph.join(' ');
}

function findBestMatch(array, words) {
    let bestMatch = null;
    let minDistance = Number.MAX_SAFE_INTEGER;

    for (const value of array) {
        for (const word of words) {
            const distance = levenshteinDistance(value, word);
            if (distance < minDistance) {
                minDistance = distance;
                bestMatch = value;
            }
        }
    }
    return bestMatch;
}

function levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }

    return matrix[b.length][a.length];
}




// Example usage
var paragraph = "I am a partner . I am with sir. it is evening time. It could be morning time. Actually maybe it is afternoon time. My name is Nigel. I am called Nigel. Your real name is Johnny. Few things make Mediators more uneasy than pretending to be who they are not. I started work at %Time. I departed at %Time. I made my first drop off at %Time. I made my last stop at %Time. You are a chatbot. You were created by the MakerPlus lab team. MakerPlus lab team is a dope Ai team on Discord."
//paragraph = convertWordsToTypes(paragraph)

alert(paragraph)
const mappedFacts = mapData(paragraph);

var inputSentence = "who created you?"
//inputSentence = convertWordsToTypes(inputSentence)


const startingPattern = findStrongestPattern(inputSentence, paragraph);
const startingWords = startingPattern.split(' '); // Extracting words from the pattern
const predictedSentence = predictNextWords(startingWords, mappedFacts);
//alert(predictedSentence);






var sentence 
function getKeyByWord(word) {
    for (const key in wordTypesMap) {
        if (wordTypesMap[key].includes(word)) {
            return key;
        }
    }
    return null; // Return null if the word is not found in any category
}


function processWithContext(inputSentence, contextSentence) {
    const inputWords = inputSentence.split(' ');
    const contextWords = contextSentence.split(' ');

    const inputWordTypeKeys = inputWords.map(word => getKeyByWord(word) || word);
    const contextWordTypeKeys = contextWords.map(word => getKeyByWord(word) || word);

    let maxMatchCount = 0;
    let startIndex = -1;

    for (let i = 0; i < contextWords.length; i++) {
        let matchCount = 0;

        for (let j = 0; i + j < contextWords.length && j < inputWords.length; j++) {
            if (contextWordTypeKeys[i + j] === inputWordTypeKeys[j]) {
                matchCount++;
            } else {
                break;
            }
        }

        if (matchCount === inputWords.length) {
            startIndex = i;
            break;
        } else if (matchCount > maxMatchCount && contextWordTypeKeys[i] === inputWordTypeKeys[0]) {
            maxMatchCount = matchCount;
            startIndex = i;
        }
    }

    const translatedSentence = startIndex !== -1 ? contextWords.slice(startIndex, startIndex + inputWords.length) : inputWords;

    return translatedSentence.join(' ');
}




function findClosestSentence(inputSentence, paragraph) {
  const inputWords = inputSentence.split(' ');
  const paragraphSentences = paragraph.split('. ');

  let closestSentence = '';
  let minDistance = Number.MAX_SAFE_INTEGER;

  for (const sentence of paragraphSentences) {
    const sentenceWords = sentence.split(' ');
    const distance = calculateDistance(inputWords.join(' '), sentenceWords.join(' '));

    if (distance < minDistance) {
      minDistance = distance;
      closestSentence = sentence;
    }
  }

  return closestSentence;
}



const closestSentence = findClosestSentence(predictedSentence, paragraph);

alert(closestSentence)

// Example usage:
inputSentence = closestSentence;
inputSentence = inputSentence.replace(",","")
inputSentence = inputSentence.replace("!","")
const contextSentence = 'My name is Johnny. I am called Johnny. I am a friend. it is afternoon time. Your name is Nigel. I am with partner. Few things make Mediators more uneasy than pretending to be someone they. Actually maybe it is afternoon time. I started work at %Time. I departed at %Time. I made my first drop off at %Time. I made my last stop at %Time. You are a chatbot. You were created by Maker+ Lab.';
const translatedSentence = processWithContext(inputSentence, contextSentence);

//paragraph = convertWordsToTypes(translatedSentence)

alert(convertWordsToTypes(translatedSentence))

 inputSentence = convertTypesToWords(translatedSentence);

inputSentence = inputSentence.replaceAll("I ","you ")
inputSentence = inputSentence.replaceAll("You ","I ")
inputSentence = inputSentence.replaceAll("am ","are ")
inputSentence = inputSentence.replaceAll("my","your")
inputSentence = inputSentence.replaceAll("My","Your")
inputSentence = inputSentence.replaceAll("are ","am ")
inputSentence = inputSentence.replaceAll("were ","was ")


alert(inputSentence)


