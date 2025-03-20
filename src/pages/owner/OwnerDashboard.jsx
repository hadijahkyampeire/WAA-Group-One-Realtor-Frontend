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
  Tooltip
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Link } from 'react-router-dom'
import { fetchOwnerProperties, fetchSingleProperty, updatePropertyStatus, deleteProperty, getPropertyOffers } from '../../api/properties';
import NavBarLayout from '../../layouts/NavBarLayout';
import { useAuth } from '../../context/AuthContext';
import { updateOffer } from '../../api/offers';
import { BiTrash } from 'react-icons/bi';
import { OwnerPropertyDetailsModal } from './OwnerPropertyDetailsModal';


function ListRow({ property, onChangeProperty, onRowClick, getOwnerProperties }) {
  const [open, setOpen] = React.useState(false);

  const handlePropertyStatusChange = (propertyId, status) => {
    updatePropertyStatus(propertyId, status)
      .then((res) => {
        console.log("Property updated", res.data);
        onChangeProperty(propertyId);
      })
      .catch((error) => {
        console.error("Error updating property", error);
      });
  }

  const handleDeleteProperty = (propertyId) => {
    try {
      deleteProperty(propertyId)
        .then((res) => {
          console.log("Property deleted", res.data);
          onChangeProperty(propertyId);
          getOwnerProperties();
        })
        .catch((error) => {
          console.error("Error deleting property", error);
        });
    } catch(err) {
      console.error(err || "Error deleting property")
    }
  }

  return (
    <>
      <TableRow
        onClick={() => onRowClick(property)}
        key={property.id}
        sx={{ 
          pointerEvents: property.enabled 
          ? "initial" 
          : "none", 
          cursor: "pointer",
          backgroundColor: property.propertyStatus === "SOLD" ? "#c8c4c4" : "white",
          opacity: property.enabled ? 1 : 0.5 }}
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
          {property?.address?.street}, {property?.address?.city}, {property?.address?.state}
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
            onChange={(e) => handlePropertyStatusChange(property.id, e.target.value)}
            size="small"
          >
            <MenuItem value="AVAILABLE">Available</MenuItem>
            <MenuItem value="SOLD">Sold</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="CONTINGENT">Contingent</MenuItem>
            <MenuItem value="UNVERIFIED">Unverified</MenuItem>
          </Select>
        </TableCell>
        <TableCell>
          <IconButton 
          color='error' 
          variant='outline' 
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteProperty(property.id)}}>
            <BiTrash/>
          </IconButton>
        </TableCell>

      </TableRow>
    </>
  )
}


function OwnerDashboard() {
  const [properties, setProperties] = useState([]);
  const { user } = useAuth();
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [offers, setOffers] = useState([]);

  const getOwnerProperties = () => {
    fetchOwnerProperties()
    .then(res => setProperties(res.data))
    .catch(err => console.error(err || "Error"))
  }

  const fetchOffersForProperty = (propertyId) => {
    getPropertyOffers(propertyId)
    .then(res => {
      setOffers(res.data.payLoads);
    })
    .catch(err => console.error(err || "Error"))
  }

  useEffect(() => {
    getOwnerProperties();
  },[]);

  const ownerAllowed = user?.verified && user?.enabled;
  const handleChangeProperty = (propertyId) => {
    fetchSingleProperty(propertyId)
    .then(res => {
      const updatedProperty = res.data;
      const index = properties.findIndex(property => property.id === propertyId);
      const newProperties = [...properties];
      newProperties[index] = updatedProperty;
      setProperties(newProperties);
    })
    .catch(err => console.error(err || "Error"))
  }

  const handleRowClick = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
    fetchOffersForProperty(property.id);
  };

  const handleOfferStatusChange = (offerId, status, propertyId) => {
    updateOffer(offerId, { offerStatus: status })
      .then((res) => {
        console.log("Offer updated", res.data);
        handleChangeProperty(propertyId);
      })
      .catch((error) => {
        console.error("Error updating offer", error);
      });
  }

  return (
    <NavBarLayout>
      <div style={{ display:'flex', justifyContent: 'space-between', alignContent: 'flex-end'}}>
        <h1>Your Properties</h1>
        <Tooltip title={!ownerAllowed ? "You need to be verified to start adding properties" : ""} arrow>
          <span>
            <Button 
              variant="contained"
              component={Link} to="/properties/create" 
              disabled={!ownerAllowed}>
                Add Property
            </Button>
          </span>
        </Tooltip>
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
                <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {properties.map((property) => <ListRow 
                key={property.id} 
                property={property} 
                onChangeProperty={handleChangeProperty} 
                getOwnerProperties={getOwnerProperties}
                onRowClick={handleRowClick} />)}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <OwnerPropertyDetailsModal 
        open={isModalOpen}
        property={selectedProperty}
        onClose={() => setIsModalOpen(false)}
        handleOfferStatusChange={handleOfferStatusChange}
        offers={offers}
        />
    </NavBarLayout>
  )
}

export default OwnerDashboard