import './RegisterCreateAccountBlock.css'
import InputDiv from '../InputDiv/InputDiv';
import CreateAccountTitle from '../LeftTitle/LeftTitle';
import InputPhotoDiv from '../InputDiv/InputPhotoDiv'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

    // use the useNavigate hook to enable programmatic navigation
    const navigate = useNavigate();

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

            if (ConfirmPassword !== Password || !ConfirmPassword) {
                invalidFields.push("Password Verification");
                setInvalidFields(invalidFields);
            }

            if (res.ok) {
                if (ConfirmPassword == Password) {
                    // navigate to the login page
                    navigate('/');
                }
            } else {
                if (res.status === 409) {
                    invalidFields.push("username");
                    setUsernameText("username already exist");
                } else {
                    // Handle the case when the response is not OK (e.g., show an error message)
                    const errorMessage = await res.text();
                    const errorObj = JSON.parse(errorMessage);

                    if (errorObj && errorObj.errors) {
                        const errors = errorObj.errors;
                        for (const key in errors) {
                            if (errors.hasOwnProperty(key)) {
                                const field = errors[key];
                                invalidFields.push(field);
                            }
                        }
                    }
                }
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

                <InputDiv inputId="userNameInput" inputType="text" inputPlaceholder="Username" inputclass = {`btn ${invalidFields.includes('username') ? 'inv' : ''}`}
                    inputTitle="Username" divclassName={`registerInputDiv ${invalidFields.includes('username') ? 'invalid' : ''}`}
                    popoverTitle="Username" popoverContent={usernameText} forInvalid='username'
                    value={Username} setter={setUsername} handler={handleInputChange} divId="usernameDiv" />

                <InputDiv inputId="passwordInput" inputType="password" inputPlaceholder="Password" inputclass = {`btn ${invalidFields.includes('password') ? 'inv' : ''}`}
                    inputTitle="Password" divclassName={`registerInputDiv ${invalidFields.includes('password') ? 'invalid' : ''}`}
                    popoverTitle="Password" popoverContent="must contain at least 5 characters, 
                    with a combination of digits and letters" forInvalid='password' value={Password} setter={setPassword}
                    handler={handleInputChange} divId="passwordDiv" />

                <InputDiv inputId="passwordConfirmationInput" inputType="password" inputPlaceholder="Confirm Password" inputclass = {`btn ${invalidFields.includes('Password Verification') ? 'inv' : ''}`}
                    inputTitle="Password Verification" divclassName={`registerInputDiv ${invalidFields.includes('Password Verification') ? 'invalid' : ''}`}
                    popoverTitle="Password Verification" popoverContent="must be the same as the password" forInvalid='Password Verification'
                    value={ConfirmPassword} setter={setConfirmPassword} handler={handleInputChange} divId="confirmPasswordDiv" />

                <InputDiv inputId="displayNameInput" inputType="text" inputPlaceholder="Display Name" inputclass = {`btn ${invalidFields.includes('displayName') ? 'inv' : ''}`}
                    inputTitle="Display Name" divclassName={`registerInputDiv ${invalidFields.includes('displayName') ? 'invalid' : ''}`}
                    popoverTitle="Display Name" popoverContent="must contain at least one letter" forInvalid='displayName'
                    value={DisplayName} setter={setDisplayName} handler={handleInputChange} divId="displayNameDiv" />

                <InputPhotoDiv inputId="pictueInput" inputType="file" inputPlaceholder="add your picture" inputclass = {`btn ${invalidFields.includes('profilePic') ? 'inv' : ''}`}
                    inputTitle="Picture" divclassName={`registerInputDiv ${invalidFields.includes('profilePic') ? 'invalid' : ''}`}
                    popoverTitle="Picture" popoverContent="must insert only files of kind: png, jpeg..." forInvalid='profilePic'
                    handler={handleInputChange} divId="pictureDiv" photoUrl={photoUrl} setPhotoUrl={setPhotoUrl} />

                <div id="register" className="col-lg-12">
                    <button id="registerLeftButton" type="submit">REGISTER</button>
                </div>
            </form>
        </div>
    );
}

export default RegisterCreateAccountBlock;