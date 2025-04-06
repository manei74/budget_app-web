import React, { createContext, useState, useEffect } from "react";

export const ExpensesContext = createContext();

export function ExpensesProvider({ children }) {
  const [expenses, setExpenses] = useState(() => {
    const stored = localStorage.getItem("expenses");
    return stored
      ? JSON.parse(stored)
      : [
          {
            id: 1,
            name: "Food",
            icon: "🍎",
            subcategories: [
              { id: 101, name: "Groceries", icon: "🛒", amount: 150.0 },
              { id: 102, name: "Lunch", icon: "🍔", amount: 50.0 },
            ],
          },
          {
            id: 2,
            name: "House",
            icon: "🏠",
            subcategories: [
              { id: 201, name: "Rent", icon: "🏡", amount: 1200.0 },
              { id: 202, name: "Xcel Energy", icon: "⚡", amount: 100.0 },
              { id: 203, name: "Water", icon: "💧", amount: 40.0 },
              { id: 204, name: "Internet", icon: "🌐", amount: 60.0 },
            ],
          },
          {
            id: 3,
            name: "Technology",
            icon: "💻",
            subcategories: [
              { id: 301, name: "Google Fi", icon: "📱", amount: 70.0 },
              { id: 302, name: "Amazon", icon: "📦", amount: 30.0 },
              { id: 303, name: "AliExpress", icon: "🛍️", amount: 20.0 },
              { id: 304, name: "Tools", icon: "🔧", amount: 10.0 },
              { id: 305, name: "Technology", icon: "🔌", amount: 5.0 },
            ],
          },
          {
            id: 4,
            name: "Fun",
            icon: "🎉",
            subcategories: [
              { id: 401, name: "Restaurants", icon: "🍽️", amount: 100.0 },
              { id: 402, name: "Movies", icon: "🎬", amount: 50.0 },
              { id: 403, name: "Hobby", icon: "🎨", amount: 20.0 },
              { id: 404, name: "Museums", icon: "🏛️", amount: 15.0 },
              { id: 405, name: "Swimming Pool", icon: "🏊", amount: 25.0 },
              { id: 406, name: "Concerts", icon: "🎵", amount: 40.0 },
              { id: 407, name: "Toys", icon: "🧸", amount: 10.0 },
              { id: 408, name: "Sports", icon: "⚽", amount: 30.0 },
              { id: 409, name: "Other", icon: "❓", amount: 5.0 },
            ],
          },
          {
            id: 5,
            name: "Gifts",
            icon: "🎁",
            subcategories: [
              { id: 501, name: "Birth Days", icon: "🎂", amount: 80.0 },
              { id: 502, name: "Other", icon: "❓", amount: 10.0 },
            ],
          },
          {
            id: 6,
            name: "Vacation",
            icon: "🏖️",
            subcategories: [
              { id: 601, name: "Airplane", icon: "✈️", amount: 500.0 },
              { id: 602, name: "Hotel", icon: "🏨", amount: 300.0 },
              { id: 603, name: "Other", icon: "❓", amount: 50.0 },
            ],
          },
          {
            id: 7,
            name: "Make Up",
            icon: "💄",
            subcategories: [
              { id: 701, name: "Clothes", icon: "👗", amount: 60.0 },
              { id: 702, name: "Haircut", icon: "💇", amount: 20.0 },
              { id: 703, name: "Sport", icon: "🏃", amount: 15.0 },
              { id: 704, name: "Cosmetics", icon: "💋", amount: 40.0 },
              { id: 705, name: "Other", icon: "❓", amount: 5.0 },
            ],
          },
          {
            id: 8,
            name: "Cars",
            icon: "🚗",
            subcategories: [
              { id: 801, name: "Gas", icon: "⛽", amount: 100.0 },
              { id: 802, name: "Parking", icon: "🅿️", amount: 20.0 },
              { id: 803, name: "Insurance", icon: "📄", amount: 150.0 },
              { id: 804, name: "Lease", icon: "📝", amount: 200.0 },
              { id: 805, name: "Parts", icon: "🔩", amount: 80.0 },
              { id: 806, name: "Fix", icon: "🔧", amount: 50.0 },
              { id: 807, name: "Tires", icon: "🛞", amount: 100.0 },
              { id: 808, name: "Taxes", icon: "💸", amount: 70.0 },
              { id: 809, name: "Wash", icon: "🧽", amount: 15.0 },
              { id: 810, name: "Other", icon: "❓", amount: 10.0 },
            ],
          },
          {
            id: 9,
            name: "Travel",
            icon: "🧳",
            subcategories: [
              { id: 901, name: "Taxi", icon: "🚕", amount: 30.0 },
              { id: 902, name: "Transport", icon: "🚌", amount: 20.0 },
            ],
          },
          {
            id: 10,
            name: "Housekeeping",
            icon: "🧹",
            subcategories: [
              { id: 1001, name: "Hoztovar", icon: "📦", amount: 100.0 },
              { id: 1002, name: "Kitchen Staff", icon: "👩‍🍳", amount: 150.0 },
              { id: 1003, name: "Furniture", icon: "🛋️", amount: 300.0 },
              { id: 1004, name: "Fix", icon: "🔧", amount: 50.0 },
            ],
          },
          {
            id: 11,
            name: "Health",
            icon: "❤️",
            subcategories: [
              { id: 1101, name: "Drugs", icon: "💊", amount: 40.0 },
              { id: 1102, name: "Doctor", icon: "👨‍⚕️", amount: 60.0 },
            ],
          },
          {
            id: 12,
            name: "Learning",
            icon: "📚",
            subcategories: [
              { id: 1201, name: "College", icon: "🏫", amount: 500.0 },
              { id: 1202, name: "Courses", icon: "💻", amount: 200.0 },
              { id: 1203, name: "Other", icon: "❓", amount: 20.0 },
            ],
          },
          {
            id: 13,
            name: "Donations",
            icon: "🙏",
            subcategories: [
              { id: 1301, name: "Church", icon: "⛪", amount: 100.0 },
              {
                id: 1302,
                name: "Political Prisoners",
                icon: "✊",
                amount: 30.0,
              },
              { id: 1303, name: "Others", icon: "❓", amount: 20.0 },
            ],
          },
          {
            id: 14,
            name: "Other",
            icon: "❓",
            subcategories: [],
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  return (
    <ExpensesContext.Provider value={{ expenses, setExpenses }}>
      {children}
    </ExpensesContext.Provider>
  );
}
