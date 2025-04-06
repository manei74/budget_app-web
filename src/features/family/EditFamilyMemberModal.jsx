// src/components/Family/EditFamilyMemberModal.jsx
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const EditFamilyMemberModal = ({ open, onClose, member, onUpdate }) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (member) {
      setName(member.name);
      setAvatar(member.avatar);
    }
  }, [member]);

  const handleUpdate = () => {
    if (name.trim() === "" || avatar.trim() === "") return;
    onUpdate(member.id, { name, avatar });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Family Member</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="normal"
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="normal"
          label="Avatar URL"
          fullWidth
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpdate} variant="contained">
          Update Member
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditFamilyMemberModal;
