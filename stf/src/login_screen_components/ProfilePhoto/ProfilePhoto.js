import React, { useState } from "react";
import './ProfilePhoto.css'

function ProfilePhoto({ photoUrl }) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
  };

  return (
    <img
      src={photoUrl}
      alt=""
      className={selected ? "selectedPhoto--active" : "selectedPhoto"}
      onClick={handleClick}
    />
  );
}

export default ProfilePhoto;