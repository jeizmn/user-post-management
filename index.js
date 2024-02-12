const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const User = require('./models/user');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/user_post_management', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => console.error('Failed to connect to MongoDB', err));

// Create user
app.post('/user', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//List user
app.get('/user', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Create post
app.post('/posts', async (req, res) => {
  try {
    const { post_id, title, content, userId } = req.body;

    // Check if the userId corresponds to an existing user
    const existingUser = await User.findOne({ user_id: userId });
    if (!existingUser) {
      return res.status(400).json({ error: 'User not found' });
    }

    const post = new Post({ post_id, title, content, userId });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//List post
app.get('/posts', async (req, res) => {
  try {
    // Fetch all posts along with user details
    const posts = await Post.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: 'user_id',
          as: 'user_details',
        },
      },
      {
        $unwind: '$user_details',
      },
    ]);

    if (!posts.length) {
      return res.status(404).json({ error: 'No posts found.' });
    }
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Search posts
app.get('/posts/search', async (req, res) => {
  try {
    const { query } = req.query; // To Get the search query from the request

    // Performing text search on title, content, and user's name
    const posts = await Post.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: 'user_id',
          as: 'user_details',
        },
      },
      {
        $unwind: '$user_details',
      },
      {
        $match: {
          $or: [
            { title: { $regex: query, $options: 'i' } }, // Search in title (case-insensitive)
            { content: { $regex: query, $options: 'i' } }, // Search in content (case-insensitive)
            { 'user_details.name': { $regex: query, $options: 'i' } }, // Search in user's name (case-insensitive)
          ],
        },
      },
    ]);

    res.status(200).json(posts);
  } catch (error) {
    console.error('Error searching posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
