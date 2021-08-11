import OpenSeaDragon from "openseadragon";
import React, { useEffect, useState, useRef } from "react";
import "./styles.css";
import { fireBaseApp } from "../../firebase/firebase";

const OpenSeaDragonViewer = ({ image }) => {
  const [viewer, setViewer] = useState(null);
  const [bgndImg, setBgnImg] = useState(false);
  const [arr, setArr] = useState([]);
  const imgRef = useRef()

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
    if (bgndImg && imgRef.current) {
      var IMAGE_RULER_HIGHLIGHT = "image-ruler";
      var IMAGE_RULER_DEFAULT_POSITION = new OpenSeaDragon.Point(0.3, 0.5);

      viewer.addOverlay(
        IMAGE_RULER_HIGHLIGHT,
        IMAGE_RULER_DEFAULT_POSITION,
        OpenSeaDragon.Placement.CENTER
      );
    }
  }, [bgndImg]);

  useEffect(() => {
    if (image && viewer) {
      viewer.open(image.source);
      setBgnImg(true);
    }
  }, [image]);

  const InitOpenseadragon = () => {
    setViewer(
      OpenSeaDragon({
        id: "openSeaDragon",
        prefixUrl: "openseadragon-images/",
        animationTime: 0.5,
        blendTime: 0.1,
        constrainDuringPan: true,
        maxZoomPixelRatio: 2,
        minZoomLevel: 1,
        visibilityRatio: 1,
        zoomPerScroll: 2,
        showNavigationControl: false,
      })
    );
    fetchUsers();
  };

  useEffect(() => {
    InitOpenseadragon();
    return () => {
      viewer && viewer.destroy();
    };
  }, []);

  return (
    <>
      <div id="openSeaDragon"></div>
      {bgndImg &&
        arr.slice(0,1).map((item) => {
          return (
            <img
              ref={imgRef}
              id="image-ruler"
              src={item.image}
              style={{ width: "50px", height: "50px" }}
              alt="pic"
            />
          );
        })}
    </>
  );
};
export { OpenSeaDragonViewer };
