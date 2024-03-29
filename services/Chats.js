const User = require('../models/Users');
const Chats = require('../models/Chats');
const Message = require('../models/Message');

const checkWhichUserToReturn = (chat, username) => {
    if (chat.users[0].username === username) {
        return {
            username: chat.users[1].username,
            displayName: chat.users[1].displayName,
            profilePic: chat.users[1].profilePic,
        };
    }
    else {
        return {
            username: chat.users[0].username,
            displayName: chat.users[0].displayName,
            profilePic: chat.users[0].profilePic,
        };
    }
}

const returnLastMessage = async (id) => {
    const messages = await returnAllTheMessages(id);
    if (messages.length === 0) {
        return null;
    } else {
        return messages[messages.length - 1];
    }
};

const returnAllChats = async (username) => {
    const user = await User.findOne({ username }).populate('chats');
    if (user) {
        const chatPromises = user.chats.map(async chat => {
            const lastMessage = await returnLastMessage(chat.id);
            return {
                id: chat.id,
                user: checkWhichUserToReturn(chat, username),
                lastMessage: lastMessage
            };
        });
    
        const filteredChats = await Promise.all(chatPromises);
    
        return filteredChats;
    } else {
        return -1;
    }
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

        const answer = {
            id: newChat.id,
            user: {
                username: newChat.users[1].username,
                displayName: newChat.users[1].displayName,
                profilePic: newChat.users[1].profilePic,
            },
            lastMessage: null
        };

        // return the new chat.
        return answer;
    } else {
        //not exist 
        return -1;
    }
}

const returnTheConversation = async (id) => {
    const conversation = await Chats.findOne({ id: parseInt(id) });

    if (conversation) {
        const messages = await returnAllTheMessages(id);
        const updatedConversation = {
            id: conversation.id,
            users: [{
                username: conversation.users[0].username,
                displayName: conversation.users[0].displayName,
                profilePic: conversation.users[0].profilePic,
            }, {
                username: conversation.users[1].username,
                displayName: conversation.users[1].displayName,
                profilePic: conversation.users[1].profilePic,
            }],
            messages: messages
        }
        return updatedConversation;
    } else {
        return -1;
    }
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
        created: new Date(),
        sender: userNameForChat,
        content: messageContent
    });
    return newMessage;
}

const addNewMessage = async (username, messageContent, id) => {
    const messageList = await Chats.findOne({ id: parseInt(id) });

    if (messageList) {
        //find the username in users
        const user = await findUser(username);
        if (user) {
            // new chat when the username is sender
            const newMessage = await createMessageSchema(user, messageContent)

            // push the new chat to the user array chats
            messageList.messages.push(newMessage);

            // save it in the DB
            await newMessage.save();
            await messageList.save();

            return newMessage;
        } else {
            return -1;
        }
    } else {
        return -1;
    }
}

const returnAllTheMessages = async (id) => {
    const messages = await Chats.findOne({ id: parseInt(id) }).populate('messages');
    if (messages) {
        return messages.messages;
    } else {
        return -1;
    }
}

updateCurrentChats = async (username, id) => {
    const user = await User.findOne({ username }).populate('chats');
    if (user) {
        const userChats = await returnAllChats(username);

        // Find the index of the chat with the given id
        const userChatsIndex = userChats.findIndex(chat => chat.id === parseInt(id));

        if (userChatsIndex !== -1) {
            // Remove the chat from its current position and insert it at the beginning
            const chatToMove = userChats.splice(userChatsIndex, 1)[0];
            userChats.unshift(chatToMove);

            const chatToMoveUserDatabase = user.chats.splice(userChatsIndex, 1)[0];
            user.chats.unshift(chatToMoveUserDatabase);

            // Save the updated user object to persist the changes in the database
            await user.save();

            return userChats;
        } else {
            return -1;
        }
    } else {
        return -1;
    }
}

const updateChats = async (id) => {
    const chat = await Chats.findOne({ id: parseInt(id) });

    if (chat) {
        const userOne = chat.users[0].username;
        const userTwo = chat.users[1].username;

        const updatedChatsOne = await updateCurrentChats(userOne, id);
        const updatedChatsTwo = await updateCurrentChats(userTwo, id);
        if (updatedChatsOne !== -1 && updatedChatsTwo !== -1) {
            return 1;
        } else {
            return -1;
        }
    } else {
        return -1;
    }

}

const deleteMessage = async (messageId) => {
    await Message.deleteOne({ id: parseInt(messageId) });
}

const deleteMessages = async (chat) => {
    for (const message of chat) {
        await deleteMessage(message.id);
    }
}

const deleteChat = async (username, id) => {
    const user = await User.findOne({ username }).populate('chats');
    if (user) {
        const conversation = await Chats.findOne({ id: parseInt(id) }).populate('messages');
        if (conversation) {
            await deleteMessages(conversation.messages);

            let contactUsername;
            if (conversation.users[1].username === username) {
                contactUsername = conversation.users[0].username;
            } else {
                contactUsername = conversation.users[1].username;
            }
            const contact = await User.findOne({ username: contactUsername }).populate('chats');

            await Chats.deleteOne({ id: parseInt(id) });

            // Find the index of the chat with the given ID in the user's chats array
            const userChatIndex = user.chats.findIndex(chat => chat.id.toString() === id);
            const contactChatIndex = contact.chats.findIndex(chat => chat.id.toString() === id);

            // If the chat is found, remove it from the array and save the updated user document
            if (userChatIndex !== -1) {
                user.chats.splice(userChatIndex, 1);
                await user.save();

                contact.chats.splice(contactChatIndex, 1);
                await contact.save();
            }

            return 1;
        } else {
            return -1;
        }
    } else {
        return -1;
    }
}

const getNotifications = async (username) => {
    const user = await User.findOne({ username }).populate('chats');
    if (user) {
        return user;
    } else {
        return -1;
    }
}

const addNotification = async (username, id) => {
    const messageList = await Chats.findOne({ id: parseInt(id) });

    if (messageList) {
        if (messageList.users[0].username === username) {
            messageList.users[0].notifications += 1;
        } else {
            messageList.users[1].notifications += 1;
        }

        await messageList.save();
        return 1;
    } else {
        return -1;
    }
}

const resetNotifications = async (username, id) => {
    const conversation = await Chats.findOne({ id: parseInt(id) });

    if (conversation) {
        if (conversation.users[0].username === username) {
            conversation.users[1].notifications = 0;
        } else {
            conversation.users[0].notifications = 0;
        }

        await conversation.save();
        return 1;
    } else {
        return -1;
    }
}

module.exports = { returnAllChats, createChat, returnTheConversation, addNewMessage, returnAllTheMessages, updateChats, deleteChat, getNotifications, addNotification, resetNotifications }