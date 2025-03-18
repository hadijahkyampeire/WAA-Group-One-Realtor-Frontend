import React from "react";
import { Box } from "@mui/material";
import AnonymousNavbar from "../components/navbar/AnonymousNavBar";

const AnonymousLayout = ({ children }) => {
  return (
    <Box>
      <AnonymousNavbar />
      <Box component="main" sx={{ padding: "20px", minHeight: "100vh" }}>
        {children}
      </Box>
    </Box>
  );
};

export default AnonymousLayout;
