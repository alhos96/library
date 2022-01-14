import "./home.css";
import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Fade } from "@mui/material";
import { methods } from "../../helpers";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../logo/Logo";

function Home() {
  //helpers
  const navigate = useNavigate();

  //global state
  const loggedIn = useSelector((state) => state.users.loggedIn);

  //local state
  const [fade, setFade] = useState(false);

  //side effects
  useEffect(() => {
    setFade(true);
  }, []);

  useEffect(() => {
    loggedIn && navigate("/songs-library");
  }, [loggedIn]);

  return (
    <Fade in={fade} timeout={{ enter: 500 }}>
      <Box className="Home-wrapp">
        <Logo className={"landing-page-logo"} />

        <Box className="Text-wrapp">
          <Typography id="home-page-quote" align="center">
            Reinvent your book borrowing experience<br></br> with our application.
          </Typography>
        </Box>

        <Box className="Buttons-wrapp">
          <Button
            id="our-team-button"
            className="button"
            variant="contained"
            fullWidth
            disableElevation
            onClick={() => {
              navigate("/our-team");
            }}
          >
            Our Team
          </Button>

          <Button
            id="login-button"
            className="button"
            variant="contained"
            fullWidth
            disableElevation
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Fade>
  );
}

export default Home;
