const levenshteinDistance = (s1, s2) => {
  const matrix = new Array(s1.length + 1);
  matrix[0] = 0;
  for (let i = 1; i <= s1.length; i++) {
    matrix[i] = Math.min(matrix[i - 1] + 1, s1[i - 1] === s2[i - 1] ? 0 : 1);
  }
  return matrix[s1.length];
};

const predictNextWords = (paragraph, incompleteSentence) => {
  const words = incompleteSentence.toLowerCase().split(' ');
  const searchWords = words.slice(Math.max(words.length - 4, 0));

  // Dictionary of words with similar intents
  const intents = {
    'buy': ['purchase', 'acquire', 'obtain'],
    'eat': ['consume', 'devour', 'ingest'],
    'like': ['enjoy', 'prefer', 'fancy'],
    'go': ['travel', 'move', 'journey'],
    // add more intents and related words here
  };

  // Create regex pattern from search words
  const pattern = searchWords.map(word => `\\b${word}\\b`).join('.*') + '.*';

  // Find examples of sentences that match the pattern
  const examples = paragraph.toLowerCase().split('.').map(sentence => sentence.trim()).filter(sentence => sentence.match(new RegExp(pattern)));

  if (examples.length === 0) {
    return null;
  }

  // Get all words that follow the search words in each example sentence
  const candidates = examples.flatMap(example => {
    const exampleWords = example.split(' ');
    const index = searchWords.reduce((acc, curr) => Math.max(acc, exampleWords.findIndex(word => word === curr)), -1);
    return exampleWords.slice(index + 1);
  }).filter(word => word && word.length > 0);

  if (candidates.length === 0) {
    return null;
  }

  // Find the top 5 words with the smallest levenshtein distance to the last word
  const predictions = candidates.map(word => {
    const intentWords = [word, ...(intents[word] || [])];
    const distances = intentWords.map(intentWord => levenshteinDistance(searchWords[searchWords.length - 1], intentWord));
    const minDistance = Math.min(...distances);
    return { word, distance: minDistance };
  }).filter(prediction => prediction.distance <= 3)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 10)
    .map(prediction => prediction.word);

  return predictions;
};

// Example usage
try{
  const paragraph = readFile("textconverter.txt");
  const incompleteSentence = "where are you from";
  const nextWords = predictNextWords(paragraph, incompleteSentence);
  if (nextWords) {
    const completedSentence = `${incompleteSentence} ${nextWords.join(' ')}`;
    alert(completedSentence);
  } else {
    flash("Could not predict the next word(s).");
  }
}catch(err){
  alert(err.stack)
}
