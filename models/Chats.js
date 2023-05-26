const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
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

const userSchema = new Schema({
  username: {
    type: String,
    default: ""
  },
  displayName: {
    type: String,
    default: ""
  },
  profilePic: {
    type: String,
    default: ""
  }
});

const conversationSchema = new Schema({
  id: {
    type: Number,
    default: ""
  },
  user: {
    type: userSchema,
  },
  lastMessage: {
    type: messageSchema,
  }
});

module.exports = mongoose.model('Chats', conversationSchema);
