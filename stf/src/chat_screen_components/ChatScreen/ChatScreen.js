import './ChatScreen.css';
import BackgroundCircles from '../../login_screen_components/BackgroundCircles/BackgroundCircles';
import ChatsMainScreen from '../ChatsMainScreen/ChatsMainScreen';


function ChatScreen() {
  
  // Render the chat screen if currentUser has a username
  return (
    <>
      <BackgroundCircles circleId="topCircle" />
      <ChatsMainScreen />
      <BackgroundCircles circleId="bottomCircle" />
    </>
  );
}

export default ChatScreen;