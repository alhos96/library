import "./footer.css";
import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box className="Footer">
      <Typography color="white">Paragon 2021</Typography>
      <Typography color="secondary" className="copyright">
        All rights reserved
      </Typography>
    </Box>
  );
}

export default Footer;
