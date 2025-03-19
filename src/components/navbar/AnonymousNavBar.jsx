import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import logo from "../../assets/logo.png"
import { Link as BrowserLink } from "react-router-dom";

const AnonymousNavbar = () => {
  const theme = useTheme();
  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        backgroundColor: theme.palette.background.paper, 
        boxShadow: "none", 
        top: 0, 
        zIndex: 1300
        }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <BrowserLink to="/properties"><img src={logo} width={30} height={30} alt="Honss"/></BrowserLink>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
          Honss Real Estates
        </Typography>
        
        <Button component={BrowserLink} to="/signin" variant="contained" color="primary">
          Sign In
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AnonymousNavbar;