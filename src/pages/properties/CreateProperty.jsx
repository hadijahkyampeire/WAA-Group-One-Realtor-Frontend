import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Select,
  InputLabel,
  FormControl,
  Box,
  Typography,
  Paper,
  Grid2,
} from "@mui/material";
import NavBarLayout from "../../layouts/NavBarLayout";
import { addProperty } from "../../api/properties";
import { useNavigate } from "react-router-dom";

const CreateProperty = () => {
  const navigate = useNavigate();
  const [property, setProperty] = useState({
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "US",
    },
    area: "",
    bathrooms: "",
    bedrooms: "",
    price: "",
    listingType: "FOR_SALE",
    propertyType: "HOUSE",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("address.")) {
      const addressField = name.split(".")[1];
      setProperty((prev) => ({
        ...prev,
        address: { ...prev.address, [addressField]: value },
      }));
    } else {
      setProperty((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProperty(property)
    .then((res) => {
      console.log("Property created", res.data);
      navigate("/owner/dashboard")
    })
    .catch((error) => {
      console.error("Error creating property", error);
    });
  };

  return (
    <NavBarLayout>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Paper elevation={4} sx={{ maxWidth: 500, padding: 2, borderRadius: 2 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Create Property
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth label="Street" name="address.street"
          value={property.address.street} onChange={handleChange} margin="normal" required
        />
        <Grid2 container spacing={2}>
          <Grid2 size={4}>
            <TextField
              fullWidth label="City" name="address.city"
              value={property.address.city} onChange={handleChange} margin="normal" required
            />
          </Grid2>
          <Grid2 size={4}>
            <TextField
              fullWidth label="State" name="address.state"
              value={property.address.state} onChange={handleChange} margin="normal" required
            />
          </Grid2>
          <Grid2 size={4}>
            <TextField
              fullWidth label="ZIP Code" name="address.zip"
              type="number" value={property.address.zip} onChange={handleChange} margin="normal" required
            />
          </Grid2>
        </Grid2>

        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <TextField
              fullWidth label="Area (Square Feet)" name="area"
              type="number" value={property.area} onChange={handleChange} margin="normal" required
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth label="Price ($)" name="price"
              type="number" value={property.price} onChange={handleChange} margin="normal" required
            />
          </Grid2>
        </Grid2>
        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <TextField
              fullWidth label="Bathrooms" name="bathrooms"
              type="number" step="0.5" value={property.bathrooms} onChange={handleChange} margin="normal" required
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth label="Bedrooms" name="bedrooms"
              type="number" value={property.bedrooms} onChange={handleChange} margin="normal" required
            />
          </Grid2>
        </Grid2>
        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Listing Type</InputLabel>
              <Select name="listingType" value={property.listingType} onChange={handleChange} required>
                <MenuItem value="FOR_SALE">For Sale</MenuItem>
                <MenuItem value="FOR_RENT">For Rent</MenuItem>
                <MenuItem value="SOLD">Sold</MenuItem>
                <MenuItem value="PENDING">Pending</MenuItem>
                <MenuItem value="CONTINGENT">Contingent</MenuItem>
                <MenuItem value="UNVERIFIED">Unverified</MenuItem>
              </Select>
            </FormControl>
          </Grid2>
          <Grid2 size={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Property Type</InputLabel>
              <Select name="propertyType" value={property.propertyType} onChange={handleChange} required>
                <MenuItem value="HOUSE">House</MenuItem>
                <MenuItem value="TOWNHOUSE">Townhouse</MenuItem>
                <MenuItem value="MULTI_FAMILY">Multi-Family</MenuItem>
                <MenuItem value="CONDO">Condo</MenuItem>
                <MenuItem value="APARTMENT">Apartment</MenuItem>
              </Select>
            </FormControl>
          </Grid2>
        </Grid2>
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Submit Property
        </Button>
      </form>
    </Paper>
    </div>
    </NavBarLayout>
  );
};

export default CreateProperty;
