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
    // Define flag when I send message
    const [sendMessageFlag, setSendMessageFlag] = useState(false);
    // If it is new user without any contacts or they haven't clicked on any contact, we can present whatever we want
    const inputRef = useRef();
    // Store the current year, month, day, and hour/minute in state
    const [year, setYear] = useState({ prevYear: '', year: '1' });
    const [month, setMonth] = useState({ prevMonth: '', month: '1' });
    const [day, setDay] = useState({ prevDay: '', day: '1' });
    const [hourANDmin, setHourANDmin] = useState({ hour: '', min: '' });
    // Init the input value to empty
    const [inputValue, setInputValue] = useState("");
    const [ListOfMessages,setListOfMessages] = useState([])
    const [lastMessageTime, setLastMessageTime] = useState("");

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



    useEffect(() => {
        console.log(ListOfMessages)
    }, [ListOfMessages]);


    async function sendMessage(e) {
        if ((inputValue !== "" && e.key === "Enter") || (e.type === "click" && inputValue !== "")) {
            // //check if i have a date message in the list
            // if (listofmessages) {
            //     const hasDateMessage = listofmessages.some(message => message.fromWho === 'DateMessage');
            //     if (hasDateMessage) {
            //         //get the time
            //         getCurrentTime();
            //         //it is update the prev year to be the curr year if there is new year
            //         //it is update the prev month to be the curr month if there is new year
            //         //it is update the prev day to be the curr day if there is new year

            //     } else {
            //         setYear({ prevYear: "random", year: year.year })
            //         setMonth({ prevMonth: "random", month: month.month })
            //         setDay({ prevDay: "random", day: day.day })
            //     }
            // }
            // //set the hour and min
            // getHourMinTime();


            // //send message to the servre
            // // create message object.
            // const hourAndMinute = `${hourANDmin.hour}:${hourANDmin.min}`;
            // const newMessage = { fromWho: "my-msg", content: inputValue, time: hourAndMinute };
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
                    console.log(currentMessage)
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
                console.log(list)
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

    if (typeof ListOfMessages === 'undefined') {
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
                    <Message key={index} sender={message.sender.username} content={message.content} time={generateTime(message.created)} />
                ))}
            </ul>

            <div id="sendMessageBox" className="mt-auto d-flex align-items-center">

                <div className="btn-group">
                    <button id="paperClipButton" className="btn btn-secondary btn-sm dropdown-toggle" type="button"
                        data-bs-toggle="dropdown" aria-expanded="false" data-bs-placement="top" >
                        <img src={paperClipIcon} alt="Paper Clip"></img>
                    </button>

                    <ul id="allOptions" className="dropdown-menu" data-bs-placement="top">
                        <div className=" btn-group flex-column" role="group">
                            <li>
                                <button className="dropdown-item add-options btn btn-outline-primary test" type="button">
                                    <img className="addToChatImg" src={addDocumentIcon} alt="1"></img>
                                </button>
                            </li>
                            <li>
                                <button className="dropdown-item add-options btn btn-outline-primary" type="button">
                                    <img className="addToChatImg" src={addImageIcon} alt="3"></img>
                                </button>
                            </li>
                            <li>
                                <button className="dropdown-item add-options btn btn-outline-primary" type="button">
                                    <img className="addToChatImg" src={addEmojiIcon} alt="2"></img>
                                </button>
                            </li>
                        </div>
                    </ul>
                </div>
                <button id="takePhotoButton" type="button" className="h-100">
                    <img src={cameraIcon} alt=""></img>
                </button>
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
