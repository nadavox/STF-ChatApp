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
            return deleteChat;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

export default deleteChat;