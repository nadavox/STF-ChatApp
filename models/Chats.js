const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  id: {
    type: Number,
    default: ""
  },
  user: {
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
  }, 
  lastMessages: {
    type: Schema.Types.ObjectId,
    ref: "Message"
  }
});

module.exports = mongoose.model('Chats', conversationSchema);
