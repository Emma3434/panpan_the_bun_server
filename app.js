const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.once('open', function() {
  console.log('Connected to MongoDB successfully!');
});

db.on('error', function() {
  console.log(err);
});

app.use(express.json());
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // set file size limit to 1MB
});

app.get('/', function(req, res) {
  res.send('hello world');
});

const imagesRouter = require('./routes/image');
app.use('/image', imagesRouter);

const diariesRouter = require('./routes/diaries');
app.use('/diaries', diariesRouter);

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server started on localhost:3000');
});
