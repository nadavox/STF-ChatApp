const User = require('../models/Users');
const Chats = require('../models/Chats');
const Message = require('../models/Message');

const returnAllChats = async (username) => {
    const user = await User.findOne({ username }).populate('chats');
    return user.chats;
}

function createUserNameForChat(username, displayName, profilePic) {
    const userNameForChat = { username: username, displayName: displayName, profilePic: profilePic }
    return userNameForChat;
}

async function findUser(username) {
    const user = await User.findOne({ username });
    return user;
}

async function createChatSchema(user, contact) {
    const usernameForChat = createUserNameForChat(user.username, user.displayName, user.profilePic);
    const contactForChat = createUserNameForChat(contact.username, contact.displayName, contact.profilePic);

    // Fetch the highest existing id value from the Chats collection
    const highestIdChat = await Chats.findOne({}, {}, { sort: { id: -1 } });

    // Calculate the next available id
    const nextId = highestIdChat ? highestIdChat.id + 1 : 1;

    // creat the chat
    const newChat = new Chats({
        id: nextId, // Generate a unique ID for the chat
        users: [usernameForChat, contactForChat],
        messages: []
    });
    return newChat;
}

const createChat = async (usernameContact, username) => {
    //find the username in users:
    const user = await findUser(username)
    // //find the contact in users:
    const userContact = await findUser(usernameContact);
    //thay exist
    if (userContact && user) {
        // new chat when the username is sender
        const newChat = await createChatSchema(user, userContact)
        // push the new chat to the user array chats
        user.chats.push(newChat);
        // push the new chat to the user array chats
        userContact.chats.push(newChat);
        // save it in the DB
        await newChat.save();
        await user.save();
        await userContact.save();

        // return the new chat.
        return newChat;
    } else {
        //not exist 
        return -1;
    }
}

const returnAllmessagesOfId = async (id) => {
    newId = id;
    const messages = await Chats.findOne({ id: parseInt(newId) }).populate('messages');
    console.log("the messages: ", messages);
    console.log("-----------------");
    return messages;
}

async function createMessageSchema(sender, messageContent) {
    const userNameForChat = createUserNameForChat(sender.username, sender.displayName, sender.profilePic);

    // Fetch the highest existing id value from the Chats collection
    const highestIdChat = await Message.findOne({}, {}, { sort: { id: -1 } });

    // Calculate the next available id
    const nextId = highestIdChat ? highestIdChat.id + 1 : 1;

    // creat the chat
    const newMessage = new Message({
        id: nextId, // Generate a unique ID for the message
        created: new Date().toLocaleString(),
        sender: userNameForChat,
        content: messageContent
    });
    return newMessage;
}

const addNewMessage = async (username, messageContent, id) => {
    //find the username in users:
    const user = await findUser(username);

    // new chat when the username is sender
    const newMessage = await createMessageSchema(user, messageContent)

    const messageList = await Chats.findOne({ id: parseInt(id) });

    // push the new chat to the user array chats
    messageList.messages.push(newMessage);
    // save it in the DB
    await newMessage.save();
    await messageList.save();

    return newMessage;
}

module.exports = { returnAllChats, createChat, returnAllmessagesOfId, addNewMessage }