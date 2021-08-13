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
  const [showUserDetails, setShowUserDetails] = useState(false);

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

  const showDetails = () => {
    setShowUserDetails(true);
  };

  const hideDetails = () => {
    setShowUserDetails(false);
  };

  return (
    <div>
      <Header fetchUserData={fetchUsers} />
      <div className="container">
        {[...Array(120)].map(() => (
          <>
            {arr.map((item) => {
              return (
                <>
                  <img
                    onMouseOver={showDetails}
                    onMouseOut={hideDetails}
                    src={item.image}
                    alt="pic"
                    id="img-rpt"
                    onClick={() => handleOnClick(item)}
                  />
                  {/* {showUserDetails && <p>{item.name}</p>} */}
                </>
              );
            })}
          </>
        ))}
      </div>
      <Modal open={open}>
        <ImageDisplay closeModal={() => setOpen(false)} props={imgData} />
      </Modal>
    </div>
  );
}

export default App;
