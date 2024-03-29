import './LoginSignInBlock.css'
import LoginInputDiv from "../InputDiv/LoginInputDiv"
import SignInTitle from '../LeftTitle/LeftTitle';
import React, { useRef, useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../components/CurrentUser/CurrentUser';
import LoginAuth from '../../auth/LoginAuth';

function LoginSignInBlock({ mousePosition }) {
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [invalidFields, setInvalidFields] = useState([]);
    const [isInvalid, setIsInvalid] = useState(false);
    // use the useNavigate hook to enable programmatic navigation
    const navigate = useNavigate();
    const { updateUser } = useContext(CurrentUserContext);
    const [messagetopopover, setMessagetopopover] = useState("username and password does not match");

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currLoginUser = await LoginAuth(Username, Password)
        if (currLoginUser !== false) {
            updateUser(currLoginUser);
            // navigate to the chats page 
            navigate('/chats');
        } else {
            //not valid user
            // we need to show the right message when it happens 
            setMessagetopopover("username and password does not match");
            setIsInvalid(true);
            invalidFields.push('Username');
            invalidFields.push('Password');
            setTimeout(() => {
                // Code to be executed after 100 miliseconds
                //set the popover to be show
                focus();
            }, 100);
        }
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