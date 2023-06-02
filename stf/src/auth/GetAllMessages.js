async function getAllMessges(currentUser, key) {
    try {
        //send new message to a chat
        const url = 'http://localhost:5000/api/Chats/' + key + '/Messages'
        const res = await fetch(url, {
            method: 'get',
            headers: {
                'accept': 'text/plain',
                Authorization: currentUser.token
            },
        });
        if (res.ok) {
            const list = await res.json()
            return list;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

export default getAllMessges;