import './Modal.css';
import { CurrentUserContext } from '../../components/CurrentUser/CurrentUser';
import { useState, useContext, useRef, useEffect } from 'react';
import addContact from '../../auth/AddContact';

function Modal(props) {
    const [inputValue, setInputValue] = useState("");
    const { currentUser } = useContext(CurrentUserContext);
    const [invalidFields, setInvalidFields] = useState(['addContactInput']);
    const addBtnRef = useRef(null);

    const handleInputChange = (e) => {
        const inputValue = e.target.value; // Get the updated input value
        setInputValue(inputValue);
        setInvalidFields(invalidFields.filter(name => name !== "addContactInput"));

        const addContactInput = document.querySelector('.addContactInput');
        if (addContactInput && invalidFields.includes('addContactInput')) {
            addContactInput.classList.add('invalid');
        } else {
            addContactInput.classList.remove('invalid');
        }
    };

    const handleAddContact = async (e) => {
        if (inputValue !== currentUser.username) {
            const data = {data: await addContact(currentUser, inputValue), sender: currentUser.username};
            if (data !== false) {
                props.setaddContact(true);
                console.log("the new chat is: ", data)
                await props.sock.emit("add_contact", data)
                exitBtnRef.current.click();
            } else {
                // no user
                invalidFields.push('addContactInput');
                setInvalidFields(invalidFields);
            }
        } else {
            invalidFields.push('addContactInput');
            setInvalidFields(invalidFields);
        }

        const addContactInput = document.querySelector('.addContactInput');
        if (addContactInput && invalidFields.includes('addContactInput')) {
            addContactInput.classList.add('invalid');
        } else {
            addContactInput.classList.remove('invalid');
        }
    };

    const handleAddContactByEnter = (event) => {
        if (event.keyCode === 13) {
            addBtnRef.current.click();
        }
    };

    const handleExitModal = () => {
        setInputValue('');
        const addContactInput = document.querySelector('.addContactInput');
        addContactInput.classList.remove('invalid');
        props.pressedOnAddContact(false);
    };

    const modalRef = useRef(null);
    const inputRef = useRef(null);
    const exitBtnRef = useRef(null);

    useEffect(() => {
        const modalElement = modalRef.current;

        const handleModalShown = () => {
            inputRef.current.focus();
        };

        // Attach the event listener when the component mounts
        modalElement.addEventListener('shown.bs.modal', handleModalShown);

        // Clean up the event listener when the component unmounts
        return () => {
            modalElement.removeEventListener('shown.bs.modal', handleModalShown);
        };
    }, []);

    return (
        <div ref={modalRef} className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop='static'>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Add new contact</h1>
                        <button ref={exitBtnRef} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleExitModal}></button>
                    </div>
                    <div className="modal-body">
                        <input
                            ref={inputRef}
                            className={"addContactInput"}
                            type="text"
                            placeholder="Add contact's username"
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={handleAddContactByEnter}
                            autoFocus />
                    </div>
                    <div className="modal-footer">
                        <button ref={addBtnRef} type="button" className="btn btn-primary" id="addNewContactButton" onClick={handleAddContact} disabled={!inputValue}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;