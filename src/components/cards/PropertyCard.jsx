import React, { useState } from "react";
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  IconButton, 
  Box, 
  Chip 
} from "@mui/material";
import { Favorite, FavoriteBorder, OpenInNew } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const statusColors = {
  AVAILABLE: "green",
  SOLD: "red",
  CONTINGENT: "blue",
  PENDING: "orange",
};

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const defaultImages = [
    "https://images.unsplash.com/photo-1580041065738-e72023775cdc?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29uZG98ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1531383339897-f369f6422e40?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dG93biUyMGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D",
    "https://media.istockphoto.com/id/520614902/photo/bright-modern-contemporary-kitchen-and-dinning-room.webp?a=1&b=1&s=612x612&w=0&k=20&c=qrMT-I1SfzV_q1MO-_GiSP1imIoSTEQG9MGbxnWWglw="
  ];
  const theme = useTheme();
  const [liked, setLiked] = useState(false);

  const handleOpenDetails = () => {
    navigate(`/properties/${property.id}`);
  };

  const handleOpenInNewTab = (e) => {
    e.stopPropagation();
    window.open(`/properties/${property.id}`, "_blank");
  };

  const hasOfferPrivilages = user && user.userType === "CUSTOMER";
  return (
    <Card 
      sx={{ 
        maxWidth: 550, 
        width: 325, 
        borderRadius: 2, 
        boxShadow: theme.shadows[3], 
        position: "relative",
        cursor: "pointer"
      }} 
      onClick={handleOpenDetails}
      >
      <CardMedia 
        component="img" 
        height="200" 
        image={property?.images?.[0] || defaultImages[0]} 
        alt="Property Image" />

      <Chip
        label={property.listingType === "FOR_SALE" ? "For Sale" : "For Rent"}
        sx={{
          position: "absolute",
          top: 10,
          left: 10,
          backgroundColor: property.listingType === "FOR_SALE" ? "#dc7633" : "#2E86C1",
          color: "white",
          fontWeight: "bold",
        }}
      />
      <CardContent sx={{ backgroundColor: "white" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            ${property?.price?.toLocaleString()}
          </Typography>
          {hasOfferPrivilages && <IconButton onClick={() => setLiked(!liked)} color="primary">
            {liked ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>}
          <IconButton onClick={handleOpenInNewTab}>
            <OpenInNew />
          </IconButton>
        </Box>

        <Typography variant="body2">
          {property.bedrooms} bds | {property.bathrooms} ba | {property.area} sqft
        </Typography>

        <Typography variant="body2" color="textSecondary">
          {property.address.street}, {property.address.city}, {property.address.state}
        </Typography>

        <Box display="flex" alignItems="center" mt={1}>
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: statusColors[property.propertyStatus] || "gray",
              mr: 1,
            }}
          />
          <Typography variant="body2">{property.propertyStatus.replace("_", " ")}</Typography>
        </Box>

        <Chip label={property.propertyType} color="primary" variant="outlined" sx={{ mt: 1 }} />

        <Typography variant="caption" display="block" mt={1} color="textSecondary">
          Owned by: {property.owner.firstName} {property.owner.lastName}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
