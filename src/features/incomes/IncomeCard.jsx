import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  CardActionArea,
  IconButton,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CloseIcon from "@mui/icons-material/Close";

const IncomeCard = ({ income, onClick, onDelete }) => {
  const { title, amount, icon, owner } = income;

  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: "1rem",
        cursor: "pointer",
        position: "relative",
        // When hovering over the card, set any element with class "deleteIcon" to full opacity.
        "&:hover .deleteIcon": { opacity: 1 },
      }}
      onClick={() => onClick && onClick(income)}
    >
      <CardActionArea>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            {icon ? (
              <Typography variant="h4" sx={{ mr: 1 }}>
                {icon}
              </Typography>
            ) : (
              <AttachMoneyIcon sx={{ fontSize: 40, mr: 1 }} />
            )}
            <Box>
              <Typography variant="h5">{title}</Typography>
              <Typography color="text.secondary">Total: ${amount}</Typography>
            </Box>
          </Box>
          {/* {owner && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar src={owner.avatar} alt={owner.name} sx={{ mr: 1 }} />
              <Typography variant="body1">{owner.name}</Typography>
            </Box>
          )} */}
        </CardContent>
      </CardActionArea>
      {onDelete && (
        <Box sx={{ position: "absolute", top: 4, right: 4 }}>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(income.id);
            }}
            className="deleteIcon"
            sx={{
              opacity: 0,
              transition: "opacity 0.3s",
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Card>
  );
};

export default IncomeCard;
