import './ContactsSide.css'
import Contact from '../Contact/Contact';
import UserRow from '../UserRow/UserRow';
import React, { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../components/CurrentUser/CurrentUser';
import SearchContact from '../SearchContact/SearchContact';
import getchats from '../../auth/GetChats';
import getAllNotifications from '../../auth/GetNotifications';

const ContactsSide = (props) => {
    const { currentUser } = useContext(CurrentUserContext);
    const [listOfContacts, setListOfContacts] = useState([]); //inside of the list of contacts is all the contacts of the user.
    const [finalSearchValue, setFinalSearchValue] = useState("");
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [textInSearch, setTextInSearch] = useState(false);
    const [firstTimeGetContacts, setFirstTimeGetContacts] = useState(true)
    const [listOfNotifications, setListOfNotifications] = useState([]);

    async function getcontacts() {
        const l = await getchats(currentUser)
        if (firstTimeGetContacts) {
            for (let i = 0; i < l.length; i++) {
                await props.sock.emit("join_chat", l[i].id)
            }
            setFirstTimeGetContacts(false)
            const n = await getAllNotifications(currentUser);
            setListOfNotifications(n);
            console.log("list with notification: ", n)
        }
        setListOfContacts(l)
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

        const chatToUpdate = listOfNotifications.chats.find(chat => chat.id === contactId);
        if (chatToUpdate) {
            console.log(chatToUpdate.users[0].username)
            console.log(currSelectedContact.user.username)
            console.log(chatToUpdate.users[1].username)
            if (chatToUpdate.users[0].username === currSelectedContact.user.username) {
                chatToUpdate.users[0].notifications = 0;
            } else {
                chatToUpdate.users[1].notifications = 0;
            }
            console.log("after reset", listOfNotifications)
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

    // use it when i delete contact to render the component.
    useEffect(() => {
        if (props.deleteContact) {
            getcontacts() // to update to contacts in the list.
            props.setDeleteContact(false)
            props.setClickContact("")
            props.setDisplayContactRow({
                picture: "",
                displayName: "",
                username: ""
            });
        }

        const notifyDeleteHandler = async () => {
            getcontacts() // to update to contacts in the list.
            props.setDeleteContact(false)
            props.setClickContact("")
            props.setDisplayContactRow({
                picture: "",
                displayName: "",
                username: ""
            });
            const n = await getAllNotifications(currentUser);
            setListOfNotifications(n);
            console.log("after deleting contact: ", n)
        };
        props.sock.on("notifyDelete", notifyDeleteHandler);

        return () => {
            props.sock.off("notifyDelete", notifyDeleteHandler);
        };

        // eslint-disable-next-line
    }, [props.deleteContact])

    // use effect to create notifcation and update the last message.
    useEffect(() => {
        const receiveMessageHandler = async (data) => {
            console.log("in");
            console.log(listOfContacts);
            // get the chat that get the new message
            const chatindex = listOfContacts.findIndex((contact) => contact.id === data.id)

            if (chatindex !== -1) {
                // Create a new array with the updated element
                const updatedListOfContacts = [...listOfContacts];
                updatedListOfContacts[chatindex] = { ...updatedListOfContacts[chatindex], lastMessage: data.currentMessage };
                setListOfContacts(updatedListOfContacts)
                console.log(data.id)
                console.log(props.currentContactClicked)
                if (data.id !== props.currentContactClicked) {
                    console.log("in 1");
                    // notifications here
                    const chatToUpdate = listOfNotifications.chats.find(chat => chat.id === data.id);
                    if (chatToUpdate) {
                        console.log(chatToUpdate.users[0].username);
                        console.log(data.sender);
                        console.log(chatToUpdate.users[1].username);
                        if (chatToUpdate.users[0].username === data.sender) {
                            chatToUpdate.users[0].notifications += 1;
                        } else {
                            chatToUpdate.users[1].notifications += 1;
                        }
                    }

                    console.log("after update notification: ", listOfNotifications)
                }
            } else {
                await getcontacts();
            }
        }

        const receiveUpdateChatsHandler = async (data) => {
            await getcontacts();
        };

        props.sock.on("receive_message", receiveMessageHandler);
        props.sock.on("receiveUpdateChats", receiveUpdateChatsHandler);

        return () => {
            props.sock.off("receive_message", receiveMessageHandler);
            props.sock.off("receiveUpdateChats", receiveUpdateChatsHandler);
        };
        // eslint-disable-next-line
    }, [listOfContacts])

    useEffect(() => {
        const receiveNewContactHandler = async (data) => {
            // if it equale it is the guy.
            if (data.data.username === currentUser.username || data.sender === currentUser.username) {
                await props.sock.emit("join_chat", data.data.id)
                props.setaddContact(true);
            }
            const n = await getAllNotifications(currentUser);
            setListOfNotifications(n);
            console.log("after adding new contact: ", n)
        };
        props.sock.on("receive_newContact", receiveNewContactHandler);

        return () => {
            props.sock.off("receive_newContact", receiveNewContactHandler);
        };
    }, [props.sock])

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

    function getNotificationsOfChat(chatId, username) {
        if (listOfNotifications.chats.length !== 0) {
            const chat = listOfNotifications.chats.find(chat => chat.id === chatId);
            if (chat) {
                console.log(chat.users[0].username)
                console.log(username)
                console.log(chat.users[1].username)

                if (chat.users[0].username === username) {
                    return chat.users[0].notifications;
                } else {
                    return chat.users[1].notifications;
                }
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    }

    return (
        <>
            <div className="col-1 p-0 d-flex flex-column flex-grow-1 position-relative leftSide">
                <UserRow picture={currentUser.photoUrl} firstName={currentUser.displayName}
                    setPressed={props.setPressedOnAddContact} setaddContact={props.setaddContact} />

                <SearchContact onChangeInput={handleChange} setInputValue={setFinalSearchValue} value={finalSearchValue} />

                <ul id="contactsList">
                    {(filteredContacts && filteredContacts.length > 0 && textInSearch)
                        ? filteredContacts.map(contact => (
                            <Contact
                                key={contact.id}
                                photoUrl={contact.user.profilePic}
                                contactDispalyName={contact.user.displayName}
                                lastMessageTime={contact.lastMessage && contact.lastMessage.content ? generateTime(contact.lastMessage.created) : ""}
                                lastMessage={contact.lastMessage && contact.lastMessage.content ? contact.lastMessage.content : "no-message"}
                                lastMessageDivClassName={contact.lastMessage && contact.lastMessage.content ? 'lastMessage' : 'lastMessage noMessage'}
                                notification={getNotificationsOfChat(contact.id, contact.user.username)}
                                className={props.currentContactClicked === contact.id ? 'selected' : ''}
                                onClick={() => handleClickingOnContact(contact.id)}
                            />
                        ))
                        : (listOfContacts && listOfContacts.length > 0)
                            ? listOfContacts.map(contact => (
                                <Contact
                                    key={contact.id}
                                    photoUrl={contact.user.profilePic}
                                    contactDispalyName={contact.user.displayName}
                                    lastMessageTime={contact.lastMessage && contact.lastMessage.content ? generateTime(contact.lastMessage.created) : ""}
                                    lastMessage={contact.lastMessage && contact.lastMessage.content ? contact.lastMessage.content : "no-message"}
                                    lastMessageDivClassName={contact.lastMessage && contact.lastMessage.content ? 'lastMessage' : 'lastMessage noMessage'}
                                    notification={getNotificationsOfChat(contact.id, contact.user.username)}
                                    className={props.currentContactClicked === contact.id ? 'selected' : ''}
                                    onClick={() => handleClickingOnContact(contact.id)}
                                />
                            ))
                            : null
                    }
                </ul>
            </div>
        </>
    );
}

export default ContactsSide;