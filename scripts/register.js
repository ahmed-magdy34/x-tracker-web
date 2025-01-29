const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const button = document.getElementById("submit-btn");
////////////////////////////////////////////////////
const registerValues = {};
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

///////////////////////////////////////////////////
button.addEventListener("click", (e) => {
  e.preventDefault();
  if (!firstName.value) {
    firstName.classList.add("error");
    return;
  }
  if (!lastName.value) {
    lastName.classList.add("error");
    return;
  }
  if (!email.value || !emailPattern.test(email.value)) {
    email.classList.add("error");
    return;
  }
  if (!password.value) {
    password.classList.add("error");
    return;
  }
  ///////////////////////////////////
  if (
    email.value &&
    emailPattern.test(email.value) &&
    lastName.value &&
    firstName.value
  ) {
    ///////////////////
    firstName.classList.remove("error");
    lastName.classList.remove("error");
    email.classList.remove("error");
    password.classList.remove("error");
    //////////////////////

    registerValues.firstName = firstName.value;
    registerValues.lastName = lastName.value;
    registerValues.email = email.value;
    registerValues.password = email.value;
  }
  ///////////////////////////////////

  console.log(registerValues);
});
