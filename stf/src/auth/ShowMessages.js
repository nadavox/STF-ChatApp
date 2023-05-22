
async function showMessages(currentUser, key) {
    try {
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
            console.log(currentChat)
            return currentChat
        } else {
            console.log('error with the server from login auth');
            return false;
        }
    } catch (error) {
        console.log('error with the server from login auth');
        return false;
    }
}

export default showMessages;

