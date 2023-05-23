import './Message.css';
import './DateMessage.css';
import { useEffect, useState } from 'react';

const Message = ({ sender, content, time, date, currentUser, lastMessgeDate }) => {


    // useEffect(() => {
    //     console.log("use effect of message ")
    //     console.log("the time: ", date)
    //     console.log("the time of previous message: ", lastMessgeDate)
    // }, []);


    if (sender === currentUser) {
        if (lastMessgeDate < date || lastMessgeDate === "first message") {
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
        if (lastMessgeDate < date) {
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
    // if (true) {
    //     return (
    //         <li className="message">
    //             <div className="row justify-content-end">
    //                 <div className="col-auto d-flex justify-content-end replyBubbletHightCol">
    //                     <div className="my-msg">
    //                         <div className="row replyBubbleWidthRow">
    //                             <p className="text-msg">{content}</p>
    //                             <p className="time-msg">{time}</p>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </li>
    //     );
    // } else {
    //     return (
    //         <li className="message">
    //             <div className="row">
    //                 <div className="col-auto myBubbletHightCol">
    //                     <div className="reply-msg">
    //                         <div className="row replyBubbleWidthRow">
    //                             <p className="text-msg">{content}</p>
    //                             <p className="time-msg">{time}</p>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </li>
    //     );
    // }
};

export default Message;
