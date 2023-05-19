import './LoginMainScreen.css'
import LoginSignInBlock from '../LoginSignInBlock/LoginSignInBlock';
import LoginSignUpBlock from '../LoginSignUpBlock/LoginSignUpBlock';
import { useState } from 'react';

function LoginMainScreen() {
    const [mousePosition, setMousePosition] = useState(false);

    return (
        <div className="container text-center">
            <div className="row">
                <LoginSignInBlock className="col-lg-8 position-relative" mousePosition={mousePosition} />
                <LoginSignUpBlock className="col-lg-4 position-relative"
                    mousePosition={mousePosition}
                    setMousePosition={setMousePosition} />
            </div>
        </div>
    );
}


export default LoginMainScreen;