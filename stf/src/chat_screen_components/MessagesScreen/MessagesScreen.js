import Message from '../Message/Message';
import DateMessage from '../Message/DateMessage';
import './MessagesScreen.css';
import { useState, useEffect, useRef, useContext } from 'react';
import '../SendMessageBox/SendMessageBox.css'
import paperClipIcon from '../../icons/paper-clip_icon.png';
import cameraIcon from '../../icons/camera_icon.png';
import addDocumentIcon from '../../icons/add-documents.png';
import addImageIcon from '../../icons/add-image.png';
import addEmojiIcon from '../../icons/add-emoji.png';
import send_Icon from '../../icons/send_Icon.png';
import { CurrentUserContext } from '../../components/CurrentUser/CurrentUser';
import showMessages from '../../auth/ShowMessages';


// This component takes in the current user's username and a list of messages to display.
const MessagesScreen = ({ id, currentContactClicked }) => {
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
    const [ListOfMessages,setListOfMessages] = useState([])
    const [lastMessageTime, setLastMessageTime] = useState({lastMessae: "", newMessage: ""});

    async function getmessages() {
        if (currentContactClicked !== '') {
            const messages = await showMessages(currentUser, currentContactClicked)
            setListOfMessages(messages.messages)
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
        getmessages()
        if (inputRef && inputRef.current) {
            //clean the input value.
            setInputValue("");
            // clear the input field.
            inputRef.current.value = "";
        }
    }, [currentContactClicked]);



    // useEffect(() => {
    //     console.log("the list of messages: ", ListOfMessages)
    //     if (ListOfMessages.length > 1) {
    //         const dateNewMessage = new Date(ListOfMessages[ListOfMessages.length - 1].created);
    //         console.log("the date 1: ",dateNewMessage)
    //         const dateLastMessage = new Date(ListOfMessages[ListOfMessages.length - 2].created);
    //         console.log("the date 2: ",dateLastMessage)
    //         dateNewMessage.setHours(0,0,0,0);
    //         dateLastMessage.setHours(0,0,0,0);
    //     }
    // }, [ListOfMessages]);

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
                    console.log("the current message: ", currentMessage)
                    setLastMessageTime({lastMessae: lastMessageTime.newMessage, newMessage: currentMessage.created})
                    // need to update the list of message.
                    //clean the input value.
                    setInputValue("");
                    // clear the input field.
                    inputRef.current.value = "";
                    updateListOfMessages()
                } else {
                    console.log('error with the server from sending message');
                }
            } catch (error) {
                console.log(error)
                console.log('error from try and cacth');
            }
        }
    }

    async function updateListOfMessages() {
        try {
            console.log("id :",id)
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
                console.log("the details list of messages: ",list)
                setListOfMessages(list)
            } else {
                console.log('error with the server from sending message');
            }
        } catch (error) {
            console.log(error)
            console.log('error from try and cacth');
        }
    }

    function generateTime(fulldate) {
        const date = new Date(fulldate);
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');
        const timeString = hour + ":" + minute;
        return timeString
    } 

    function getDateFromMessage(dateString) {
        const dateNewMessage = new Date(dateString);
        dateNewMessage.setHours(0,0,0,0);
        const formattedDate = dateNewMessage.toLocaleDateString(); // Format the date as desired
        return formattedDate
    }

    if (typeof ListOfMessages === 'undefined' || ListOfMessages.length === 0) {
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
                    lastMessgeDate = {index > 0 ? getDateFromMessage(ListOfMessages[index - 1].created) : "first message"}
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
