import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FamilyProvider } from "./features/family/FamilyContext";
import { AccountsProvider } from "./features/accounts/AccountContext";
import { IncomesProvider } from "./features/incomes/IncomeContext";
import { ExpensesProvider } from "./features/expenses/ExpenseContext";
import { TransactionsProvider } from "./features/transactions/TransactionContext";
import Dashboard from "./pages/Dashboard";
import AccountsPage from "./pages/AccountsPage";
import IncomesPage from "./pages/IncomesPage";
import ExpensesPage from "./pages/ExpensesPage";
import TransactionsPage from "./pages/TransactionsPage";
import FamilyMembersPage from "./pages/FamilyMembersPage";
import BottomNav from "./components/common/BottomNav";

function App() {
  return (
    <FamilyProvider>
      <AccountsProvider>
        <IncomesProvider>
          <ExpensesProvider>
            <TransactionsProvider>
              <Router>
                <div style={{ paddingBottom: "56px" }}>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/accounts" element={<AccountsPage />} />
                    <Route path="/incomes" element={<IncomesPage />} />
                    <Route path="/expenses" element={<ExpensesPage />} />
                    <Route
                      path="/transactions"
                      element={<TransactionsPage />}
                    />
                    <Route
                      path="/family-members"
                      element={<FamilyMembersPage />}
                    />
                  </Routes>
                </div>
                <BottomNav />
              </Router>
            </TransactionsProvider>
          </ExpensesProvider>
        </IncomesProvider>
      </AccountsProvider>
    </FamilyProvider>
  );
}

export default App;
