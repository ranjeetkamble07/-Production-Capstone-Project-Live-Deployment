import {
    getCart,
    saveCart,
    clearCart
} from "./storage.js";


const cartContainer =
    document.getElementById(
        "cartItems"
    );

const subtotalElement =
    document.getElementById(
        "subtotal"
    );

const totalElement =
    document.getElementById(
        "total"
    );

const cartCount =
    document.getElementById(
        "cartCount"
    );


let cart = getCart();


function renderCart() {

    updateCartCount();


    if (!cart.length) {

        cartContainer.innerHTML = `

            <div class="empty-state">

                <h2>Your cart is empty 🛒</h2>

                <p>
                    Add some products to continue.
                </p>

                <br>

                <a
                    href="index.html"
                    class="btn primary-btn"
                >
                    Start Shopping
                </a>

            </div>

        `;


        updateTotals();

        return;

    }


    cartContainer.innerHTML =
        cart.map(
            (item, index) =>
                createCartItem(item, index)
        ).join("");


    addCartEvents();

    updateTotals();

}


function createCartItem(item, index) {

    return `

        <div class="cart-item">

            <img
                src="${item.image}"
                alt="${item.title}"
            >


            <div>

                <h3>
                    ${item.title}
                </h3>

                <strong>
                    $${item.price.toFixed(2)}
                </strong>


                <div class="quantity-controls">

                    <button
                        data-action="decrease"
                        data-index="${index}"
                    >
                        −
                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        data-action="increase"
                        data-index="${index}"
                    >
                        +
                    </button>

                </div>

            </div>


            <button
                class="remove-btn"
                data-action="remove"
                data-index="${index}"
            >
                Remove
            </button>

        </div>

    `;

}


function addCartEvents() {

    document
        .querySelectorAll(
            "[data-action]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );

                    const action =
                        button.dataset.action;


                    if (action === "increase") {

                        cart[index].quantity++;

                    }


                    if (
                        action ===
                        "decrease"
                    ) {

                        cart[index].quantity--;

                        if (
                            cart[index]
                                .quantity <= 0
                        ) {

                            cart.splice(
                                index,
                                1
                            );

                        }

                    }


                    if (action === "remove") {

                        cart.splice(
                            index,
                            1
                        );

                    }


                    saveCart(cart);

                    renderCart();

                }
            );

        });

}


function updateTotals() {

    const subtotal =
        cart.reduce(
            (total, item) =>
                total +
                item.price *
                item.quantity,
            0
        );


    subtotalElement.textContent =
        `$${subtotal.toFixed(2)}`;

    totalElement.textContent =
        `$${subtotal.toFixed(2)}`;

}


function updateCartCount() {

    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    cartCount.textContent =
        count;

}


document
    .getElementById(
        "checkoutButton"
    )
    .addEventListener(
        "click",
        () => {

            if (!cart.length) {

                alert(
                    "Your cart is empty."
                );

                return;

            }


            alert(
                "Demo checkout successful! 🎉"
            );

            clearCart();

            cart = [];

            renderCart();

        }
    );


renderCart();
