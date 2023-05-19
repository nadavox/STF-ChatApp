import Message from '../Message/Message';
import DateMessage from '../Message/DateMessage';
import './MessagesScreen.css';
import { useState, useEffect, useRef } from 'react';
import '../SendMessageBox/SendMessageBox.css'
import paperClipIcon from '../../icons/paper-clip_icon.png';
import cameraIcon from '../../icons/camera_icon.png';
import addDocumentIcon from '../../icons/add-documents.png';
import addImageIcon from '../../icons/add-image.png';
import addEmojiIcon from '../../icons/add-emoji.png';
import send_Icon from '../../icons/send_Icon.png';


// This component takes in the current user's username and a list of messages to display.
const MessagesScreen = ({ username, listofmessages, currentContactClicked, setLastMessageTime }) => {
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

    /**
    * A function that is called when the value of the input field changes.
    * It sets the state of inputValue to the value of the input field.
    * 
    * @param {Event} e The event object.
    */
    const onChange = (e) => {
        setInputValue(e.target.value)
    };

    // Get the current time and set the year, month, day, and hour/minute state variables accordingly
    function getCurrentTime() {
        const now = new Date();
        const currentmonth = (now.getMonth() + 1).toString().padStart(2, '0');
        const currentday = now.getDate().toString().padStart(2, '0');
        const currentyear = now.getFullYear();
        if (currentyear !== year.year) {
            // need to update the year
            setYear({ prevYear: year.year, year: currentyear })
        }
        if (currentmonth !== month.month) {
            // updating the month
            setMonth({ prevMonth: month.month, month: currentmonth })
        }
        if (currentday !== day.day) {
            // need to update the day
            setDay({ prevDay: day.day, day: currentday })
        }
    }

    // get the current hour and min
    function getHourMinTime() {
        const now = new Date();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        setHourANDmin({ hour: hours, min: minutes });
    }

    // run only one, init the date
    useEffect(() => {
        // Initialization code comes here
        const now = new Date();
        const currentmonth = (now.getMonth() + 1).toString().padStart(2, '0');
        const currentday = now.getDate().toString().padStart(2, '0');
        const currentyear = now.getFullYear();
        setYear({ prevYear: year.year, year: currentyear })
        setMonth({ prevMonth: month.month, month: currentmonth })
        setDay({ prevDay: day.day, day: currentday })
        // eslint-disable-next-line
    }, []);


    // useeffect for clean the input when changing the contact
    useEffect(() => {
        if (inputRef && inputRef.current){
            //clean the input value.
            setInputValue("");
            // clear the input field.
            inputRef.current.value = "";
        }
    }, [currentContactClicked]);

    //use effect for send messgae
    useEffect(() => {
        // check if the sendMessageFlag is true.
        if (sendMessageFlag) {
            // check if the date has changed.
            if (year.prevYear !== year.year || month.prevMonth !== month.month || day.prevDay !== day.day) {
                // creating date:
                const dateTimeString = `${year.year}/${month.month}/${day.day}`;
                const messageDate = { fromWho: "DateMessage", time: dateTimeString };
                // add the message to the list.
                listofmessages.push(messageDate);
                //update the prevvalue to be the new value.
                setYear({ prevYear: year.year, year: year.year });
                setMonth({ prevMonth: month.month, month: month.month });
                setDay({ prevDay: day.day, day: day.day });
            }
            // create message object.
            const hourAndMinute = `${hourANDmin.hour}:${hourANDmin.min}`;
            const newMessage = { fromWho: "my-msg", content: inputValue, time: hourAndMinute };
            // add the message to the list.
            listofmessages.push(newMessage);
            //clean the input value.
            setInputValue("");
            inputRef.current.value = "";
            // set the sendMessageFlag to false.
            setSendMessageFlag(false);
            //scroll down to the last message
            setTimeout(() => {
                messagesEndRef.current.scrollTo({
                    top: messagesEndRef.current.scrollHeight,
                    behavior: 'smooth'
                });
            }, 10)
        }
        // eslint-disable-next-line
    },[sendMessageFlag])
    

    function sendMessage(e) {
        if ((inputValue !== "" && e.key === "Enter") || (e.type === "click" && inputValue !== "")) {
            //check if i have a date message in the list
            if (listofmessages) {
                const hasDateMessage = listofmessages.some(message => message.fromWho === 'DateMessage');
                if (hasDateMessage) {
                    //get the time
                    getCurrentTime();
                    //it is update the prev year to be the curr year if there is new year
                    //it is update the prev month to be the curr month if there is new year
                    //it is update the prev day to be the curr day if there is new year

                } else {
                    setYear({ prevYear: "random", year: year.year })
                    setMonth({ prevMonth: "random", month: month.month })
                    setDay({ prevDay: "random", day: day.day })
                }
            }
            //set the hour and min
            getHourMinTime();
            //set the flag of the send message to true
            setSendMessageFlag(true);
        }
    }

    if (!Array.isArray(listofmessages)) {
        // not a list. desgin.
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
                {listofmessages.map((message, index) => (
                    message.fromWho === 'DateMessage' ? (
                        <DateMessage key={index} fromWho={message.fromWho} time={message.time} />
                    ) : (
                        <Message key={index} fromWho={message.fromWho} content={message.content} time={message.time} />
                    )
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
