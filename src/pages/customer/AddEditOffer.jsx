import React, { useState, useEffect } from "react";
import { Modal, Box, Button, TextField, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { makeOffer, updateOffer } from "../../api/offers";

const AddOfferComponent = ({ property = {}, open, handleClose, offerDetails }) => {
  const [offerAmount, setOfferAmount] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async () => {
    const offerPayload = {
      enabled: true,
      createDate: new Date().toISOString(),
      updateDate: new Date().toISOString(),
      offerStatus: "OFFERED",
      amountOffered: parseFloat(offerAmount),
    };

    try {
      if (offerDetails) {
        await updateOffer(offerDetails.id, offerPayload);
      } else {
        await makeOffer(property.id, offerPayload);
      }
      navigate("/customer/dashboard#offers");
      handleClose();
      setOfferAmount("");
    } catch (error) {
      console.error("Error submitting offer:", error);
    }
  };

  useEffect(() => {
    if (offerDetails) {
      setOfferAmount(offerDetails.amountOffered);
    }
  }, [offerDetails]);

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ width: 400, bgcolor: "white", p: 4, mx: "auto", mt: "20vh", borderRadius: 2 }}>
          <h2>Submit an Offer for {property?.propertyType} in {property?.address?.street}, {property?.address?.city}, {property?.address?.state}, {property?.address?.zipcode}</h2>
          <TextField
            fullWidth
            label="$ Price Offer"
            type="number"
            value={offerAmount}
            onChange={(e) => setOfferAmount(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
            {offerDetails ? "Update Offer" : "Submit Offer"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AddOfferComponent;
