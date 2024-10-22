import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Navbar = () => {
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#967ac6", height: "65px" }}
    >
      <Toolbar>
        <Typography
          sx={{ flexGrow: 1, fontWeight: "bold", color: "#7d0d3b" }}
          variant="h6"
        >
          Nicha's Weather App
        </Typography>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button sx={{ fontWeight: "bold", color: "#311b92" }}>Home</Button>
        </Link>
        <Link to="/favorite-cities" style={{ textDecoration: "none" }}>
          <Button sx={{ fontWeight: "bold", color: "#311b92" }}>
            Favorite Cities
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
