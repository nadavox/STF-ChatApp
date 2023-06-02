
async function sendMessageAPI(currentUser, currentContactClicked, inputValue) {
    const newMessage = { msg: inputValue };
            try {
                //send new message to a chat
                const url = 'http://localhost:5000/api/Chats/' + currentContactClicked + '/Messages'
                const res = await fetch(url, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'text/plain',
                        Authorization: currentUser.token
                    },
                    body: JSON.stringify(newMessage)
                });
                if (res.ok) {
                    const currentMessage = await res.json()
                    return currentMessage
                } else {
                    return false
                }
            } catch (error) {
                return false
            }
}

export default sendMessageAPI