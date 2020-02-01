const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const monk = require('monk');
const rateLimit = require("express-rate-limit");

const app = express(); 

const db = monk(process.env.MONGO_URI || 'localhost/nweeter');
const nweets = db.get('nweets');

app.use(cors());
app.use(bodyParser.json());



app.get('/', (req, res) => {
  res.json({
      message: 'Nweet! 🦄'
  });
});

app.get('/nweets', (req, res) => {
  nweets
   .find()
   .then(nweets => {
     res.json(nweets);
   });
});

function isValidNweet(nweet) {
  return nweet.name && nweet.name.toString().trim() !== '' &&
    nweet.content && nweet.content.toString().trim() !== '';
}

app.use(rateLimit({
  windowMs: 60 * 1000,
  max: 1
}));

app.post('/nweets', (req, res) => {
  if (isValidNweet(req.body)) {
    // insert into db..
    const nweet = {
      name: req.body.name.toString(),
      content: req.body.content.toString(),
      created: new Date()
    };

    nweets
      .insert(nweet)
      .then(createdNweet => {
        res.json(createdNweet);
      });
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

