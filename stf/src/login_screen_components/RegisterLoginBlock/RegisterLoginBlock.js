import './RegisterLoginBlock.css'
import LoginTitle from '../RightTitle/RightTitle';
import Details from '../Details/Details';
import LoginButton from '../Buttons/Buttons'

function RegisterLoginBlock() {
    return (
        <div id="registerBlock" className="col-lg-4 position-relative">
            <LoginTitle divId="signUpTitle" divText="Already registred?" />
            <div className="row">
                <Details DivId="details" DivText="To continue chatting with friends please login with your personal info" />
            </div>
            <div className="row">
                <LoginButton divId="login" buttonId="rightButton" buttonText="SIGN IN" linkTo="/" />
            </div>
        </div>);
}

export default RegisterLoginBlock;