import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { FamilyContext } from "../../features/family/FamilyContext";

export default function ExpenseModal({
  open,
  onClose,
  categoryId,
  subcategory,
  accounts,
  onAddExpense,
}) {
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [selectedMemberId, setSelectedMemberId] = useState("");

  const { members } = useContext(FamilyContext);

  const handleAddExpense = () => {
    if (!selectedAccountId || parseFloat(amount) <= 0) return;
    onAddExpense(
      categoryId,
      subcategory.id,
      selectedAccountId,
      parseFloat(amount),
      date
    );
    setSelectedAccountId("");
    setAmount("");
    setDate(new Date());
    onClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add Expense for {subcategory.name}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel id="account-label">Account</InputLabel>
            <Select
              labelId="account-label"
              value={selectedAccountId}
              label="Account"
              onChange={(e) => setSelectedAccountId(e.target.value)}
            >
              {accounts.map((acc) => (
                <MenuItem key={acc.id} value={acc.id}>
                  {acc.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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

          <TextField
            margin="normal"
            label="Amount"
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <DatePicker
            label="Date"
            value={date}
            onChange={(newDate) => setDate(newDate)}
            renderInput={(params) => (
              <TextField {...params} fullWidth margin="normal" />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleAddExpense} variant="contained">
            Add Expense
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}
