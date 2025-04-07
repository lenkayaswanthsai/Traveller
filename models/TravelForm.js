const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  message: {
    type: String
  }
});

module.exports = mongoose.model('Form', formSchema);