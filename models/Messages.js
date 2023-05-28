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
    sender: {
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
    content: {
        type: String,
        default: ""
    }
});

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
    messages: {
        type: messageSchema,
    }
});

module.exports = mongoose.model('Messages', conversationSchema);
