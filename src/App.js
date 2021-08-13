import Header from "./components/Header/Header";
import "./App.css";
import React, { useEffect, useState } from "react";
import "firebase/firestore";
import { fireBaseApp } from "./firebase/firebase";
import ImageDisplay from "./components/ImageDisplay/ImageDisplay";
import { Modal } from "@material-ui/core";

function App() {
  const [arr, setArr] = useState([]);
  const [open, setOpen] = useState(false);
  const [imgData, setImgData] = useState({});

  const db = fireBaseApp.firestore();

  const fetchUsers = async () => {
    const usersCollection = await db.collection("employee").get();
    setArr(
      usersCollection.docs.map((doc) => {
        return doc.data();
      })
    );
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOnClick = (item) => {
    setOpen(true);
    setImgData(item);
  };

  return (
    <div>
      <Header fetchUserData={fetchUsers} />
      <h1>Aaravam 2021</h1>
     
      <div className="container">
        {[...Array(120)].map(() => (
          <>
            {arr.map((item) => {
              return (
                <div className="grid__item" onClick={() => handleOnClick(item)}>
                 <div className="grid__item-inner">
                <img
                  src={item.image}
                  alt="pic"
                  id="img-rpt"
                  
                />
                </div>
                </div> 
              );
            })}
          </>
        ))}
      </div>
      
      <Modal open={open}>
        <ImageDisplay closeModal={() => setOpen(false)} props={imgData} />
      </Modal>
      <p className="instructions">Upload your favourite onam pictures here and make it a more memorable one. <i>The photos are once uploaded cannot be deleted.</i></p>
    </div>
  );
}

export default App;
