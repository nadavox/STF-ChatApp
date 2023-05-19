import './SendMessageBox.css'
import paperClipIcon from '../../icons/paper-clip_icon.png';
import cameraIcon from '../../icons/camera_icon.png';
import microphoneIcon from '../../icons/microphone_icon.png';
import addDocumentIcon from '../../icons/add-documents.png';
import addImageIcon from '../../icons/add-image.png';
import addEmojiIcon from '../../icons/add-emoji.png';
import send_Icon from '../../icons/send_Icon.png';
import { useState, useEffect } from 'react';

// setLastMessage should be setter for the last message
const SendMessageBox = ({setLastMessage}) => {
    // init the input value to empty
    const [inputValue, setInputValue] = useState("");
    const [micORsend, setMicORsend] = useState(microphoneIcon);
    /**
    * A function that is called when the value of the input field changes.
    * It sets the state of inputValue to the value of the input field.
    * 
    * @param {Event} e The event object.
    */
    const onChange = (e) => {
        setInputValue(e.target.value)
    };
    /**
    * A useEffect hook that changes the icon of the recording button based on the value of inputValue.
    * If the inputValue is empty, the button displays a microphone icon, otherwise it displays a send icon.
    */
    useEffect(() => {
        if (inputValue === '') {
            // input is empty
            setMicORsend(microphoneIcon)
        } else {
            // input is not empty
            setMicORsend(send_Icon)
        }
    }, [inputValue]);



    function sendMessage() {
        if (inputValue === "") {
            console.log("empty message");
        } else {
            //set the message.
            //set the message.
            //get the time.
            //clean the input value.
            setInputValue("");
        }
    }
    return (
        <div id="sendMessageBox" className="mt-auto d-flex align-items-center">

            <div className="btn-group">
                <button id="paperClipButton" className="btn btn-secondary btn-sm dropdown-toggle" type="button"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={paperClipIcon} alt="Paper Clip"></img>
                </button>

                <ul id="allOptions" className="dropdown-menu">
                    <div className=" btn-group flex-column" role="group">
                        <li>
                            <button className="dropdown-item add-options btn btn-outline-primary" type="button">
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
                    onChange={onChange}></input>
            </div>
            <button id="recordMessageButton" type="button" className="h-100" onClick={sendMessage}>
                <img src={micORsend} alt=""></img>
            </button>
        </div>
    );
};

export default SendMessageBox;