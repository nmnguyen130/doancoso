document.addEventListener("DOMContentLoaded", function () {
  const priceElement = document.querySelector(".price-info .value");
  const totalPrice = localStorage.getItem("totalPrice");

  const formattedPrice = formatPrice(parseFloat(totalPrice));
  priceElement.textContent = formattedPrice;

  function formatPrice(price) {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }
});
