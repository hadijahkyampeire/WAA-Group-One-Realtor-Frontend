import { 
  Modal, Typography, Box,TableRow,
  TableCell, TableHead, TableBody, Table, Select, MenuItem, Collapse 
} from "@mui/material";

export const OwnerPropertyDetailsModal = ({ 
  open, onClose, property, offers, handleOfferStatusChange
 }) => {
  if (!property) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ width: 600, margin: "100px auto", padding: 4, backgroundColor: "white", borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          {property.propertyType} - ${property.price.toLocaleString()}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Address: {property?.address?.street}, {property?.address?.city}, {property?.address?.state}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Area: {property.area.toLocaleString()} sqft
        </Typography>
        <Typography variant="body2" gutterBottom>
          Bedrooms: {property.bedrooms}, Bathrooms: {property.bathrooms}
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Offers
        </Typography>
        {offers && offers.length > 0 && <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {offers.map((offer) => (
                    <TableRow key={offer.id}>
                      <TableCell component="th" scope="row">
                        {offer.createDate}
                      </TableCell>
                      <TableCell align="right">{offer.amountOffered}</TableCell>
                      <TableCell align="right">
                        <Select
                          defaultValue={offer.offerStatus}
                          onChange={(e) => handleOfferStatusChange(offer.id, e.target.value, property.id)}
                          size="small"
                        >
                          <MenuItem value="OFFERED">Select an Status</MenuItem>
                          <MenuItem value="APPROVED">Approved</MenuItem>
                          <MenuItem value="REJECTED">Rejected</MenuItem>
                          <MenuItem value="CLOSED">Closed</MenuItem>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>}
      </Box>
    </Modal>
  );
};
