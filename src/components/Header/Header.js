import React, { useRef } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import "./styles.css";
import { Button } from "@material-ui/core";

const Header = () => {
  const inputImage = useRef(null);

  const onChangeFile = (e) => {
    var file = e.target.files[0];

    if (!file.name.match(/.(jpg|jpeg|png|gif)$/i)) {
      window.alert("Invalid file format");
    }
  };

  const uploadImage = () => {
    inputImage.current.click();
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar className="navbar">
          <Button onClick={uploadImage}>Upload</Button>
          <input
            type="file"
            ref={inputImage}
            style={{ display: "none" }}
            onChange={onChangeFile}
            accept=".jpg,.jpeg,.png"
          />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
