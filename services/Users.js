const User = require('../models/Users');

const createNewUser = async (username, password, displayName, profilePic) => {
    const user = new User({username, password, displayName, profilePic});
    return await user.save();
};

// Check if username already exists
const validateUsername = async (username) => {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return -1;
    }
    return 1;
}

module.exports = {createNewUser, validateUsername};