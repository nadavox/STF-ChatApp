import './UserRow.css';
import addContactButtonImg from '../../icons/add_contact_icon.png';

function UserRow(props) {
    const handleClick = () => {
        props.setPressed(true);
    }

    return (
        <div className="row nameTitle align-items-center">
            <div className="col-auto align-items-center imgDiv">
                <img id="currUserImg" className="nameIconUser" src={props.picture} alt=''></img>
            </div>
            <div className="col d-inline-block text-truncate userNameRow" >
                <span id="firstName" className="nameP">{props.firstName}</span>
            </div>
            <div className="col-auto addContactButtonDiv">
                <button className="addContactButton" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleClick}>
                    <img id="addContactButtonImg" src={addContactButtonImg} alt=''></img>
                </button>
            </div>
        </div>
    );
}

export default UserRow;