const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chatSchema = require('./Chats'); // Import the chat schema

const user = new Schema (
    {
        username: {
            type: String,
            required: true
        },
        password: {
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
        },
        chats: {
            type: Schema.Types.ObjectId,
            ref: 'Chats'
          }
        
    }
);
module.exports = mongoose.model('Users', user);