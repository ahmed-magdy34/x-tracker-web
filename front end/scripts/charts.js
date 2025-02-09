"use strict";

import { getExpenses } from "../services/apiFunctions.js";

if (!localStorage.getItem("authToken")) {
  window.location.href = "login.html";
}

const barChart = document.getElementById("bar-chart");
const signOutBtn = document.getElementById("sign-out");
signOutBtn.addEventListener("click", () => {
  localStorage.removeItem("authToken");
  window.location.href = "login.html";
});

const token = localStorage.getItem("authToken");
let userExpenses = [];
const requestExpenses = async () => {
  const res = await getExpenses(token);
  userExpenses = await res;
};

const extractData = async () => {
  await requestExpenses();
  const groupedData = userExpenses?.reduce((acc, item) => {
    const dateObj = new Date(item.date);
    const monthKey = dateObj.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    }); // "Feb 2025"

    if (!acc[monthKey]) {
      acc[monthKey] = 0; // Initialize
    }

    acc[monthKey] += item.amount; // Sum amounts per month
    return acc;
  }, {});
  const labels = Object.keys(groupedData);
  const values = Object.values(groupedData);
  new Chart(barChart, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "expenses by month",
          data: values,
          borderWidth: 1,
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)", // Red
          ],
          //   borderColor: [
          //     "rgba(255, 99, 132, 1)",
          //     "rgba(54, 162, 235, 1)",
          //     "rgba(255, 206, 86, 1)",
          //     "rgba(75, 192, 192, 1)",
          //     "rgba(153, 102, 255, 1)",
          //     "rgba(255, 159, 64, 1)",
          //   ],
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      maintainAspectRatio: false, // Allows manual resizing
    },
  });
};
extractData();
