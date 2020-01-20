const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type: String } ,
  company: { type: String },
  location: { type: String },
  content: {type: String }
});

postSchema.index({'$**': 'text'});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
