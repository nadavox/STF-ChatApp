
async function getchats(currentUser) {
    try {
        const res = await fetch('http://localhost:5000/api/Chats', {
            method: 'get',
            headers: {
                accept: 'text/plain',
                Authorization: currentUser.token
            },
        });
        if (res.ok) {
            const listOfChats = await res.json()
            return listOfChats
        } else {
            console.log('error with the server from login auth');
            return false;
        }
    } catch (error) {
        console.log('error with the server from login auth');
        return false;
    }
}

export default getchats;

