import './Contact.css';

// need to create here usestate of last message and each time to update it with the list of the messages
// sme about notfication

function Contact(props) {
    return (
        <li className="contact">
            <div className="row contactRow">
                <div className={`contactButton ${props.className}`} type="button" onClick={props.onClick}>
                    {/* cotact row is for only the height of the row. we need to remove it when we have last message and notfication */}
                    <div className="row contactRow">
                        <div className="col-auto contactIconcol">
                            <img className="contactIcon" src={props.photoUrl} alt=''></img>
                        </div>
                        <div className="col text-truncate displayName">
                            <span className="contactName">{props.contactDispalyName}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <span className="lastMessage">{props.lastMessage}</span>
                            {props.notification > 0 && <div className="notification">{props.notification}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default Contact;

