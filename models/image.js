const mongoose = require('mongoose');

let imagesSchema = mongoose.Schema({
    img_id: {
        type: String,
        required: true
    },
    img: {
        type: Buffer,
        required: true
    },
}, {collection: 'images'});

module.exports = mongoose.model('Image', imagesSchema);