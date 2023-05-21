import './InputPhotoDiv.css'
import { useState, useEffect } from 'react';
import { Popover } from 'bootstrap';
import ProfilePhoto from "../ProfilePhoto/ProfilePhoto"

/**
 * Renders an input element for uploading a photo, along with a preview of the selected photo if available
 * @param {object} props - The component props
 * @param {string} props.inputId - The ID of the input element
 * @param {string} props.inputType - The type of the input element
 * @param {string} props.inputPlaceholder - The placeholder text for the input element
 * @param {string} props.inputTitle - The title of the input element
 */
function InputDiv(props) {

  // Define a state variable to store the URL of the selected photo
  const [inputValue, setInputValue] = useState("");

  /**
   * Event handler function for when a photo is selected
   * @param {object} event - The event object
   */
  const handlePhotoChange = (event) => {
    props.handler(event, props.inputTitle);
    setInputValue(event.target.value);

    // Get the file object from the input element
    const file = event.target.files[0];
    if (file) {
      // Check if the file type is valid
      if (!file.type.startsWith('image/')) {
        // alert('Please choose a valid image file.');
        event.target.value = ''; // clear the input value
        setInputValue(event.target.value);
        return;
      }
      // Create a URL object from the file object and set it as the photo URL in state
      const url = URL.createObjectURL(file);
      props.setPhotoUrl(url);
      //create reader
      const reader = new FileReader();
      reader.onload = () => {
        
      }
    }
  };

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
    <>
      {/* If a photo has been selected, show the photo preview along with the input element */}
      {props.photoUrl ? (
        <div className={`row photoInputDiv ${props.divclassName.includes('invalid') ? 'invalid' : ""}`}>
          <p className="inputTitlePhoto">{props.inputTitle}</p>
          <div className='inputPhoto-container'>
            <input
              id="pictureInput"
              type={props.inputType}
              placeholder={props.inputPlaceholder}
              className="btn"
              tabIndex="0"
              role="button"
              data-bs-toggle="popover"
              data-bs-trigger="hover"
              data-bs-title={props.popoverTitle}
              data-bs-content={props.popoverContent}
              onChange={handlePhotoChange}
              defaultValue={inputValue} />
          </div>
          <ProfilePhoto photoUrl={props.photoUrl} alt="" className="selectedPhoto" />
        </div>
      ) : (
        /* If no photo has been selected, only show the input element */
        <div className={`row registerPhotoInputDiv ${props.divclassName.includes('invalid') ? 'invalid' : ""}`}>
          <p className="inputTitle">{props.inputTitle}</p>
          <div className='inputPhoto-container'>
            <input
              id="pictureInput"
              type={props.inputType}
              placeholder={props.inputPlaceholder}
              className="btn"
              tabIndex="0"
              role="button"
              data-bs-toggle="popover"
              data-bs-trigger="hover"
              data-bs-title={props.popoverTitle}
              data-bs-content={props.popoverContent}
              onChange={handlePhotoChange}
              defaultValue={inputValue} />
          </div>
        </div>
      )}
    </>
  );

}

export default InputDiv;