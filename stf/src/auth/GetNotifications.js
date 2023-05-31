async function receiveNotifications(currentUser) {
    try {
        //getting all the chats with the curent yse = number of contacts he had.
        const res = await fetch('http://localhost:5000/api/Chats/Notifications', {
            method: 'get',
            headers: {
                Authorization: currentUser.token
            },
        });
        if (res.ok) {
            const notifications = await res.json()
            return notifications
        } else {
            console.log('error with the respond from receiveNotifications auth');
            return false;
        }
    } catch (error) {
        console.log('error with the server from receiveNotifications auth');
        return false;
    }
}

export default receiveNotifications;