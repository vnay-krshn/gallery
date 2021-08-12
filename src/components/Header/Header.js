import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import "./styles.css";
import { Button, Modal } from "@material-ui/core";
import ModalBody from "../Modal/Modal";

const Header = ({fetchUserData}) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <AppBar position="static">
        <Toolbar className="navbar">
          <Button onClick={() => setOpen(true)}>Upload</Button>
        </Toolbar>
      </AppBar>
      <Modal open={open}>
        <ModalBody closeModal={() => setOpen(false)} fetchUserData={fetchUserData}/>
      </Modal>
    </div>
  );
};

export default Header;
