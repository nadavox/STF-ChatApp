async function deleteChat(currentUser, key) {
    try {
        const url = 'http://localhost:5000/api/Chats/' + key
        const res = await fetch(url, {
            method: 'DELETE',
            headers: {
                Authorization: currentUser.token
            },
        });
        if (res.ok) {
            const deleteChat = await res.json();
            console.log("date of delete chat: ", deleteChat);
            return deleteChat;
        } else {
            console.log('error with the server from delete chat');
            return false;
        }
    } catch (error) {
        console.log('error with the server');
        return false;
    }
}

export default deleteChat;