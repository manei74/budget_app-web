import React, { useContext, useState } from "react";
import { Box, Container, Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ExpensesContext } from "../features/expenses/ExpenseContext";
import ExpenseCategory from "../features/expenses/ExpenseCategory";
import ExpenseModal from "../features/expenses/ExpenseModal";
import { AccountsContext } from "../features/accounts/AccountContext";
import BackButton from "../components/common/BackButton";
import DashboardButton from "../components/common/DashboardButton";
import { TransactionsContext } from "../features/transactions/TransactionContext";

export default function ExpensesPage() {
  const { expenses, setExpenses } = useContext(ExpensesContext);
  const { accounts, setAccounts } = useContext(AccountsContext);
  const [selectedExpense, setSelectedExpense] = useState({
    categoryId: null,
    subcategory: null,
  });
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const { addTransaction } = useContext(TransactionsContext);

  const handleSubcategoryClick = (categoryId, subcategory) => {
    setSelectedExpense({ categoryId, subcategory });
    setExpenseModalOpen(true);
  };

  const handleAddExpense = (
    categoryId,
    subcategoryId,
    accountId,
    amount,
    date
  ) => {
    // Find the relevant expense category, subcategory, and account
    const category = expenses.find((cat) => cat.id === categoryId);
    const subcategory = category.subcategories.find(
      (sub) => sub.id === subcategoryId
    );
    const acc = accounts.find((a) => a.id === parseInt(accountId, 10));

    // Update the expense subcategory's total amount
    setExpenses((prevExpenses) =>
      prevExpenses.map((cat) => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            subcategories: cat.subcategories.map((sub) => {
              if (sub.id === subcategoryId) {
                return { ...sub, amount: sub.amount + amount };
              }
              return sub;
            }),
          };
        }
        return cat;
      })
    );

    // Subtract the expense amount from the selected account's balance
    setAccounts((prevAccounts) =>
      prevAccounts.map((acc) => {
        if (acc.id === parseInt(accountId, 10)) {
          return { ...acc, balance: acc.balance - amount };
        }
        return acc;
      })
    );
    // Log the expense transaction
    addTransaction({
      type: "expense",
      date: date.toISOString(),
      description: `Expense: ${subcategory.name} from ${acc.name}`,
      details: {
        amount,
        expenseCategory: category.name,
        expenseSubcategory: subcategory.name,
        account: acc.name,
      },
    });
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
          Expenses
        </Typography>

        <DashboardButton />
      </Box>
      {expenses.map((category) => (
        <ExpenseCategory
          key={category.id}
          category={category}
          onSubcategoryClick={handleSubcategoryClick}
        />
      ))}

      {/* Floating Action Button to add new expense type */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 66, right: 16 }}
        onClick={() => {}}
      >
        <AddIcon />
      </Fab>

      {selectedExpense.subcategory && (
        <ExpenseModal
          open={expenseModalOpen}
          onClose={() => setExpenseModalOpen(false)}
          categoryId={selectedExpense.categoryId}
          subcategory={selectedExpense.subcategory}
          accounts={accounts}
          onAddExpense={handleAddExpense}
        />
      )}
    </Container>
  );
}
