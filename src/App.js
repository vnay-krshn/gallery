import Header from "./components/Header/Header";
import "./App.css";
import React, { useEffect, useState } from "react";
import "firebase/firestore";
import { fireBaseApp } from "./firebase/firebase";

function App() {
  const [arr, setArr] = useState([]);

  const db = fireBaseApp.firestore();

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = await db.collection("employee").get();
      setArr(
        usersCollection.docs.map((doc) => {
          return doc.data();
        })
      );
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <Header />
      {arr.map((item) => {
        return (
          <div key={item.id}>
            {item.image && (
              <img
                width='50'
                src={item.image}
                alt="pic"
              />
            )}
            {item.id && <p>{item.id}</p>}
            {item.name && <p>{item.name}</p>}
          </div>
        );
      })}
    </div>
  );
}

export default App;
