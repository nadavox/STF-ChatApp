const User = require('../models/Users');

const returnAllChats = async (username) => {
    const user = await User.findOne({ username })
    const chats = user.chats
    return chats;
}

module.exports = {returnAllChats}