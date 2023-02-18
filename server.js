const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Connect to MongoDB database
mongoose.connect('mongodb://localhost/my-blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define blog schema
const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
});

// Define blog model
const Blog = mongoose.model('Blog', blogSchema);

// Use middleware
app.use(cors());
app.use(bodyParser.json());

// Define server routes
app.get('/blogs', async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

app.post('/blogs', async (req, res) => {
  const blog = new Blog(req.body);
  await blog.save();
  res.json(blog);
});

// Start server
app.listen(process.env.PORT || 3000, () => {
  console.log('Server started');
});
