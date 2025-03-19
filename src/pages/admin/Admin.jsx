import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { PropertiesTable } from "./Properties";
import { UsersTable } from "./Users";
import { Sidebar } from "./Sidebar";
import { OwnersTable } from "./Owners";

export const Admin = () => {
  const [activeTab, setActiveTab] = useState("properties");

  return (
    <div style={{ display: "flex" }}>
      <Sidebar setActiveTab={setActiveTab} />
      <Container style={{ marginLeft: 10, marginTop: 20 }}>
        {activeTab === "properties" 
        ? <PropertiesTable /> 
        : activeTab === "owners" 
        ? <OwnersTable /> 
        : <UsersTable />}
      </Container>
    </div>
  );
};
