import {
    initializeProducts,
    setSearch,
    setSort
} from "./products.js";

import {
    getCart
} from "./storage.js";

import {
    renderUserArea
} from "./auth.js";


const searchInput =
    document.getElementById(
        "searchInput"
    );

const sortSelect =
    document.getElementById(
        "sortSelect"
    );


function updateCartCount() {

    const cart =
        getCart();

    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    const cartCount =
        document.getElementById(
            "cartCount"
        );


    if (cartCount) {

        cartCount.textContent =
            count;

    }

}


if (searchInput) {

    searchInput.addEventListener(
        "input",
        event => {

            setSearch(
                event.target.value
            );

        }
    );

}


if (sortSelect) {

    sortSelect.addEventListener(
        "change",
        event => {

            setSort(
                event.target.value
            );

        }
    );

}


renderUserArea();

updateCartCount();

initializeProducts();
