const mongoose = require('mongoose');

const cabSchema = new mongoose.Schema({
  cabRegistrationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  cabModel: {
    type: String,
    required: true,
  },
  cabColour: {
    type: String,
    required: true,
  },
});

const Cab = mongoose.model('Cab', cabSchema);

module.exports = Cab;
