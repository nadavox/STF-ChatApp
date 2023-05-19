import './ChatsMainScreen.css'
import ContactsSide from '../ContactsSide/ContactsSide';
import DisplayContactRow from '../DisplayContactRow/DisplayContactRow';
import MessagesScreen from '../MessagesScreen/MessagesScreen';
import { registerUsers } from '../../components/RegisteredUsers/RegisteredUsers';
import { CurrentUserContext } from '../../components/CurrentUser/CurrentUser';
import { useState, useEffect, useContext } from 'react';
import Modal from '../Modal/Modal';

function ChatsMainScreen() {
    // Define state variables
    const [finalInputValue, setFinalInputValue] = useState("");
    const [newContactDisplayName, setNewContactDisplayName] = useState("");
    const [newContactPhotoUrl, setNewContactPhotoUrl] = useState(null);
    const [displayContactRow, setDisplayContactRow] = useState({ picture: "...", displayName: "", username: "" })
    const { currentUser } = useContext(CurrentUserContext);
    // maybe do something else for start
    const [rightMessageScreen, setRightMessageScreen] = useState(<MessagesScreen />);
    const currentUserContactList = registerUsers.find((user) => user.username === currentUser.username).contactsList;
    const [copyCurrUserContacts, setCopyCurrUserContacts] = useState(currentUserContactList);
    const [pressedOnAddContact, setPressedOnAddContact] = useState(false);

    const [currentContactClicked, setCurrentContactClicked] = useState("");

    useEffect(() => {
        // If the contact exists, set the right message screen to the contact's messages screen
        if (copyCurrUserContacts.find((contact) => contact.username === displayContactRow.username)) {
            // need to render with new variable. 
            setCopyCurrUserContacts(copyCurrUserContacts.map((contact) => {
                //update the curr contact on everyone
                const updateMessageScreen = (
                    <MessagesScreen
                        username={contact.messagesScreen.props.username}
                        listofmessages={contact.messagesScreen.props.listofmessages}
                        currentContactClicked={currentContactClicked}
                        setLastMessageTime={contact.messagesScreen.props.setLastMessageTime}
                    />
                )
                contact.messagesScreen = updateMessageScreen
                return contact
            }))
            setRightMessageScreen(copyCurrUserContacts.find((contact) => contact.username === displayContactRow.username).messagesScreen);
        }
         // eslint-disable-next-line
    }, [displayContactRow.username, pressedOnAddContact]);


    return (
        <>
            <div id="screen" className="container-fluid p-0">
                <div id="mainScreen" className="row">

                    {/* added the setter for the row in thr right side of the screen
                    so every time the user click on a contact we need to use the setter
                    and than it gonna replace. the setter is: setDisplayContactRow */}
                    <ContactsSide username={finalInputValue} displayName={newContactDisplayName} photoUrl={newContactPhotoUrl}
                        setDisplayContactRow={setDisplayContactRow} copyCurrUserContacts={copyCurrUserContacts}
                        setCopyCurrUserContacts={setCopyCurrUserContacts} pressedOnAddContact={setPressedOnAddContact}
                        pressedOnAddContactValue={pressedOnAddContact}
                        currentContactClicked={currentContactClicked} setCurrentContactClicked={setCurrentContactClicked} />

                    {/* from here is right side of the screen */}
                    <div id="rightsideofthescreen" className="col-7 d-flex flex-column flex-grow-1 p-0">

                        {/* dispaly the first row of the right sideof the screen */}
                        <DisplayContactRow picture={displayContactRow.picture} name={displayContactRow.displayName} />

                        {/* the messages screen and the text box*/}
                        {rightMessageScreen}

                    </div>
                </div>
            </div>

            <Modal setFinalInputValue={setFinalInputValue}
                setNewContactDisplayName={setNewContactDisplayName}
                setNewContactPhotoUrl={setNewContactPhotoUrl} pressedOnAddContact={setPressedOnAddContact} />
        </>
    );
}

export default ChatsMainScreen;