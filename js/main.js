// Lấy các phần tử cần sử dụng
const sliderStage = document.querySelector(".banner__stage");
const bestsellingProductStage = document.querySelector(
  ".bestselling-product__stage"
);
const prevButtonBanner = document.querySelector(
  ".translate__button-prev.banner__btn"
);
const nextButtonBanner = document.querySelector(
  ".translate__button-next.banner__btn"
);
const prevButtonBsProduct = document.querySelector(
  ".translate__button-prev.bestselling-product__btn"
);
const nextButtonBsProduct = document.querySelector(
  ".translate__button-next.bestselling-product__btn"
);
const bannerItems = document.querySelectorAll(".banner__item");
const bsProductItems = document.querySelectorAll(
  ".bestselling-product__stage .product__item"
);

// Xác định kích thước của mỗi item trong slider
const itemWidthSlider = bannerItems[0].offsetWidth;
const numItemsSlider = bannerItems.length;
let currentPositionSlider = 0;
let timerIdSlider; // Để lưu ID của interval

// Xác định kích thước của mỗi item trong bestselling product
const itemWidthProduct = bsProductItems[0].offsetWidth;
const gapProduct = 8;
let currentPositionProduct = 0;

// Thiết lập sự kiện khi nhấp vào nút Previous của slider
prevButtonBanner.addEventListener("click", () => {
  currentPositionSlider =
    (currentPositionSlider - 1 + numItemsSlider) % numItemsSlider;
  updateSliderPosition();
  resetTimer();
});

// Thiết lập sự kiện khi nhấp vào nút Next của slider
nextButtonBanner.addEventListener("click", () => {
  currentPositionSlider = (currentPositionSlider + 1) % numItemsSlider;
  updateSliderPosition();
  resetTimer();
});

// Cập nhật vị trí hiện tại của slider
function updateSliderPosition() {
  const translateXValue = -currentPositionSlider * itemWidthSlider;
  sliderStage.style.transform = `translateX(${translateXValue}px)`;
}

// Hàm chuyển đổi slider tự động
function autoSwitchSlider() {
  currentPositionSlider = (currentPositionSlider + 1) % numItemsSlider;
  updateSliderPosition();
}

// Hàm reset thời gian tự động
function resetTimer() {
  clearInterval(timerIdSlider); // Xóa interval hiện tại
  timerIdSlider = setInterval(autoSwitchSlider, 5000); // Tạo interval mới
}

// Bắt đầu tự động chuyển đổi slider sau mỗi 5 giây
timerIdSlider = setInterval(autoSwitchSlider, 5000);

// Thiết lập sự kiện khi nhấp vào nút Previous của bestselling product
prevButtonBsProduct.addEventListener("click", () => {
  currentPositionProduct = Math.max(currentPositionProduct - 1, 0);
  updateProductPosition();
  toggleButtonVisibility();
});

// Thiết lập sự kiện khi nhấp vào nút Next của bestselling product
nextButtonBsProduct.addEventListener("click", () => {
  currentPositionProduct = Math.min(
    currentPositionProduct + 1,
    bsProductItems.length - 5
  );
  console.log(currentPositionProduct);
  updateProductPosition();
  toggleButtonVisibility();
});

function updateProductPosition() {
  const translateXValue = -(
    currentPositionProduct *
    (itemWidthProduct + gapProduct)
  );
  bestsellingProductStage.style.transform = `translateX(${translateXValue}px)`;
}

function toggleButtonVisibility() {
  prevButtonBsProduct.style.display =
    currentPositionProduct === 0 ? "none" : "block";
  nextButtonBsProduct.style.display =
    currentPositionProduct === bsProductItems.length - 5 ? "none" : "block";
}

// Dropdown Sort
function toggleDropdown() {
  var dropdownContent = document.getElementById("dropdownContent");
  if (dropdownContent.style.display === "none") {
    dropdownContent.style.display = "block";
  } else {
    dropdownContent.style.display = "none";
  }
}

// Pagination
var currentPage = 1;
var totalPages = 5;

var previousBtn = document.querySelector(".previous");
var nextBtn = document.querySelector(".next");
var pageLinks = document.querySelectorAll(".page");

function updatePagination() {
  for (var i = 0; i < pageLinks.length; i++) {
    if (i + 1 === currentPage) {
      pageLinks[i].classList.add("active");
    } else {
      pageLinks[i].classList.remove("active");
    }
  }

  if (currentPage === 1) {
    previousBtn.classList.add("hidden");
  } else {
    previousBtn.classList.remove("hidden");
  }

  if (currentPage === totalPages) {
    nextBtn.classList.add("hidden");
  } else {
    nextBtn.classList.remove("hidden");
  }
}

function goToPage(page) {
  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    updatePagination();
  }
}

previousBtn.addEventListener("click", function (e) {
  console.log("1");
  e.preventDefault();
  if (currentPage > 1) {
    currentPage--;
    updatePagination();
  }
});

nextBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (currentPage < totalPages) {
    currentPage++;
    updatePagination();
  }
});

for (var i = 0; i < pageLinks.length; i++) {
  pageLinks[i].addEventListener("click", function (e) {
    e.preventDefault();
    var page = parseInt(this.textContent);
    goToPage(page);
  });
}

updatePagination();
