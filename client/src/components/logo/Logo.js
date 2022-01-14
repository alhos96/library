import "./logo.css";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";

function Logo({ className }) {
  //helpers
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  return (
    <Box className={`Logo-wrapp ${className}`}>
      <img
        onClick={() => {
          token ? navigate("/books") : navigate("/");
        }}
        className="logo"
        src={logo}
        alt="logo"
      />
    </Box>
  );
}

export default Logo;
