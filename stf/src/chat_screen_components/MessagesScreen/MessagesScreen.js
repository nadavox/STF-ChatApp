import Message from '../Message/Message';
import './MessagesScreen.css';
import { useState, useEffect, useRef, useContext } from 'react';
import send_Icon from '../../icons/send_Icon.png';
import { CurrentUserContext } from '../../components/CurrentUser/CurrentUser';
import showMessages from '../../auth/ShowMessages';
import updateChats from '../../auth/UpdateContactsList';
import addNotification from '../../auth/AddNotification';

// This component takes in the current user's username and a list of messages to display.
const MessagesScreen = ({ id, currentContactClicked, sock, setAlertSendingMessage }) => {
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


    // useEffect for cleaning the input when changing the contact
    // get messages for the new contact
    useEffect(() => {
        if (currentContactClicked !== "") {
            getmessages();
            if (inputRef && inputRef.current) {
                // Clean the input value.
                setInputValue("");
                // Clear the input field.
                inputRef.current.value = "";
            }
        }
        
        // eslint-disable-next-line
    }, [currentContactClicked]);


    useEffect(()=> {
        if (typeof id !== 'undefined') {
            const scrollHeight = messagesEndRef.current.scrollHeight;
            messagesEndRef.current.scrollTo({
                top: scrollHeight,
                behavior: 'auto'
              });
            }
    },[ListOfMessages])


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
                    setLastMessageTime({ lastMessae: lastMessageTime.newMessage, newMessage: currentMessage.created })
                    //clean the input value.
                    setInputValue("");
                    // clear the input field.
                    inputRef.current.value = "";
                    ListOfMessages.push(currentMessage)
                    const data = { currentMessage: currentMessage, id: id, sender: currentUser.username }
                    //scroll down to the last message
                    setTimeout(() => {
                        messagesEndRef.current.scrollTo({
                            top: messagesEndRef.current.scrollHeight,
                            behavior: 'smooth'
                        });
                    }, 10)
                    await sock.emit("sendMessage", data)
                    await addNotification(currentUser, data.id);
                    //update the order of the two list of the two contacts
                    await updateChats(currentUser, id);
                    await sock.emit("updateChats", id)
                    // alerting that we send message 
                    setAlertSendingMessage(true);
                }
            } catch (error) {
                // error
            }
        }
    }

    // useeffect to recive new messages in live
    useEffect(() => {
        const scrollDown = async (data) => {
            if (data.id === currentContactClicked) {
                setTimeout(() => {
                    messagesEndRef.current.scrollTo({
                        top: messagesEndRef.current.scrollHeight,
                        behavior: 'smooth'
                    });
                }, 10)
                const updatedList = [...ListOfMessages, data.currentMessage]; // Create a new array with the updated element
                setListOfMessages(updatedList); // Update the state with the new array
            }
        }

        sock.on("receive_message", scrollDown);

        return () => {
            sock.off("receive_message", scrollDown);
        };
        // eslint-disable-next-line
    }, [ListOfMessages, currentContactClicked])

    async function updateListOfMessages() {
        try {
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
            }
        } catch (error) {
            // error
        }
    }

    function generateTime(dateString) {
        const date = new Date(dateString);
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0'); // Add leading zero if minutes < 10
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
                <button id="sendMessageButton" type="button" className="h-100" onClick={sendMessage}>
                    <img src={send_Icon} alt=""></img>
                </button>
            </div>
        </>
    );
};

export default MessagesScreen;