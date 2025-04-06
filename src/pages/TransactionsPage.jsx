import React, { useContext } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";
import { TransactionsContext } from "../features/transactions/TransactionContext";
import BackButton from "../components/common/BackButton";
import DashboardButton from "../components/common/DashboardButton";

export default function TransactionsPage() {
  const { transactions } = useContext(TransactionsContext);

  // Sort transactions descending by date (most recent first)
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

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
          Transactions
        </Typography>

        <DashboardButton />
      </Box>
      <List>
        {sortedTransactions.map((tx) => (
          <React.Fragment key={tx.id}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={`${tx.type.toUpperCase()} - ${tx.description}`}
                secondary={
                  <>
                    <Typography variant="body2" color="text.secondary">
                      Date: {new Date(tx.date).toLocaleString()}
                    </Typography>
                    {tx.details && tx.details.amount !== undefined && (
                      <Typography variant="body2" color="text.secondary">
                        Amount: ${tx.details.amount}
                      </Typography>
                    )}
                    {tx.details && tx.details.sourceAccount && (
                      <Typography variant="body2" color="text.secondary">
                        From: {tx.details.sourceAccount}
                      </Typography>
                    )}
                    {tx.details && tx.details.destinationAccount && (
                      <Typography variant="body2" color="text.secondary">
                        To: {tx.details.destinationAccount}
                      </Typography>
                    )}
                  </>
                }
              />
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
}
