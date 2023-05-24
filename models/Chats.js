const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  id: {
    type: Number,
    default: Math.floor(Math.random()) // Generate random ID
  },
  created: {
    type: String,
    default: true
  },
  content: {
    type: String,
    default: true
  }
});

const userSchema = new Schema({
  username: {
    type: String,
    default: true
  },
  displayName: {
    type: String,
    default: true
  },
  profilePic: {
    type: String,
    default: true
  }
});

const conversationSchema = new Schema({
  id: {
    type: Number,
    default: Math.floor(Math.random()) // Generate random ID
  },
  user: {
    type: userSchema,
    default: true
  },
  lastMessage: {
    type: messageSchema,
    default: true
  }
});

module.exports = mongoose.model('Chats', conversationSchema);
