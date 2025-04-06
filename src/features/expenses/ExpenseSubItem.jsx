import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

const ExpenseSubItem = ({ sub, categoryId, onSubcategoryClick }) => {
  return (
    <Card sx={{ minWidth: 120 }}>
      <CardActionArea onClick={() => onSubcategoryClick(categoryId, sub)}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h4">{sub.icon}</Typography>
            <Typography variant="body2">{sub.name}</Typography>
            <Typography variant="caption">${sub.amount.toFixed(2)}</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ExpenseSubItem;
