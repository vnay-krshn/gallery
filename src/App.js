import Header from "./components/Header/Header";
import "./App.css";
import React, { useEffect, useState } from "react";
import "firebase/firestore";
import { OpenSeaDragonViewer } from "./components/OpenSeaDragon/OpenSeaDragon";

function App() {
  const [openSeaImg, setOpenSeaImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();



  useEffect(() => {
    const getImages = async () => {
      const response = await fetch(
        "https://openslide-demo.s3.dualstack.us-east-1.amazonaws.com/info.json"
      );
      let image = await response.json();
      setOpenSeaImages(image.groups);
    };
    getImages();
  }, []);

  const selectImage = (slide) => {
    setSelectedImage(slide.slide);
  };

  useEffect(() => {
    if (openSeaImg[0]) {
      selectImage(openSeaImg[0].slides[0]);
    }
  }, [openSeaImg]);

  return (
    <div>
      <Header />
      <OpenSeaDragonViewer image={selectedImage} />
    </div>
  );
}

export default App;
