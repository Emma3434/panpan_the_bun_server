const mongoose = require('mongoose');

let diarySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    weather:{
        type: String,
        required: true
    },
    content: {
        type: Array,
        required: true
    }
}, {collection: 'diaries'});

module.exports = mongoose.model('Diary', diarySchema);