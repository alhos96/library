import { Box, Button, Typography, Zoom } from "@mui/material";
import { getSomething, methods } from "../helpers";
import React from "react";

function Modal({ id, url, token, setState, setShowModal }) {
  const { patch } = methods;

  return (
    <Box className="modal" style={style}>
      <Typography gutterBottom align="center">
        Are you sure
      </Typography>
      <Button
        size="small"
        className="button"
        onClick={() => {
          getSomething(patch, `${url}/${id}`, {}, token, setState);
          setShowModal("none");
        }}
      >
        Yes
      </Button>
      <Button
        color="secondary"
        size="small"
        className="button"
        sx={{ ml: 2 }}
        onClick={() => {
          setShowModal("none");
        }}
      >
        Cancel
      </Button>
    </Box>
  );
}

export default Modal;

const style = {
  width: "280px",
  height: "90px",
  backgroundColor: "white",
  padding: "10px",
  position: "fixed",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
};
