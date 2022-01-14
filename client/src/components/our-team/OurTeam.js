import "./our-team.css";
import React, { useState, useEffect } from "react";
import { Box, Divider, Typography, Fade } from "@mui/material";
import Logo from "../logo/Logo";
import Article from "../article/Article";
import teamMembers from "../../assets/texts/teamMembers";
function OurTeam() {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setFade(true);
  }, []);
  return (
    <Fade in={fade} timeout={{ enter: 500 }}>
      <Box className="Team-wrapp">
        <Logo className={"landing-page-logo"} />
        <Divider className="main-divider" textAlign="left">
          <Typography variant="body1">Our Team</Typography>
        </Divider>
        {teamMembers.map((member, index) => {
          return <Article member={member} key={index} />;
        })}
      </Box>
    </Fade>
  );
}

export default OurTeam;
