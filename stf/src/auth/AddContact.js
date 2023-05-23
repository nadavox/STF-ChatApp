async function addContact(currentUser, inputValue) {
    const newUser = {username : inputValue}
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
                id : newChat.id,
                displayNameReciver : newChat.user.displayName,
                profilePic : newChat.user.profilePic,
                username : newChat.user.username
            }
            return newChatElement;
        } else {
            console.log('error with the server from add ocntact');
            const error = await res.text()
            console.log(error);
            return false;
        }
    } catch (error) {
        console.log('error with the server from add contacttt');
        return false;
    }
}

export default addContact;
