import './ChatsMainScreen.css'
import ContactsSide from '../ContactsSide/ContactsSide';
import DisplayContactRow from '../DisplayContactRow/DisplayContactRow';
import MessagesScreen from '../MessagesScreen/MessagesScreen';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../components/CurrentUser/CurrentUser';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';
import io from 'socket.io-client'; // connect to the socket.io

const sock = io.connect('http://localhost:5000'); // Create the socket connection 

function ChatsMainScreen() {
    // useNavigate hook for programmatic navigation
    const navigate = useNavigate();
    // the current user
    const { currentUser } = useContext(CurrentUserContext);
    const [currentChatThatGotMessage, setCurrentChatThatGotMessage] = useState(0);
    // Define state variables
    const [displayContactRow, setDisplayContactRow] = useState({ picture: "...", displayName: "", username: "" })
    const [rightMessageScreen, setRightMessageScreen] = useState(<MessagesScreen currentContactClicked="" sock={sock} />);
    const [pressedOnAddContact, setPressedOnAddContact] = useState(false);
    const [addContact, setaddContact] = useState(false);
    const [deleteContact, setDeleteContact] = useState(false);
    const [clickContact, setClickContact] = useState("");

    useEffect(() => {
        async function fetchTheScreen() {
            if (clickContact !== "") {
                const updateMessageScreen = (
                    <MessagesScreen
                        id={clickContact}
                        currentContactClicked={clickContact}
                        setCurrentChatThatGotMessage={setCurrentChatThatGotMessage}
                        sock={sock}
                    />
                )
                setRightMessageScreen(updateMessageScreen)
            } else {
                const updateMessageScreen = (
                    <MessagesScreen currentContactClicked="" sock={sock} />
                )
                setRightMessageScreen(updateMessageScreen)
            }
        }
        fetchTheScreen()
    }, [clickContact]);

    if (currentUser.username === "") {
        // Navigate to the home page if currentUser doesn't have a username
        navigate("/");
        return null;
    }

    return (
        <>
            <div id="screen" className="container-fluid p-0">
                <div id="mainScreen" className="row">

                    <ContactsSide setDisplayContactRow={setDisplayContactRow} setPressedOnAddContact={setPressedOnAddContact}
                        pressedOnAddContactValue={pressedOnAddContact} addContact={addContact}
                        setaddContact={setaddContact} setClickContact={setClickContact}
                        currentContactClicked={clickContact}
                        currentChatThatGotMessage={currentChatThatGotMessage}
                        setCurrentChatThatGotMessage={setCurrentChatThatGotMessage}
                        sock={sock} deleteContact={deleteContact} setDeleteContact={setDeleteContact}
                    />

                    {/* from here is right side of the screen */}
                    <div id="rightsideofthescreen" className="col-7 d-flex flex-column flex-grow-1 p-0">

                        {/* dispaly the first row of the right sideof the screen */}
                        <DisplayContactRow picture={displayContactRow.picture}
                            name={displayContactRow.displayName}
                            chatId={clickContact} setDeleteContact={setDeleteContact} sock={sock} username={displayContactRow.username}
                        />

                        {/* the messages screen and the text box*/}
                        {rightMessageScreen}

                    </div>
                </div>
            </div>

            <Modal setDisplayContactRow={setDisplayContactRow}
                pressedOnAddContact={setPressedOnAddContact} setaddContact={setaddContact}
                sock={sock} />
        </>
    );
}

export default ChatsMainScreen;