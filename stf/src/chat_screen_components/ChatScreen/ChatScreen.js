import './ChatScreen.css';
import BackgroundCircles from '../../login_screen_components/BackgroundCircles/BackgroundCircles';
import ChatsMainScreen from '../ChatsMainScreen/ChatsMainScreen';
import { CurrentUserContext } from '../../components/CurrentUser/CurrentUser';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function ChatScreen() {
  // useNavigate hook for programmatic navigation
  const navigate = useNavigate();
  // useContext hook to get the currentUser object
  const { currentUser } = useContext(CurrentUserContext);

  // conditionally render the page based on whether the currentUser has a username or not
  if (currentUser.username === "") {
    // Navigate to the home page if currentUser doesn't have a username
    navigate("/");
    return null;
  }
  
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