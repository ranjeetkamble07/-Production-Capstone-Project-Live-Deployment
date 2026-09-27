import {
    getProducts,
    getCategories
} from "./api.js";

import {
    getCustomProducts
} from "./storage.js";


let allProducts = [];
let selectedCategory = "all";
let searchTerm = "";
let sortType = "default";


export async function initializeProducts() {

    const productContainer =
        document.getElementById("products");

    try {

        const apiProducts =
            await getProducts();

        const customProducts =
            getCustomProducts();


        /*
            Custom products are stored locally
            and displayed together with API products.
        */

        allProducts = [
            ...apiProducts,
            ...customProducts
        ];


        await createCategoryTabs();

        renderProducts();

    } catch (error) {

        productContainer.innerHTML = `

            <div class="error-box">
                Failed to load products.
                Please check your internet connection.
            </div>

        `;

    }

}


async function createCategoryTabs() {

    const categoryContainer =
        document.getElementById(
            "categoryTabs"
        );

    let categories = [];


    try {

        categories = await getCategories();

    } catch {

        categories = [
            "electronics",
            "jewelery",
            "men's clothing",
            "women's clothing"
        ];

    }


    const customCategories =
        getCustomProducts()
            .map(product => product.category)
            .filter(Boolean);


    categories = [
        ...new Set([
            ...categories,
            ...customCategories
        ])
    ];


    categoryContainer.innerHTML = `

        <button
            class="category-btn active"
            data-category="all"
        >
            All
        </button>

    `;


    categories.forEach(category => {

        const button =
            document.createElement("button");

        button.className = "category-btn";

        button.dataset.category = category;

        button.textContent = category;

        categoryContainer.appendChild(button);

    });


    categoryContainer
        .addEventListener(
            "click",
            event => {

                const button =
                    event.target.closest(
                        ".category-btn"
                    );

                if (!button) return;


                selectedCategory =
                    button.dataset.category;


                document
                    .querySelectorAll(
                        ".category-btn"
                    )
                    .forEach(btn => {

                        btn.classList.remove(
                            "active"
                        );

                    });


                button.classList.add("active");

                renderProducts();

            }
        );

}


export function renderProducts() {

    const container =
        document.getElementById("products");


    let filtered =
        [...allProducts];


    if (selectedCategory !== "all") {

        filtered =
            filtered.filter(
                product =>
                    product.category ===
                    selectedCategory
            );

    }


    if (searchTerm) {

        filtered =
            filtered.filter(product => {

                const title =
                    product.title.toLowerCase();

                const category =
                    product.category.toLowerCase();

                return (
                    title.includes(searchTerm) ||
                    category.includes(searchTerm)
                );

            });

    }


    switch (sortType) {

        case "price-low":

            filtered.sort(
                (a, b) => a.price - b.price
            );

            break;


        case "price-high":

            filtered.sort(
                (a, b) => b.price - a.price
            );

            break;


        case "rating":

            filtered.sort(
                (a, b) =>
                    (b.rating?.rate || 0) -
                    (a.rating?.rate || 0)
            );

            break;


        case "name":

            filtered.sort(
                (a, b) =>
                    a.title.localeCompare(
                        b.title
                    )
            );

            break;

    }


    const resultText =
        document.getElementById(
            "resultText"
        );


    resultText.textContent =
        `${filtered.length} products found`;


    if (!filtered.length) {

        container.innerHTML = `

            <div class="empty-state">

                <h2>No products found</h2>

                <p>
                    Try another search or category.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        filtered
            .map(createProductCard)
            .join("");

}


function createProductCard(product) {

    return `

        <article class="product-card">

            <a href="product.html?id=${product.id}">

                <div class="product-image">

                    <img
                        src="${product.image}"
                        alt="${escapeHTML(product.title)}"
                        loading="lazy"
                    >

                </div>

            </a>


            <div class="product-info">

                <span class="product-category">
                    ${escapeHTML(product.category)}
                </span>


                <h3 class="product-title">
                    ${escapeHTML(product.title)}
                </h3>


                <div class="rating">
                    ⭐ ${product.rating?.rate || "N/A"}
                </div>


                <div class="product-bottom">

                    <span class="price">
                        $${product.price.toFixed(2)}
                    </span>

                    <a
                        href="product.html?id=${product.id}"
                        class="btn primary-btn"
                    >
                        View
                    </a>

                </div>

            </div>

        </article>

    `;

}


function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


export function setSearch(value) {

    searchTerm =
        value.trim().toLowerCase();

    renderProducts();

}


export function setSort(value) {

    sortType = value;

    renderProducts();

}
