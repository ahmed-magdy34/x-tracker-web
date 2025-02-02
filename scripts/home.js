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
];
/////////////////////////dom selections/////////////////
const descriptionEditInput = document.getElementById("description");
const amountEditInput = document.getElementById("amount");
const modalOverlay = document.getElementById("edit-overlay");
const editModal = document.getElementById("edit-modal");
const summary = document.getElementById("summary-section");
const closeButton = document.getElementById("close-btn");
const tableBody = document.getElementById("table-body");
const submitButton = document.getElementById("submit-btn");
/////////////////////////////helper variables////////////////////////////
let expenseToEdit = {};
/////////////////////////////////

const deleteExpense = (id) => {
  testArr = testArr.filter((el) => el.id !== id);
  updateTable();
  updateSummary();
};
const editExpense = (id) => {
  expenseToEdit = testArr.filter((el) => el.id === Number(id))[0];
  amountEditInput.value = expenseToEdit.amount;
  descriptionEditInput.value = expenseToEdit.description;
  modalOverlay.classList.remove("visible");
  editModal.classList.remove("visible");
};
closeButton.addEventListener("click", (e) => {
  e.preventDefault();
  modalOverlay.classList.add("visible");
  editModal.classList.add("visible");
});
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  const editedExpense = {
    id: expenseToEdit?.id,
    description: descriptionEditInput.value,
    amount: amountEditInput.value,
    date: expenseToEdit?.date,
  };
  modalOverlay.classList.add("visible");
  editModal.classList.add("visible");
  console.log(editedExpense);
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
          <td>${expense.date}</td>
          <td>${expense.amount}$</td>
          <td>
            <div class="icons-container">
              <i class="fa-solid fa-pen-to-square edit-icon" edit-id='${expense.id}'></i>
              <i class="fa-solid fa-delete-left delete-icon"  data-id="${expense.id}"></i>
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
const updateSummary = () => {
  summary.innerHTML = "";
  summary.insertAdjacentHTML(
    "beforeend",
    `
        <div class='sum-elements'>
          <p>No. of Expenses: ${testArr.length}</p>
          <p>Total Amount: ${testArr.reduce(
            (acc, el) => acc + el.amount,
            0
          )} $</p>
        </div>
      `
  );
};

updateTable();
updateSummary();
