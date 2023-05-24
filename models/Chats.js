const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  created: {
    type: Date,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  profilePic: {
    type: String,
    required: true
  }
});

const conversationSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  user: {
    type: userSchema,
    required: true
  },
  lastMessage: {
    type: messageSchema,
    required: true
  }
});

module.exports = mongoose.model('chats', conversationSchema);