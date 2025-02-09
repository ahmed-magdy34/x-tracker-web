"use strict";

import { resetPassword } from "../services/apiFunctions.js";

const form = document.getElementById("reset-form");
const emailInput = document.getElementById("email");
const emailErr = document.getElementById("email-err");
const newPasswordInput = document.getElementById("new-pass");
const newPasswordErr = document.getElementById("new-pass-err");
const logo = document.getElementById("logo");
const resetToaster = document.getElementById("reset-toast");
const resetButton = document.getElementById("submit-btn");
///////////////////////////////////////
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const userValues = {};
const toastHandler = (message, emoji) => {
  resetToaster.innerHTML = `<div class="toast">${message} ${emoji}</div>`;
  resetToaster.classList.remove("hidden");
  setTimeout(() => resetToaster.classList.add("hidden"), 3000);
};
//////////////////////////////////////
logo.addEventListener("click", () => {
  window.location.href = "login.html";
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  resetButton.disabled = true;
  resetButton.textContent = "resetting...";
  if (!emailInput.value || !emailPattern.test(emailInput.value)) {
    emailErr.classList.remove("hidden");
    emailInput.classList.add("err");
    return;
  } else {
    emailErr.classList.add("hidden");
    emailInput.classList.remove("err");
  }
  if (!newPasswordInput.value) {
    newPasswordErr.classList.remove("hidden");
    newPasswordInput.classList.add("err");
    return;
  } else {
    newPasswordErr.classList.add("hidden");
    newPasswordInput.classList.remove("err");
  }
  userValues.email = emailInput.value.trim();
  userValues.new_password = newPasswordInput.value.trim();
  emailInput.value = "";
  newPasswordInput.value = "";
  const res = await resetPassword(userValues);
  if (res?.error) {
    toastHandler(res.error, "❌");
  } else {
    toastHandler(res.message, "✅");
    window.location.href = "login.html";
  }
  resetButton.disabled = false;
  resetButton.textContent = "Submit";
});
