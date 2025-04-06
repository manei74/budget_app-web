import React, { useState } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";

export default function BottomNav() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate("/accounts");
        break;
      case 1:
        navigate("/incomes");
        break;
      case 2:
        navigate("/expenses");
        break;
      default:
        break;
    }
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation value={value} onChange={handleChange} showLabels>
        <BottomNavigationAction
          label="Accounts"
          icon={<AccountBalanceWalletIcon />}
        />
        <BottomNavigationAction label="Incomes" icon={<AttachMoneyIcon />} />
        <BottomNavigationAction label="Expenses" icon={<ShoppingCartIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
