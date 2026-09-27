const CART_KEY = "novacart_cart";
const USER_KEY = "novacart_user";
const CUSTOM_PRODUCTS_KEY = "novacart_custom_products";
const FAVORITES_KEY = "novacart_favorites";


export function getCart() {

    try {

        return JSON.parse(
            localStorage.getItem(CART_KEY)
        ) || [];

    } catch {

        return [];

    }

}


export function saveCart(cart) {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

}


export function clearCart() {

    localStorage.removeItem(CART_KEY);

}


export function getUser() {

    try {

        return JSON.parse(
            localStorage.getItem(USER_KEY)
        );

    } catch {

        return null;

    }

}


export function saveUser(user) {

    localStorage.setItem(
        USER_KEY,
        JSON.stringify(user)
    );

}


export function removeUser() {

    localStorage.removeItem(USER_KEY);

}


export function getCustomProducts() {

    try {

        return JSON.parse(
            localStorage.getItem(
                CUSTOM_PRODUCTS_KEY
            )
        ) || [];

    } catch {

        return [];

    }

}


export function saveCustomProducts(products) {

    localStorage.setItem(
        CUSTOM_PRODUCTS_KEY,
        JSON.stringify(products)
    );

}


export function getFavorites() {

    try {

        return JSON.parse(
            localStorage.getItem(FAVORITES_KEY)
        ) || [];

    } catch {

        return [];

    }

}


export function saveFavorites(favorites) {

    localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(favorites)
    );

}
