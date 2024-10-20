document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("product");

    if (productId) {
        fetch("ECommercedata.json")
            .then((response) => response.json())
            .then((data) => {
                const { mens, womens, accessories } = data.products;
                const allProducts = [...mens, ...accessories, ...womens];
                const product = allProducts.find((item) => item.id === Number(productId));

                if (product) {
                    renderSingleProduct(product);
                } else {
                    document.querySelector(".product-container").innerHTML = "<h1 style='text-align:center; margin:80px; letter-spacing:8px'>Product Not Found</h1>";
                }
            })
            .catch((error) => {
                console.error("Error fetching product data:", error);
            });
    }
});

function renderSingleProduct(product) {
    const productContainer = document.querySelector(".product-container");


    const largeImageSrc = product.images.length > 0 ? product.thumbnail : '';
    const smallImagesHTML = product.images.map((image, index) => `
        <img src="${image}" alt="${product.title}" class="small-image" ${index === 0 ? 'style="display:none;"' : ''}>
    `).join('');

    const productHTML = `
        <div class="product-detail">
            <div class="image-gallery">
                <div class="small-images">
                ${smallImagesHTML}
                </div>
                <div class="large-image">
                    <img src="${largeImageSrc}" alt="${product.title}" id="large-image">
                </div>
            </div>
            <div class="product-details">
                <h1>${product.title}</h1>
                <div class="size">
                    <button class="btn size-btn">S</button>
                    <button class="btn size-btn">M</button>
                    <button class="btn size-btn">L</button>
                    <button class="btn size-btn">X</button>
                    <button class="btn size-btn">XXL</button>
                </div>
                <div class="add-less">
                    <button class="btn" id="btn-increment">+</button>
                    <span id="quantity">1</span>
                    <button class="btn" id="btn-decrement">-</button>
                </div>
                <div class="price-container">
                    <button id="price" >Add Rs ${product.price}</button>
                </div>
                <p id="product-desc">${product.description}</p>
            </div>
        </div>
    `;

    productContainer.innerHTML = productHTML;

    const sizeButtons = document.querySelectorAll(".size-btn");
    sizeButtons.forEach(button => {
        button.addEventListener("click", () => {
            sizeButtons.forEach(btn => {
                btn.style.backgroundColor = ""; 
                btn.style.color = ""; 
            });
            button.style.backgroundColor = "black";
            button.style.color = "white"; 
        });
    });

    let quantity = 1;
    document.getElementById("quantity").innerHTML = quantity;

    document.getElementById("btn-increment").addEventListener("click", incrementQuantity);
    document.getElementById("btn-decrement").addEventListener("click", decrementQuantity);
    
    document.getElementById("price").addEventListener("click", () => {
        console.log("clciked");
        
        if (quantity > 0) {
            window.location.href = `cart.html?product=${product.id}&quantity=${quantity}`
            console.log("button clicked");
            
        }
    });
    
    function incrementQuantity() {
        quantity += 1; 
        updateQuantity();
    }
    
    function decrementQuantity() {
        if (quantity > 1) {
            quantity -= 1;
        }
        updateQuantity();
    }
    
    function updateQuantity() {
        document.getElementById("quantity").innerHTML = quantity; 
        const priceButton = document.getElementById("price");
        priceButton.disabled = quantity === 0; 
    }

    const smallImages = document.querySelectorAll(".small-image");
    const largeImage = document.querySelector("#large-image");

    smallImages.forEach((img) => {
        img.addEventListener("click", () => {
            const tempSrc = largeImage.src;
            largeImage.src = img.src;
            img.src = tempSrc;
        });
    });
}