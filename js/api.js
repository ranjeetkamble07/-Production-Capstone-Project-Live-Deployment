const API_URL = "https://fakestoreapi.com/products";


export async function getProducts() {

    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Unable to fetch products");
    }

    return await response.json();
}


export async function getProductById(id) {

    const response =
        await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
        throw new Error("Product not found");
    }

    return await response.json();
}


export async function getCategories() {

    const response =
        await fetch(`${API_URL}/categories`);

    if (!response.ok) {
        throw new Error("Unable to fetch categories");
    }

    return await response.json();
}


/*
    Simulated API CRUD operations.

    FakeStoreAPI supports API requests,
    but for this capstone we persist admin
    changes locally so the changes survive
    browser refreshes.
*/


export async function createProduct(product) {

    const response = await fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(product)

    });

    if (!response.ok) {
        throw new Error("Unable to create product");
    }

    return await response.json();
}


export async function updateProduct(id, product) {

    const response =
        await fetch(`${API_URL}/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(product)

        });

    if (!response.ok) {
        throw new Error("Unable to update product");
    }

    return await response.json();
}


export async function deleteProduct(id) {

    const response =
        await fetch(`${API_URL}/${id}`, {

            method: "DELETE"

        });

    if (!response.ok) {
        throw new Error("Unable to delete product");
    }

    return await response.json();
}
