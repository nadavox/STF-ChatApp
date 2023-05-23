const userService = require('../services/Users');

const createNewUser = async (req, res) => {
    res.json(await userService.createNewUser(req.body.username, req.body.password, req.body.displayName, req.body.profilePic));
};

module.exports = {createNewUser};