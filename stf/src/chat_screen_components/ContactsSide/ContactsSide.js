import './ContactsSide.css'
import Contact from '../Contact/Contact';
import UserRow from '../UserRow/UserRow';
import React, { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../components/CurrentUser/CurrentUser';
import { registerUsers } from '../../components/RegisteredUsers/RegisteredUsers';
import SearchContact from '../SearchContact/SearchContact';
import MessagesScreen from '../MessagesScreen/MessagesScreen';
import getchats from '../../auth/GetChats';
import showMessages from '../../auth/ShowMessages';

function ContactsSide(props) {
    const { currentUser } = useContext(CurrentUserContext);
    //inisde of the list of contacts is all the contacts of the user.
    const [ListOfContacts,setListOfContacts] = useState([])

    async function getcontacts() {
        const l = await getchats(currentUser)
        setListOfContacts(l)
    }

    // in contact id i have the key of the chat
    const handleClickingOnContact = async  (contactId) => {
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
    useEffect(()=>{
        getcontacts()
    },[])

    
    function getLastTimeMessage(lastMessageTimeString) {
        const createdDate = new Date(lastMessageTimeString);
        const options = { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        const formattedDate = createdDate.toLocaleString('en-US', options);
        return formattedDate
    }


    // use it when i add new contact to render thr component.
    useEffect(()=>{
        if (props.addContact) {
            getcontacts() // to update to contacts in the list.
            props.setaddContact(false)
        }
    },[props.addContact])



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
                                lastMessageTime={contact.lastMessage && contact.lastMessage.content ? getLastTimeMessage(contact.lastMessage. created) : ""}
                                lastMessage={contact.lastMessage && contact.lastMessage.content ? contact.lastMessage.content : "no message"}
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