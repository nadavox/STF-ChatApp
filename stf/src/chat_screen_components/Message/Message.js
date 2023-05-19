import './Message.css';

const Message = ({ fromWho, content, time }) => {

    if (fromWho === "reply-msg") {
        return (
            <li className="message">
                <div className="row justify-content-end">
                    <div className="col-auto d-flex justify-content-end replyBubbletHightCol">
                        <div className={fromWho}>
                            <div className="row replyBubbleWidthRow">
                                <p className="text-msg">{content}</p>
                                <p className="time-msg">{time}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        );
    } else {
        return (
            <li className="message">
                <div className="row">
                    <div className="col-auto myBubbletHightCol">
                        <div className={fromWho}>
                            <div className="row replyBubbleWidthRow">
                                <p className="text-msg">{content}</p>
                                <p className="time-msg">{time}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
};

export default Message;
