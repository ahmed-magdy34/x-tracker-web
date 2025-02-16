import { register } from "../services/apiFunctions.js";
("use strict");

const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const button = document.getElementById("submit-btn");
const form = document.getElementById("reg-form");
const toLoginButton = document.getElementById("link-btn");
const registerToast = document.getElementById("register-toast");

////////////////////////////////////////////////////
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const firstNameError = document.getElementById("first-name-error");
const lastNameError = document.getElementById("last-name-error");

/////////////////////////////////////////////////////
const registerValues = {};
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/////////////////////////////////////////////////////

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let formIsValid = true;

  if (!firstName.value) {
    firstName.classList.add("error");
    formIsValid = false;
    firstNameError.classList.remove("err-hide");
  } else {
    firstName.classList.remove("error");
    firstNameError.classList.add("err-hide");
  }

  if (!lastName.value) {
    lastName.classList.add("error");
    lastNameError.classList.remove("err-hide");

    formIsValid = false;
  } else {
    lastNameError.classList.add("err-hide");

    lastName.classList.remove("error");
  }

  if (!email.value || !emailPattern.test(email.value)) {
    email.classList.add("error");
    emailError.classList.remove("err-hide");

    formIsValid = false;
  } else {
    emailError.classList.add("err-hide");

    email.classList.remove("error");
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
    registerValues.first_name = firstName.value.trim();
    registerValues.last_name = lastName.value.trim();
    registerValues.email = email.value.trim();
    registerValues.password = password.value.trim();

    firstName.value = "";
    lastName.value = "";
    email.value = "";
    password.value = "";
    register(registerValues).then((res) => {
      if (res.error) {
        registerToast.innerHTML = `<div class="toast">${res.error} ❌</div>`;
        registerToast.classList.remove("hidden");
        setTimeout(() => {
          registerToast.classList.add("hidden");
        }, 3000);
      } else if (res.message === "User registered successfully") {
        registerToast.innerHTML = `<div class="toast">${res.message} ✅</div>`;
        registerToast.classList.remove("hidden");
        setTimeout(() => {
          registerToast.classList.add("hidden");
        }, 3000);
        window.location.href = "login.html";
      }
    });

    console.log(registerValues);
  }
});
