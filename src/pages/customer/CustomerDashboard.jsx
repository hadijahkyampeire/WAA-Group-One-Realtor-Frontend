import React, { useState, useEffect } from 'react'
import { 
  Container, 
  Drawer, 
  Box, 
  ListItem, 
  ListItemText, 
  List, 
  ListItemIcon 
} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import OfferHistoryList from './OfferHistoryList'
import PropertiesList from './Properties'
import NavBarLayout from '../../layouts/NavBarLayout';

function CustomerDashboard() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("");

  useEffect(() => {
    const tab = location.hash.replace("#", "") || "properties"; 
    setSelectedTab(tab);
  }, [location.hash]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    navigate(`/customer/dashboard#${tab}`);
  };

  return (
    <NavBarLayout>
      <Box>
        <Drawer 
          variant="permanent" 
          sx={{ 
            width: 240, 
            flexShrink: 0, 
            mt: 8,
            "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box", mt: 8 } }}>
          <List>
            <ListItem 
            sx={{   
              cursor: "pointer",
              "&:hover": { backgroundColor: "action.hover" },
              "&.Mui-selected": { backgroundColor: "primary.light", color: "primary.contrastText" },
              "&.Mui-selected:hover": { backgroundColor: "primary.main" } 
            }} 
              selected={selectedTab === "properties"} 
              onClick={() => handleTabChange("properties")}>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Properties" />
            </ListItem>
            <ListItem 
              sx={{   
              cursor: "pointer",
              "&:hover": { backgroundColor: "action.hover" },
              "&.Mui-selected": { backgroundColor: "primary.light", color: "primary.contrastText" },
              "&.Mui-selected:hover": { backgroundColor: "primary.main" } 
              }}
              selected={selectedTab === "offers"} 
              onClick={() => handleTabChange("offers")}>
              <ListItemIcon><HistoryIcon /></ListItemIcon>
              <ListItemText primary="Offer History" />
            </ListItem>
          </List>
        </Drawer>

        <Container sx={{ flexGrow: 1, p: 3, marginLeft: "230px" }}>
          {selectedTab === "properties" && <PropertiesList />}
          {selectedTab === "offers" && <OfferHistoryList />}
        </Container>
      </Box>
   </NavBarLayout>
  )
}

export default CustomerDashboard