
async function showMessages(currentUser, key) {
    try {
        //give me the listofmessages between two contact
        const url = 'http://localhost:5000/api/Chats/' + key
        const res = await fetch(url, {
            method: 'get',
            headers: {
                accept: 'text/plain',
                Authorization: currentUser.token
            },
        });
        if (res.ok) {
            const currentChat = await res.json()
            // console.log(currentChat)
            return currentChat
        } else {
            console.log('error with the server from show messgae ');
            return false;
        }
    } catch (error) {
        console.log('error with the server');
        return false;
    }
}

export default showMessages;

