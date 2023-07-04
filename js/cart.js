document.addEventListener("DOMContentLoaded", function () {
  // In Cart
  const cartItemsList = document.querySelector(".cart-items-list");
  const totalPrice = document.querySelector(".total-price span");
  const buyButton = document.querySelector(".buy-button");
  const numberItem = document.querySelector(".number-item");

  // product.html
  const buyNowButton = document.querySelector(".btn-buynow");
  const cartAddButton = document.querySelector(".btn-addtocart");

  // thanhtoan.html
  const checkoutBtn = document.getElementById("checkout-btn");

  let cartItems = [];

  if (buyNowButton) {
    buyNowButton.addEventListener("click", function () {
      const productName = document.querySelector(".product-name").textContent;
      const cleanedProductName = productName.split(" i")[0];

      const productPrice = document.querySelector(".p-final-price").textContent;
      const productImage = document.querySelector(".product-img.cart-img img");
      const imageSource = productImage.src;

      addItemToCart(cleanedProductName, productPrice, imageSource);
    });
  }

  if (cartAddButton) {
    cartAddButton.addEventListener("click", function () {
      const productName = document.querySelector(".product-name").textContent;
      const cleanedProductName = productName.split(" i")[0];

      const productPrice = document.querySelector(".p-final-price").textContent;
      const productImage = document.querySelector(".product-img.cart-img img");
      const imageSource = productImage.src;

      addItemToCart(cleanedProductName, productPrice, imageSource);
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function () {
      // Lưu lại tổng tiền trước khi xóa
      const previousTotalPrice = parseFloat(
        totalPrice.textContent.replace(/\./g, "")
      );

      localStorage.setItem("totalPrice", previousTotalPrice);

      cartItems = [];
      localStorage.removeItem("cartItems");
      updateCart();
      updateCartCount();
    });
  }

  // Hàm để thêm sản phẩm vào giỏ hàng
  function addItemToCart(itemName, itemPrice, itemImage) {
    const item = {
      name: itemName,
      price: itemPrice,
      image: itemImage,
    };
    cartItems.push(item);
    updateCart();
    saveCartToStorage(); // Lưu giỏ hàng vào localStorage
  }

  function removeItemFromCart(index) {
    cartItems.splice(index, 1);
    updateCart();
    saveCartToStorage(); // Lưu giỏ hàng vào localStorage
  }

  // Hàm để cập nhật hiển thị giỏ hàng
  function updateCart() {
    cartItemsList.innerHTML = "";
    let totalPriceValue = 0;

    cartItems.forEach(function (item, index) {
      const li = document.createElement("li");
      li.classList.add("cart-item");

      const image = document.createElement("img");
      image.src = item.image;
      image.alt = "";

      const name = document.createElement("span");
      name.classList.add("item-name");
      name.textContent = item.name;

      const price = document.createElement("span");
      price.classList.add("item-price");
      price.textContent = item.price;

      const removeButton = document.createElement("button");
      removeButton.classList.add("remove-button");
      removeButton.textContent = "Xóa";
      removeButton.addEventListener("click", function () {
        removeItemFromCart(index);
      });

      li.appendChild(image);
      li.appendChild(name);
      li.appendChild(price);
      li.appendChild(removeButton);
      cartItemsList.appendChild(li);

      totalPriceValue += parseFloat(item.price.replace(/\./g, ""));
    });

    totalPrice.textContent = formatPrice(totalPriceValue);
    updateCartCount();
  }

  // Hàm để cập nhật số lượng sản phẩm trong giỏ hàng
  function updateCartCount() {
    if (numberItem) {
      numberItem.textContent = cartItems.length;
      if (cartItems.length > 0) {
        numberItem.parentElement.classList.add("show");
      } else {
        numberItem.parentElement.classList.remove("show");
      }
    }
  }

  // Hàm để định dạng giá tiền
  function formatPrice(price) {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }

  // Hàm để lưu giỏ hàng vào localStorage
  function saveCartToStorage() {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  // Hàm để khôi phục giỏ hàng từ localStorage
  function loadCartFromStorage() {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      cartItems = JSON.parse(storedCartItems);
      updateCart();
    }
  }

  loadCartFromStorage();

  updateCartCount();

  if (buyButton) {
    buyButton.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "thanhtoan.html";
    });
  }
});
