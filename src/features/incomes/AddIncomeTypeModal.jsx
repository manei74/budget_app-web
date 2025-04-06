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
import { FamilyContext } from "../../features/family/FamilyContext";

export default function AddIncomeTypeModal({ open, onClose, onAddIncomeType }) {
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const [selectedMemberId, setSelectedMemberId] = useState("");

  const { members } = useContext(FamilyContext);

  const handleAdd = () => {
    if (title.trim() === "" || icon.trim() === "" || !selectedMemberId) return;
    // Convert selectedMemberId to a number to match member.id type
    const numericId = Number(selectedMemberId);
    // Find the selected family member by numeric id
    const owner = members.find((member) => member.id === numericId);
    console.log("Owner selected:", owner); // Debug log

    onAddIncomeType({
      title,
      icon,
      owner,
    });
    setTitle("");
    setIcon("");
    setSelectedMemberId("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Income Type</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="normal"
          label="Income Type Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Bonus"
        />
        <TextField
          margin="normal"
          label="Income Icon (emoji)"
          fullWidth
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          placeholder="e.g., 🎉"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="owner-label">Owner</InputLabel>
          <Select
            labelId="owner-label"
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
          Add Income Type
        </Button>
      </DialogActions>
    </Dialog>
  );
}
