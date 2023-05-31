async function addContact(currentUser, inputValue) {
    const newUser = { username: inputValue }
    try {
        // create new contcs = create new chat
        const res = await fetch('http://localhost:5000/api/Chats', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': currentUser.token
            },
            body: JSON.stringify(newUser)
        });

        if (res.ok) {
            const newChat = await res.json();
            const newChatElement = {
                id: newChat.id,
                displayNameReciver: newChat.user.displayName,
                profilePic: newChat.user.profilePic,
                username: newChat.user.username
            }
            return newChatElement;
        } else {
            const error = await res.text()
            return false;
        }
    } catch (error) {
        return false;
    }
}

export default addContact;