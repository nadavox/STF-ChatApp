import './InputDiv.css';
import { Popover } from 'bootstrap';
import { useState, useEffect } from 'react';
import showPasswordIcon from '../../icons/show_password_icon.png';
import hidePasswordIcon from "../../icons/hide_password_icon.png";

function InputDiv(props) {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // handle on change
  const handleAllInputChange = (e) => {
    props.setter(e.target.value);
    props.handler(e, props.forInvalid);
    setInputValue(e.target.value);
  };

  // update the visability of the password
  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // get the type of the text
  const inputType = props.inputType === 'password' && isPasswordVisible ? 'text' : props.inputType;

  useEffect(() => {
    // Initialize the popover
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = Array.from(popoverTriggerList).map(popoverTriggerEl => new Popover(popoverTriggerEl));

    // Cleanup function to destroy the popover
    return () => {
      popoverList.forEach(popover => {
        popover.dispose();
      });
    };
  }, [props.inputId, props.divclassName]);

  return (
    <div className={props.divclassName} id={props.divId}>
      <p className="inputTitle">{props.inputTitle}</p>
      <div className='input-container'>
        <input
          id={props.inputId}
          type={inputType}
          placeholder={props.inputPlaceholder}
          className={props.inputclass}
          tabIndex="0"
          role="button"
          data-bs-toggle="popover"
          data-bs-trigger="hover"
          data-bs-title={props.popoverTitle}
          data-bs-content={props.popoverContent}
          onChange={handleAllInputChange}
          value={inputValue}
        />
        {props.inputType === 'password' &&
          <span className="password-icon" onClick={handlePasswordVisibility}>
            {isPasswordVisible ? <img className="hideorShowPasswordIcon" src={hidePasswordIcon} alt="" /> : <img className="hideorShowPasswordIcon" src={showPasswordIcon} alt="" />}
          </span>
        }
      </div>
    </div>
  );
}

export default InputDiv;
