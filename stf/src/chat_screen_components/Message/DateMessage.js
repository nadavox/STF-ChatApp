import './DateMessage.css';

const DateMessage = ({ fromWho, time }) => {
    return (
        <li className="message">
            <div className={`row d-flex justify-content-center ${fromWho}`}>
                <p className="date-headline">{time}</p>
            </div>
        </li>
    );
}

export default DateMessage;
