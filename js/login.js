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

// Xử lý phần signup và submit thông tin đăng kí tài khoản mới
function signup(event) {
  event.preventDefault();
  var firstnameInput = document.getElementById("firstname");
  var lastnameInput = document.getElementById("lastname");
  var emailInput = document.getElementById("signup-email");
  var passwordInput = document.getElementById("signup-password");
  var confirmPasswordInput = document.getElementById("confirm-password");

  var firstname = firstnameInput.value.trim();
  var lastname = lastnameInput.value.trim();
  var email = emailInput.value.trim();
  var password = passwordInput.value;
  var confirmPassword = confirmPasswordInput.value;

  if (!firstname || !lastname || !email || !password || !confirmPassword) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Mật khẩu và xác nhận mật khẩu không khớp!");
    return;
  }

  var user = {
    firstName: firstname,
    lastName: lastname,
    email: email,
    password: password,
  };

  var json = JSON.stringify(user);
  localStorage.setItem(email, json);

  // Clear input values
  firstnameInput.value = "";
  lastnameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
  confirmPasswordInput.value = "";

  alert("Đăng ký thành công!");
}

document.getElementById("signup-button").addEventListener("click", signup);

// Xử lý phần Login và kiểm tra người dùng có được chấp thuận truy cập hay không?
function login(event) {
  event.preventDefault();
  var email = document.getElementById("login-email").value.trim();
  var password = document.getElementById("login-password").value;

  if (!email || !password) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }

  var storedUser = localStorage.getItem(email);

  if (storedUser) {
    var user = JSON.parse(storedUser);
    if (password === user.password) {
      alert("Đăng nhập thành công!");
      localStorage.setItem("hasLogin", "Login");

      window.location.href = "index.html";
    } else {
      alert("Thông tin đăng nhập không chính xác. Vui lòng kiểm tra lại!");
      // Tiến hành xử lý khi đăng nhập thất bại, ví dụ như hiển thị thông báo lỗi hoặc xóa các trường đăng nhập
    }
  } else {
    alert("Người dùng không tồn tại. Vui lòng đăng ký trước!");
    // Tiến hành xử lý khi người dùng không tồn tại, ví dụ như hiển thị thông báo lỗi hoặc xóa các trường đăng nhập
  }
}

document.getElementById("login-button").addEventListener("click", login);
