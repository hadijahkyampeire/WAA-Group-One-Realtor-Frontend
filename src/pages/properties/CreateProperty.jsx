import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Paper,
  Grid2,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import NavBarLayout from "../../layouts/NavBarLayout";
import { addProperty } from "../../api/properties";
import { useNavigate } from "react-router-dom";
import { uploadFile } from "../../api/upload";
import { getFileUrl } from "../../api";

const initialProperty = {
  address: { street: "", city: "", state: "", zip: "", country: "US" },
  area: "",
  bathrooms: "",
  bedrooms: "",
  price: "",
  listingType: "FOR_SALE",
  propertyType: "HOUSE",
  images: [],
};

const CreateProperty = () => {
  const navigate = useNavigate();
  const [property, setProperty] = useState({ ...initialProperty });

  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState("");

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

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    for (const file of files) {
      await uploadImage(file);
    }
  };

  const uploadImage = async (file) => {
    setUploading(true);
    const { success, filePath, error } = await uploadFile(file);
    if (success) {
      setSelectedFiles((prev) => [...prev, { name: file.name, url: filePath }]);
      setProperty((prev) => ({
        ...prev,
        images: [...prev.images, filePath],
      }));
    } else {
      console.log(error);
      setError(error.message || "Un expected upload error")
    }

    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addProperty(property);
      navigate("/owner/dashboard");
    } catch (err) {
      console.error("Error creating property", err);
    }
  };

  const handleDeleteImage = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setProperty((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <NavBarLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Paper
          elevation={4}
          sx={{ maxWidth: 500, padding: 2, borderRadius: 2 }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Create Property
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Street"
              name="address.street"
              value={property.address.street}
              onChange={handleChange}
              margin="normal"
              required
            />
            <Grid2 container spacing={2}>
              <Grid2 size={4}>
                <TextField
                  fullWidth
                  label="City"
                  name="address.city"
                  value={property.address.city}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
              </Grid2>
              <Grid2 size={4}>
                <TextField
                  fullWidth
                  label="State"
                  name="address.state"
                  value={property.address.state}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
              </Grid2>
              <Grid2 size={4}>
                <TextField
                  fullWidth
                  label="ZIP Code"
                  name="address.zip"
                  type="number"
                  value={property.address.zip}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
              </Grid2>
            </Grid2>

            <Grid2 container spacing={2}>
              <Grid2 size={6}>
                <TextField
                  fullWidth
                  label="Area (Square Feet)"
                  name="area"
                  type="number"
                  value={property.area}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  fullWidth
                  label="Price ($)"
                  name="price"
                  type="number"
                  value={property.price}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
              </Grid2>
            </Grid2>
            <Grid2 container spacing={2}>
              <Grid2 size={6}>
                <TextField
                  fullWidth
                  label="Bathrooms"
                  name="bathrooms"
                  type="number"
                  step="0.5"
                  value={property.bathrooms}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  fullWidth
                  label="Bedrooms"
                  name="bedrooms"
                  type="number"
                  value={property.bedrooms}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
              </Grid2>
            </Grid2>
            <Grid2 container spacing={2}>
              <Grid2 size={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Listing Type</InputLabel>
                  <Select
                    name="listingType"
                    value={property.listingType}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="FOR_SALE">For Sale</MenuItem>
                    <MenuItem value="FOR_RENT">For Rent</MenuItem>
                  </Select>
                </FormControl>
              </Grid2>
              <Grid2 size={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Property Type</InputLabel>
                  <Select
                    name="propertyType"
                    value={property.propertyType}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="HOUSE">House</MenuItem>
                    <MenuItem value="TOWN_HOUSE">Townhouse</MenuItem>
                    <MenuItem value="MULTI_FAMILY">Multi-Family</MenuItem>
                    <MenuItem value="CONDO">Condo</MenuItem>
                    <MenuItem value="APARTMENT">Apartment</MenuItem>
                  </Select>
                </FormControl>
              </Grid2>
            </Grid2>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <label>
                Upload Property Images <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                style={{ margin: "10px 0" }}
              />
              {uploading && (
                <Typography variant="body2">Uploading images...</Typography>
              )}
              {error && <Typography>{error}</Typography>}
              <List>
                {selectedFiles.map((file, index) => (
                  <ListItem
                    key={index}
                    sx={{ display: "flex", alignItems: "center", gap: 2 }}
                  >
                    <img
                      src={getFileUrl(file.url)}
                      alt={file.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                    <ListItemText primary={file.name} secondary="Uploaded ✔" />
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteImage(index)}
                    >
                      Delete
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Submit Property
            </Button>
          </form>
        </Paper>
      </div>
    </NavBarLayout>
  );
};

export default CreateProperty;
