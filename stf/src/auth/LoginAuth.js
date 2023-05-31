async function LoginAuth(username, password) {
    try {
        const tokenStruct = {
            username: username,
            password: password
        };

        const res = await fetch('http://localhost:5000/api/Tokens', {
            method: 'post',
            headers: {
                accept: 'text/plain',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tokenStruct)
        });
        if (res.ok) {
            const token = await res.text();
            const url = 'http://localhost:5000/api/Users/' + username;
            const resCurrentUser = await fetch(url, {
                method: 'get',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            const currentUserData = await resCurrentUser.json();
            const currLoginUser = {
                username: username,
                displayName: currentUserData.displayName,
                photoUrl: currentUserData.profilePic,
                token: `Bearer ${token}`
            };
            return currLoginUser
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

export default LoginAuth;