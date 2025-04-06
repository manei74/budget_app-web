import React, { createContext, useState, useEffect } from "react";

export const AccountsContext = createContext();

export function AccountsProvider({ children }) {
  const [accounts, setAccounts] = useState(() => {
    const stored = localStorage.getItem("accounts");
    return stored
      ? JSON.parse(stored)
      : [
          {
            id: 1,
            name: "Wallet",
            balance: 500,
            icon: "👛",
            owner: {
              id: 2,
              name: "Nikita",
              avatar: "https://i.pravatar.cc/150?img=2",
            },
          },
          {
            id: 2,
            name: "Wells Fargo",
            balance: 1200,
            icon: "🏦",
            owner: {
              id: 2,
              name: "Nikita",
              avatar: "https://i.pravatar.cc/150?img=2",
            },
          },
          {
            id: 3,
            name: "Safe",
            balance: 300,
            icon: "🔒",
            owner: {
              id: 2,
              name: "Nikita",
              avatar: "https://i.pravatar.cc/150?img=2",
            },
          },
          {
            id: 4,
            name: "Discover",
            balance: 400,
            icon: "💳",
            owner: {
              id: 2,
              name: "Nikita",
              avatar: "https://i.pravatar.cc/150?img=2",
            },
          },
          {
            id: 5,
            name: "Capital One",
            balance: 600,
            icon: "💳",
            owner: {
              id: 2,
              name: "Nikita",
              avatar: "https://i.pravatar.cc/150?img=2",
            },
          },
          {
            id: 6,
            name: "Amazon",
            balance: 200,
            icon: "📦",
            owner: {
              id: 2,
              name: "Nikita",
              avatar: "https://i.pravatar.cc/150?img=2",
            },
          },
          {
            id: 7,
            name: "Checking Capital",
            balance: 1000,
            icon: "🏦",
            owner: {
              id: 2,
              name: "Nikita",
              avatar: "https://i.pravatar.cc/150?img=2",
            },
          },
          {
            id: 8,
            name: "Wells Credit",
            balance: 800,
            icon: "💳",
            owner: {
              id: 2,
              name: "Nikita",
              avatar: "https://i.pravatar.cc/150?img=2",
            },
          },
          {
            id: 9,
            name: "Wallet",
            balance: 300,
            icon: "👛",
            owner: {
              id: 1,
              name: "Dasha",
              avatar: "https://i.pravatar.cc/150?img=1",
            },
          },
          {
            id: 10,
            name: "Wells Fargo",
            balance: 700,
            icon: "🏦",
            owner: {
              id: 1,
              name: "Dasha",
              avatar: "https://i.pravatar.cc/150?img=1",
            },
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }, [accounts]);

  return (
    <AccountsContext.Provider value={{ accounts, setAccounts }}>
      {children}
    </AccountsContext.Provider>
  );
}
