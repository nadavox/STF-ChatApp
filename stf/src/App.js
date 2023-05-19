import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogIn from './login_screen_components/LogInScreen/LogInScreen.js';
import RegisterScreen from './login_screen_components/RegisterScreen/RegisterScreen.js';
import ChatScreen from './chat_screen_components/ChatScreen/ChatScreen.js';
import { CurrentUserProvider } from './components/CurrentUser/CurrentUser.js';


function App() {
  return (
    <CurrentUserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/chats" element={<ChatScreen />} />
          <Route path="*" element={<LogIn />} />
        </Routes>
      </Router>
    </CurrentUserProvider>
  );
}

export default App;