import './RegisterCreateAccountBlock.css'
import InputDiv from '../InputDiv/InputDiv';
import CreateAccountTitle from '../LeftTitle/LeftTitle';
import InputPhotoDiv from '../InputDiv/InputPhotoDiv'
import { useState, useContext, useEffect } from 'react';
import { registerUsers } from '../../components/RegisteredUsers/RegisteredUsers';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../components/CurrentUser/CurrentUser';

function RegisterCreateAccountBlock() {
    const [key, setKey] = useState(0); // State variable to trigger re-render
    // define the state variables using the useState hook
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [DisplayName, setDisplayName] = useState('');
    const [photoUrl, setPhotoUrl] = useState(null);
    const [invalidFields, setInvalidFields] = useState([]);
    const [usernameText, setUsernameText] = useState('must contain at least one letter');
    // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
    // const usernameRegex = /[a-zA-Z]/;
    // use the useNavigate hook to enable programmatic navigation
    const navigate = useNavigate();
    const { updateUser } = useContext(CurrentUserContext);

    // handling the event when the inputs changed
    const handleInputChange = (event, inputName) => {
        // if the input was empty and now not so get out of the invalidFields
        if (invalidFields.includes(inputName)) {
            setInvalidFields(invalidFields.filter(name => name !== inputName));
        }
    }

    // handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // save the new user in JS
        const NewUser = {
            username: Username,
            password: Password,
            displayName: DisplayName,
            profilePic: photoUrl
        };
        try {
            const res = await fetch('http://localhost:5000/api/Users', {
                'method': 'post',
                'headers': {
                    'accept': 'text/plain',
                    'Content-Type': 'application/json',
                },
                'body': JSON.stringify(NewUser)
            })

            if (res.ok) {
                // update the array of all users
                // update the current user
                updateUser(NewUser);
                // navigate to the login page
                navigate('/');
            } else {
                console.log("test")
                 // Handle the case when the response is not OK (e.g., show an error message)
                const errorMessage = await res.text();
                const errorObj = JSON.parse(errorMessage);
                if (errorObj && errorObj.errors) {
                    const errors = errorObj.errors;
                    for (const key in errors) {
                      if (errors.hasOwnProperty(key)) {
                        const errorMessages = errors[key];
                        // need to fix it so it will work with spesific field
                        if (key === "title") {
                            invalidFields.push('Username')
                            invalidFields.push('Password')
                            invalidFields.push('Password Verification')
                            invalidFields.push('Display Name')
                        }
                        if ( key === "ProfilePic") {
                            invalidFields.push('Picture')
                        }
                        console.log(`${key}: ${errorMessages.join(', ')}`);
                      }
                    }
                }
                console.error(errorMessage)
                setInvalidFields(invalidFields);
            }
        } catch (error) {
            // console.error('Error occurred while sending the request test: ', error);
        }
        setKey(prevKey => prevKey + 1);
    }


    return (
        <div id="createAccount" className="col-lg-8 position-relative">
            <CreateAccountTitle divId="Title" divText="Create Account" />
            <form className="row" onSubmit={handleSubmit}>

                <InputDiv inputId="userNameInput" inputType="text" inputPlaceholder="Username"
                    inputTitle="Username" divclassName={`registerInputDiv ${invalidFields.includes('Username') ? 'invalid' : ''}`}
                    popoverTitle="Username" popoverContent={usernameText}
                    value={Username} setter={setUsername} handler={handleInputChange} divId="usernameDiv" />

                <InputDiv inputId="passwordInput" inputType="password" inputPlaceholder="Password"
                    inputTitle="Password" divclassName={`registerInputDiv ${invalidFields.includes('Password') ? 'invalid' : ''}`}
                    popoverTitle="Password" popoverContent="must contain at least 5 characters, 
                    with a combination of digits and letters" value={Password} setter={setPassword} handler={handleInputChange} divId="passwordDiv" />

                <InputDiv inputId="passwordConfirmationInput" inputType="password" inputPlaceholder="Confirm Password"
                    inputTitle="Password Verification" divclassName={`registerInputDiv ${invalidFields.includes('Password Verification') ? 'invalid' : ''}`}
                    popoverTitle="Password Verification" popoverContent="must be the same as the password"
                    value={ConfirmPassword} setter={setConfirmPassword} handler={handleInputChange} divId="confirmPasswordDiv" />

                <InputDiv inputId="displayNameInput" inputType="text" inputPlaceholder="Display Name"
                    inputTitle="Display Name" divclassName={`registerInputDiv ${invalidFields.includes('Display Name') ? 'invalid' : ''}`}
                    popoverTitle="Display Name" popoverContent="must contain at least one letter"
                    value={DisplayName} setter={setDisplayName} handler={handleInputChange} divId="displayNameDiv" />

                <InputPhotoDiv inputId="pictueInput" inputType="file" inputPlaceholder="add your picture"
                    inputTitle="Picture" divclassName={`registerInputDiv ${invalidFields.includes('Picture') ? 'invalid' : ''}`}
                    popoverTitle="Picture" popoverContent="must insert only files of kind: png, jpeg..."
                    handler={handleInputChange} divId="pictureDiv" photoUrl={photoUrl} setPhotoUrl={setPhotoUrl} />

                <div id="register" className="col-lg-12">
                    <button id="registerLeftButton" type="submit">REGISTER</button>
                </div>
            </form>
        </div>
    );
}

export default RegisterCreateAccountBlock;