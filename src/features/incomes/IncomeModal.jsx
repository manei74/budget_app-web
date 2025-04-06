import React, { useState } from "react";
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

export default function IncomeModal({
  open,
  onClose,
  income,
  accounts,
  onAddIncome,
}) {
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());

  const handleAddIncome = () => {
    if (!selectedAccountId || parseFloat(amount) <= 0) return;
    onAddIncome(selectedAccountId, parseFloat(amount), date, income.id);
    setSelectedAccountId("");
    setAmount("");
    setDate(new Date());
    onClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add Income for {income?.title}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel id="source-account-label">Source Account</InputLabel>
            <Select
              labelId="source-account-label"
              value={selectedAccountId}
              label="Source Account"
              onChange={(e) => setSelectedAccountId(e.target.value)}
            >
              {accounts.map((acc) => (
                <MenuItem key={acc.id} value={acc.id}>
                  {acc.name}
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
          <Button onClick={handleAddIncome} variant="contained">
            Add Income
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}
