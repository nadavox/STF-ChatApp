import './ContactsSide.css'
import Contact from '../Contact/Contact';
import UserRow from '../UserRow/UserRow';
import React, { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../components/CurrentUser/CurrentUser';
import SearchContact from '../SearchContact/SearchContact';
import MessagesScreen from '../MessagesScreen/MessagesScreen';
import getchats from '../../auth/GetChats';


const ContactsSide = (props) => {
    const { currentUser } = useContext(CurrentUserContext);
    //inisde of the list of contacts is all the contacts of the user.
    const [ListOfContacts, setListOfContacts] = useState([])

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
        const currSelectedContact = ListOfContacts.find((contact) => contact.id === contactId);
        props.setDisplayContactRow({
            picture: currSelectedContact.user.profilePic,
            displayName: currSelectedContact.user.displayName,
            username: currSelectedContact.user.username
        });
        // update the current contact that we click
        props.setClickContact(contactId)
        
        // if(textInSearch) {
        //     setTextInSearch(false);
        //     setFinalSearchValue("");
        // }
    };

    // init the contacts list
    useEffect(() => {
        getcontacts()
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

        if(isCurrentDate) {
            const hours = date.getHours();
            const minutes = date.getMinutes();
            return `${hours}:${minutes}`;
        }
        else {
            const day = date.getDate();
            const month = date.getMonth() + 1; // Add 1 because getMonth() returns zero-based month
            const year = date.getFullYear();
            
            return `${day}.${month}.${year}`;
        }
    }

    // use it when i add new contact to render thr component.
    useEffect(() => {
        if (props.addContact) {
            getcontacts() // to update to contacts in the list.
            props.setaddContact(false)
        }
    }, [props.addContact])

    useEffect(() => {
        if (props.testCounterOfMessages) {
            getcontacts()
            props.setTestCounterOfMessages(false)
        }
    }, [props.testCounterOfMessages])

    return (
        <>
            <div className="col-1 p-0 d-flex flex-column flex-grow-1 position-relative leftSide">
                {/* need to add onclick function to the userRow */}
                <UserRow picture={currentUser.photoUrl} firstName={currentUser.displayName}
                    setPressed={props.setPressedOnAddContact} setaddContact={props.setaddContact} />

                {/* <SearchContact onKeyDown={handleKeyDown} onChangeInput={handleChange} setInputValue={setFinalSearchValue} value={finalSearchValue} /> */}

                <ul id="contactsList">
                    {ListOfContacts.map((contact) => (
                        <Contact
                            key={contact.id}
                            photoUrl={contact.user.profilePic}
                            contactDispalyName={contact.user.displayName}
                            lastMessageTime={contact.lastMessage && contact.lastMessage.content ? generateTime(contact.lastMessage.created) : ""}
                            lastMessage={contact.lastMessage && contact.lastMessage.content ? contact.lastMessage.content : "no-meesage"}
                            notification=""
                            className={props.currentContactClicked === contact.id ? 'selected' : ''}
                            onClick={() => handleClickingOnContact(contact.id)}
                        />
                    ))}

                    {/* {filteredContacts.length >= 0 && textInSearch ?
                        filteredContacts.map(contact => (
                            <Contact
                                key={contact.username}
                                photoUrl={contact.photoUrl}
                                contactDispalyName={contact.contactDispalyName}
                                lastMessageTime={contact.lastMessageTime}
                                lastMessage={contact.lastMessage}
                                notification={contact.notification}
                                className={props.currentContactClicked === contact.username ? 'selected' : ''}
                                onClick={() => handleClickingOnContact(contact.username)}
                            />
                        )) :
                        ListOfContacts.map(contact => (
                            <Contact
                                key={contact.user.username}
                                photoUrl={contact.user.profilePic}
                                contactDispalyName={contact.user.displayName}
                                lastMessageTime={contact.lastMessageTime}
                                lastMessage={contact.lastMessage}
                                notification={contact.notification}
                                className={props.currentContactClicked === contact.username ? 'selected' : ''}
                                onClick={() => handleClickingOnContact(contact.username)}
                            />
                        ))
                    } */}
                </ul>

            </div>
        </>
    );
}

export default ContactsSide;