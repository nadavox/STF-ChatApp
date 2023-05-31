import './LoginSignUpBlock.css'
import SignUpTitle from '../RightTitle/RightTitle';
import SignInButton from '../Buttons/Buttons'
import Details from '../Details/Details';

function LoginSignUpBlock(props) {

    function handleMouseEnter() {
        props.setMousePosition(true);
    }

    function handleMouseLeave() {
        props.setMousePosition(false);
    };

    return (
        <div id="signUpBlock" className="col-lg-4 position-relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <SignUpTitle divId="signUpTitle" divText="Not registred?" />
            <div className="row">
                <Details DivId="details" DivText="Enter your personal details and start chatting with friends" />
            </div>
            <div className="row">
                <SignInButton divId="signUp" buttonId="rightButton" buttonText="SIGN UP" linkTo="/register" />
            </div>
        </div>);
}

export default LoginSignUpBlock;