import './Buttons.css'
import { Link } from 'react-router-dom';

const Buttons = ({ divId, buttonId, buttonText, linkTo }) => {
    return (
        <div id={divId} className="col-lg-12">
            <Link to={linkTo}>
                <button id={buttonId} type="submit">{buttonText}</button>
            </Link>
        </div>
    );
}

export default Buttons;