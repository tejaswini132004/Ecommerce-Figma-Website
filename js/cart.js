document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("product");
    const quantity = urlParams.get("quantity");
  
    // Fetch product data and display in cart
    if (productId && quantity) {
      fetch("ECommercedata.json")
        .then((response) => response.json())
        .then((data) => {
          const { mens, womens, accessories } = data.products;
          const allProducts = [...mens, ...accessories, ...womens];
          const product = allProducts.find(
            (item) => item.id === Number(productId)
          );
  
          if (product) {
            addToCart(product, quantity);
          } else {
            document.querySelector(".cart-container").innerHTML =
              "<p>Product not found</p>";
          }
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
        });
    } else {
      // If there's no new product, display the existing cart items
      displayCartItems();
    }
  });
  
  // Function to add product to the cart and save it to localStorage
  function addToCart(product, quantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Check if the product already exists in the cart
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      // Update the quantity of the existing product
      existingProduct.quantity =
        parseInt(existingProduct.quantity) + parseInt(quantity);
    } else {
      // Add the new product to the cart
      cart.push({ ...product, quantity: parseInt(quantity) });
    }
  
    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  
    // Update the cart count after adding to the cart
    updateCartCount();
  
    if (window.location.pathname.includes("cart.html")) {
      displayCartItems();
    }
  }
  
  function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = cart.reduce((total, item) => total + parseInt(item.quantity), 0);
    
    // Ensure the navbar element exists before updating the cart count
    const cartCountElement = document.querySelector(".nav-count");
    if (cartCountElement) {
      cartCountElement.textContent = `Cart ${cartCount}`;
    }
  }
  
  // Function to display cart items from localStorage
  function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    if (cart.length === 0) {
      document.querySelector(".cart-container").innerHTML =
        "<p style='text-align:center;font-size:70px;margin:100px;padding:20px'>EMPTY CART</p>";
      return;
    }
  
    const cartContainer = document.querySelector(".cart-container");
    let cartHTML = `
      <div class="cart-content">
          <h1><span>${cart.length}</span> items in cart</h1><hr>
          <div class="cart-title">
          <h3>Item</h3>
          <h3>Price</h3>
          <h3>Quantity</h3>
          <h3>SubTotal</h3>
          </div>
      `;
  
    let totalAmount = 0;
    cart.forEach((product, index) => {
      const { title, price, images, quantity } = product;
      const subtotal = price * quantity; 
      totalAmount += subtotal;
      cartHTML += `
          <div class="cart-item">
              <div class="item">
                  <box-icon name='x-circle' class="remove" data-index="${index}"></box-icon>
                  <img src="${images[0]}" alt="${title}"/>
                  <h3>${title}</h3>
              </div>
              <p>Rs ${price}</p>
              <div class="quantity-control">
                  <button class="decrement" data-index="${index}">-</button>
                  <p class="quantity">${quantity}</p>
                  <button class="increment" data-index="${index}">+</button>
              </div>
              <p>Rs ${subtotal}</p>
          </div>
          <hr>
      `;
    });
  
    cartHTML += `
    <div class="cart-total">
        <h3>Total Amount: Rs ${totalAmount}</h3>
        <button class="checkout-btn">CHECKOUT</button>
    </div>
    `;
  
    cartHTML += `</div>`;
    cartContainer.innerHTML = cartHTML;


    //event listener for checkout button
    const checkoutBtn=document.querySelector(".checkout-btn");
    checkoutBtn.addEventListener("click",()=>{
      window.location.href="checkout.html";
    })
  
    // Add event listeners for remove buttons
    const removeBtns = document.querySelectorAll(".remove");
    removeBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        removeFromCart(index);
      });
    });
  
    // Add event listeners for increment and decrement buttons
    const incrementBtns = document.querySelectorAll(".increment");
    incrementBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        updateQuantity(index, 1); // Increment
      });
    });
  
    const decrementBtns = document.querySelectorAll(".decrement");
    decrementBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        updateQuantity(index, -1); // Decrement
      });
    });
  }
  
  function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
  
    localStorage.setItem("cart", JSON.stringify(cart));
  
    updateCartCount();
  
    if (window.location.pathname.includes("cart.html")) {
      displayCartItems();
    }
  }
  
  function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Update the quantity
    if (change === 1) {
      cart[index].quantity += 1; // Increment
    } else if (change === -1 && cart[index].quantity > 1) {
      cart[index].quantity -= 1; // Decrement, only if greater than 1
    }
  
    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    
    if (window.location.pathname.includes("cart.html")) {
      displayCartItems(); 
    }
  }
  