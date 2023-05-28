const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    id: {
        type: Number,
        default: ""
    },
    users: [{
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
    }],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: "Message"
    }]
});

module.exports = mongoose.model('Messages', conversationSchema);
