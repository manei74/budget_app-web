import React, { createContext, useState, useEffect } from "react";

export const TransactionsContext = createContext();

// initialTransactions.js

export const initialTransactions = [
  {
    id: 1,
    type: "income",
    date: "2025-04-01T10:00:00.000Z",
    description: "Salary added to Nikita's account",
    details: {
      amount: 5000,
      incomeType: "Salary",
      account: "Nikita Checking",
    },
  },
  {
    id: 2,
    type: "expense",
    date: "2025-04-02T12:30:00.000Z",
    description: "Expense: Rent from House",
    details: {
      amount: 1200,
      expenseCategory: "House",
      expenseSubcategory: "Rent",
    },
  },
  {
    id: 3,
    type: "expense",
    date: "2025-04-03T14:15:00.000Z",
    description: "Expense: Groceries from Food",
    details: {
      amount: 150,
      expenseCategory: "Food",
      expenseSubcategory: "Groceries",
    },
  },
  {
    id: 4,
    type: "expense",
    date: "2025-04-05T18:00:00.000Z",
    description: "Expense: Lunch from Food",
    details: {
      amount: 50,
      expenseCategory: "Food",
      expenseSubcategory: "Lunch",
    },
  },
  {
    id: 5,
    type: "income",
    date: "2025-04-06T09:00:00.000Z",
    description: "Income: Freelance added to Nikita's account",
    details: {
      amount: 300,
      incomeType: "Freelance",
      account: "Nikita Wallet",
    },
  },
  {
    id: 6,
    type: "expense",
    date: "2025-04-07T16:00:00.000Z",
    description: "Expense: Xcel Energy from House",
    details: {
      amount: 100,
      expenseCategory: "House",
      expenseSubcategory: "Xcel Energy",
    },
  },
  {
    id: 7,
    type: "expense",
    date: "2025-04-08T11:00:00.000Z",
    description: "Expense: Internet from House",
    details: {
      amount: 60,
      expenseCategory: "House",
      expenseSubcategory: "Internet",
    },
  },
  {
    id: 8,
    type: "income",
    date: "2025-04-10T08:30:00.000Z",
    description: "Income: Investments added to Carol's account",
    details: {
      amount: 200,
      incomeType: "Investments",
      account: "Carol Savings",
    },
  },
  {
    id: 9,
    type: "expense",
    date: "2025-04-12T15:00:00.000Z",
    description: "Expense: Restaurants from Fun",
    details: {
      amount: 100,
      expenseCategory: "Fun",
      expenseSubcategory: "Restaurants",
    },
  },
  {
    id: 10,
    type: "expense",
    date: "2025-04-15T13:00:00.000Z",
    description: "Expense: Gas from Cars",
    details: {
      amount: 100,
      expenseCategory: "Cars",
      expenseSubcategory: "Gas",
    },
  },
  {
    id: 11,
    type: "expense",
    date: "2025-04-20T17:30:00.000Z",
    description: "Expense: Hotel from Vacation",
    details: {
      amount: 300,
      expenseCategory: "Vacation",
      expenseSubcategory: "Hotel",
    },
  },
  {
    id: 12,
    type: "income",
    date: "2025-04-25T09:15:00.000Z",
    description: "Income: Tips added to Nikita's account",
    details: {
      amount: 100,
      incomeType: "Tips",
      account: "Nikita Wallet",
    },
  },
  {
    id: 13,
    type: "expense",
    date: "2025-04-28T19:00:00.000Z",
    description: "Expense: Doctor from Health",
    details: {
      amount: 60,
      expenseCategory: "Health",
      expenseSubcategory: "Doctor",
    },
  },
];

export function TransactionsProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    const stored = localStorage.getItem("transactions");
    return stored ? JSON.parse(stored) : initialTransactions;
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    const newTransaction = {
      id: transactions.length
        ? Math.max(...transactions.map((t) => t.id)) + 1
        : 1,
      ...transaction,
    };
    setTransactions((prev) => [...prev, newTransaction]);
  };

  return (
    <TransactionsContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}
