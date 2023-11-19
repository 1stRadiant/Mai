const wordTypesMap = {
    'casualGreetingWord': ['Hello', 'Hey', 'Hi', 'Howdy', 'Yo', 'What\'s up', 'Sup', 'Hey there'],
    'stateObjects': ['are','is'],
    'formalGreetingWord': ['Greetings', 'Good day', 'Good evening', 'How do you do', 'Nice to meet you'],
    'politeGreetingWord': ['Hola', 'Salutations', 'Pleased to make your acquaintance', 'Good day to you', 'Hello, sir'],
    'enthusiasticGreetingWord': ['Hi there!', 'Hey!', 'Hello!', 'Fantastic', 'Wonderful', 'Lovely'],
    'questionWord': ['how', 'what', 'is', 'up', 'happening', 'new', 'are', 'today', 'now', 'doing', 'feeling'],
    'secondPersonPronoun': ['you'],
    'appreciativeWord': ['Good', 'Top of the', 'Well', 'Excellent', 'Terrific', 'Superb', 'Outstanding'],
    'dayGreeting': ['morning', 'afternoon', 'evening', 'night', 'day', 'noon', 'twilight'],
    'title': ['sir', 'ma\'am', 'miss', 'mister', 'lady', 'gentleman', 'madam'],
    'complimentaryTitle': ['champ', 'sunshine', 'amigo', 'friend', 'pal', 'buddy', 'partner', 'comrade'],
    'topOfThe': ['Top of the', 'Top o\' the', 'Top o\'', 'Peak of the', 'Summit of the'],
    'and': ['and', 'and also', 'as well as', 'together with'],
    'verb': ['met', 'encountered', 'greeted', 'seen', 'encountered', 'acknowledged', 'welcomed'],
    
    'casualGreetingSentence': ['Hello there!', 'Hey, how\'s it going?', 'Hi everyone!', 'What\'s up, folks?'],
    'formalGreetingSentence': ['Greetings, sir.', 'Good day to you, madam.', 'How do you do, sir?', 'Nice to meet you.'],
    'enthusiasticGreetingSentence': ['Hi there, everybody!', 'Hey, it\'s a great day!', 'Hello, my wonderful friends!'],
    'questionSentence': ['How are you today?', 'What is happening now?', 'Is everything going well?', 'What are you feeling?'],
    'complimentaryTitleSentence': ['You\'re doing great, buddy!', 'Hello, champ!', 'Well done, pal!', 'Greetings, partner!'],

    
};

const examplePairs = [
    ['Hello title', ['casualGreetingWord', 'secondPersonPronoun', 'casualGreetingWord']],
    ['Greetings, sir!', ['formalGreetingWord', 'title']],
    ['Hey there, pal!', ['casualGreetingWord', 'secondPersonPronoun', 'complimentaryTitle']],
    ['Good evening, friend!', ['formalGreetingWord', 'dayGreeting', 'complimentaryTitle']],
    ['Hi, what\'s up friend?', ['casualGreetingWord', 'questionWord', 'questionWord', 'questionWord']],
    ['Howdy!', ['casualGreetingWord']],
    ['Hola, amigo!', ['politeGreetingWord', 'complimentaryTitle']],
    ['Fantastic!', ['appreciativeWord']],
    ['Well met!', ['appreciativeWord', 'verb']],
    ['Hey there!', ['enthusiasticGreetingWord']],
    ['What is new, my comrade', ['questionWord', 'is', 'new', 'my', 'complimentaryTitle']],
    ['Good day to you, mister!', ['formalGreetingWord', 'dayGreeting', 'complimentaryTitle', 'title']],
    ['Sup, buddy?', ['casualGreetingWord', 'secondPersonPronoun', 'complimentaryTitle']],
    ['Top o\' the morning to you, friend!', ['topOfThe', 'dayGreeting', 'questionWord', 'secondPersonPronoun', 'complimentaryTitle']],
    ['Lovely to see you, sunshine!', ['enthusiasticGreetingWord', 'to', 'see', 'you', 'complimentaryTitle']],
    ['Greetings and salutations!', ['formalGreetingWord', 'and', 'politeGreetingWord']],
    ['Hey', ['casualGreetingWord']],
    ['Hello', ['casualGreetingWord']],
    ['Good evening', ['formalGreetingWord']],
    ['How are you?', ['questionWord', 'secondPersonPronoun']],
    ['Im doing well.', ['secondPersonPronoun', 'verb', 'appreciativeWord']],
    ['And you?', ['and', 'secondPersonPronoun', 'questionWord']],
    ['Great, thanks!', ['appreciativeWord', 'comma', 'appreciativeWord', 'exclamation']],
];



function preprocessInput(input) {
    return input.toLowerCase().split(' ');
}

function buildMarkovChain(examplePairs) {
    const markovChain = {};

    examplePairs.forEach(([sentence, structure]) => {
        const words = preprocessInput(sentence);

        for (let i = 0; i < words.length - 1; i++) {
            const currentWord = words[i];
            const nextWord = words[i + 1];
            

            if (!markovChain[currentWord]) {
                markovChain[currentWord] = {};
            }

            if (!markovChain[currentWord][nextWord]) {
                markovChain[currentWord][nextWord] = 0;
            }

            markovChain[currentWord][nextWord]++;
        }
    });

    // Calculate probabilities
    for (const word in markovChain) {
        const wordTransitions = markovChain[word];
        const totalTransitions = Object.values(wordTransitions).reduce((a, b) => a + b);

        for (const nextWord in wordTransitions) {
            wordTransitions[nextWord] /= totalTransitions;
        }
    }

    return markovChain;
}
var context = ""
function generateRandomSentence(markovChain, startingWord, maxWords = 10, context) {
    let currentWord = startingWord;
    let sentence = [currentWord];

    for (let i = 1; i < maxWords; i++) {
        const nextWords = markovChain[currentWord];

        if (!nextWords) {
            break; // No more words to add
        }


        const random = Math.random();
        let cumulativeProbability = 0;
        let selectedWord = null;

        for (const nextWord in nextWords) {
            cumulativeProbability += nextWords[nextWord];

try{
            if (context.includes(nextWord)) {
                selectedWord = nextWord;
                break;
            }
}catch (err){}

        }

        if (!selectedWord) {
            // If no word in the context matches, select randomly
            for (const nextWord in nextWords) {
                cumulativeProbability += nextWords[nextWord];

                if (random <= cumulativeProbability) {
                    selectedWord = nextWord;
                    break;
                }
            }
        }

        sentence.push(selectedWord);
        currentWord = selectedWord;
    }

    return sentence.join(' ');
}




// Build the Markov chain from examplePairs
const markovChain = buildMarkovChain(examplePairs);

// Input text
let inputText = 'hey dayGreeting'
function replaceWords(inputText, wordTypesMap) {
    
    
  return inputText.replace(/\b\w+\b/g, function (match) {
              

    if(wordTypesMap[match]){
        
      const wordsArray = wordTypesMap[match];
      const randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
      return randomWord;
    } else {
      return match;
    }
  });
}




let completedInput;
function runInf(inputText){
const replacedText = replaceWords(inputText, wordTypesMap);

inputText = replacedText;

// Preprocess the input text
const inputTokens = preprocessInput(inputText);

let completions = [];

// Generate completions for recognized patterns in the input
for (const token of inputTokens) {
    if (wordTypesMap[token]) {
        // If the token is a recognized word type, select a random word from the corresponding list
        
        const randomWord = wordTypeList[Math.floor(Math.random() * wordTypeList.length)];
        completions.push(randomWord);
    } else {
        // If the token is not a recognized word type, generate a random sentence based on the token
                const wordTypeList = wordTypesMap[token];
        
        let myStr = context; 
        
        let words = myStr.split(" "); // split the string into an array of 
       //$ alert(wordTypeList)
 
 try{
       if(words.some(word => wordTypeList.includes(word))){
           alert(word)
       } 
}catch(err){
    
}
        
        
        const completion = generateRandomSentence(markovChain, token, 15); // Adjust maxWords as needed
        completions.push(completion);
    }
}





 completedInput = completions.join(' ');

alert(completedInput);
}

runInf(inputText)




function convertToWordTypes(inputString) {
    const words = inputString.split(' ');
    const wordTypes = [];

    for (const word of words) {
        for (const type in wordTypesMap) {
            if (wordTypesMap[type].includes(word)) {
                wordTypes.push(type);
                break; // Stop searching for this word once it's found
            }
        }
    }

    return wordTypes.join(' ');
}
var sentence 
function getKeyByWord(word) {
    for (const key in wordTypesMap) {
        if (wordTypesMap[key].includes(word)) {
            return key;
        }
    }
    return null; // Return null if the word is not found in any category
}

// Example usage:
//const inputWord = 'Hello';
//const wordTypeKey = getKeyByWord(inputWord);



//inputSentence = inputSentence.replace(",","")

function processWithContext(inputSentence, contextSentence) {
    const inputWords = inputSentence.split(' ');
    const contextWords = contextSentence.split(' ');

    const inputWordTypeKeys = inputWords.map(word => getKeyByWord(word) || 'unknown');
    const contextWordTypeKeys = contextWords.map(word => getKeyByWord(word) || 'unknown');

    const translatedSentence = inputWordTypeKeys.map((key, index) => {
        if (key !== 'unknown') {
            const contextWordIndex = contextWordTypeKeys.indexOf(key);
            const contextWord = contextWordIndex !== -1 ? contextWords[contextWordIndex] : null;
            return contextWord || wordTypesMap[key][0]; // Use context word if available, else use default word
        }
        return inputWords[index];
    });

    return translatedSentence.join(' ');
}

// Example usage:
var inputSentence = completedInput;
inputSentence = inputSentence.replace(",","")
inputSentence = inputSentence.replace("!","")
const contextSentence = 'I am a partner it is evening time. My name is Nigel';
const translatedSentence = processWithContext(inputSentence, contextSentence);

alert(translatedSentence);
