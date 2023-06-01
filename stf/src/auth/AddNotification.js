async function addNotification(currentUser, id, currentContactClicked) {
    const isClicked = { currentContactClicked: currentContactClicked }
    try {
        // create new contcs = create new chat
        const res = await fetch('http://localhost:5000/api/Chats/Notifications/' + id, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': currentUser.token
            },
            body: JSON.stringify(isClicked)
        });

        if (res.ok) {
            const okay = await res.json();
            return okay;
        } else {
            const error = await res.text()
            return false;
        }
    } catch (error) {
        return false;
    }
}

export default addNotification;