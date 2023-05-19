import './LogInScreen.css';
import BackgroundCircles from '../BackgroundCircles/BackgroundCircles';
import LoginMainScreen from '../LoginMainScreen/LoginMainScreen';

function LogIn() {
  return (
    <>
      <BackgroundCircles circleId="topCircle" />
      <LoginMainScreen />
      <BackgroundCircles circleId="bottomCircle" />
    </>
  );
}

export default LogIn;