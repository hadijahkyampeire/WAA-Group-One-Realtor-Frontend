import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { fetchOwnerProperties } from '../../api/properties';
import NavBarLayout from '../../layouts/NavBarLayout';

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
    <h1>Your Properties</h1>
    
    <Button component={Link} to="/properties/create">Add Property</Button>
  </NavBarLayout>
  )
}

export default OwnerDashboard