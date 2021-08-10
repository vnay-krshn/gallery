import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import close from "../../assets/close.svg";

const ModalBody = ({ closeModal }) => {
  const [displayFileName, setDisplayFileName] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState(null);
  const [image, setImage] = useState({});

  const inputImage = useRef(null);

  const onChangeFile = (e) => {
    var file = e.target.files[0];
    if (!file.name.match(/.(jpg|jpeg|png|gif)$/i)) {
      window.alert("Invalid file format");
    } else {
      setImage(file);
    }
  };

  const uploadImage = () => {
    inputImage.current.click();
  };

  const resetForm = () => {
    closeModal();
    setDisplayFileName(false);
  };

  const getFormData = () => {
    closeModal();
    console.log(name, id, image);
  };

  useEffect(() => {
    if (image) {
      setDisplayFileName(true);
    }
  }, [image]);

  return (
    <div className="modal-body">
      <form className="form" onSubmit={getFormData}>
        <img
          src={close}
          alt="close"
          className="close-icon"
          onClick={resetForm}
        />
        <TextField
          label="Name"
          variant="outlined"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Employee ID"
          variant="outlined"
          type="number"
          onChange={(e) => setId(parseInt(e.target.value))}
        />
        <Button variant="contained" onClick={uploadImage}>
          Choose Image
        </Button>
        <input
          type="file"
          ref={inputImage}
          style={{ display: "none" }}
          onChange={onChangeFile}
          accept=".jpg,.jpeg,.png"
        />
        {displayFileName && <label>{image.name}</label>}
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          className="complete-btn"
        >
          Done
        </Button>
      </form>
    </div>
  );
};

export default ModalBody;
