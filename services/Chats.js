const User = require('../models/Users');
const Chats = require('../models/Chats');

const returnAllChats = async (username) => {
    const user = await User.findOne({ username }).populate('chats');
    return user.chats
};
  
function createUserNameForChat(username, displayName, profilePic) {
    const userNameForChat ={ username: username, displayName: displayName, profilePic: profilePic }
    return userNameForChat;
}

async function findUser(username) {
    const user = await User.findOne({ username });
    return user
}

async function createChatSchema(user) {
    const userNameForChat = createUserNameForChat(user.username, user.displayName, user.profilePic)

    // Fetch the highest existing id value from the Chats collection
    const highestIdChat = await Chats.findOne({}, {}, { sort: { id: -1 } });

  // Calculate the next available id
    const nextId = highestIdChat ? highestIdChat.id + 1 : 1;

    // creat the chat
    const newChat = new Chats({
        id: nextId, // Generate a unique ID for the chat
        user: userNameForChat,
        lastMessage: null
    });
    return newChat
}

const createChat = async (usernameContact, username) => { 
    //find the username in users:
    const user = await findUser(username)
    // //find the contact in users:
    const userContact = await findUser(usernameContact);
    //thay exist
    if (userContact && user) {
        // new chat when the username is sender
        const newChatOne = await createChatSchema(userContact)
        // push the new chat to the user array chats
        user.chats.push(newChatOne);
        // save it in the DB
        await newChatOne.save();
        await user.save();

        // new chat when the contact is the sender
        const newChatTwo = await createChatSchema(user)
        // push the new chat to the user array chats
        userContact.chats.push(newChatTwo);
        // save it in the DB
        await newChatTwo.save();
        await userContact.save();

        // return the new chat.
        return newChatOne
    } else {
        //not exist 
        return -1
    }
}

module.exports = { returnAllChats, createChat }