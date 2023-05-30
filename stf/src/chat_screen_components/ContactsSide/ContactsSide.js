import './ContactsSide.css'
import Contact from '../Contact/Contact';
import UserRow from '../UserRow/UserRow';
import React, { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../components/CurrentUser/CurrentUser';
import SearchContact from '../SearchContact/SearchContact';
import getchats from '../../auth/GetChats';
import updateChats from '../../auth/UpdateContactsList';


const ContactsSide = (props) => {
    const { currentUser } = useContext(CurrentUserContext);
    //inisde of the list of contacts is all the contacts of the user.
    const [listOfContacts, setListOfContacts] = useState([]);
    const [finalSearchValue, setFinalSearchValue] = useState("");
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [textInSearch, setTextInSearch] = useState(false);

    const [firstTimeGetContacts, setFirstTimeGetContacts] = useState(true)

    async function getcontacts() {
        const l = await getchats(currentUser)
        if (firstTimeGetContacts) {
            for (let i = 0; i < l.length; i++) {
                await props.sock.emit("join_chat", l[i].id)
            }
            setFirstTimeGetContacts(false)
        }
        const updatedListOfContacts = [...l]; // Create a copy of the array
        setListOfContacts(updatedListOfContacts)
    }

    // in contact id i have the key of the chat
    const handleClickingOnContact = async (contactId) => {
        const currSelectedContact = listOfContacts.find((contact) => contact.id === contactId);
        props.setDisplayContactRow({
            picture: currSelectedContact.user.profilePic,
            displayName: currSelectedContact.user.displayName,
            username: currSelectedContact.user.username
        });
        // update the current contact that we click
        props.setClickContact(contactId)
        if (textInSearch) {
            setTextInSearch(false);
            setFinalSearchValue("");
        }
    };

    // init the contacts list
    useEffect(() => {
        getcontacts()
        // eslint-disable-next-line
    }, [])

    function generateTime(dateString) {
        const date = new Date(dateString);
        const currentDate = new Date();

        // Compare year, month, and day of the dates
        const isCurrentDate = (
            date.getFullYear() === currentDate.getFullYear() &&
            date.getMonth() === currentDate.getMonth() &&
            date.getDate() === currentDate.getDate()
        );

        if (isCurrentDate) {
            const hours = date.getHours();
            const minutes = date.getMinutes().toString().padStart(2, '0'); // Add leading zero if minutes < 10
            return `${hours}:${minutes}`;
        }
        else {
            const day = date.getDate();
            const month = date.getMonth() + 1; // Add 1 because getMonth() returns zero-based month
            const year = date.getFullYear();

            return `${day}.${month}.${year}`;
        }
    }

    // use it when i add new contact to render the component.
    useEffect(() => {
        if (props.addContact) {
            getcontacts() // to update to contacts in the list.
            props.setaddContact(false)
        }
        // eslint-disable-next-line
    }, [props.addContact])

    useEffect(() => {
        const fetchUserData = async () => {
            if (props.currentChatThatGotMessage !== 0) {
                const l = await updateChats(currentUser, props.currentChatThatGotMessage);
                setListOfContacts(l);
                props.setCurrentChatThatGotMessage(0);
            }
        };

        fetchUserData(); // Immediately invoke the async function

        // eslint-disable-next-line
    }, [props.currentChatThatGotMessage]);

    // use effect to create notifcation and update the last message.
    useEffect(() => {
        props.sock.on("receive_message", (data) => {
            console.log("i am the client. the chat id that get  new message is", data.id, "and the last message is: ", data.currentMessage)
            // get the chat that get the new message
            const chatindex = listOfContacts.findIndex((contact) => contact.id === data.id)

            if (chatindex !== -1) {
                // Create a new array with the updated element
                console.log("the chat: ", listOfContacts[chatindex])
                const updatedListOfContacts = [...listOfContacts];
                updatedListOfContacts[chatindex] = { ...updatedListOfContacts[chatindex], lastMessage: data.currentMessage };
                console.log("updaete: ", updatedListOfContacts)
                setListOfContacts(updatedListOfContacts)
                if (data.id !== props.currentContactClicked) {
                    // here to add notifcation to the clients.
                }
            } else {
                console.log("No chat found");
                getcontacts()

            }
        })

        props.sock.on("receive_newConatct", async (data) => {
            console.log("someone new send messgae to ", data.username)
            // if it equale it is the guy.
            if (data.username === currentUser.username) {
                console.log("that me")
                await props.sock.emit("join_chat", data.id)
            }
        })

        props.sock.on("receiveUpdateChats", async (data) => {
            const l = await updateChats(currentUser, data);
            setListOfContacts(l);
        });

        // eslint-disable-next-line
    }, [listOfContacts])

    function handleChange(event) {
        const filtered = listOfContacts.filter(
            (contact) => { return contact.user.displayName.includes(event); });
        setFilteredContacts(filtered);
        if (event !== "") {
            setTextInSearch(true);
        } else {
            setTextInSearch(false);
        }
    }

    return (
        <>
            <div className="col-1 p-0 d-flex flex-column flex-grow-1 position-relative leftSide">
                <UserRow picture={currentUser.photoUrl} firstName={currentUser.displayName}
                    setPressed={props.setPressedOnAddContact} setaddContact={props.setaddContact} />

                <SearchContact onChangeInput={handleChange} setInputValue={setFinalSearchValue} value={finalSearchValue} />

                <ul id="contactsList">
                    {filteredContacts.length >= 0 && textInSearch ?
                        filteredContacts.map(contact => (
                            <Contact
                                key={contact.id}
                                photoUrl={contact.user.profilePic}
                                contactDispalyName={contact.user.displayName}
                                lastMessageTime={contact.lastMessage && contact.lastMessage.content ? generateTime(contact.lastMessage.created) : ""}
                                lastMessage={contact.lastMessage && contact.lastMessage.content ? contact.lastMessage.content : "no-message"}
                                lastMessageDivClassName={contact.lastMessage && contact.lastMessage.content ? 'lastMessage' : 'lastMessage noMessage'}
                                notification=""
                                className={props.currentContactClicked === contact.id ? 'selected' : ''}
                                onClick={() => handleClickingOnContact(contact.id)}
                            />
                        )) :
                        listOfContacts.map(contact => (
                            <Contact
                                key={contact.id}
                                photoUrl={contact.user.profilePic}
                                contactDispalyName={contact.user.displayName}
                                lastMessageTime={contact.lastMessage && contact.lastMessage.content ? generateTime(contact.lastMessage.created) : ""}
                                lastMessage={contact.lastMessage && contact.lastMessage.content ? contact.lastMessage.content : "no-message"}
                                lastMessageDivClassName={contact.lastMessage && contact.lastMessage.content ? 'lastMessage' : 'lastMessage noMessage'}
                                notification=""
                                className={props.currentContactClicked === contact.id ? 'selected' : ''}
                                onClick={() => handleClickingOnContact(contact.id)}
                            />
                        ))
                    }
                </ul>

            </div>
        </>
    );
}

export default ContactsSide;