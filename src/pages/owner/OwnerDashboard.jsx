import React, { useEffect, useState } from 'react'
import { 
  Box,
  Button,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Select,
  MenuItem,
  IconButton,
  Collapse,
  Typography
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Link } from 'react-router-dom'
import { fetchOwnerProperties } from '../../api/properties';
import NavBarLayout from '../../layouts/NavBarLayout';


function ListRow({ property }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow
        key={property.id}
        sx={{ pointerEvents: property.enabled ? "initial" : "none", opacity: property.enabled ? 1 : 0.5 }}
      >
        <TableCell>
          {property.offers && property.offers.length > 0 &&
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
    }
        </TableCell>
        <TableCell>{property.propertyType}</TableCell>
        <TableCell>
          {property.address.street}, {property.address.city}, {property.address.state}
        </TableCell>
        <TableCell>
          {property.area.toLocaleString()}<br/>
          <small>{property.bathrooms} Bathrooms</small><br/>
          <small>{property.bedrooms} Bedrooms</small><br/>
        </TableCell>
        <TableCell>${property.price.toLocaleString()}</TableCell>
        <TableCell>
          <Select
            value={property.propertyStatus}
            // onChange={(e) => handleStatusChange(property.id, e.target.value)}
            size="small"
          >
            <MenuItem value="AVAILABLE">Available</MenuItem>
            <MenuItem value="SOLD">Sold</MenuItem>
          </Select>
        </TableCell>
      </TableRow>
      {property.offers && property.offers.length > 0 && <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Enabled</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {property.offers.map((offer) => (
                    <TableRow key={offer.id}>
                      <TableCell component="th" scope="row">
                        {offer.createDate}
                      </TableCell>
                      <TableCell>{offer.enabled}</TableCell>
                      <TableCell align="right">{offer.amountOffered}</TableCell>
                      <TableCell align="right">
                        <Select
                          value={offer.offerStatus}
                          // onChange={(e) => handleStatusChange(property.id, e.target.value)}
                          size="small"
                        >
                          <MenuItem value="OFFERED">Offered</MenuItem>
                          <MenuItem value="APPROVED">Approved</MenuItem>
                          <MenuItem value="REJECTED">Rejected</MenuItem>
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
    </>
  )
}


function OwnerDashboard() {
  const [properties, setProperties] = useState([]);

  const getOwnerProperties = () => {
    fetchOwnerProperties()
    .then(res => setProperties(res.data))
    .catch(err => console.error(err || "Error"))
  }

  useEffect(() => {
    getOwnerProperties();
  },[]);

  console.log(properties, 'pp')
  return (
    <NavBarLayout>
      <div style={{ display:'flex', justifyContent: 'space-between', alignContent: 'flex-end'}}>
        <h1>Your Properties</h1>
        <Button component={Link} to="/properties/create">Add Property</Button>
      </div>

      <Box>
        <TableContainer sx={{ borderRadius: 3, boxShadow: 4 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell></TableCell>
                <TableCell><b>Property</b></TableCell>
                <TableCell><b>Address</b></TableCell>
                <TableCell><b>Area (sqft)</b></TableCell>
                <TableCell><b>Price ($)</b></TableCell>
                <TableCell><b>Status</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {properties.map((property) => <ListRow key={property.id} property={property} />)}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </NavBarLayout>
  )
}

export default OwnerDashboard