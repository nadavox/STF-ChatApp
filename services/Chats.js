const User = require('../models/Chats');

const returnAllChats = async (username) => {
    const user = await User.findOne({ username })
}

module.exports = {returnAllChats}