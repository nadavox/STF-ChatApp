import React from 'react';
import './DisplayContactRow.css';
import exitButton from "../../icons/exit_icon_3.png";
import { useNavigate } from 'react-router-dom';


const DisplayContactRow = ({ picture, name }) => {
  const navigate = useNavigate();
  let row;


  const handleExit = (e) => {
    // navigate to the login page
    navigate('/');
  };

  // now design the screen as you want.
  if (name === "") {
    //there is a picture and name
    row = (
      <div id="firstrowRightSideScreen" className="row d-flex">
        <div id="colofrightside" className="col text-truncate align-items-center text-align: end ">
          <span className='appName'>Speak, Talk, Friends</span>
        </div>
        <div className="col-auto align-items-center exitButtonDiv">
          <button className="exitButton" type="button" onClick={handleExit}>
            <img id="exitButtonImg" src={exitButton} alt=""></img>
          </button>
        </div>
      </div>
    )
  } else {
    //there is not a picture and name
    row = (
      <div id="firstrowRightSideScreen" className="row align-items-center">
        <div className="col-auto px-0 align-items-center">
          <img id="currentContactImg" src={picture} alt=""></img>
        </div>
        <p id="currentContactName" className="col text-truncate contactNameP mb-0 align-items-center p-0">{name}</p>
        <div className="col-2 align-items-center exitButtonDiv">
          <button className="exitButton" type="button" onClick={handleExit}>
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
