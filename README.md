# Mai
Mhizha-Ai small language model built to run directly on your mobile device.
You can run the code in any javascript environment. It is still a work in progress. So far it tries to predict the next five words using the levenshtein distance. I'm planning on adding the compromise js library in there and maybe word2vec just to make things a bit more interesting. If you know any small good datasets please let me know.

How to use it.
In the code you see the following two lines which you should edit accordingly:
```const paragraph = readFile("textconverter.txt");
```const incompleteSentence = "hello how are you?";
