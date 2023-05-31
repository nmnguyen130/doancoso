// Lấy danh sách các hình ảnh trong phần product-desImage
const productImages = document.querySelectorAll(
  ".product-desImage .product-img img"
);

// Lấy phần tử có lớp active trong phần product-bigImage
const activeImage = document.querySelector(
  ".product-bigImage .product-img.active"
);

// Lặp qua từng hình ảnh và gắn sự kiện click
productImages.forEach((image) => {
  image.addEventListener("click", function () {
    const src = this.getAttribute("src"); // Lấy đường dẫn hình ảnh

    // Thay đổi đường dẫn hình ảnh trong phần tử activeImage
    activeImage.querySelector("img").setAttribute("src", src);

    // Xóa lớp active khỏi tất cả các phần tử trong phần product-desImage
    document
      .querySelectorAll(".product-desImage .product-img")
      .forEach((item) => {
        item.classList.remove("active");
      });

    // Thêm lớp active cho phần tử được click
    this.parentNode.classList.add("active");

    // Reset animation bằng cách gán một lớp mới cho activeImage
    activeImage.classList.remove("active");
    void activeImage.offsetWidth; // Trigger reflow
    activeImage.classList.add("active");
  });
});
