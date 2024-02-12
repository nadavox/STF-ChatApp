import './Message.css';
import './DateMessage.css';

const Message = ({ sender, content, time, date, currentUser, lastMessgeDate }) => {
    function getDateFromMessage(dateString) {
        const [day, month, year] = dateString.split('.').map(Number);
        const date = new Date(year, month - 1, day);
    
        return date;
    }
    
    if (sender === currentUser) {
        if (lastMessgeDate === "first message" || getDateFromMessage(lastMessgeDate) < getDateFromMessage(date) ) {
            return (
                <>
                    <li className="message">
                        <div className={`row d-flex justify-content-center`}>
                            <p className="date-headline">{date}</p>
                        </div>
                    </li>

                    <li className="message">
                        <div className="row justify-content-end">
                            <div className="col-auto d-flex justify-content-end replyBubbletHightCol">
                                <div className="my-msg">
                                    <div className="row replyBubbleWidthRow">
                                        <p className="text-msg">{content}</p>
                                        <p className="time-msg">{time}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </>
            );
        } else {
            return (
                <li className="message">
                    <div className="row justify-content-end">
                        <div className="col-auto d-flex justify-content-end replyBubbletHightCol">
                            <div className="my-msg">
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
    } else {
        if (lastMessgeDate === "first message" || getDateFromMessage(lastMessgeDate) < getDateFromMessage(date) ) {
            return (
                <>
                    <li className="message">
                        <div className={`row d-flex justify-content-center`}>
                            <p className="date-headline">{date}</p>
                        </div>
                    </li>

                    <li className="message">
                        <div className="row">
                            <div className="col-auto myBubbletHightCol">
                                <div className="reply-msg">
                                    <div className="row replyBubbleWidthRow">
                                        <p className="text-msg">{content}</p>
                                        <p className="time-msg">{time}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </>
            );
        } else {
            return (
                <li className="message">
                    <div className="row">
                        <div className="col-auto myBubbletHightCol">
                            <div className="reply-msg">
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
    }
};

export default Message;