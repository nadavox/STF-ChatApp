import './LoginSignInBlock.css'
import LoginInputDiv from "../InputDiv/LoginInputDiv"
import SignInTitle from '../LeftTitle/LeftTitle';
import { registerUsers } from '../../components/RegisteredUsers/RegisteredUsers';
import React, { useRef, useEffect, useContext, useState } from 'react';
import { Await, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../components/CurrentUser/CurrentUser';

function LoginSignInBlock({ mousePosition }) {
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [invalidFields, setInvalidFields] = useState([]);
    const [isInvalid, setIsInvalid] = useState(false);
    // use the useNavigate hook to enable programmatic navigation
    const navigate = useNavigate();
    const { updateUser } = useContext(CurrentUserContext);


    useEffect(() => {
        if (mousePosition) {
            LoginInputDivref.current.blur();
        }

    }, [mousePosition]);

    function focus() {
        LoginInputDivref.current.focus();
    }

    const LoginInputDivref = useRef();
    const passwordref = useRef();

    // handling the event when the inputs changed
    const handleInputChange = (event, inputName) => {
        // if the input was empty and now not so get out of the invalidFields
        if (invalidFields.includes(inputName)) {
            setInvalidFields(invalidFields.filter(name => name !== inputName));
        }
    }

    const [messagetopopover, setMessagetopopover] = useState("username and password does not match");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const tokenStruct = {
                username: Username,
                password: Password
            }

            const res = await fetch('http://localhost:5000/api/Tokens', {
                'method': 'post',
                'headers': {
                    'accept': 'text/plain',
                    'Content-Type': 'application/json',
                },
                'body': JSON.stringify(tokenStruct)
            })
            const token = await res.text()
            const url = 'http://localhost:5000/api/Users/' + Username;

            const res1 = await fetch(url, {
                'method': 'get',
                'headers': {
                    'accept': 'text/plain',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            const responseText = await res1.text();
            // console.log(responseText)

            if (res1.ok) {
                // need to 
                const matchingContact = JSON.parse(responseText);
                console.log(matchingContact)

                // save the curr user in JS
                const currLoginUser = {
                    username: matchingContact.username,
                    displayName: matchingContact.displayName,
                    photoUrl: matchingContact.photoUrl,
                };

                // update the current user
                updateUser(currLoginUser);

                // navigate to the chats page
                // 
                navigate('/chats');
            } else {
                //not valid user
                // we need to show the right message when it happens 
                console.log("not a valid user")
                setMessagetopopover("username and password does not match");
                setIsInvalid(true);
                setTimeout(() => {
                    // Code to be executed after 100 miliseconds
                    //set the popover to be show
                    focus();
                }, 100);
            }
        } catch {
            // error with the server
            console.log("error with the server")
        }






        const invalidFields = [];
        // check if username input is not empty
        if (!Username) {
            invalidFields.push('Username');
        }


        //previos mission----------------------------------------

        // check if password input is not empty
        // if (!Password) {
        //     invalidFields.push('Password');
        // }
        // setInvalidFields(invalidFields);
        // // all the input fields are not empty
        // if (invalidFields.length === 0) {
        //     // find the right user
        //     const matchingContact = registerUsers.find(contact => contact.username === Username && contact.password === Password);
        //     if (matchingContact) {
        //         // save the curr user in JS
        //         const currLoginUser = {
        //             username: matchingContact.username,
        //             password: matchingContact.password,
        //             displayName: matchingContact.displayName,
        //             photoUrl: matchingContact.photoUrl,
        //             contactsList: matchingContact.contactsList,
        //         };

        //         // // update the current user (should not be array)
        //         // currUser.push(currLoginUser);

        //         // update the current user
        //         updateUser(currLoginUser);

        //         // navigate to the chats page
        //         navigate('/chats');
        //     } else if (registerUsers.some(contact => contact.username === Username)) {
        //         // the username is exist
        //         setMessagetopopover("username and password does not match");
        //         setIsInvalid(true);
        //         setTimeout(() => {
        //             // Code to be executed after 100 miliseconds
        //             //set the popover to be show
        //             focus();
        //         }, 100);
        //     } else {
        //         // user name does not exist
        //         setMessagetopopover("username does not exist");
        //         // the password is not good but the user is exist.
        //         setIsInvalid(true);
        //         setTimeout(() => {
        //             // Code to be executed after 100 miliseconds
        //             //set the popover to be show
        //             focus();
        //         }, 100);
        //     }
        // }
    }


    return (
        <div id="signInBlock" className="col-lg-8 position-relative" handlemousemove="handlemousemove">
            <SignInTitle divId="Title" divText="Sign in" />
            <form className="row" onSubmit={handleSubmit}>

                <LoginInputDiv ref={LoginInputDivref} inputId="userNameInput" inputType="text" inputPlaceholder="Username"
                    inputTitle="Username" divclassName={`row loginInputDiv ${invalidFields.includes('Username') ? 'invalid' : ''}`}
                    popoverTitle="Username" popoverContent="username doesn't match"
                    value={Username} setter={setUsername} handler={handleInputChange} isInvalid={isInvalid}
                    setIsInvalid={setIsInvalid} messagetopopover={messagetopopover} />

                <LoginInputDiv ref={passwordref} inputId="passwordInput" inputType="password" inputPlaceholder="Password"
                    inputTitle="Password" divclassName={`row loginInputDiv ${invalidFields.includes('Password') ? 'invalid' : ''}`}
                    value={Password} setter={setPassword} handler={handleInputChange}
                    isInvalid={isInvalid} setIsInvalid={setIsInvalid} messagetopopover={messagetopopover} />

                <div id="login" className="col-lg-12" >
                    <button id="loginLeftButton" type="submit">LOGIN</button>
                </div>
            </form>
        </div>
    );
}

export default LoginSignInBlock;
