import './LoginInputDiv.css';
import React, { useState, useEffect } from 'react';
import showPasswordIcon from '../../icons/show_password_icon.png';
import hidePasswordIcon from "../../icons/hide_password_icon.png";
import { Popover } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginInputDiv = React.forwardRef((props, ref) => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [inputValue, setInputValue] = useState("");

    // handle on change
    const handleAllInputChange = (e) => {
        props.setter(e.target.value);
        props.handler(e, props.inputTitle);
        setInputValue(e.target.value);
        if (props.isInvalid) {
            props.setIsInvalid(false);
        }
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

        if (popoverList !== 0) {
            return () => {
                popoverList.forEach(popover => {
                    popover.dispose();
                });
            };
        }
    }, [props.isInvalid]);

    return (
        <>
            {props.isInvalid ? (
                <div className={props.divclassName} id={props.divId}>
                    <p className="inputTitle">{props.inputTitle}</p>
                    <div className='input-container'>
                        <input
                            ref={ref}

                            id={props.inputId}
                            type={inputType}

                            className="btn inv"
                            role="button"
                            data-bs-toggle="popover"
                            data-bs-trigger="focus"
                            data-bs-title="not match"
                            data-bs-content={props.messagetopopover}
                            placeholder={props.inputPlaceholder}
                            onChange={handleAllInputChange}
                            defaultValue={inputValue} />
                        {props.inputType === 'password' &&
                            <span className="password-icon" onClick={handlePasswordVisibility}>
                                {isPasswordVisible ? <img className="hideorShowPasswordIcon" src={hidePasswordIcon} alt="" /> : <img className="hideorShowPasswordIcon" src={showPasswordIcon} alt="" />}
                            </span>
                        }
                    </div>
                </div>
            ) : (
                <div className={props.divclassName} id={props.divId}>
                    <p className="inputTitle">{props.inputTitle}</p>
                    <div className='input-container'>
                        <input
                            className='btn'
                            ref={ref}
                            id={props.inputId}
                            type={inputType}
                            placeholder={props.inputPlaceholder}
                            onChange={handleAllInputChange}
                            defaultValue={inputValue} />
                        {props.inputType === 'password' &&
                            <span className="password-icon" onClick={handlePasswordVisibility}>
                                {isPasswordVisible ? <img className="hideorShowPasswordIcon" src={hidePasswordIcon} alt="" /> : <img className="hideorShowPasswordIcon" src={showPasswordIcon} alt="" />}
                            </span>
                        }
                    </div>
                </div>
            )}
        </>
    );
});

export default LoginInputDiv;