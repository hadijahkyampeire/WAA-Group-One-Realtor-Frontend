import { Box, Drawer, List, ListItem, ListItemText } from "@mui/material";
import React from "react";

export const Sidebar = ({ setActiveTab }) => {
  return (
    <Box
      sx={{
        bgcolor: "#f4f4f4",
        padding: 2,
        minHeight: "90vh",
        minWidth: "25vh",
      }}
    >
      <List sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
        <ListItem
          button
          sx={{ cursor: "pointer" }}
          onClick={() => setActiveTab("properties")}
        >
          <ListItemText primary="Properties" />
        </ListItem>
        <ListItem
          sx={{ cursor: "pointer" }}
          button
          onClick={() => setActiveTab("customers")}
        >
          <ListItemText primary="Customers" />
        </ListItem>
      </List>
    </Box>
  );
};
