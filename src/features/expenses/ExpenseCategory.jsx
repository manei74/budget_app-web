import React from "react";
import { Card, CardContent, Typography, Box, Divider } from "@mui/material";
import ExpenseSubItem from "./ExpenseSubItem";

const ExpenseCategory = ({ category, onSubcategoryClick }) => {
  return (
    <Card sx={{ margin: "1rem" }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Typography variant="h4" sx={{ mr: 1 }}>
            {category.icon}
          </Typography>
          <Typography variant="h5">{category.name}</Typography>
        </Box>
        <Divider sx={{ mb: 1 }} />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {category.subcategories.map((sub) => (
            <ExpenseSubItem
              key={sub.id}
              sub={sub}
              categoryId={category.id}
              onSubcategoryClick={onSubcategoryClick}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ExpenseCategory;
