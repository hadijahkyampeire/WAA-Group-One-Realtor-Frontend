import React from 'react'
import { Box } from '@mui/material'
import { useAuth } from '../context/AuthContext'
import AnonymousNavbar from '../components/navbar/AnonymousNavBar'
import AuthenticatedNavbar from '../components/navbar/AuthenticatedNavBar'

function NavBarLayout({ children }) {
  const { user, token } = useAuth();
  return (
    <Box>
      {(user && token) ? <AuthenticatedNavbar /> : <AnonymousNavbar />}
      <Box component="main" sx={{ padding: "20px", minHeight: "100vh", mt: 8 }}>
        {children}
      </Box>
    </Box>
  )
}

export default NavBarLayout