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

export default function TransferModal({
  open,
  onClose,
  destinationAccount,
  accounts,
  onTransfer,
}) {
  const [sourceAccountId, setSourceAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());

  const handleTransfer = () => {
    if (!sourceAccountId || parseFloat(amount) <= 0) return;
    onTransfer(sourceAccountId, parseFloat(amount));
    setSourceAccountId("");
    setAmount("");
    setDate(new Date());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Transfer to {destinationAccount?.name}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel id="source-account-label">Source Account</InputLabel>
            <Select
              labelId="source-account-label"
              value={sourceAccountId}
              label="Source Account"
              onChange={(e) => setSourceAccountId(e.target.value)}
            >
              {accounts
                .filter((acc) => acc.id !== destinationAccount.id)
                .map((acc) => (
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
          <Button onClick={handleTransfer} variant="contained">
            Transfer
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}
