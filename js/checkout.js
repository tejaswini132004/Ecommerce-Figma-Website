// Function to load and display cart items
function loadCartItems() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsList = document.querySelector(".cart-items");

  cartItemsList.innerHTML = "";

  if (cartItems.length === 0) {
    cartItemsList.innerHTML =
      "<h1 style='text-align:center;margin:20px;padding:20px'>EMPTY CART</h1>";
  } else {
    cartItemsList.innerHTML = "<h2>Your Cart</h2>";
    let totalAmount = 0;
    let totalQuantity = 0;

    cartItems.forEach((item) => {
      totalAmount += item.price;
      totalQuantity += item.quantity;

      const itemDiv = document.createElement("div");
      const subtotal = item.price * item.quantity;
      itemDiv.innerHTML = `
            
           <div class="items">
           <div class="img-container">
        <img class="item-img" src="${item.images[0]}" alt="${item.title}"/>
        <span class="quantity-badge">${item.quantity}</span>
    </div>
           <h3>${item.title}</h3>
                    <p class="price">Price: Rs ${item.price}</p>
                    
           </div>
           `;

      cartItemsList.appendChild(itemDiv);
    });
    const totalDiv = document.createElement("div");
    totalDiv.classList.add("total-amount");
    totalDiv.innerHTML = `
        <h3>Total Items: ${totalQuantity}</h3>
            <h3>Total Amount: Rs ${totalAmount}</h3>
        `;

    cartItemsList.appendChild(totalDiv);
  }
}

// Load cart items when the page loads
window.onload = loadCartItems;

const btn = document.querySelector("button[type='submit']");
const emailInput = document.querySelector("input[type='email']");
const firstNameInput = document.querySelector(
  "input[placeholder='First Name']"
);
const lastNameInput = document.querySelector("input[placeholder='Last Name']");
const addressInput = document.querySelector("textarea");
const phoneInput = document.querySelector("input[type='tel']");

btn.addEventListener("click", (e) => {
  e.preventDefault();

  const emailValue = emailInput.value;
  const phoneValue = phoneInput.value;

  const phonePattern = /^\d+$/;

  if (
    emailValue.includes("@") &&
    firstNameInput.value &&
    lastNameInput.value &&
    addressInput.value &&
    phonePattern.test(phoneValue)
  ) {
    localStorage.removeItem("cart");

    loadCartItems();

    const cartItemsList = document.querySelector(".cart-items");
    cartItemsList.innerHTML = `
            <h1 style='text-align:center;margin:20px;padding:20px;font-size:30px'>Thank You for Your Order!</h1>
            <p style='text-align:center;font-size:25px'>Your order has been placed successfully.</p>
            <p style='text-align:center;margin-top:20px'>
                <a href='index.html' style='text-decoration:none; color:#000;font-size:25px'>Shop Again</a>
            </p>
        `;

    emailInput.value = "";
    firstNameInput.value = "";
    lastNameInput.value = "";
    addressInput.value = "";
    phoneInput.value = "";
  } else {
    alert(
      "Please fill in all required fields. Ensure the email is valid and the phone number contains only digits."
    );
  }
});
