/* This component is rendered in OurTeam component as one of three articles about team members */
import "./article.css";
import React, { useState, useEffect } from "react";
import { Box, Typography, Fade } from "@mui/material";

function Article({ member }) {
  // local state
  const [fade, setFade] = useState(false);

  //side effects
  useEffect(() => {
    setFade(true);
  }, []);

  return (
    <Fade in={fade} timeout={{ enter: 500 }}>
      <Box className="Article-wrapp">
        <img src={member.image} width="200px" height="200px"></img>

        <Typography variant="h3">{member.name}</Typography>

        <Typography className="about" variant="body2">
          {member.about}
        </Typography>
      </Box>
    </Fade>
  );
}

export default Article;
