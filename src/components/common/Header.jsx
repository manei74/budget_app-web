import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import DashboardSidebar from "./DashboardSidebar";

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <DashboardSidebar />
        <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
          My Finance App
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
