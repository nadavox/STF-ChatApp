const userService = require('../services/Users');

const createNewUser = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const displayName = req.body.displayName;
    const profilePic = req.body.profilePic;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
    const usernameRegex = /[a-zA-Z]/;
    const invalidFields = [];
    var invalid = 0;

    // check if Username input is not empty
    if ((!username)) {
        invalidFields.push('username');
    }
    // check if the username meets the requirements of the regex
    else if (!usernameRegex.test(username)) {
        invalidFields.push('username');
    }
    // check if the username already exist
    // if (await userService.validateUsername(username) < 0) {
    //     return res.status(409).json({
    //         type: "https://tools.ietf.org/html/rfc7231#section-6.5.8",
    //         title: "Conflict",
    //         status: 409,
    //         traceId: "0HMQS45UOJOV4:00000002"
    //     });
    // }

    invalid = await userService.validateUsername(username);

    // check if password input is not empty and meets the requirements of the regex
    if (!password || !passwordRegex.test(password)) {
        invalidFields.push('password');
    }

    // check if displayName input is not empty and meets the requirements of the regex
    if (!displayName || !usernameRegex.test(displayName)) {
        invalidFields.push('displayName');
    }

    // check if profilePic input is not empty
    if (!profilePic) {
        invalidFields.push('profilePic');
    }

    if (invalidFields.length === 0 && invalid > 0) {
        res.json(await userService.createNewUser(username, password, displayName, profilePic));
    } else if (invalidFields.length > 0) {
        return res.status(400).json({
            type: "https://tools.ietf.org/html/rfc7231#section-6.5.1",
            title: "One or more validation errors occurred.",
            status: 400,
            traceId: "0HMQS45UOJOV2:00000006",
            errors: invalidFields
        });
    }

    if (invalid < 0) {
        return res.status(409).json({
            type: "https://tools.ietf.org/html/rfc7231#section-6.5.8",
            title: "Conflict",
            status: 409,
            traceId: "0HMQS45UOJOV4:00000009"
        });
    }
};

module.exports = { createNewUser };