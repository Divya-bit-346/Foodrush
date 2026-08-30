let cart = JSON.parse(localStorage.getItem("foodrushCart")) || [];


// ============================
// ADD TO CART
// ============================

function addToCart(name, price) {

    const existingItem = cart.find(
        item => item.name === name
    );

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    localStorage.setItem(
        "foodrushCart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert(name + " added to cart!");
}


// ============================
// CART COUNT
// ============================

function updateCartCount() {

    const countElement =
        document.querySelector(".cart-count");

    if (!countElement) return;

    let count = 0;

    cart.forEach(item => {
        count += item.quantity;
    });

    countElement.textContent = count;
}


// ============================
// DISPLAY CART
// ============================

function displayCart() {

    const cartContainer =
        document.getElementById("cartItems");

    if (!cartContainer) return;

    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div class="text-center p-5">
                <h3>Your cart is empty</h3>

                <p>
                    Add some delicious food to continue.
                </p>

                <a
                    href="restaurants.html"
                    class="btn food-btn">
                    Browse Food
                </a>
            </div>
        `;

        return;
    }

    let html = "";

    let total = 0;

    cart.forEach((item, index) => {

        let subtotal =
            item.price * item.quantity;

        total += subtotal;

        html += `
            <div class="cart-item">

                <div>
                    <h5>${item.name}</h5>

                    <p>
                        ₹${item.price}
                    </p>
                </div>

                <div class="quantity">

                    <button
                        onclick="changeQuantity(${index}, -1)">
                        -
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(${index}, 1)">
                        +
                    </button>

                </div>

                <strong>
                    ₹${subtotal}
                </strong>

                <button
                    class="remove-btn"
                    onclick="removeCartItem(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>
        `;

    });

    html += `
        <div class="cart-total">

            <h3>
                Total: ₹${total}
            </h3>

            <a
                href="checkout.html"
                class="btn food-btn">

                Checkout

            </a>

        </div>
    `;

    cartContainer.innerHTML = html;
}


// ============================
// CHANGE QUANTITY
// ============================

function changeQuantity(index, change) {

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    localStorage.setItem(
        "foodrushCart",
        JSON.stringify(cart)
    );

    updateCartCount();
    displayCart();
}


// ============================
// REMOVE ITEM
// ============================

function removeCartItem(index) {

    cart.splice(index, 1);

    localStorage.setItem(
        "foodrushCart",
        JSON.stringify(cart)
    );

    updateCartCount();
    displayCart();
}


// ============================
// INITIALIZE
// ============================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCartCount();

        displayCart();

    }
);