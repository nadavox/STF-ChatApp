const tokenService = require('../services/Tokens');
const jwt = require("jsonwebtoken")
const STF = "STF"

const validateInfromation = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const checkValidate = await tokenService.validateInfromation(username, password);

    if(checkValidate < 0) {
        return res.status(404).send('Incorrect username and/or password');
    } else {

        const data = { username: username }
        // Generate the token.
        const token = jwt.sign(data, STF)
        console.log("test check how token look: ", token)
        
        // Return the token to the browser
        res.cookie("token", token, {
            httponly: true
        })
        res.status(200).json({ token });
    }
}

module.exports = { validateInfromation };
