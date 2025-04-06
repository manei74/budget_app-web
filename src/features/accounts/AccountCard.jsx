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
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CloseIcon from "@mui/icons-material/Close";

const AccountCard = ({ account, onTransferClick, onDelete }) => {
  const { name, balance, icon, owner } = account;

  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: "1rem",
        position: "relative",
        // When hovering over the card, show any child with class "deleteIcon"
        "&:hover .deleteIcon": { opacity: 1 },
      }}
    >
      <CardActionArea
        onClick={() => onTransferClick && onTransferClick(account)}
      >
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            {icon ? (
              <Typography variant="h4" sx={{ mr: 1 }}>
                {icon}
              </Typography>
            ) : (
              <AccountBalanceWalletIcon sx={{ fontSize: 40, mr: 1 }} />
            )}
            <Box>
              <Typography variant="h5">{name}</Typography>
              <Typography color="text.secondary">
                Balance: ${balance}
              </Typography>
            </Box>
          </Box>
          {/* Optionally, render owner info if needed */}
          {/* {owner && (
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
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
            className="deleteIcon"
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering onTransferClick
              onDelete(account.id);
            }}
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

export default AccountCard;
