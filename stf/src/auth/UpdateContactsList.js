async function updateChats(currentUser, id) {
    try {
        //getting all the chats with the curent yse = number of contacts he had.
        const res = await fetch('http://localhost:5000/api/Chats/Update/' + id, {
            method: 'get',
            headers: {
                accept: 'text/plain',
                Authorization: currentUser.token
            },
        });
        if (res.ok) {
            console.log("ok")
            return 1;
        } else {
            console.log('error with the server from update chats');
            return false;
        }
    } catch (error) {
        console.log('error with the server from update chats');
        return false;
    }
}

export default updateChats;