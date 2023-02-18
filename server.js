require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

app.use(cors());
app.use(express.json());

const postSchema = new mongoose.Schema({
  id: Number,
  date: Date,
  content: Object
});

const Post = mongoose.model('Post', postSchema);

app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
