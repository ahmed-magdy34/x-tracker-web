import { formatDate } from "../utils/dateFormat.js";

let testArr = [
  {
    id: 1,
    description: "bought month supplies",
    date: Date.now(),
    amount: 150,
  },
  {
    id: 2,
    description: "dog food",
    date: Date.now(),
    amount: 120,
  },
  {
    id: 3,
    description: "bought laptop",
    date: Date.now(),
    amount: 600,
  },
  {
    id: 4,
    description: "bought laptop",
    date: Date.now(),
    amount: 600,
  },
  {
    id: 2,
    description: "dog food",
    date: Date.now(),
    amount: 120,
  },
  {
    id: 2,
    description: "dog food",
    date: Date.now(),
    amount: 120,
  },
  {
    id: 2,
    description: "dog food",
    date: Date.now(),
    amount: 120,
  },
  {
    id: 2,
    description: "dog food",
    date: Date.now(),
    amount: 120,
  },
  {
    id: 2,
    description: "dog food",
    date: Date.now(),
    amount: 120,
  },
  {
    id: 2,
    description: "dog food",
    date: Date.now(),
    amount: 120,
  },
  {
    id: 2,
    description: "dog food",
    date: Date.now(),
    amount: 120,
  },
];
/////////////////////////dom selections/////////////////
const descriptionEditInput = document.getElementById("description");
const amountEditInput = document.getElementById("amount");
const dateEditInput = document.getElementById("date");
const modalOverlay = document.getElementById("edit-overlay");
const editModal = document.getElementById("edit-modal");
const closeButton = document.getElementById("close-btn");
const tableBody = document.getElementById("table-body");
const editForm = document.getElementById("edit-form");
const signOutButton = document.getElementById("sign-out");
const amountError = document.getElementById("amount-err");
const modalEmptyError = document.getElementById("empty-err");
const amountZeroError = document.getElementById("amount-err-zero");
const newAmountError = document.getElementById("new-amount-err");
const newModalEmptyError = document.getElementById("new-empty-err");
const newAmountZeroError = document.getElementById("new-amount-err-zero");
const addForm = document.getElementById("add-form");
const addModalOverlay = document.getElementById("add-overlay");
const closeAddModal = document.getElementById("close-add-btn");
const newDescription = document.getElementById("new-description");
const newAmount = document.getElementById("new-amount");
const newDate = document.getElementById("new-date");
/////////////////////////////helper variables////////////////////////////
const clearAddModal = () => {
  addModalOverlay.classList.add("hidden");
  newModalEmptyError.classList.add("hidden");
  newAmountError.classList.add("hidden");
  newAmountZeroError.classList.add("hidden");
  newAmount.value = "";
  newDescription.value = "";
  newDate.value = "";
};
const clearEditModal=()=>{
  modalOverlay.classList.add("hidden");
  editModal.classList.add("hidden");
  modalEmptyError.classList.remove("hidden");
  newAmountError.classList.remove("hidden");
  newAmountZeroError.classList.remove("hidden");



}
///////////////////////////////////////////////////
let expenseToEdit = {};
if (!localStorage.getItem("authToken")) {
  window.location.href = "login.html";
} else {
  console.log(localStorage.getItem("authToken"));
}
/////////////////////////////////
signOutButton.addEventListener("click", () => {
  localStorage.removeItem("authToken");
  window.location.href = "login.html";
});
const deleteExpense = (id) => {
  const confirmation = confirm("Are you sure you want to delete this expense?");
  if (confirmation) {
    testArr = testArr.filter((el) => el.id !== id);
    updateTable();
    updateSummary();
  } else {
    return;
  }
};
const editExpense = (id) => {
  expenseToEdit = testArr.filter((el) => el.id === Number(id))[0];
  amountEditInput.value = expenseToEdit.amount;
  descriptionEditInput.value = expenseToEdit.description;
  dateEditInput.value = expenseToEdit.date;
  modalOverlay.classList.remove("hidden");
  editModal.classList.remove("hidden");

};
closeButton.addEventListener("click", (e) => {
  e.preventDefault();
  modalOverlay.classList.add("hidden");
  editModal.classList.add("hidden");
});
editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!descriptionEditInput.value || !amountEditInput.value || !dateEditInput) {
    modalEmptyError.classList.remove("hidden");
    return;
  }
  if (Number(amountEditInput.value) < 0) {
    amountError.classList.remove("hidden");
    return;
  } else if (Number(amountEditInput.value) === 0) {
    amountZeroError.classList.remove("hidden");
    return;
  }
  const editedExpense = {
    id: expenseToEdit?.id,
    description: descriptionEditInput.value,
    amount: Number(amountEditInput.value),
    date: dateEditInput.value
      ? formatDate(dateEditInput.value)
      : formatDate(expenseToEdit?.date),
  };
  console.log(editedExpense);
  
});

/////////////////////////////////
closeAddModal.addEventListener("click", (e) => {
  e.preventDefault();
  clearAddModal();
});
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!newAmount.value || !newDescription.value || !newDate.value) {
    newModalEmptyError.classList.remove("hidden");

    return;
  }
  if (Number(newAmount.value) < 0) {
    newAmountError.classList.remove("hidden");
    return;
  }
  if (Number(newAmount.value) === 0) {
    newAmountZeroError.classList.remove("hidden");
    return;
  }
  const newExpense = {
    description: newDescription.value,
    amount: Number(newAmount.value),
    date: formatDate(newDate.value),
  };
  clearAddModal();

  console.log(newExpense);
});

/////////////////////table function////////////
const updateTable = () => {
  tableBody.innerHTML = "";
  testArr.forEach((expense) => {
    tableBody.insertAdjacentHTML(
      "afterbegin",
      `<tr>
          <td>${expense.id}</td>
          <td>${expense.description}</td>
          <td>${formatDate(expense.date)}</td>
          <td>${expense.amount}$</td>
          <td>
            <div class="icons-container">
              <i class="fa-solid fa-pen-to-square edit-icon" edit-id='${
                expense.id
              }'></i>
              <i class="fa-solid fa-delete-left delete-icon"  data-id="${
                expense.id
              }"></i>
            </div>
          </td>
        </tr>`
    );
  });
  ////////////////////////////////////////////////
  const deleteIcons = document.querySelectorAll(".fa-delete-left");
  deleteIcons.forEach((icon) => {
    const expenseId = icon.getAttribute("data-id");
    icon.addEventListener("click", () => {
      deleteExpense(Number(expenseId));
    });
  });
  ////////////////////////////////////
  const editIcons = document.querySelectorAll(".fa-pen-to-square");
  editIcons.forEach((icon) => {
    const editId = icon.getAttribute("edit-id");
    icon.addEventListener("click", () => {
      editExpense(editId);
    });
  });
};
/////////////////////////summary function/////////////////////
const numberSpan = document.getElementById("no-of-x");
const totalValue = document.getElementById("total-value");
const updateSummary = () => {
  numberSpan.innerText = testArr.length;
  totalValue.innerText = testArr.reduce(
    (acc, el) => acc + Number(el.amount),
    0
  );
};
const addButton = document.getElementById("add-btn");
addButton.addEventListener("click", () => {
  addModalOverlay.classList.remove("hidden");
});

updateTable();
updateSummary();
