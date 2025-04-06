// src/components/Family/AddFamilyMemberModal.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const AddFamilyMemberModal = ({ open, onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleAdd = () => {
    if (name.trim() === "" || avatar.trim() === "") return;
    onAdd({ name, avatar });
    setName("");
    setAvatar("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Family Member</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="normal"
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Alice"
        />
        <TextField
          margin="normal"
          label="Avatar URL"
          fullWidth
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="https://example.com/avatar.png"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAdd} variant="contained">
          Add Member
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddFamilyMemberModal;
