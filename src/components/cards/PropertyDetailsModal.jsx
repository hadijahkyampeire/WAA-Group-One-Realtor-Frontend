import { useEffect, useState } from "react";
import { Typography, Dialog, DialogContent } from "@mui/material";
import { fetchProperty } from "../../api/properties";
import { PropertyDetailsContent } from "./Details";

const PropertyDetailsModal = ({  id, open, handleClose }) => {
  const [propertyDetails, setPropertyDetails] = useState({});

  useEffect(() => {
    if (id) {
      fetchProperty(id)
        .then(res => setPropertyDetails(res.data))
        .catch(err => console.error(err || "Error fetching property"));
    }
  }, [id]);

  if (!propertyDetails) return <Typography>Property Not Found</Typography>;

    return (
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent>
          <PropertyDetailsContent property={propertyDetails}  />
        </DialogContent>
      </Dialog>
    );
};

export default PropertyDetailsModal;
