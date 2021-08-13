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

  const [modalForId, setModalForId] = useState(false);
  const [modalNewUser, setModalNewUser] = useState(false);
  const [modalRegdUser, setModalRegdUser] = useState(false);
  const [searchData, setSearchData] = useState({});
  const [updateImg, setUpdateImg] = useState(false);
  const [showDelBtn, setShowDelBtn] = useState(false);

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
    fetchUserData();
  };

  useEffect(() => {
    if (imageUrl) {
      setDisplayFileName(true);
    }
  }, [imageUrl]);

  const search = async () => {
    const usersCollection = await db
      .collection("employee")
      .where("id", "==", id)
      .get();

    if (usersCollection.docs.length) {
      setSearchData(
        usersCollection.docs.map((doc) => {
          return doc.data();
        })
      );
      setModalForId(true);
      setModalRegdUser(true);
    } else {
      setModalForId(true);
      setModalNewUser(true);
    }
  };

  const deleteRecord = async () => {
    await db
      .collection("employee")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().id === searchData[0].id) {
            doc.ref.delete();
          }
        });
      });

    let pictureRef = fireBaseApp.storage().refFromURL(searchData[0].image);
    pictureRef
      .delete()
      .then(() => {
        resetForm();
        fetchUserData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updatePhoto = async () => {
    let pictureRef = fireBaseApp.storage().refFromURL(searchData[0].image);

    pictureRef
      .delete()
      .then(async () => {
        const usersCollection = await db
          .collection("employee")
          .where("id", "==", id)
          .get();

        usersCollection.docs[0].ref.update({
          image: imageUrl,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    fetchUserData();
    resetForm();
  };

  const deletePrompt = () => {
    const choice = window.confirm("Are you sure?");
    if (choice) {
      deleteRecord();
    }
  };

  const updatePrompt = () => {
    setUpdateImg(true);
    setShowDelBtn(true);
  };

  return (
    <div className="modal-body">
      {!modalForId && (
        <>
          <img
            src={close}
            alt="close"
            className="close-icon"
            onClick={resetForm}
          />
          <TextField
            id="Id"
            label="Employee ID"
            variant="outlined"
            type="number"
            onChange={(e) => setId(parseInt(e.target.value))}
          />
          <Button color="primary" variant="contained" onClick={search}>
            Go
          </Button>
        </>
      )}
      {modalNewUser && (
        <>
          <form className="form" onSubmit={getFormData}>
            <img
              src={close}
              alt="close"
              className="close-icon"
              onClick={resetForm}
            />
            <label>ID : {id}</label>
            <TextField
              label="Name"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={uploadImage}>
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
              <Button variant="contained" className="complete-btn" disabled>
                Done
              </Button>
            )}
          </form>
        </>
      )}
      {modalRegdUser && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <img
            src={close}
            alt="close"
            className="close-icon"
            onClick={resetForm}
          />
          <label>ID: {id}</label>
          <img
            src={searchData[0].image}
            alt="existUserImg"
            height="50"
            width="50"
          />
          {!showDelBtn && (
            <>
              <Button
                color="primary"
                variant="contained"
                onClick={updatePrompt}
              >
                Update
              </Button>

              <Button
                color="primary"
                variant="contained"
                onClick={deletePrompt}
              >
                Delete
              </Button>
            </>
          )}
          {updateImg && (
            <>
              <Button variant="contained" color="primary" onClick={uploadImage}>
                Choose New Image
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
                  onClick={updatePhoto}
                >
                  Done
                </Button>
              ) : (
                <Button variant="contained" className="complete-btn" disabled>
                  Done
                </Button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ModalBody;
