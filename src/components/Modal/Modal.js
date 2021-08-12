import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import close from "../../assets/close.svg";
import { fireBaseApp } from "../../firebase/firebase";
import "firebase/firestore";

const ModalBody = ({ closeModal, fetchUserData }) => {
  const [displayFileName, setDisplayFileName] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState(null);
  const [image, setImage] = useState({});
  const [imageUrl, setImageUrl] = useState(null);

  const inputImage = useRef(null);

  const db = fireBaseApp.firestore();

  const onChangeFile = async (e) => {
    var file = e.target.files[0];
    if (!file.name.match(/.(jpg|jpeg|png|gif)$/i)) {
      window.alert("Invalid file format");
    } else {
      setImage(file);
      const storageVar = fireBaseApp.storage().ref();
      const fileRef = storageVar.child(file.name);
      await fileRef.put(file);
      setImageUrl(await fileRef.getDownloadURL());
    }
  };

  const uploadImage = () => {
    inputImage.current.click();
  };

  const resetForm = () => {
    closeModal();
    setDisplayFileName(false);
  };

  const getFormData = async () => {
    await db.collection("employee").add(
      {
        name: name,
        id: id,
        image: imageUrl,
      },
      resetForm()
    );
    fetchUserData()
  };

  useEffect(() => {
    if (imageUrl) {
      setDisplayFileName(true);
    }
  }, [imageUrl]);

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
          id="Id"
          label="Employee ID"
          variant="outlined"
          type="number"
          onChange={(e) => setId(parseInt(e.target.value))}
          inputmode="numeric"
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
        {displayFileName ? (
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className="complete-btn"
          >
            Done
          </Button>
        ) : (
          <Button variant="contained"  className="complete-btn" disabled>
            Done
          </Button>
        )}
      </form>
    </div>
  );
};

export default ModalBody;
