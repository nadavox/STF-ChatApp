const User = require('../models/Users');

const createNewUser = async (username, password, displayName, profilePic) => {
    const user = new User({username, password, displayName, profilePic});
    return await user.save();
};

module.exports = createNewUser;