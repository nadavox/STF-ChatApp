import './Contact.css';

function Contact(props) {
    return (
        <li className="contact">
            <div className="row contactRow">
                <div className={`contactButton ${props.className}`} type="button" onClick={props.onClick}>
                    <div className="row contactRow">
                        <div className="col-auto contactIconcol">
                            <img className="contactIcon" src={props.photoUrl} alt=''></img>
                        </div>
                        <div className="col text-truncate displayName">
                            <span className="contactName">{props.contactDispalyName}</span>
                        </div>
                        <div className="col-auto">
                            <span className="messageTime">{props.lastMessageTime}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-truncate lastMessageDiv">
                            <span className={props.lastMessageDivClassName}>{props.lastMessage}</span>
                        </div>
                        <div>
                        {props.notification > 0 && <div className="notification">{props.notification}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default Contact;