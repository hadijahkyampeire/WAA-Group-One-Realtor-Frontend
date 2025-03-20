import { useState } from "react";
import {
  Button,
  Box,
  Typography,
  IconButton,
  Chip,
  Tooltip,
  CardMedia,
} from "@mui/material";

import { useAuth } from "../../context/AuthContext"
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import Carousel from "react-material-ui-carousel";
import { getFileUrl } from "../../api";
import AddOfferComponent from "../../pages/customer/AddEditOffer";
import { useProperties } from "../../context/Properties";

const fallbackImages = [
  "https://images.unsplash.com/photo-1580041065738-e72023775cdc?w=900&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1531383339897-f369f6422e40?w=900&auto=format&fit=crop&q=60",
  "https://media.istockphoto.com/id/520614902/photo/bright-modern-contemporary-kitchen-and-dinning-room.webp"
];

export const PropertyDetailsContent = ({ property, offers }) => {
  const { user } = useAuth();
  const canMakeAnOffer = property?.propertyStatus === "AVAILABLE" || property?.propertyStatus === "PENDING";
  const hasOfferPrivileges = user && user.userType === "CUSTOMER";
  const images = property?.images || fallbackImages;
  const [open, setOpen] = useState(false);
  const { favoriteProperties, toggleFavorite } = useProperties();
  const isFavorite = favoriteProperties?.some((fav) => fav.id === property.id);
  console.log(property, 'pp')

  return (
    <>
      <Carousel animation="slide">
        {images.map((img, index) => (
          <CardMedia key={index} component="img" height="400" image={getFileUrl(img)} alt={`Property Image ${index + 1}`} />
        ))}
      </Carousel>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
        <Chip
          label={property.listingType === "FOR_SALE" ? "For Sale" : "For Rent"}
          sx={{
            backgroundColor: property.listingType === "FOR_SALE" ? "#dc7633" : "#2E86C1",
            color: "white",
            fontWeight: "bold",
          }}
        />
        {hasOfferPrivileges && (
          <IconButton 
            onClick={(event) => {
              event.stopPropagation();
              toggleFavorite(property.id);
            }}
            size="large"
            color="primary">
            {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>
        )}
        {user ?
          hasOfferPrivileges && (
          <Tooltip title={!user ? "Login to proceed with the offer" : ""} arrow>
            <span>
              <Button disabled={!canMakeAnOffer} variant="contained" onClick={()=> setOpen(true)}>
                Make an Offer
              </Button>
            </span>
          </Tooltip>
          ) : <Tooltip title={"Login to proceed with the offer"} arrow>
            <span>
              <Button disabled={true} variant="contained" onClick={()=> setOpen(true)}>
                Make an Offer
              </Button>
            </span>
          </Tooltip>
          }
      </Box>

      <Typography variant="h4" sx={{ mt: 2 }}>${property?.price?.toLocaleString()}</Typography>
      <Typography variant="h6" color="textSecondary">
        {property.address?.street}, {property.address?.city}, {property.address?.state}
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>Property Features</Typography>
      <Typography>{property.bedrooms} Beds • {property.bathrooms} Baths • {property.area} sqft</Typography>

      <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold" }}>Why You’ll Love This Property</Typography>
      <Typography>{property.specialFeature || "A stunning home with modern design and exceptional features."}</Typography>

      <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold" }}>Property Description</Typography>
      <Typography>
        {property.description || "This exquisite property boasts a contemporary design, high-end finishes, and a spacious layout."}
      </Typography>

      <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold" }}>Offers</Typography>
      <Typography>{offers || 0} offer(s)</Typography>

      <Typography variant="caption" display="block" mt={1} color="textSecondary">
        Owned by: {property.owner?.firstName} {property.owner?.lastName}
      </Typography>

      <AddOfferComponent open={open} handleClose={() => setOpen(false)} property={property} />
    </>
  );
};
