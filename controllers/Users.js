const userService = require('../services/Users');

const createNewUser = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const displayName = req.body.displayName;
    const profilePic = req.body.profilePic;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
    const usernameRegex = /[a-zA-Z]/;
    const invalidFields = [];

    // check if Username input is not empty
    if ((!username)) {
        invalidFields.push('username');
        //throw new Error('required field - must contain at least one letter');
    }
    // check if the username meets the requirements of the regex
    else if (!usernameRegex.test(username)) {
        invalidFields.push('username');
        //throw new Error('must contain at least one letter');
    }
    // check if the username already exist
    try {
        userService.validateUsername(username);
    }
    catch(error) {
        invalidFields.push('username');
    }

    // check if password input is not empty and meets the requirements of the regex
    if (!password || !passwordRegex.test(password)) {
        invalidFields.push('password');
        //throw new Error('invalid password');
    }

    // // check if password input is not empty and meets the requirements of the regex
    // if (!ConfirmPassword || !passwordRegex.test(ConfirmPassword) || ConfirmPassword !== Password) {
    //     invalidFields.push('Password Verification');
    // }

    // check if displayName input is not empty and meets the requirements of the regex
    if (!displayName || !usernameRegex.test(displayName)) {
        invalidFields.push('displayName');
        //throw new Error('invalid displayName');
    }

    // check if profilePic input is not empty
    if (!profilePic) {
        invalidFields.push('profilePic');
        //throw new Error('invalid profilePic');
    }

    console.log(invalidFields);

    if (invalidFields.length === 0) {
        console.log("in");
        res.json(await userService.createNewUser(username, password, displayName, profilePic));
    } else if (invalidFields.length > 0) {
        return res.status(400).json({ errors: 'Invalid fields', invalidFields });
    }
};

module.exports = { createNewUser };