import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { PropertiesTable } from "./Properties";
import { UsersTable } from "./Users";
import { Sidebar } from "./Sidebar";
import { Route, Routes } from "react-router-dom";

export const Admin = () => {
  const [activeTab, setActiveTab] = useState("properties");

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <div style={{ display: "flex" }}>
        <Sidebar setActiveTab={setActiveTab} />
        <Container style={{ marginLeft: 10, marginTop: 20 }}>
          {activeTab === "properties" ? <PropertiesTable /> : <UsersTable />}
        </Container>
      </div>
    </>
  );
};
