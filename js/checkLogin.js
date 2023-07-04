document.addEventListener("DOMContentLoaded", function () {
  const hasLogin = localStorage.getItem("hasLogin");
  const loginForm = document.querySelector(".login-form");
  const accountForm = document.querySelector(".account-form");
  const logoutBtn = document.querySelector(".logout-btn");

  if (hasLogin) {
    loginForm.classList.add("hidden");
    accountForm.classList.remove("hidden");
  } else {
    loginForm.classList.remove("hidden");
    accountForm.classList.add("hidden");
  }

  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("hasLogin");
  });
});
