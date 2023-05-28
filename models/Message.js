const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const message = new Schema({
    id: {
      type: Number,
      default: ""
    },
    created: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    }
  });

module.exports = mongoose.model('Messages', message);