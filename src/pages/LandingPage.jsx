import React from "react";
import AnonymousLayout from "../layouts/AnonymousLayout";
import { Typography, Box, TextField, Button } from "@mui/material";
import { BiSearch } from "react-icons/bi";
import bg from "../assets/background-image.jpg"

const LandingPage = () => {
  return (
    <AnonymousLayout>
      <Box>
        <img src={bg} width={"100%"} height={700} alt="honss" />
        <Box sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.08)",
            color: "white",
            textAlign: "center",
            padding: "20px",
          }}>

        
        <Typography variant="h4" gutterBottom>
          Welcome to Honss Real Estates
        </Typography>
        <Typography>
          Find your dream property with us. Explore amazing real estate deals.
        </Typography>
        <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: "25px",
              padding: "5px 15px",
              marginTop: 3,
              width: { xs: "90%", sm: "60%", md: "40%" },
            }}
          >
            <BiSearch color="action" />
            <TextField
              fullWidth
              variant="standard"
              placeholder="Search properties by location..."
              InputProps={{ disableUnderline: true }}
              sx={{ marginLeft: 1 }}
            />
            <Button variant="contained" color="primary" sx={{ marginLeft: 1, borderRadius: "20px" }}>
              Search
            </Button>
          </Box>
        </Box>
      </Box>
    </AnonymousLayout>
  );
};

export default LandingPage;
