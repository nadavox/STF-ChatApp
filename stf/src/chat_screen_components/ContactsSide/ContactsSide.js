import './ContactsSide.css'
import Contact from '../Contact/Contact';
import UserRow from '../UserRow/UserRow';
import React, { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../components/CurrentUser/CurrentUser';
import { registerUsers } from '../../components/RegisteredUsers/RegisteredUsers';
import SearchContact from '../SearchContact/SearchContact';
import MessagesScreen from '../MessagesScreen/MessagesScreen';
import getchats from '../../auth/GetChats';

function ContactsSide(props) {
    const { currentUser } = useContext(CurrentUserContext);
    //inisde of the list of contacts is all the contacts of the user.
    const [ListOfContacts,setListOfContacts] = useState(null)

    async function getcontacts() {
        const l = await getchats(currentUser)
        setListOfContacts(l)
    }
    
    // init the contacts list
    useEffect(()=>{
        getcontacts()
        setListOfContacts(null)
    },[])

    
    // use it when i add new contact to render thr component.
    useEffect(()=>{
        if (props.addContact) {
            getcontacts() // to update to contacts in the list.
            props.setaddContact(false)
            console.log(ListOfContacts)
        }
    },[props.addContact])


    return (
        <>
            <div className="col-1 p-0 d-flex flex-column flex-grow-1 position-relative leftSide">
                {/* need to add onclick function to the userRow */}
                <UserRow picture={currentUser.photoUrl} firstName={currentUser.displayName}
                 setPressed={props.setPressedOnAddContact} setaddContact={props.setaddContact} />

                 {/* <SearchContact onKeyDown={handleKeyDown} onChangeInput={handleChange} setInputValue={setFinalSearchValue} value={finalSearchValue} />

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
                </ul> */}

            </div>
        </>
    );
}

export default ContactsSide;