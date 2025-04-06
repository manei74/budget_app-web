import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BackButton = ({ children, ...props }) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="text"
      startIcon={<ArrowBackIcon />}
      onClick={() => navigate(-1)}
      {...props}
    >
      {children || "Back"}
    </Button>
  );
};

export default BackButton;
