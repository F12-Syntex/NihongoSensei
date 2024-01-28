// Import required modules
import express from 'express';
import fetch from 'node-fetch'; // Import the node-fetch module for making HTTP requests
import JishoAPI from 'unofficial-jisho-api';

// Create an instance of Express
const app = express();

// Define a route that acts as a proxy to the Jisho API
app.get('/jisho', async (req, res) => {

  const jisho = new JishoAPI();
  
  jisho.searchForKanji('語').then(result => {
    console.log('Found: ' + result.found);
    console.log('Taught in: ' + result.taughtIn);
    console.log('JLPT level: ' + result.jlptLevel);
    console.log('Newspaper frequency rank: ' + result.newspaperFrequencyRank);
    console.log('Stroke count: ' + result.strokeCount);
    console.log('Meaning: ' + result.meaning);
    console.log('Kunyomi: ' + JSON.stringify(result.kunyomi));
    console.log('Kunyomi example: ' + JSON.stringify(result.kunyomiExamples[0]));
    console.log('Onyomi: ' + JSON.stringify(result.onyomi));
    console.log('Onyomi example: ' + JSON.stringify(result.onyomiExamples[0]));
    console.log('Radical: ' + JSON.stringify(result.radical));
    console.log('Parts: ' + JSON.stringify(result.parts));
    console.log('Stroke order diagram: ' + result.strokeOrderDiagramUri);
    console.log('Stroke order SVG: ' + result.strokeOrderSvgUri);
    console.log('Stroke order GIF: ' + result.strokeOrderGifUri);
    console.log('Jisho Uri: ' + result.uri);
  });
});

// Start the server and listen on port 3000
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  //call the jisho route
  fetch('http://localhost:3001/jisho')
    .then((response) => response.json())
    .then((data) => console.log(data));
});
