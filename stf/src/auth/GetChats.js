async function getchats(currentUser) {
    try {
        //getting all the chats with the curent yse = number of contacts he had.
        const res = await fetch('http://localhost:5000/api/Chats', {
            method: 'get',
            headers: {
                accept: 'text/plain',
                Authorization: currentUser.token
            },
        });
        if (res.ok) {
            const listOfChats = await res.json()
            console.log("success in return the listofchats from server")
            return listOfChats
        } else {
            console.log('error with the respond from getChats auth');
            return false;
        }
    } catch (error) {
        console.log('error with the server from getChats auth');
        return false;
    }
}

export default getchats;