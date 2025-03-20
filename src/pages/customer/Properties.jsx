import React, { useState } from 'react'
import { useProperties } from '../../context/Properties'
import { Box, TextField, Button } from '@mui/material';
import Filters from '../properties/Filters';
import PropertiesList from '../properties/PropertiesList';
import { BiSearch } from "react-icons/bi";

function Properties() {
  const { 
      filters, 
      searchTerm, 
      setSearchTerm, 
      filteredProperties, 
      applyFilters, 
      clearFilters,
      handleFilterChange,
      favoriteProperties 
    } = useProperties();
  const [showFavorites, setShowFavorites] = useState(false);
  const isClearButtonActive = Object.values(filters).some((val) => val) || searchTerm.trim() !== "";

  const handleSearch = () => { applyFilters()};

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const propertiestToShow = showFavorites
  ? favoriteProperties
  : filteredProperties;

  return (
    <Box>
       <Box
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: "25px",
            padding: "5px 15px",
            marginBottom: 8,
            width: { xs: "100%", sm: "70%", md: "50%" },
            backgroundColor: "lightgray"
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
      <Box sx={{ mb: 4, display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
        <Filters 
          filters={filters} 
          onFilterChange={handleFilterChange} 
          showFavorites={showFavorites}
          onToggleFavorites={() => setShowFavorites(!showFavorites)} />
        <Button variant="contained" color="primary" onClick={applyFilters}>Apply Filters</Button>
        <Button variant="outlined" color="secondary" onClick={clearFilters} disabled={!isClearButtonActive}>
          Clear Filters
        </Button>
      </Box>
      <Box>
        <PropertiesList properties={propertiestToShow} />
      </Box>
    </Box>
  )
}

export default Properties