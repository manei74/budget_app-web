import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const DashboardButton = ({ children, ...props }) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="text"
      startIcon={<HomeIcon />}
      onClick={() => navigate("/")}
      {...props}
    >
      {children || "Dashboard"}
    </Button>
  );
};

export default DashboardButton;
