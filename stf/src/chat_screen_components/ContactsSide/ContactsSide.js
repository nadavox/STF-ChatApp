import './ContactsSide.css'
import Contact from '../Contact/Contact';
import UserRow from '../UserRow/UserRow';
import React, { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../components/CurrentUser/CurrentUser';
import { registerUsers } from '../../components/RegisteredUsers/RegisteredUsers';
import SearchContact from '../SearchContact/SearchContact';
import MessagesScreen from '../MessagesScreen/MessagesScreen';

function ContactsSide(props) {
    const [currUserPicture, setCurrUserPicture] = useState(null);
    const [firstName, setFirstName] = useState("");
    const { currentUser } = useContext(CurrentUserContext);
    const existingContact = currentUser.contactsList.some(contact => contact.username === props.username);
    const [finalSearchValue, setFinalSearchValue] = useState("");
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [lastMessageTime, setLastMessageTime] = useState("");
    const [textInSearch, setTextInSearch] = useState(false);

    // add contact to the current user
    const addContact = (username, photoUrl, contactDispalyName, lastMessageTime, lastMessage, notification) => {
        // create the new contact we add to the curr contact
        const newContact = {
            username,
            contactDispalyName,
            photoUrl,
            lastMessageTime,
            lastMessage,
            notification,
            messagesScreen: <MessagesScreen username={username}
                             listofmessages={[]} selectedContact={props.currentContactClicked} setLastMessageTime={setLastMessageTime} />
        };
        // push the new contact to the cur user for his contacts.
        const targetUser = registerUsers.find((user) => user.username === currentUser.username);
        if (targetUser) {
            targetUser.contactsList.push(newContact);
            props.setCopyCurrUserContacts([...props.copyCurrUserContacts, newContact]);
        }
    };

    const handleClickingOnContact = (contactId) => {
        props.setCurrentContactClicked(contactId);
        const currSelectedContact = props.copyCurrUserContacts.find(contact => contact.username === contactId);
        props.setDisplayContactRow({
            picture: currSelectedContact.photoUrl,
            displayName: currSelectedContact.contactDispalyName,
            username: currSelectedContact.username
        });
        if(textInSearch) {
            setTextInSearch(false);
            setFinalSearchValue("");
        }
    };

    function handleKeyDown(event) {
        if (event.keyCode === 13) {
            // Call the function you want to execute on Enter key press
            const filtered = registerUsers.find((user) => user.username === currentUser.username).contactsList.filter(
                (contact) => { return contact.contactDispalyName.includes(finalSearchValue); });
            setFilteredContacts(filtered);
        }
    }

    function handleChange(event) {
        const filtered = registerUsers.find((user) => user.username === currentUser.username).contactsList.filter(
            (contact) => { return contact.contactDispalyName.includes(event); });
        setFilteredContacts(filtered);
        if (event !== "") {
            setTextInSearch(true);
        } else {
            setTextInSearch(false);
        }
    }

    useEffect(() => {
        if (currentUser) {
            setCurrUserPicture(currentUser.photoUrl);
            setFirstName(currentUser.displayName);
        }

        if (props.username !== '' && props.pressedOnAddContactValue) {
            props.pressedOnAddContact(false);
            if (!existingContact) {
                addContact(props.username, props.photoUrl, props.displayName, lastMessageTime, "", 0);
            }
            else {
                // the username already exist in contact list - go to his conversation
                handleClickingOnContact(props.username);
            }
        }
        //eslint-disable-next-line
    }, [currentUser, props.CurrentContactClicked, props.username, props.photoUrl, props.displayName, existingContact, finalSearchValue]);

    return (
        <>
            <div className="col-1 p-0 d-flex flex-column flex-grow-1 position-relative leftSide">
                <UserRow picture={currUserPicture} firstName={firstName} setPressed={props.pressedOnAddContact} />

                <SearchContact onKeyDown={handleKeyDown} onChangeInput={handleChange} setInputValue={setFinalSearchValue} value={finalSearchValue} />

                <ul id="contactsList">
                    {filteredContacts.length >= 0 && textInSearch ?
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
                        registerUsers.find((user) => user.username === currentUser.username).contactsList.map(contact => (
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
                        ))
                    }
                </ul>

            </div>
        </>
    );
}

export default ContactsSide;