import React, { useContext } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { ExpensesContext } from "../features/expenses/ExpenseContext";
import { IncomesContext } from "../features/incomes/IncomeContext";
import { AccountsContext } from "../features/accounts/AccountContext";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  payload,
}) => {
  const radius = outerRadius + 20;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
    >
      {`${payload.name}: $${payload.value}`}
    </text>
  );
};

export default function DashboardStats() {
  const { expenses } = useContext(ExpensesContext);
  const { incomes } = useContext(IncomesContext);
  const { accounts } = useContext(AccountsContext);

  // Calculate expense amounts per outer category (ignoring subcategories)
  const expenseDataRaw = expenses
    .map((category) => ({
      name: category.name,
      value: category.subcategories.reduce((sum, sub) => sum + sub.amount, 0),
    }))
    .filter((data) => data.value > 0);

  // Total expense (sum of all categories)
  const totalExpense = expenseDataRaw.reduce(
    (sum, entry) => sum + entry.value,
    0
  );

  // Combine small categories into "Others"
  const threshold = totalExpense * 0.05; // categories under 5% of total expense
  const largeCategories = expenseDataRaw.filter(
    (entry) => entry.value >= threshold
  );
  const smallCategoriesSum = expenseDataRaw
    .filter((entry) => entry.value < threshold)
    .reduce((sum, entry) => sum + entry.value, 0);
  const expenseData =
    smallCategoriesSum > 0
      ? [...largeCategories, { name: "Others", value: smallCategoriesSum }]
      : largeCategories;

  // Total income from incomes context
  const totalIncome = incomes.reduce((sum, inc) => sum + inc.amount, 0);

  // Total balance from all accounts
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  // Define colors for the slices
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A28EFF",
    "#FF6699",
    "#33CCFF",
  ];

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Dashboard Statistics
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {/* Pie chart for expenses */}
        <Box sx={{ width: 500, height: 300, position: "relative", mb: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                label={renderCustomizedLabel}
                labelLine={true}
                stroke="none"
              >
                {expenseData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value}`} />
            </PieChart>
          </ResponsiveContainer>
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            ${totalExpense}
          </Typography>
        </Box>

        {/* Other statistics: Total Balance and Total Incomes */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            Total Balance: ${totalBalance}
          </Typography>
          <Typography variant="h6">Total Incomes: ${totalIncome}</Typography>
        </Box>
      </Box>
    </Paper>
  );
}
