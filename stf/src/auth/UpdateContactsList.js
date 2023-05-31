async function updateChats(currentUser, id) {
    try {
        const res = await fetch('http://localhost:5000/api/Chats/Update/' + id, {
            method: 'get',
            headers: {
                accept: 'text/plain',
                Authorization: currentUser.token
            },
        });
        if (res.ok) {
            return 1;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

export default updateChats;