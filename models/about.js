const mongoose = require('mongoose');

let aboutSchema = mongoose.Schema({
    icon: {
        type: String,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
}, {collection: 'about'});

module.exports = mongoose.model('About', aboutSchema);