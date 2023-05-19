import './ChatScreen.css';
import BackgroundCircles from '../../login_screen_components/BackgroundCircles/BackgroundCircles';
import ChatsMainScreen from '../ChatsMainScreen/ChatsMainScreen';
import { CurrentUserContext } from '../../components/CurrentUser/CurrentUser';
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function ChatScreen() {
  // useNavigate hook for programmatic navigation
  const navigate = useNavigate();
  // useContext hook to get the currentUser object
  const { currentUser } = useContext(CurrentUserContext);
  
  // conditionally render the page based on whether the currentUser has a username or not
  const page = currentUser.username === "" ? null : (
    <>
      <BackgroundCircles circleId="topCircle" />
      <ChatsMainScreen />
      <BackgroundCircles circleId="bottomCircle" />
    </>
  );

  // useEffect hook to check if page is null and navigate to home page if it is
  useEffect(() => {
    if (page === null) {
      navigate("/");
    }
  }, [])

  return page;
}

export default ChatScreen;
