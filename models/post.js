// const mongoose = require('mongoose');

// const postSchema = new mongoose.Schema({
//   post_id: {
//     type: Number,
//     required: true,
//     unique: true
//   },
//   title: {
//     type: String,
//     required: true
//   },
//   content: {
//     type: String,
//     required: true
//   },
//   userId: {
//     type: Number,
//     ref: 'User',
//     required: true
//   }
// });

// module.exports = mongoose.model('Post', postSchema);

//post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  post_id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  userId: {
    type: Number,
    ref: 'User',
    required: true
  }
});

postSchema.index({ title: 'text', content: 'text', 'userId.name': 'text' });

module.exports = mongoose.model('Post', postSchema);