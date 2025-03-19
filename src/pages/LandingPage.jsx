import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AnonymousLayout from "../layouts/AnonymousLayout";
import { Typography, Box, TextField, Button } from "@mui/material";
import { BiSearch } from "react-icons/bi";
import bg from "../assets/background-image.jpg"
import PropertiesList from "./landing/PropertiesList";
import Filters from "./landing/Filters";
import { properties } from "../data/properties";
import { fetchAllProperties } from "../api/properties";

const LandingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("location") || "");
  const [filters, setFilters] = useState({
    propertyStatus: searchParams.get("propertyStatus") || "",
    listingType: searchParams.get("listingType") || "",
    propertyType: searchParams.get("propertyType") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  });

  console.log(filters)
  const [filteredProperties, setFilteredProperties] = useState([...properties]);
  
  const fetchProperties = async() => {
    try {
      const queryParams = {};
      if (filters.propertyStatus) queryParams.propertyStatus = filters.propertyStatus;
      if (filters.listingType) queryParams.listingType = filters.listingType;
      if (filters.propertyType) queryParams.propertyType = filters.propertyType;
      if (filters.minPrice) queryParams.minPrice = filters.minPrice;
      if (filters.maxPrice) queryParams.maxPrice = filters.maxPrice;
      if (searchTerm) queryParams.location = searchTerm;
  
      const res = await fetchAllProperties(queryParams);
      const backendProperties = res.data || [];
  
      const combinedProperties = [
        ...properties,
        ...backendProperties.filter((property) => !properties.some((dummy) => dummy.id === property.id))
      ];
  
      filterProperties(combinedProperties);
    } catch (err) {
      console.error(err || "Error fetching properties");
    }
  }
  
    useEffect(() => {
      fetchProperties();
    }, [filters]);

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const filterProperties = (data = filteredProperties) => {
    let filtered = [...data];
  
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(({ address }) => 
        address &&
        (
          address.street?.toLowerCase().includes(searchLower) ||
          address.city?.toLowerCase().includes(searchLower) ||
          address.state?.toLowerCase().includes(searchLower) ||
          address.zip?.toLowerCase().includes(searchLower) ||
          address.country?.toLowerCase().includes(searchLower)
        )
      );
    }

    if (filters.listingType) {
      filtered = filtered
        .filter(({ listingType }) => listingType.toLowerCase() === filters.listingType.toLowerCase());
    }
  
    if (filters.propertyStatus) {
      filtered = filtered
        .filter(({ propertyStatus }) => propertyStatus.toLowerCase() === filters.propertyStatus.toLowerCase());
    }

    if (filters.propertyType) {
      filtered = filtered
        .filter(({ propertyType }) => propertyType.toLowerCase() === filters.propertyType.toLowerCase());
    }
  
    filtered = filtered.filter(({ price }) => {
      const minPrice = filters.minPrice ? parseInt(filters.minPrice) : 0;
      const maxPrice = filters.maxPrice ? parseInt(filters.maxPrice) : Infinity;
      return price >= minPrice && price <= maxPrice;
    });
  
    setFilteredProperties(filtered);
  };
  

  const applyFilters = () => {
    const newSearchParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) newSearchParams.set(key, value);
    });
    if (searchTerm) newSearchParams.set("location", searchTerm);
    setSearchParams(newSearchParams);
  
    fetchProperties();
  };

  const clearFilters = () => {
    setFilters({
      propertyStatus: "",
      listingType: "",
      propertyType: "",
      minPrice: "",
      maxPrice: "",
      location: ""
    });

    setSearchParams(new URLSearchParams());
    fetchProperties();
  };

  const isClearButtonActive = Object.values(filters).some((val) => val) || searchTerm.trim() !== "";

  const handleSearch = () => { applyFilters()};

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    const newSearchTerm = searchParams.get("location") || "";
    setSearchTerm(newSearchTerm);
    
    setFilters({
      propertyStatus: searchParams.get("propertyStatus") || "",
      listingType: searchParams.get("listingType") || "",
      propertyType: searchParams.get("propertyType") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
    });

    fetchProperties();
  }, [searchParams]);

  useEffect(() => {
    filterProperties();
  }, [searchParams, filters]);

  return (
    <AnonymousLayout>
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
    </AnonymousLayout>
  );
};

export default LandingPage;
