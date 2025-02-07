import React from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthButtons from "./AuthButtons";
// import { Link as RouterLink } from "react-router-dom";

const NavbarComponent = () => {
    const navigate = useNavigate()
  return (
    <AppBar position="static" color="primary">
      <Toolbar style={{display:"flex", justifyContent:"space-between"}}>
        {/* Navigation Links */}
        <Box sx={{ display: "flex", gap: 2,alignItems:"center" }}>
          <Button
           onClick={()=>{navigate('/')}}
            color="inherit"
            sx={{ textTransform: "none" }}
          >
            Home
          </Button>
          <Button
             onClick={()=>{navigate('/emp')}}
            color="inherit"
            sx={{ textTransform: "none" }}
          >
            Employee
          </Button>
          <Button
          onClick={()=>{navigate('/profile')}}
            color="inherit"
            sx={{ textTransform: "none" }}
          >
            Profile
          </Button>
        </Box>
          <div>
              <AuthButtons />
            </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarComponent;
