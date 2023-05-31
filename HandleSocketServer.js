const Chats = require("./models/Chats");
const { io } = require("./server");

function socketHandler() {
    io.on('connection', socket => {

        socket.on("sendMessage", (data) => {
            console.log("the id of the chat that send message: ", data.id)
            // send to the clinet the id of the chat with the new message
            //maybe send the new message or the chat.
            socket.to(data.id).emit("receive_message", data);
        })

        socket.on("join_chat", (id) => {
            console.log("the id of the socket that join a chat", socket.id, "and the room ID:", id);
            // send to the clinet the id of the chat with the new message
            //maybe send the new message or the chat.
            socket.join(id)
        })

        socket.on("add_contact", async (data) => {
            console.log("the new caht id is:", data.data.id);
            // serching for the new chet
            // const newChat = await Chats.findOne({data})
            io.emit("receive_newContact", data);
        })

        socket.on("updateChats", async (data) => {
            console.log("updateChats the data is: ", data )
            socket.to(data).emit("receiveUpdateChats", data);
            socket.emit("receiveUpdateChats", data);
        })

        socket.on('disconnect', () => {});
    })
}

module.exports = socketHandler;
socketHandler();