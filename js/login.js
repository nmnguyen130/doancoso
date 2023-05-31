document.addEventListener("DOMContentLoaded", () => {
  const btnShowHide = document.querySelectorAll(".eye-icon");

  btnShowHide.forEach((eyeIcon) => {
    const passwordField = eyeIcon.parentElement.querySelector(".password");

    function checkInputValue() {
      if (passwordField.value.trim() === "") {
        eyeIcon.classList.add("hidden");
      } else {
        eyeIcon.classList.remove("hidden");
      }
    }

    eyeIcon.addEventListener("click", () => {
      if (passwordField.type === "password") {
        passwordField.type = "text";
        eyeIcon.classList.replace("bx-hide", "bx-show");
      } else {
        passwordField.type = "password";
        eyeIcon.classList.replace("bx-show", "bx-hide");
      }
    });

    passwordField.addEventListener("input", checkInputValue);
    checkInputValue();
  });
});

// Login / Signup Change
// Lấy danh sách các liên kết "Đăng ký" và "Đăng nhập"
const signupLinks = document.getElementById("signupLink");
const loginLinks = document.querySelectorAll("#loginLink");
const forgotLinks = document.querySelectorAll("#forgotLink");
const resetpassLinks = document.querySelectorAll("#resetpassLink");

// Lấy các form "Đăng ký" và "Đăng nhập"
const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const forgotForm = document.getElementById("forgotForm");
const resetpassForm = document.getElementById("resetpassForm");

// Thêm trình lắng nghe sự kiện cho liên kết "Đăng ký"
signupLinks.addEventListener("click", (e) => {
  e.preventDefault();
  showForm("signup");
});

// Thêm trình lắng nghe sự kiện cho liên kết "Đăng nhập"
loginLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    showForm("login");
  });
});

forgotLinks[1].addEventListener("click", (e) => {
  e.preventDefault();
  showForm("forgot");
});

resetpassLinks[1].addEventListener("click", (e) => {
  e.preventDefault();
  showForm("resetpass");
});

function showForm(formType) {
  signupForm.style.display = formType === "signup" ? "block" : "none";
  loginForm.style.display = formType === "login" ? "block" : "none";
  forgotForm.style.display = formType === "forgot" ? "block" : "none";
  resetpassForm.style.display = formType === "resetpass" ? "block" : "none";

  signupLinks.classList.toggle("active", formType === "signup");
  loginLinks[0].classList.toggle("active", formType === "login");

  if (formType === "forgot") {
    signupLinks.parentElement.classList.add("hidden");
    loginLinks[0].parentElement.classList.add("hidden");
    resetpassLinks[0].parentElement.classList.add("hidden");
    forgotLinks[0].parentElement.classList.remove("hidden");
  } else if (formType === "resetpass") {
    signupLinks.parentElement.classList.add("hidden");
    loginLinks[0].parentElement.classList.add("hidden");
    forgotLinks[0].parentElement.classList.add("hidden");
    resetpassLinks[0].parentElement.classList.remove("hidden");
  } else {
    signupLinks.parentElement.classList.remove("hidden");
    loginLinks[0].parentElement.classList.remove("hidden");
    forgotLinks[0].parentElement.classList.add("hidden");
    resetpassLinks[0].parentElement.classList.add("hidden");
  }
}
