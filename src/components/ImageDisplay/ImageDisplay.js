import React from "react";
import close from "../../assets/close.svg";
import "./styles.css";

const ImageDisplay = ({ props, closeModal }) => {
  const resetForm = () => {
    closeModal();
  };

  return (
    <div className="image-display">
      <div className="data-container">
        <img
          src={close}
          alt="close"
          className="close-icon"
          onClick={resetForm}
        />
        <img src={props.image} alt="showImg" id="user-image" />
        <p>{props.name}</p>
        <p>{props.id}</p>
      </div>
    </div>
  );
};

export default ImageDisplay;
