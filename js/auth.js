import {
    getUser,
    saveUser,
    removeUser
} from "./storage.js";


export function login(email) {

    const user = {

        email: email,

        name:
            email
                .split("@")[0]
                .replace(/[._-]/g, " "),

        loginTime:
            new Date().toISOString()

    };

    saveUser(user);

    return user;
}


export function logout() {

    removeUser();

    window.location.href = "index.html";

}


export function isLoggedIn() {

    return Boolean(getUser());

}


export function renderUserArea() {

    const userArea =
        document.getElementById("userArea");

    if (!userArea) return;


    const user = getUser();


    if (user) {

        userArea.innerHTML = `

            <span class="muted">
                Hi, ${user.name}
            </span>

            <button
                id="logoutBtn"
                class="btn secondary-btn"
            >
                Logout
            </button>

        `;


        document
            .getElementById("logoutBtn")
            .addEventListener(
                "click",
                logout
            );

    } else {

        userArea.innerHTML = `

            <a
                href="login.html"
                class="btn secondary-btn"
            >
                Login
            </a>

        `;

    }

}
