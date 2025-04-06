import React, { createContext, useState, useEffect } from "react";

export const IncomesContext = createContext();

export function IncomesProvider({ children }) {
  const [incomes, setIncomes] = useState(() => {
    const stored = localStorage.getItem("incomes");
    return stored
      ? JSON.parse(stored)
      : [
          {
            id: 1,
            title: "Benefits",
            amount: 1000,
            icon: "🏡",
            owner: {
              id: 0,
              name: "Maneevi",
              avatar: "https://i.pravatar.cc/150?img=10",
            },
          },
          {
            id: 2,
            title: "Gifts",
            amount: 200,
            icon: "🎁",
            owner: {
              id: 0,
              name: "Maneevi",
              avatar: "https://i.pravatar.cc/150?img=10",
            },
          },
          {
            id: 3,
            title: "Others",
            amount: 150,
            icon: "🔄",
            owner: {
              id: 0,
              name: "Maneevi",
              avatar: "https://i.pravatar.cc/150?img=10",
            },
          },
          {
            id: 4,
            title: "Salary",
            amount: 5000,
            icon: "💵",
            owner: {
              id: 2,
              name: "Nikita",
              avatar: "https://i.pravatar.cc/150?img=2",
            },
          },
          {
            id: 5,
            title: "Tips",
            amount: 300,
            icon: "💲",
            owner: {
              id: 2,
              name: "Nikita",
              avatar: "https://i.pravatar.cc/150?img=2",
            },
          },
          {
            id: 6,
            title: "Other",
            amount: 200,
            icon: "🔧",
            owner: {
              id: 2,
              name: "Nikita",
              avatar: "https://i.pravatar.cc/150?img=2",
            },
          },
          {
            id: 7,
            title: "Salary",
            amount: 4000,
            icon: "💵",
            owner: {
              id: 1,
              name: "Dasha",
              avatar: "https://i.pravatar.cc/150?img=1",
            },
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("incomes", JSON.stringify(incomes));
  }, [incomes]);

  const addIncomeType = (newIncome) => {
    // newIncome should be an object with title, icon, and owner
    const newId = incomes.length
      ? Math.max(...incomes.map((i) => i.id)) + 1
      : 1;
    const incomeToAdd = {
      id: newId,
      title: newIncome.title,
      icon: newIncome.icon,
      amount: 0,
      owner: newIncome.owner, // Use the provided owner!
    };
    setIncomes((prev) => [...prev, incomeToAdd]);
  };

  return (
    <IncomesContext.Provider value={{ incomes, setIncomes, addIncomeType }}>
      {children}
    </IncomesContext.Provider>
  );
}
