const User = require('../models/Users');
const Chats = require('../models/Chats');

const returnAllChats = async (username) => {
    const user = await User.findOne({ username }).populate('chats');
    return user.chats
}
  
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

const returnAllmessagesOfId = async (id, user) => {
    // create array of size three:
    // 1. for the details of the first user
    // 2. for the details of the second user
    // 3. for the array of messages
    users = [0,0,0]
    // the user here is the sender
    arrayOfAllChats = await returnAllChats(user)
    // get the chatmessage of the sender
    const chatMessage = arrayOfAllChats.find(chat => chat.id == id);
    // insert the first user in the converastion betwen the two users
    console.log("the chat id: ", chatMessage.id)
    users[0] = chatMessage.user
    // find the details of the reciver so i cen enter them to the array
    const user2 = await findUser(user)
    users[1] = {username: user2.username,displayNmae: user2.displayName, profilePic: user2.profilePic}
    // need to insert the array of messages.
        
}

module.exports = { returnAllChats, createChat, returnAllmessagesOfId }