import './RegisterScreen.css';
import RegisterMainScreen from '../RegisterMainScreen/RegisterMainScreen';
import BackgroundCircles from '../BackgroundCircles/BackgroundCircles';

function RegisterScreen() {
    return(<>
        <BackgroundCircles circleId="topCircle" />
        <RegisterMainScreen />
        <BackgroundCircles circleId="bottomCircle" />
      </>);
}

export default RegisterScreen;