const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect(
  "mongodb+srv://wings:wings123@cluster0-lmmde.mongodb.net/wings?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
).catch((error) => console.error(error));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/posts", (req, res) => {
  Post.find({}).then(documents => {
    res.status(200).json(documents);
  }).catch((err) => {
    console.error(err);
  })
});

app.post("/search", (req, res) => {
  Post.find({$text: {$search: req.body.searchString}})
    .limit(10)
    .exec(function(err, docs) {
      if (err) console.log(err);
      res.status(200).json(docs);
    });
})

app.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
});
