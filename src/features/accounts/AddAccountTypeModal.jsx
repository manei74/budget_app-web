import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { FamilyContext } from "../family/FamilyContext";

export default function AddAccountTypeModal({
  open,
  onClose,
  onAddAccountType,
}) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [balance, setBalance] = useState("");
  const [selectedMemberId, setSelectedMemberId] = useState("");

  const { members } = useContext(FamilyContext);

  const handleAdd = () => {
    console.log("handleAdd called", { name, icon, balance, selectedMemberId });
    if (
      name.trim() === "" ||
      icon.trim() === "" ||
      balance === "" ||
      isNaN(parseFloat(balance)) ||
      selectedMemberId === ""
    ) {
      console.warn("Validation failed", {
        name,
        icon,
        balance,
        selectedMemberId,
      });
      return;
    }

    // Find the selected owner from family members
    const owner = members.find(
      (member) => member.id === parseInt(selectedMemberId, 10)
    );
    console.log("Owner found:", owner);

    // Prepare the new account type object
    const newAccount = {
      name,
      icon,
      balance: parseFloat(balance),
      owner,
    };

    // Trigger the callback to add the new account type
    onAddAccountType(newAccount);
    console.log("New account added:", newAccount);

    // Reset form fields and close the modal
    setName("");
    setIcon("");
    setBalance("");
    setSelectedMemberId("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Account Type</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="normal"
          label="Account Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Savings"
        />
        <TextField
          margin="normal"
          label="Account Icon (emoji)"
          fullWidth
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          placeholder="e.g., 💳"
        />
        <TextField
          margin="normal"
          label="Initial Balance"
          type="number"
          fullWidth
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          placeholder="e.g., 1000"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="account-owner-label">Owner</InputLabel>
          <Select
            labelId="account-owner-label"
            value={selectedMemberId}
            label="Owner"
            onChange={(e) => setSelectedMemberId(e.target.value)}
          >
            {members.map((member) => (
              <MenuItem key={member.id} value={member.id}>
                {member.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAdd} variant="contained">
          Add Account Type
        </Button>
      </DialogActions>
    </Dialog>
  );
}
