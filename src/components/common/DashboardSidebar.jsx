import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate } from "react-router-dom";

export default function DashboardSidebar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  const handleTransactionClick = () => {
    navigate("/transactions");
    setOpen(false);
  };

  const handleFamilyMembersClick = () => {
    navigate("/family-members");
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={toggleDrawer(true)} color="inherit">
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <List sx={{ width: 250 }}>
          <ListItem button onClick={handleTransactionClick}>
            <ListItemIcon>
              <ReceiptLongIcon />
            </ListItemIcon>
            <ListItemText primary="Transactions" />
          </ListItem>
          <ListItem button onClick={handleFamilyMembersClick}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Family Members" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
