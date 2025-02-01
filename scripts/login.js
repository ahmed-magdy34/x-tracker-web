"use strict";
const email = document.getElementById("email");
const password = document.getElementById("password");
const button = document.getElementById("submit-btn");
const passwordError = document.getElementById("password-error");
const emailError = document.getElementById("email-error");
const form = document.getElementById("log-form");
//////////////////////////////////////////////////////
const loginValues = {};
///////////////////////////////////////////////////////

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let formIsValid = true;

  if (!email.value) {
    email.classList.add("error");
    formIsValid = false;
    emailError.classList.remove("err-hide");
  } else {
    email.classList.remove("error");
    emailError.classList.add("err-hide");
  }

  if (!password.value) {
    password.classList.add("error");
    passwordError.classList.remove("err-hide");
    formIsValid = false;
  } else {
    password.classList.remove("error");
    passwordError.classList.add("err-hide");
  }

  if (formIsValid) {
    loginValues.email = email.value.trim("");
    loginValues.password = password.value.trim("");
    email.value = "";
    password.value = "";
    console.log(loginValues);
  }
});
