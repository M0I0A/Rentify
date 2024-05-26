const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  place: String,
  area: Number,
  bedrooms: Number,
  bathrooms: Number,
  nearbyFacilities: String,
});

module.exports = mongoose.model('Property', propertySchema);
