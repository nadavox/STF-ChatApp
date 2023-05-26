const chatsService = require('../services/Chats');
const STF = "STF"
const jwt = require("jsonwebtoken")

function extractTokenFromBearerString(bearerString) {
    const start = bearerString.indexOf('{');
    const end = bearerString.lastIndexOf('}') + 1;
    const jsonToken = bearerString.slice(start, end);
    const tokenObject = JSON.parse(jsonToken);
    return tokenObject.token;
  }


const returnAllChats = async (req, res) => {
    console.log("in");
    if (req.headers.authorization) {
        const updateToken = extractTokenFromBearerString(req.headers.authorization)
        // Extract the token from that header
        let data
        try {
            // Verify the token is valid
            data = jwt.verify(updateToken, STF);
            console.log('The logged in user is: ' + data.username);
            // Token validation was successful. Continue to the actual function (index)
            const allChats = await chatsService.returnAllChats(data.username)
            return allChats
        } catch (err) {
            return res.status(401).send("Invalid Token 33");
        }
    }
    else {
        return res.status(403).send('Token required');
    }

}

module.exports = { returnAllChats };