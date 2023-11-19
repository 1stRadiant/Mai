# Mai
Mhizha-Ai small language model built to run directly on your mobile device.
You can run the code in any javascript environment. It is still a work in progress.

Mai is a rule based Ai system and its potential applications and benefits are:

Rule-based AI excels in situations where tasks can be explicitly defined with clear rules and logic. Here are some areas where rule-based AI may be preferable over neural network-based models:

1. **Interpretability:** Rule-based systems are often more interpretable because you can understand the logic and rules driving their decisions. This is crucial in fields like healthcare or finance where transparency is essential.

2. **Expert Systems:** When the knowledge of human experts can be codified into rules, expert systems can perform well. This is common in fields like diagnostic medicine or troubleshooting complex systems.

3. **Small Data Sets:** Rule-based systems can be effective when dealing with limited data, as they don't rely on massive datasets for training, unlike neural networks.

4. **Safety-Critical Applications:** In domains where human lives or significant assets are at stake, having a clear understanding of how and why decisions are made is crucial. Rule-based systems can provide this transparency.

5. **Defined Decision Trees:** Tasks that can be represented as decision trees or flowcharts can be well-suited for rule-based approaches.



**This is how you use it:**


1. **Preparation**:
    - Copy the code into a JavaScript environment, like a Node.js environment or a web browser's developer console.
    - Ensure the code is properly loaded and any required dependencies are in place.

2. **Understanding the Code**:
    - Familiarize yourself with the functions and data structures defined in the code.
    - Modify or expand the `wordTypesMap` and `examplePairs` arrays to include your own words and sentence structures.

3. **Generate Sentences**:
    - To generate sentences, you can call the `runInf` function with an input text. For example:
        ```
        let inputText = 'hey dayGreeting';
        runInf(inputText);
        ```
    - This will process the input text, replacing recognized words and generating completions for unrecognized words.

4. **Contextual Processing**:
    - You can experiment with context-based processing by modifying the `contextSentence` variable inside the `processWithContext` function and then running the function with the completed input:
        ```
        const contextSentence = 'I am a partner it is evening time. My name is Nigel';
        const translatedSentence = processWithContext(completedInput, contextSentence);
        ```
    - Replace the `contextSentence` with the desired context and then execute this function to see how the sentence changes based on that context.

5. **Customization**:
    - Modify the code according to your needs, adding more word types, sentence structures, or adjusting the Markov chain generation parameters (`maxWords`, etc.).

It can be expanded or modified to suit different applications or use cases, such as chatbots, text generators, or language modeling experiments.