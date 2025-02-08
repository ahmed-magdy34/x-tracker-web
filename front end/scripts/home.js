import {
  addExpense,
  deleteExpenseApi,
  editExpenseApi,
  getExpenses,
} from "../services/apiFunctions.js";
import { formatDate } from "../utils/dateFormat.js";

///////////////////////// DOM Selections /////////////////////////
const token = localStorage.getItem("authToken");
const tableBody = document.getElementById("table-body");
const signOutButton = document.getElementById("sign-out");
const homeToast = document.getElementById("home-toast");
const numberSpan = document.getElementById("no-of-x");
const totalValue = document.getElementById("total-value");
const addButton = document.getElementById("add-btn");

// Edit Modal
const modalOverlay = document.getElementById("edit-overlay");
const editModal = document.getElementById("edit-modal");
const closeButton = document.getElementById("close-btn");
const editForm = document.getElementById("edit-form");
const descriptionEditInput = document.getElementById("description");
const amountEditInput = document.getElementById("amount");
const dateEditInput = document.getElementById("date");
const modalEmptyError = document.getElementById("empty-err");
const amountError = document.getElementById("amount-err");
const amountZeroError = document.getElementById("amount-err-zero");

// Add Modal
const addModalOverlay = document.getElementById("add-overlay");
const closeAddModal = document.getElementById("close-add-btn");
const addForm = document.getElementById("add-form");
const newDescription = document.getElementById("new-description");
const newAmount = document.getElementById("new-amount");
const newDate = document.getElementById("new-date");
const newModalEmptyError = document.getElementById("new-empty-err");
const newAmountError = document.getElementById("new-amount-err");
const newAmountZeroError = document.getElementById("new-amount-err-zero");

const confirmDeleteButton = document.getElementById("confirm-btn");
const cancelDeleteButton = document.getElementById("cancel-btn");
const confirmDiv = document.getElementById("confirm-popup");

///////////////////////// State /////////////////////////
let userExpenses = [];
let expenseToEdit = {};

///////////////////////// Helper Functions /////////////////////////
const clearAddModal = () => {
  addModalOverlay.classList.add("hidden");
  newModalEmptyError.classList.add("hidden");
  newAmountError.classList.add("hidden");
  newAmountZeroError.classList.add("hidden");
  newAmount.value = "";
  newDescription.value = "";
  newDate.value = "";
};

const clearEditModal = () => {
  modalOverlay.classList.add("hidden");
  editModal.classList.add("hidden");
  modalEmptyError.classList.add("hidden");
  amountError.classList.add("hidden");
  amountZeroError.classList.add("hidden");
};

const toastHandler = (message, emoji) => {
  homeToast.innerHTML = `<div class="toast">${message} ${emoji}</div>`;
  homeToast.classList.remove("hidden");
  setTimeout(() => homeToast.classList.add("hidden"), 3000);
};

///////////////////////// Fetch Expenses /////////////////////////
const getUserExpenses = async () => {
  const response = await getExpenses(token);
  if (response.error) {
    toastHandler(response.error, "❌");
  } else {
    userExpenses = response;
    updateTable();
    updateSummary();
  }
};

///////////////////////// Expense Operations /////////////////////////
const deleteExpense = async (id) => {
  const res = await deleteExpenseApi(id, token);
  if (res.error) {
    toastHandler(res.error, "❌");
    return;
  }
  getUserExpenses();
};

const editExpense = (id) => {
  expenseToEdit = userExpenses.find((el) => el.id === Number(id));
  amountEditInput.value = expenseToEdit.amount;
  descriptionEditInput.value = expenseToEdit.description;
  //////////////////////chat gpt solution to showing user old date
  const originalDate = new Date(expenseToEdit.date);
  const year = originalDate.getFullYear();
  const month = String(originalDate.getMonth() + 1).padStart(2, "0"); // Ensure 2 digits
  const day = String(originalDate.getDate()).padStart(2, "0"); // Ensure 2 digits
  dateEditInput.value = `${year}-${month}-${day}`;
  ///////////////////////////////////////////////////
  modalOverlay.classList.remove("hidden");
  editModal.classList.remove("hidden");
};

///////////////////////// Event Listeners /////////////////////////
if (!token) {
  window.location.href = "login.html";
} else {
  console.log(token);
}

signOutButton.addEventListener("click", () => {
  localStorage.removeItem("authToken");
  window.location.href = "login.html";
});

editForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (
    !descriptionEditInput.value ||
    !amountEditInput.value ||
    !dateEditInput.value
  ) {
    modalEmptyError.classList.remove("hidden");
    return;
  }
  if (Number(amountEditInput.value) <= 0) {
    amountError.classList.toggle("hidden", Number(amountEditInput.value) > 0);
    amountZeroError.classList.toggle(
      "hidden",
      Number(amountEditInput.value) !== 0
    );
    return;
  }
  const editedExpense = {
    id: expenseToEdit.id,
    description: descriptionEditInput.value,
    amount: Number(amountEditInput.value),
    date: formatDate(dateEditInput.value),
  };
  const response = await editExpenseApi(editedExpense.id, editedExpense, token);
  if (response?.message) {
    toastHandler(response.message, "✅");
    updateTable();
    updateSummary();
  } else {
    toastHandler(response.error, "❌");
  }

  clearEditModal();
});

closeButton.addEventListener("click", (e) => {
  e.preventDefault();
  clearEditModal();
});

addForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!newAmount.value || !newDescription.value || !newDate.value) {
    newModalEmptyError.classList.remove("hidden");
    return;
  }
  if (Number(newAmount.value) === 0) {
    newAmountZeroError.classList.remove("hidden");

    return;
  }
  if (Number(newAmount.value) < 0) {
    newAmountError.classList.remove("hidden");
    return;
  }
  const newExpense = {
    description: newDescription.value,
    amount: Number(newAmount.value),
    date: formatDate(newDate.value),
  };
  const response = await addExpense(newExpense, token);
  toastHandler(
    response?.message || "Something went wrong",
    response?.message ? "✅" : "❌"
  );
  setTimeout(clearAddModal, 3000);
  getUserExpenses();
});

closeAddModal.addEventListener("click", clearAddModal);
addButton.addEventListener("click", () =>
  addModalOverlay.classList.remove("hidden")
);

///////////////////////// UI Updates /////////////////////////
const updateTable = () => {
  tableBody.innerHTML = userExpenses
    .map(
      (expense) => `
    <tr>
      <td>${expense.id}</td>
      <td>${expense.description}</td>
      <td>${expense.amount}$</td>
      <td>${formatDate(expense.date)}</td>
      <td>
        <div class="icons-container">
          <i class="fa-solid fa-pen-to-square edit-icon" edit-id='${
            expense.id
          }'></i>
          <i class="fa-solid fa-delete-left delete-icon" data-id='${
            expense.id
          }'></i>
        </div>
      </td>
    </tr>`
    )
    .join("");
  const deleteIcons = document.querySelectorAll(".fa-delete-left");
  deleteIcons.forEach((icon) => {
    const expenseId = icon.getAttribute("data-id");
    icon.addEventListener("click", () => {
      deleteExpense(Number(expenseId));
    });
  });

  const editIcons = document.querySelectorAll(".fa-pen-to-square");
  editIcons.forEach((icon) => {
    const editId = icon.getAttribute("edit-id");
    icon.addEventListener("click", () => {
      editExpense(editId);
    });
  });
};

const updateSummary = () => {
  numberSpan.innerText = userExpenses.length;
  totalValue.innerText = `$ ${userExpenses.reduce(
    (acc, el) => acc + Number(el.amount),
    0
  )}`;
};

getUserExpenses();
