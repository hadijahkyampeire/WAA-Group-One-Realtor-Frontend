import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Typography, CardMedia, Chip, Container, Box, Tooltip, Button } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { fetchProperty } from "../api/properties";
import { properties } from "../data/properties";
import { useNavigate, useLocation } from "react-router-dom";
import AddOfferComponent from "./customer/AddEditOffer";
import { useAuth } from "../context/AuthContext";
import NavBarLayout from "../layouts/NavBarLayout";

const PropertyDetails = () => {
  const { id } = useParams();
  const [propertyDetails, setPropertyDetails] = useState({});
  const [open, setOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const handleClose = () => setOpen(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate("/properties");
    }
  };

  const handleOpen = () => setOpen(true);

  const fallbackImages = [
    "https://images.unsplash.com/photo-1580041065738-e72023775cdc?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29uZG98ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1531383339897-f369f6422e40?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dG93biUyMGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D",
    "https://media.istockphoto.com/id/520614902/photo/bright-modern-contemporary-kitchen-and-dinning-room.webp?a=1&b=1&s=612x612&w=0&k=20&c=qrMT-I1SfzV_q1MO-_GiSP1imIoSTEQG9MGbxnWWglw="
  ];

  useEffect(() => {
    if(id) {
      fetchProperty(id)
      .then(res => setPropertyDetails(res.data))
      .catch(err => console.error(err || "Error fetching property"))
    }
  }, [id]);

  const property = properties.find((p) => p.id === id) || propertyDetails;

  if (!property) return <Typography>Property Not Found</Typography>;

  const canMakeAnOffer = property.propertyStatus === 'AVAILABLE' || property.propertyStatus === 'PENDING';
  const hasOfferPrivilages = user && user.userType === "CUSTOMER";

  const images = property?.images || fallbackImages
  return (
    <NavBarLayout>
      <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
        <Button onClick={handleBack}>Back to List</Button>
        <Carousel animation="slide">
          {images.map((img, index) => (
            <CardMedia key={index} component="img" height="400" image={img} alt={`Property Image ${index + 1}`} />
          ))}
        </Carousel>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Chip
            label={property.listingType === "FOR_SALE" ? "For Sale" : "For Rent"}
            sx={{
              mt: 2,
              backgroundColor: property.listingType === "FOR_SALE" ? "#dc7633" : "#2E86C1",
              color: "white",
              fontWeight: "bold",
            }}
          />
          {hasOfferPrivilages && (
            <IconButton onClick={() => setLiked(!liked)} color="primary">
            {liked ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>)}
          {(canMakeAnOffer && hasOfferPrivilages) &&  (
            <Tooltip title={!user ? "Login to proceed with the offer" : ""} arrow>
              <span>
                <Button disabled={!user} variant="contained" onClick={handleOpen}>
                  Make an Offer
                </Button>
              </span>
            </Tooltip>)}
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
          {property.description || "This exquisite property boasts a contemporary design, high-end finishes, and a spacious layout. The open-concept living area is perfect for entertaining, and the backyard provides a private oasis with a beautifully landscaped garden. Situated in a prime location, this home offers easy access to schools, shopping centers, and public transportation."}
        </Typography>
        <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold" }}>Offers</Typography>
        <Typography>
            {property.offers?.length || 0} offer(s)
        </Typography>
        <Typography variant="caption" display="block" mt={1} color="textSecondary">
          Owned by: {property.owner.firstName} {property.owner.lastName}
        </Typography>
        <AddOfferComponent open={open} handleClose={handleClose} property={property} />
      </Container>
    </NavBarLayout>
  );
};

export default PropertyDetails;
