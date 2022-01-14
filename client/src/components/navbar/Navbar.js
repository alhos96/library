import "./navbar.css";
import React, { useState, useEffect } from "react";
import { Box, Fade, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../../store/usersSlice";
import { links } from "../../helpers";
import logout from "../../assets/images/logout.svg";
import Logo from "../logo/Logo";

function Navbar({ url }) {
  //helpers
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //local state
  const [fade, setFade] = useState(false);

  const [user, setUser] = useState(false);

  //side effects

  useEffect(() => {
    setFade(true);

    setUser(sessionStorage.getItem("user"));
  }, []);

  return (
    <>
      <Fade in={fade} timeout={{ enter: 500 }}>
        <div className="nav-wrapp">
          <Box className="Navbar">
            <Logo className={"navbar-logo"} />
            <Stack spacing={2} direction="row">
              <Typography className="user" variant="body1">
                {user}
              </Typography>
              <Box className="logout">
                <img
                  alt="logout-icon"
                  className="logout-image"
                  src={logout}
                  onClick={() => {
                    dispatch(userLoggedOut());
                  }}
                />
              </Box>
            </Stack>
          </Box>

          <Box className="Links">
            {links.map((link, index) => (
              <Typography
                onClick={(e) => {
                  navigate(`${link.path}`);
                }}
                id={link.path}
                key={index}
                variant="body2"
                color="primary"
                className="link-identifier nav-link"
              >
                {link.name}
              </Typography>
            ))}
          </Box>
        </div>
      </Fade>
    </>
  );
}

export default Navbar;
