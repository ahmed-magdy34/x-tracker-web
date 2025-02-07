"use strict";

import { login } from "../services/apiFunctions.js";

const email = document.getElementById("email");
const password = document.getElementById("password");
const button = document.getElementById("submit-btn");
const passwordError = document.getElementById("password-error");
const emailError = document.getElementById("email-error");
const form = document.getElementById("log-form");
const toLoginButton = document.getElementById("link-btn");
const loginToast = document.getElementById("login-toast");
//////////////////////////////////////////////////////
const loginValues = {};
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

///////////////////////////////////////////////////////
if (localStorage.getItem("authToken")) {
}
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let formIsValid = true;

  if (!email.value || !emailPattern.test(email.value)) {
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
    login(loginValues).then((res) => {
      console.log(res);
      if (res.access_token) {
        localStorage.setItem("authToken", res.access_token);
        window.location.href = "home.html";
      } else {
        loginToast.innerHTML = `<div class="toast">${res.error} ❌</div>`;
        loginToast.classList.remove("hidden");
        setTimeout(() => {
          loginToast.classList.add("hidden");
        }, 3000);
      }
    });
  }
});
