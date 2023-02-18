const mongoose = require('mongoose');

let blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    weather:{
        type: String,
        required: true
    },
    content: {
        type: Object,
        required: true
    }
});

module.exports = mongoose.model('Blog', blogSchema);