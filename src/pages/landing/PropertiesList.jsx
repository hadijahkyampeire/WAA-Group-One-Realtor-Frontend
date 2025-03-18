import React, { useEffect, useState } from 'react'
import { properties } from '../../data/properties'
import { fetchAllProperties } from '../../api/properties';
import PropertyCard from '../../components/cards/PropertyCard';
import { Typography, Container } from '@mui/material';

function PropertiesList() {
  const [propertyData, setPropertyData] = useState(properties);

  const fetchProperties = () => {
    fetchAllProperties()
      .then(res => {
        console.log(res.data)
        setPropertyData([...propertyData, ...res.data])
      })
      .catch(err => console.error(err || "Error "))
  }

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <Container 
      sx={{ 
        display: "flex", 
        gap: "2rem", 
        marginTop: "2rem", 
        flexWrap: "wrap",
        maxWidth: "1460px !important"
        }}>
      {propertyData.length > 0 
        ? propertyData.map((property) => <PropertyCard key={property.id} property={property}/>)
        : <Typography>No Properties found please check you filters!</Typography>}
    </Container>
  )
}

export default PropertiesList