import React, { useState, useEffect } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import { fetchCustomerOffers, updateOffer } from "../../api/offers";
import AddOfferComponent from "./AddEditOffer";

const OfferHistoryList = () => {
  const [offers, setOffers] = useState([]);
  const [openEditModal, setOpenEditModal] = useState();

  useEffect(() => {
    fetchCustomerOffers()
    .then((res) => {
      console.log(res.data)
      setOffers(res.data.payLoads);
    });
  }, []);

  const handleCancelOffer = async (offer) => {
    try {
      await updateOffer(offer.id, {...offer, offerStatus: "CANCELLED" });

    } catch(err) {
      console.error(err || "Error cancelling an offer")
    }
  }


  return (
    <div>
      <Typography>Your Offer History</Typography>
      <Table sx={{ mt: 4 }}>
        <TableHead>
          <TableRow>
            <TableCell>Amount Offered</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {offers.length > 0 ? offers?.map((offer) => (
            <TableRow key={offer.id}>
              <TableCell>${offer.amountOffered}</TableCell>
              <TableCell>{offer.offerStatus}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => setOpenEditModal(offer)}><EditIcon /></IconButton>
                <IconButton color="error" onClick={() => handleCancelOffer(offer)}><CancelIcon /></IconButton>
              </TableCell>
            </TableRow>
          )): <TableRow><TableCell>No offers made yet</TableCell></TableRow>}
        </TableBody>
      </Table>
     <AddOfferComponent open={openEditModal} offerDetails={openEditModal} handleClose={() => setOpenEditModal(null)} />
    </div>
  );
};

export default OfferHistoryList;
