import React, { useContext, useState } from "react";
import { Container, Typography, Grid, Fab, Box, Avatar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import IncomeCard from "../features/incomes/IncomeCard";
import { IncomesContext } from "../features/incomes/IncomeContext";
import { AccountsContext } from "../features/accounts/AccountContext";
import IncomeModal from "../features/incomes/IncomeModal";
import BackButton from "../components/common/BackButton";
import DashboardButton from "../components/common/DashboardButton";
import AddIncomeTypeModal from "../features/incomes/AddIncomeTypeModal";
import { TransactionsContext } from "../features/transactions/TransactionContext";

export default function IncomesPage() {
  const { incomes, setIncomes, addIncomeType } = useContext(IncomesContext);
  const { accounts } = useContext(AccountsContext);
  const { addTransaction } = useContext(TransactionsContext);
  const [selectedIncome, setSelectedIncome] = useState(null);
  const [incomeModalOpen, setIncomeModalOpen] = useState(false);
  const [addIncomeTypeModalOpen, setAddIncomeTypeModalOpen] = useState(false);

  // Group incomes by owner's name (fallback to "Unknown" if no owner)
  const groupedIncomes = incomes.reduce((groups, income) => {
    const ownerName =
      income.owner && income.owner.name ? income.owner.name : "Unknown";
    if (!groups[ownerName]) {
      groups[ownerName] = [];
    }
    groups[ownerName].push(income);
    return groups;
  }, {});

  // Sort owner names alphabetically
  const sortedOwnerNames = Object.keys(groupedIncomes).sort((a, b) =>
    a.localeCompare(b)
  );

  // Handler for adding income (transaction & update incomes/accounts)
  const handleAddIncome = (selectedAccountId, amount, date, incomeId) => {
    const selectedInc = incomes.find((inc) => inc.id === incomeId);
    const sourceAcc = accounts.find(
      (acc) => acc.id === parseInt(selectedAccountId, 10)
    );
    // Update the income type's total
    setIncomes((prev) =>
      prev.map((inc) =>
        inc.id === incomeId ? { ...inc, amount: inc.amount + amount } : inc
      )
    );
    // Log the income as a transaction
    addTransaction({
      type: "income",
      date: date.toISOString(),
      description: `Income: ${selectedInc.title} added to ${sourceAcc.name}`,
      details: {
        amount,
        incomeType: selectedInc.title,
        account: sourceAcc.name,
      },
    });
  };

  // Handler for clicking an income card to open the modal
  const handleIncomeClick = (income) => {
    setSelectedIncome(income);
    setIncomeModalOpen(true);
  };

  // Handler for deleting an income type
  const handleDeleteIncome = (incomeId) => {
    setIncomes((prev) => prev.filter((inc) => inc.id !== incomeId));
  };

  // Handler for adding a new income type
  const handleAddIncomeType = (newIncome) => {
    addIncomeType(newIncome);
  };

  return (
    <Container sx={{ paddingBottom: "80px", position: "relative" }}>
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
          Incomes
        </Typography>
        <DashboardButton />
      </Box>

      {sortedOwnerNames.map((ownerName) => {
        // Retrieve the first income in the group to get the owner's avatar
        const firstIncome = groupedIncomes[ownerName][0];
        const ownerAvatar =
          firstIncome.owner && firstIncome.owner.avatar
            ? firstIncome.owner.avatar
            : "";
        return (
          <Box key={ownerName} sx={{ mb: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              {ownerAvatar && (
                <Avatar src={ownerAvatar} alt={ownerName} sx={{ mr: 1 }} />
              )}
              <Typography variant="h5">{ownerName}</Typography>
            </Box>
            <Grid container spacing={2}>
              {groupedIncomes[ownerName].map((income) => (
                <Grid item xs={12} sm={6} md={4} key={income.id}>
                  <IncomeCard
                    income={income}
                    onClick={handleIncomeClick}
                    onDelete={handleDeleteIncome}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      })}

      {selectedIncome && (
        <IncomeModal
          open={incomeModalOpen}
          onClose={() => setIncomeModalOpen(false)}
          income={selectedIncome}
          accounts={accounts}
          onAddIncome={handleAddIncome}
        />
      )}

      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 66, right: 16 }}
        onClick={() => setAddIncomeTypeModalOpen(true)}
      >
        <AddIcon />
      </Fab>

      <AddIncomeTypeModal
        open={addIncomeTypeModalOpen}
        onClose={() => setAddIncomeTypeModalOpen(false)}
        onAddIncomeType={handleAddIncomeType}
      />
    </Container>
  );
}
