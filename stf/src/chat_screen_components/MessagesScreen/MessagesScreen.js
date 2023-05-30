import Message from '../Message/Message';
import './MessagesScreen.css';
import { useState, useEffect, useRef, useContext } from 'react';
import '../SendMessageBox/SendMessageBox.css'
import send_Icon from '../../icons/send_Icon.png';
import { CurrentUserContext } from '../../components/CurrentUser/CurrentUser';
import showMessages from '../../auth/ShowMessages';


// This component takes in the current user's username and a list of messages to display.
const MessagesScreen = ({ id, currentContactClicked, setCurrentChatThatGotMessage, sock }) => {
    // the current user that log in
    const { currentUser } = useContext(CurrentUserContext);
    //ref for the first scrren.
    const firstScreenRef = useRef(null);
    //ref for the last message so it will scroll automatic
    const messagesEndRef = useRef(null);
    // If it is new user without any contacts or they haven't clicked on any contact, we can present whatever we want
    const inputRef = useRef();
    // Init the input value to empty
    const [inputValue, setInputValue] = useState("");
    const [ListOfMessages, setListOfMessages] = useState([])
    const [lastMessageTime, setLastMessageTime] = useState({ lastMessae: "", newMessage: "" });

    async function getmessages() {
        if (currentContactClicked !== '') {
            const messages = await showMessages(currentUser, currentContactClicked)
            if (messages != null) {
                setListOfMessages(messages.messages)
            }
        }
    }

    /**
    * A function that is called when the value of the input field changes.
    * It sets the state of inputValue to the value of the input field.
    * 
    * @param {Event} e The event object.
    */
    const onChange = (e) => {
        setInputValue(e.target.value)
    };


    // useeffect for clean the input when changing the contact
    // getmessages for the new contact
    useEffect(() => {
        if (currentContactClicked !== "") {
            getmessages()
            if (inputRef && inputRef.current) {
                //clean the input value.
                setInputValue("");
                // clear the input field.
                inputRef.current.value = "";
            }
        }
        // eslint-disable-next-line
    }, [currentContactClicked]);


    async function sendMessage(e) {
        if ((inputValue !== "" && e.key === "Enter") || (e.type === "click" && inputValue !== "")) {
            const newMessage = { msg: inputValue };
            try {
                //send new message to a chat
                const url = 'http://localhost:5000/api/Chats/' + currentContactClicked + '/Messages'
                const res = await fetch(url, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'text/plain',
                        Authorization: currentUser.token
                    },
                    body: JSON.stringify(newMessage)
                });
                if (res.ok) {
                    const currentMessage = await res.json()
                    //console.log("the current message: ", currentMessage)
                    setLastMessageTime({ lastMessae: lastMessageTime.newMessage, newMessage: currentMessage.created })
                    // need to update the list of message.
                    //clean the input value.
                    setInputValue("");
                    // clear the input field.
                    inputRef.current.value = "";
                    //updateListOfMessages()
                    ListOfMessages.push(currentMessage)
                    setCurrentChatThatGotMessage(id)
                    const data = { currentMessage: currentMessage, id: id }
                    await sock.emit("sendMessage", data)
                } else {
                    console.log('error with the server from sending message');
                }
            } catch (error) {
                console.log(error)
                console.log('error from try and cacth');
            }
        }
    }

    // useeffect to recive new messages in live
    useEffect(() => {
        sock.on("receive_message", (data) => {
            if (data.id == id) {
                console.log("i am the client. the id", data.id, "of the last message is: ", data.currentMessage)
                const updatedList = [...ListOfMessages, data.currentMessage]; // Create a new array with the updated element
                setListOfMessages(updatedList); // Update the state with the new array
            }
        })
    }, [ListOfMessages])

    async function updateListOfMessages() {
        try {
            console.log("id :", id)
            //send new message to a chat
            const url = 'http://localhost:5000/api/Chats/' + id + '/Messages'
            const res = await fetch(url, {
                method: 'get',
                headers: {
                    'accept': 'text/plain',
                    Authorization: currentUser.token
                },
            });
            if (res.ok) {
                const list = await res.json()
                // console.log("the details list of messages: ", list)
                setListOfMessages(list)
            } else {
                console.log('error with the server from sending message');
            }
        } catch (error) {
            console.log(error)
            console.log('error from try and cacth');
        }
    }

    function generateTime(dateString) {
        const date = new Date(dateString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours}:${minutes}`;
    }

    function getDateFromMessage(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Add 1 because getMonth() returns zero-based month
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
    }


    if (typeof id === 'undefined') {
        // no contact chosen
        return (
            <>
                <div className='row chatScreenFirstBackGround'>
                    <div className='col chatScreenFirstBackGroundLogo' ref={firstScreenRef}></div>
                </div>
            </>
        );
    }

    return (
        <>
            <ul id="chatScreen" className="p-2 flex-grow-1 overflow-y-scroll m-0" ref={messagesEndRef}>
                {ListOfMessages.map((message, index) => (
                    <Message key={message.id}
                        sender={message.sender.username}
                        content={message.content}
                        time={generateTime(message.created)}
                        date={getDateFromMessage(message.created)}
                        currentUser={currentUser.username}
                        lastMessgeDate={index > 0 ? getDateFromMessage(ListOfMessages[index - 1].created) : "first message"}
                    />
                ))}
            </ul>

            <div id="sendMessageBox" className="mt-auto d-flex align-items-center">

                <div className="col p-0">
                    <input id="sendMessageInput" type="text" placeholder="New message here..." className="h-100"
                        onChange={onChange} ref={inputRef} onKeyDown={sendMessage}></input>
                </div>
                <button id="recordMessageButton" type="button" className="h-100" onClick={sendMessage}>
                    <img src={send_Icon} alt=""></img>
                </button>
            </div>
        </>
    );
};

export default MessagesScreen;
