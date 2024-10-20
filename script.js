const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,
  slidesPerView: 3,
  spaceBetween: 10,
});

const menuIcon = document.getElementById("menu-icon");
const hiddenMenu = document.querySelector(".hidden-menu");
const body = document.body;

menuIcon.addEventListener("click", function () {
  hiddenMenu.classList.toggle("show");

  if (hiddenMenu.classList.contains("show")) {
    body.classList.add("menu-open");
  } else {
    body.classList.remove("menu-open");
  }
});

//fetching first img from the json to show in the category section

document.addEventListener("DOMContentLoaded", () => {
  fetch("ECommercedata.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const { mens, womens, accessories } = data.products;

      const womensImg = document.querySelector(".womens-img");
      const mensImg = document.querySelector(".mens-img");
      const accessoriesImg = document.querySelector(".accessories-img");

      womensImg.src = womens[0].images[0];
      mensImg.src = mens[0].images[0];
      accessoriesImg.src = accessories[0].images[0];
    })
    .catch((error) => {
      console.log("Error Fetching data :", error);
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const upArrow = document.querySelector(".up-arrow");

  upArrow.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

const searchIcon = document.getElementById("search-icon");
const searchBar = document.getElementById("search-bar");

searchIcon.addEventListener("click", function () {
  if (searchBar.style.height === "50px") {
    searchBar.style.height = "0";
  } else {
    searchBar.style.height = "50px";
  }
});

const searchInput = document.querySelector(".search-input");

searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    handleSearch();
  }
});

function handleSearch() {
  const query = searchInput.value.toLowerCase().trim();

  if (query === "women" || query === "womens") {
    window.location.href = "category.html?category=womens";
  } else if (query === "men" || query === "mens") {
    window.location.href = "category.html?category=mens";
  } else if (query === "accessories") {
    window.location.href = "category.html?category=accessories";
  } else {
    alert("Try entering 'women', 'men', or 'accessories'.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});
