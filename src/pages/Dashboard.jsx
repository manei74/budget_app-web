import React from "react";
import { Container, Typography } from "@mui/material";
import Header from "../components/common/Header";
import DashboardStats from "../components/DashboardStats";

export default function Dashboard() {
  return (
    <Container>
      <Header />
      <Typography variant="h4" gutterBottom align="center" sx={{ py: 2 }}>
        Dashboard
      </Typography>
      <DashboardStats />
    </Container>
  );
}
