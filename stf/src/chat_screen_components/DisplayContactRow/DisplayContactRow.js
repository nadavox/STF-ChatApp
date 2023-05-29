import React from 'react';
import './DisplayContactRow.css';
import exitButton from "../../icons/exit_icon.png";
import deleteChatButton from "../../icons/delete_chat_icon.png";
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useContext } from 'react';
import { Tooltip } from 'bootstrap';
import deleteChat from '../../auth/DeleteChat';
import { CurrentUserContext } from '../../components/CurrentUser/CurrentUser';

const DisplayContactRow = ({ picture, name, chatId }) => {
  const navigate = useNavigate();
  let row;
  const buttonRef = useRef(null);
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    // Initialize tooltips
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach((tooltip) => {
      new Tooltip(tooltip);
    });

    const buttonElement = buttonRef.current;

    const hideTooltip = () => {
      const tooltip = Tooltip.getInstance(buttonElement);
      if (tooltip) {
        tooltip.hide();
      }
    };

    buttonElement.addEventListener('click', hideTooltip);

    return () => {
      buttonElement.removeEventListener('click', hideTooltip);
    };

  }, [name]);

  const handleExit = (e) => {
    // navigate to the login page
    navigate('/');
  };

  const handleDeleteChat = async (e) => {
    const date = await deleteChat(currentUser, chatId);
  };

  // now design the screen as you want.
  if (name === "") {
    //there is not a picture and name
    row = (
      <div id="firstrowRightSideScreen" className="row d-flex">
        <div id="colofrightside" className="col text-truncate align-items-center text-align: end ">
          <span className='appName'>Speak, Talk, Friends</span>
        </div>
        <div className="col-auto align-items-center exitButtonDiv">
          <button className="exitButton" type="button" onClick={handleExit} ref={buttonRef}
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            data-bs-custom-class="custom-tooltip"
            data-bs-title="logout"
            data-bs-html="true"
            data-bs-template='<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'>
            <img id="exitButtonImg" src={exitButton} alt=""></img>
          </button>
        </div>
      </div>
    )
  } else {
    //there is a picture and name
    row = (
      <div id="firstrowRightSideScreen" className="row align-items-center">
        <div className="col-auto px-0 align-items-center">
          <img id="currentContactImg" src={picture} alt=""></img>
        </div>
        <p id="currentContactName" className="col text-truncate contactNameP mb-0 align-items-center p-0">{name}</p>
        <div className="col-auto align-items-center deleteChatDiv">
          <button className="deleteChatButton" type="button" onClick={handleDeleteChat} ref={buttonRef}
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            data-bs-custom-class="custom-tooltip"
            data-bs-title="delete chat"
            data-bs-html="true"
            data-bs-template='<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'>
            <img id="deleteChatImg" src={deleteChatButton} alt=""></img>
          </button>
        </div>
        <div className="col-auto align-items-center exitButtonDiv">
          <button className="exitButton" type="button" onClick={handleExit} ref={buttonRef}
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            data-bs-custom-class="custom-tooltip"
            data-bs-title="logout"
            data-bs-html="true"
            data-bs-template='<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'>
            <img id="exitButtonImg" src={exitButton} alt=""></img>
          </button>
        </div>
      </div>
    )
  }

  return (
    row
  );
};

export default DisplayContactRow;
