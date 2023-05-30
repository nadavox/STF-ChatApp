import './ChatsMainScreen.css'
import ContactsSide from '../ContactsSide/ContactsSide';
import DisplayContactRow from '../DisplayContactRow/DisplayContactRow';
import MessagesScreen from '../MessagesScreen/MessagesScreen';
import { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
// connect to the socket.io
import io from 'socket.io-client';
const sock = io.connect('http://localhost:5000'); // Create the socket connection 

function ChatsMainScreen() {
    const [testCounterOfMessages, setTestCounterOfMessages] = useState(false);

    // Define state variables
    //displatCONTACTROW is when we click
    const [displayContactRow, setDisplayContactRow] = useState({ picture: "...", displayName: "", username: "" })
    const [rightMessageScreen, setRightMessageScreen] = useState(<MessagesScreen currentContactClicked="" sock={sock} />);
    const [pressedOnAddContact, setPressedOnAddContact] = useState(false);
    const [finalInputValueInModal, setFinalInputValueInModal] = useState("");
    const [addContact, setaddContact] = useState(false)
    const [clickContact, setClickContact] = useState("")

    useEffect(() => {
        async function fetchTheScreen() {
            if (clickContact != "") {
                const updateMessageScreen = (
                    <MessagesScreen
                        id={clickContact}
                        currentContactClicked={clickContact}
                        setTestCounterOfMessages={setTestCounterOfMessages}
                        sock = {sock}
                    />
                )

                setRightMessageScreen(updateMessageScreen)
            }
        }
        fetchTheScreen()
    }, [clickContact]);

    return (
        <>
            <div id="screen" className="container-fluid p-0">
                <div id="mainScreen" className="row">

                    {/* added the setter for the row in thr right side of the screen
                    so every time the user click on a contact we need to use the setter
                    and than it gonna replace. the setter is: setDisplayContactRow */}
                    <ContactsSide setDisplayContactRow={setDisplayContactRow} setPressedOnAddContact={setPressedOnAddContact}
                        pressedOnAddContactValue={pressedOnAddContact} addContact={addContact}
                        setaddContact={setaddContact} setClickContact={setClickContact}
                        currentContactClicked={clickContact}
                        testCounterOfMessages={testCounterOfMessages}
                        setTestCounterOfMessages={setTestCounterOfMessages}
                        sock={sock}
                    />

                    {/* from here is right side of the screen */}
                    <div id="rightsideofthescreen" className="col-7 d-flex flex-column flex-grow-1 p-0">

                        {/* dispaly the first row of the right sideof the screen */}
                        <DisplayContactRow picture={displayContactRow.picture}
                            name={displayContactRow.displayName}
                            chatId={clickContact}
                        />

                        {/* the messages screen and the text box*/}
                        {rightMessageScreen}

                    </div>
                </div>
            </div>

            <Modal setFinalInputValue={setFinalInputValueInModal}
                setDisplayContactRow={setDisplayContactRow}
                pressedOnAddContact={setPressedOnAddContact} setaddContact={setaddContact} />
        </>
    );
}

export default ChatsMainScreen;