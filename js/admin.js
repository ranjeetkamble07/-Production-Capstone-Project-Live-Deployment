import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from "./api.js";

import {
    getCustomProducts,
    saveCustomProducts
} from "./storage.js";


const form =
    document.getElementById(
        "productForm"
    );

const titleInput =
    document.getElementById(
        "productTitle"
    );

const priceInput =
    document.getElementById(
        "productPrice"
    );

const categoryInput =
    document.getElementById(
        "productCategory"
    );

const imageInput =
    document.getElementById(
        "productImage"
    );

const descriptionInput =
    document.getElementById(
        "productDescription"
    );

const editIdInput =
    document.getElementById(
        "editId"
    );

const productsContainer =
    document.getElementById(
        "adminProducts"
    );

const formTitle =
    document.getElementById(
        "formTitle"
    );

const cancelButton =
    document.getElementById(
        "cancelEdit"
    );

const adminCount =
    document.getElementById(
        "adminCount"
    );


let apiProducts = [];
let customProducts =
    getCustomProducts();


async function loadProducts() {

    try {

        apiProducts =
            await getProducts();

    } catch {

        apiProducts = [];

    }


    renderProducts();

}


function getAllProducts() {

    return [
        ...apiProducts,
        ...customProducts
    ];

}


function renderProducts() {

    const products =
        getAllProducts();


    adminCount.textContent =
        `${products.length} products`;


    productsContainer.innerHTML =
        products.map(
            product =>
                createAdminProduct(product)
        ).join("");


    attachActions();

}


function createAdminProduct(product) {

    return `

        <div class="admin-product">

            <div class="admin-product-info">

                <img
                    src="${product.image}"
                    alt="${product.title}"
                >


                <div>

                    <h3>
                        ${escapeHTML(product.title)}
                    </h3>

                    <p class="muted">
                        $${product.price.toFixed(2)}
                        ·
                        ${escapeHTML(product.category)}
                    </p>

                </div>

            </div>


            <div class="admin-actions">

                <button
                    class="edit-btn"
                    data-edit="${product.id}"
                >
                    Edit
                </button>


                <button
                    class="delete-btn"
                    data-delete="${product.id}"
                >
                    Delete
                </button>

            </div>

        </div>

    `;

}


function attachActions() {

    document
        .querySelectorAll(
            "[data-edit]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        Number(
                            button.dataset.edit
                        );

                    startEdit(id);

                }
            );

        });


    document
        .querySelectorAll(
            "[data-delete]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        Number(
                            button.dataset.delete
                        );

                    removeProduct(id);

                }
            );

        });

}


function startEdit(id) {

    const product =
        getAllProducts()
            .find(
                item =>
                    Number(item.id) === id
            );


    if (!product) return;


    editIdInput.value =
        product.id;

    titleInput.value =
        product.title;

    priceInput.value =
        product.price;

    categoryInput.value =
        product.category;

    imageInput.value =
        product.image;

    descriptionInput.value =
        product.description;


    formTitle.textContent =
        "Edit Product";

    cancelButton.classList.remove(
        "hidden"
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


async function removeProduct(id) {

    const confirmed =
        confirm(
            "Delete this product?"
        );


    if (!confirmed) return;


    const customIndex =
        customProducts.findIndex(
            product =>
                Number(product.id) === id
        );


    if (customIndex !== -1) {

        customProducts.splice(
            customIndex,
            1
        );

        saveCustomProducts(
            customProducts
        );

        renderProducts();

        return;

    }


    /*
        Demonstrates DELETE API operation.
        The public API may reset its data,
        so the UI is refreshed locally.
    */

    try {

        await deleteProduct(id);

        apiProducts =
            apiProducts.filter(
                product =>
                    Number(product.id) !== id
            );

        renderProducts();

    } catch {

        alert(
            "Unable to delete product."
        );

    }

}


form.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        const editId =
            editIdInput.value;


        const productData = {

            title:
                titleInput.value.trim(),

            price:
                Number(
                    priceInput.value
                ),

            category:
                categoryInput.value,

            image:
                imageInput.value.trim(),

            description:
                descriptionInput.value.trim(),

            rating: {

                rate: 4.5,

                count: 0

            }

        };


        if (editId) {

            const numericId =
                Number(editId);


            const customIndex =
                customProducts.findIndex(
                    product =>
                        Number(product.id) ===
                        numericId
                );


            if (customIndex !== -1) {

                customProducts[
                    customIndex
                ] = {

                    ...customProducts[
                        customIndex
                    ],

                    ...productData,

                    id: numericId

                };

                saveCustomProducts(
                    customProducts
                );

            } else {

                try {

                    await updateProduct(
                        numericId,
                        productData
                    );

                    apiProducts =
                        apiProducts.map(
                            product =>
                                Number(product.id) ===
                                numericId
                                    ? {
                                        ...product,
                                        ...productData
                                    }
                                    : product
                        );

                } catch {

                    alert(
                        "API update failed."
                    );

                    return;

                }

            }


        } else {

            const newProduct = {

                ...productData,

                id:
                    Date.now(),

            };


            try {

                await createProduct(
                    productData
                );

            } catch {

                /*
                    Local persistence still works
                    if the public API request fails.
                */

            }


            customProducts.push(
                newProduct
            );

            saveCustomProducts(
                customProducts
            );

        }


        resetForm();

        renderProducts();

    }
);


cancelButton.addEventListener(
    "click",
    resetForm
);


function resetForm() {

    form.reset();

    editIdInput.value = "";

    formTitle.textContent =
        "Add New Product";

    cancelButton.classList.add(
        "hidden"
    );

}


function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


loadProducts();
