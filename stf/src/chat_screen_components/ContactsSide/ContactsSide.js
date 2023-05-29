import './ContactsSide.css'
import Contact from '../Contact/Contact';
import UserRow from '../UserRow/UserRow';
import React, { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../components/CurrentUser/CurrentUser';
import SearchContact from '../SearchContact/SearchContact';
import getchats from '../../auth/GetChats';

function ContactsSide(props) {

    const { currentUser } = useContext(CurrentUserContext);
    //inisde of the list of contacts is all the contacts of the user.
    const [listOfContacts, setListOfContacts] = useState([]);
    const [finalSearchValue, setFinalSearchValue] = useState("");
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [textInSearch, setTextInSearch] = useState(false);

    async function getcontacts() {
        const l = await getchats(currentUser)
        setListOfContacts(l)
        console.log("list of contacts: ", l)
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
        if(textInSearch) {
            setTextInSearch(false);
            setFinalSearchValue("");
        }
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

        if (isCurrentDate) {
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
                                lastMessage={contact.lastMessage && contact.lastMessage.content ? contact.lastMessage.content : "no-meesage"}
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
                                lastMessage={contact.lastMessage && contact.lastMessage.content ? contact.lastMessage.content : "no-meesage"}
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