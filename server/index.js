const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express(); 

app.use(cors());
app.use(bodyParser.json());




app.get('/', (req, res) => {
  res.json({
      message: 'Nweet! 🦄'
  });
});

function isValidNweet(nweet) {
  return nweet.name && nweet.name.toString().trim() !== '' &&
    nweet.content && nweet.content.toString().trim() !== '';
}

app.post('/nweets', (req, res) => {
  if (isValidNweet(req.body)) {
    // insert into db..
    const nweet = {
      name: req.body.name.toString(),
      content: req.body.content.toString()
    };

    console.log(nweet);
  } else {
    res.status(422);
    res.json({
      message: 'Hey! Name and Content are required!'
    });
  }
});

app.listen(5000, () => {
    console.log('Listening on http://localhost:5000');
});

//44:39 on video