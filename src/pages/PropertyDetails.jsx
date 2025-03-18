import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Typography, CardMedia, Chip, Container } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { fetchProperty } from "../api/properties";
import { properties } from "../data/properties";

const PropertyDetails = () => {
  const { id } = useParams();
  const [propertyDetails, setPropertyDetails] = useState({});
  console.log(propertyDetails, id)

  useEffect(() => {
    if(id) {
      fetchProperty(id)
      .then(res => setPropertyDetails(res.data))
      .catch(err => console.error(err || "Error fetching property"))
    }
  }, [id]);
  const property = properties.find((p) => p.id === id);

  if (!property) return <Typography>Property Not Found</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Link to="/properties">Back to List</Link>
      <Carousel animation="slide">
        {property.images.map((img, index) => (
          <CardMedia key={index} component="img" height="400" image={img} alt={`Property Image ${index + 1}`} />
        ))}
      </Carousel>

      <Chip
        label={property.listingType === "FOR_SALE" ? "For Sale" : "For Rent"}
        sx={{
          mt: 2,
          backgroundColor: property.listingType === "FOR_SALE" ? "#dc7633" : "#2E86C1",
          color: "white",
          fontWeight: "bold",
        }}
      />

      <Typography variant="h4" sx={{ mt: 2 }}>${property.price.toLocaleString()}</Typography>
      <Typography variant="h6" color="textSecondary">
        {property.address.street}, {property.address.city}, {property.address.state}
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>Property Features</Typography>
      <Typography>{property.bedrooms} Beds • {property.bathrooms} Baths • {property.area} sqft</Typography>

      <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold" }}>Why You’ll Love This Property</Typography>
      <Typography>{property.specialFeature || "A stunning home with modern design and exceptional features."}</Typography>

      <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold" }}>Property Description</Typography>
      <Typography>
        {property.description || "This exquisite property boasts a contemporary design, high-end finishes, and a spacious layout. The open-concept living area is perfect for entertaining, and the backyard provides a private oasis with a beautifully landscaped garden. Situated in a prime location, this home offers easy access to schools, shopping centers, and public transportation."}
      </Typography>
    </Container>
  );
};

export default PropertyDetails;
