import React from "react";
import AnonymousLayout from "../layouts/AnonymousLayout";
import { Typography, Box, TextField, Button } from "@mui/material";
import { BiSearch } from "react-icons/bi";
import bg from "../assets/background-image.jpg"
import PropertiesList from "./properties/PropertiesList";
import Filters from "./properties/Filters";
import NavBarLayout from "../layouts/NavBarLayout";
// import { properties } from "../data/properties";

import { useProperties } from "../context/Properties";

const LandingPage = () => {
  const { 
    filters, 
    searchTerm, 
    setSearchTerm, 
    filteredProperties, 
    applyFilters, 
    clearFilters,
    handleFilterChange 
  } = useProperties();

  const isClearButtonActive = Object.values(filters).some((val) => val) || searchTerm.trim() !== "";

  const handleSearch = () => { applyFilters()};

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <NavBarLayout>
      <Box>
        <img src={bg} width={"100%"} height={550} alt="honss" />
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
              slotProps={{ input: { disableUnderline: true } }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              sx={{ marginLeft: 1 }}
            />
            <Button variant="contained" color="primary" sx={{ marginLeft: 1, borderRadius: "20px" }} onClick={handleSearch}>
              Search
            </Button>
        </Box>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Box sx={{ mb: 4, display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
          <Filters filters={filters} onFilterChange={handleFilterChange} />
          <Button variant="contained" color="primary" onClick={applyFilters}>Apply Filters</Button>
          <Button variant="outlined" color="secondary" onClick={clearFilters} disabled={!isClearButtonActive}>
            Clear Filters
          </Button>
        </Box>
        <PropertiesList properties={filteredProperties} />
      </Box>
    </NavBarLayout>
  );
};

export default LandingPage;
