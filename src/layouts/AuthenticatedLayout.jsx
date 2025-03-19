import React from 'react'
import { Box } from "@mui/material";
import AuthenticatedNavbar from '../components/navbar/AuthenticatedNavBar'

function AuthenticatedLayout({ children }) {
  return (
    <Box>
      <AuthenticatedNavbar />
      <Box component="main" sx={{ padding: "20px", minHeight: "100vh", mt: 8 }}>
        {children}
      </Box>
    </Box>
  )
}

export default AuthenticatedLayout