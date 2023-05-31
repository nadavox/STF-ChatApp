
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
            return currentChat
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

export default showMessages;