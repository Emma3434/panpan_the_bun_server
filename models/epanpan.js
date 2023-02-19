const mongoose = require('mongoose');

let epanpanSchema = mongoose.Schema({
  name: { type: String, required: true },
  hunger: { type: Number, required: true },
  happiness: { type: Number, required: true },
  energy: { type: Number, required: true },
  cleanliness: { type: Number, required: true },
  lastUpdated: { type: Date, default: Date.now },
  lastCarer: { type: String, required: true}
}, {collection: 'epanpan'});

module.exports = mongoose.model('Epanpan', epanpanSchema)
