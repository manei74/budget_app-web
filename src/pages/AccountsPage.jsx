import React, { useContext, useState } from "react";
import { Box, Container, Fab, Typography, Avatar } from "@mui/material";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import AccountCard from "../features/accounts/AccountCard";
import TransferModal from "../features/accounts/TransferModal";
import BackButton from "../components/common/BackButton";
import DashboardButton from "../components/common/DashboardButton";
import { AccountsContext } from "../features/accounts/AccountContext";
import { TransactionsContext } from "../features/transactions/TransactionContext";
import AddAccountTypeModal from "../features/accounts/AddAccountTypeModal";

export default function AccountsPage() {
  const { addTransaction } = useContext(TransactionsContext);
  const { accounts, setAccounts } = useContext(AccountsContext);
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [destinationAccount, setDestinationAccount] = useState(null);
  const [accountModalOpen, setAccountModalOpen] = useState(false);

  // Group accounts by owner's name (using the "owner" property)
  const groupedAccounts = accounts.reduce((groups, account) => {
    const ownerName =
      account.owner && account.owner.name ? account.owner.name : "Unknown";
    if (!groups[ownerName]) {
      groups[ownerName] = [];
    }
    groups[ownerName].push(account);
    return groups;
  }, {});

  // Sort owner names alphabetically
  const sortedOwnerNames = Object.keys(groupedAccounts).sort((a, b) =>
    a.localeCompare(b)
  );

  // Callback to add a new account type
  const handleAddAccountType = (newAccount) => {
    const newId =
      accounts.length > 0 ? Math.max(...accounts.map((acc) => acc.id)) + 1 : 1;
    setAccounts((prevAccounts) => [
      ...prevAccounts,
      { id: newId, ...newAccount },
    ]);
  };

  const handleTransferClick = (account) => {
    setDestinationAccount(account);
    setTransferModalOpen(true);
  };

  const handleCloseTransferModal = () => {
    setTransferModalOpen(false);
    setDestinationAccount(null);
  };

  const handleDeleteAccount = (accountId) => {
    setAccounts((prevAccounts) =>
      prevAccounts.filter((acc) => acc.id !== accountId)
    );
  };

  const handleTransfer = (sourceAccountId, amount) => {
    const sourceId = parseInt(sourceAccountId, 10);
    const destId = destinationAccount.id;

    // Find the source and destination account objects
    const sourceAcc = accounts.find((acc) => acc.id === sourceId);
    const destAcc = accounts.find((acc) => acc.id === destId);

    // Update account balances
    setAccounts((prevAccounts) =>
      prevAccounts.map((acc) => {
        if (acc.id === sourceId) {
          return { ...acc, balance: acc.balance - amount };
        }
        if (acc.id === destId) {
          return { ...acc, balance: acc.balance + amount };
        }
        return acc;
      })
    );

    // Log the transfer as a transaction
    addTransaction({
      type: "transfer",
      date: new Date().toISOString(),
      description: `Transfer from ${sourceAcc.name} to ${destAcc.name}`,
      details: {
        amount,
        sourceAccount: sourceAcc.name,
        destinationAccount: destAcc.name,
      },
    });

    handleCloseTransferModal();
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
          Accounts
        </Typography>
        <DashboardButton />
      </Box>

      {sortedOwnerNames.map((ownerName) => {
        // Get the first account in this group to extract the owner's avatar.
        const firstAccount = groupedAccounts[ownerName][0];
        const ownerAvatar =
          firstAccount.owner && firstAccount.owner.avatar
            ? firstAccount.owner.avatar
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
              {groupedAccounts[ownerName].map((account) => (
                <Grid item xs={12} sm={6} md={4} key={account.id}>
                  <AccountCard
                    account={account}
                    onTransferClick={handleTransferClick}
                    onDelete={handleDeleteAccount} // Pass the delete handler
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      })}

      {/* Floating Action Button to add new account type */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 66, right: 16 }}
        onClick={() => setAccountModalOpen(true)}
      >
        <AddIcon />
      </Fab>

      <AddAccountTypeModal
        open={accountModalOpen}
        onClose={() => setAccountModalOpen(false)}
        onAddAccountType={handleAddAccountType}
      />

      {destinationAccount && (
        <TransferModal
          open={transferModalOpen}
          onClose={handleCloseTransferModal}
          destinationAccount={destinationAccount}
          accounts={accounts}
          onTransfer={handleTransfer}
        />
      )}
    </Container>
  );
}
