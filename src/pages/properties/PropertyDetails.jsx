import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Container, Button } from "@mui/material";
import { fetchProperty } from "../../api/properties";
import { useNavigate, useLocation } from "react-router-dom";
import AddOfferComponent from "../customer/AddEditOffer";
import NavBarLayout from "../../layouts/NavBarLayout";
import { PropertyDetailsContent } from "../../components/cards/Details";

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const [propertyDetails, setPropertyDetails] = useState({});
  const [open, setOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (id) {
      fetchProperty(id)
        .then(res => setPropertyDetails(res.data))
        .catch(err => console.error(err || "Error fetching property"));
    }
  }, [id]);

  const handleBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate("/");
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const property = propertyDetails;

  if (!property) return <Typography>Property Not Found</Typography>;

  return (
    <NavBarLayout>
      <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
        <Button onClick={handleBack}>Back to List</Button>
        <PropertyDetailsContent property={property} liked={liked} setLiked={setLiked} handleOpen={handleOpen} />
        <AddOfferComponent open={open} handleClose={handleClose} property={property} />
      </Container>
    </NavBarLayout>
  );
};

export default PropertyDetailsPage;
