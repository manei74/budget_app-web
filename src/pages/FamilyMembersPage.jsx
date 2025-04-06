// src/pages/FamilyMembersPage.jsx
import React, { useContext, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Divider,
  Fab,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { FamilyContext } from "../features/family/FamilyContext";
import EditFamilyMemberModal from "../features/family/EditFamilyMemberModal";
import AddFamilyMemberModal from "../features/family/AddFamilyMemberModal";
import BackButton from "../components/common/BackButton";
import DashboardButton from "../components/common/DashboardButton";

export default function FamilyMembersPage() {
  const { members, addMember, updateMember, removeMember } =
    useContext(FamilyContext);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const handleEditClick = (member) => {
    setSelectedMember(member);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (memberId) => {
    removeMember(memberId);
  };

  return (
    <Container sx={{ paddingBottom: "80px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          mb: 2,
        }}
      >
        <BackButton />
        <Typography variant="h4" sx={{ ml: 1 }}>
          Family members
        </Typography>

        <DashboardButton />
      </Box>
      <List>
        {members.map((member) => (
          <React.Fragment key={member.id}>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={member.avatar} alt={member.name} />
              </ListItemAvatar>
              <ListItemText primary={member.name} />
              <IconButton onClick={() => handleEditClick(member)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDeleteClick(member.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 66, right: 16 }}
        onClick={() => setAddModalOpen(true)}
      >
        <AddIcon />
      </Fab>
      <EditFamilyMemberModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        member={selectedMember}
        onUpdate={updateMember}
      />
      <AddFamilyMemberModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={addMember}
      />
    </Container>
  );
}
