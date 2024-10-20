document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const selectedCategory = urlParams.get("category");

  fetch("ECommercedata.json")
    .then((response) => response.json())
    .then((data) => {
      const { mens, womens, accessories } = data.products;
      let productsToDisplay = [];

      if (selectedCategory == "womens") {
        productsToDisplay = womens;
      }
      if (selectedCategory == "mens") {
        productsToDisplay = mens;
      }
      if (selectedCategory == "accessories") {
        productsToDisplay = accessories;
      }

      renderProducts(productsToDisplay);
    });
});

function renderProducts(products) {
  const productContainer = document.querySelector(".swiper-wrapper");
  productContainer.innerHTML = "";

  products.forEach((product) => {
    const productElement = `
<div class="product swiper-slide" data-id="${product.id}">
<img src="${product.thumbnail}" alt="${product.title}"/>
<h3>${product.title}</h3>
<p>Price: Rs ${product.price}</p>
</div>
`;
    productContainer.innerHTML += productElement;
  });

  //slider to slider container
  const swiper = new Swiper(".swiper-container", {
    slidesPerView: 2,
    spaceBetween: 30,

    loop: true,

    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 50,
      },

      480: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
    },
  });

  //event listner to each product to retrive productId
  document.querySelectorAll(".product").forEach((img) => {
    img.addEventListener("click", (e) => {
      const productId = e.currentTarget.dataset.id;
      console.log(productId);

      if (productId) {
        window.location.href = `product.html?product=${productId}`;
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});
