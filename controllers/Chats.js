const chatsService = require('../services/Chats');
const STF = process.env.SECRET_TOKEN_KEY; // Accessing the environment variable
const jwt = require("jsonwebtoken")


function extractTokenFromBearerString(bearerString) {
    const start = bearerString.indexOf('{');
    const end = bearerString.lastIndexOf('}') + 1;
    const jsonToken = bearerString.slice(start, end);
    const tokenObject = JSON.parse(jsonToken);
    return tokenObject.token;
}

function getUserNameFromToken(tokenFromCookie) {
    const updateToken = extractTokenFromBearerString(tokenFromCookie)
    // Extract the token from that header
    try {
        // Verify the token is valid
        const data = jwt.verify(updateToken, STF);
        return data.username
    } catch (err) {
        return "Invalid Token";
    }
}

const returnAllChats = async (req, res) => {
    if (req.headers.authorization) {
        const username = getUserNameFromToken(req.headers.authorization)
        if (username !== "Invalid Token") {
            const allChats = await chatsService.returnAllChats(username)
            res.send(allChats); // Send the array as a response to the client
            return
        } else {
            return res.status(401).send("Invalid Token");
        }
    }
    else {
        return res.status(403).send('Token required');
    }
}

const createChat = async (req, res) => {
    const requestBody = req.body; // Assuming the JSON object is in the request body
    // get the login username
    const username = getUserNameFromToken(req.headers.authorization)
    if (username !== "Invalid Token") {
        const newChat = await chatsService.createChat(requestBody.username, username)
        if (newChat != -1) {
            res.status(200).json(newChat);
        } else {
            res.status(400).send('failed. problem with the DB');
        }
    } else {
        return res.status(403).send('Token required');
    }
}

const returnAllmessagesOfId = async (req, res) => {
    // get the login username
    const username = getUserNameFromToken(req.headers.authorization)
    if (username !== "Invalid Token") {
        const allMessages = await chatsService.returnAllmessagesOfId(req.params.id, username)
        // if (newChat != -1) {
        //     res.status(200).json(newChat);
        // } else {
        //     res.status(400).send('failed. problem with the DB');
        // }
    } else {
        return res.status(403).send('Token required');
    }
}

module.exports = { returnAllChats, createChat, returnAllmessagesOfId };  