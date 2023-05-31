async function getAllNotifications(currentUser) {
    try {
        const res = await fetch('http://localhost:5000/api/Chats/Notifications', {
            method: 'post',
            headers: {
                accept: 'text/plain',
                Authorization: currentUser.token
            },
        });
        if (res.ok) {
            const notifications = await res.json()
            return notifications
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

export default getAllNotifications;