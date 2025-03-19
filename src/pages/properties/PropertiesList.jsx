import React from 'react'
import PropertyCard from '../../components/cards/PropertyCard';
import { Typography, Container } from '@mui/material';

function PropertiesList({ properties }) {
  return (
    <Container 
      sx={{ 
        display: "flex", 
        gap: "2rem", 
        marginTop: "2rem", 
        flexWrap: "wrap",
        maxWidth: "1460px !important"
        }}>
      {properties.length > 0 
        ? properties.map((property) => <PropertyCard key={property.id} property={property}/>)
        : <Typography>No Properties found please check you filters!</Typography>}
    </Container>
  )
}

export default PropertiesList