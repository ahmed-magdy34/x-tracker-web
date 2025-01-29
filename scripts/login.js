"use strict";
const email = document.getElementById("email");
const password = document.getElementById("password");
const button = document.getElementById("submit-btn");
//////////////////////////////////////////////////////
const loginValues = {};
///////////////////////////////////////////////////////
button.addEventListener("click", (e) => {
  e.preventDefault();
  if (!email.value) {
    email.classList.add("error");
    return;
  }
  if (!password.value) {
    password.classList.add("error");
  }
  if (email.value && password.value) {
    password.classList.remove("error");
    email.classList.remove("error");
    //////////////
    loginValues.email = email.value;
    loginValues.password = password.value;
    email.value = "";
    password.value = "";
    console.log(loginValues);
  }
});
