# 🛍️ NovaCart - E-Commerce Capstone Project

NovaCart is a responsive modern e-commerce storefront developed as a
production-style JavaScript capstone project.

The project demonstrates frontend development, REST API integration,
authentication simulation, CRUD operations, dynamic DOM manipulation,
client-side state management and persistent storage.

---

## 🚀 Live Demo

Add your deployed URL here:

https://your-project.vercel.app

---

## 📦 GitHub Repository

Add your GitHub repository here:

https://github.com/YOUR-USERNAME/ecommerce-capstone

---

# ✨ Features

## Authentication

- Login simulation
- Logout
- User session
- Persistent login using LocalStorage

## Product Catalog

- REST API product loading
- Product categories
- Search
- Sorting
- Product details
- Ratings
- Responsive product cards

## Shopping Cart

- Add products
- Remove products
- Increase quantity
- Decrease quantity
- Automatic subtotal
- Automatic total
- Persistent cart

## Admin Dashboard

- Add product
- Edit product
- Delete product
- Product management
- Persistent custom products

## Responsive Design

Optimized for:

- Desktop
- Laptop
- Tablet
- Mobile

---

# 🛠️ Technologies

- HTML5
- CSS3
- JavaScript ES6+
- Fetch API
- REST API
- LocalStorage
- Vercel / Netlify
- GitHub

---

# 🌐 API

The application uses FakeStoreAPI:

https://fakestoreapi.com/

The API provides product information including:

- Product name
- Price
- Category
- Description
- Image
- Rating

---

# 🏗️ Architecture

```text
                    ┌──────────────────────┐
                    │       Browser        │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │     HTML + CSS       │
                    │    User Interface    │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    JavaScript ES6+   │
                    │   DOM + Application  │
                    │       State          │
                    └───────┬───────┬──────┘
                            │       │
                 ┌──────────┘       └──────────┐
                 ▼                             ▼
       ┌──────────────────┐          ┌──────────────────┐
       │   LocalStorage   │          │    REST API      │
       │                  │          │                  │
       │ Auth             │          │ Products         │
       │ Cart             │          │ Categories       │
       │ Custom Products  │          │ CRUD             │
       └──────────────────┘          └──────────────────┘
```

---

# 📁 Project Structure

```text
ecommerce-capstone/

├── index.html
├── login.html
├── product.html
├── cart.html
├── admin.html
├── README.md
├── .gitignore
│
├── css/
│   └── style.css
│
└── js/
    ├── api.js
    ├── storage.js
    ├── auth.js
    ├── products.js
    ├── cart.js
    ├── app.js
    └── admin.js
```

---

# 🔐 Authentication

This project implements simulated authentication.

Users can enter any valid email address and password.

Example:

Email:

student@example.com

Password:

123456

The user session is stored in LocalStorage.

This is intentionally a frontend authentication simulation and
does not represent production-grade server authentication.

---

# 💾 Persistent State

The following application data is persisted using LocalStorage:

```text
novacart_cart
novacart_user
novacart_custom_products
novacart_favorites
```

This allows data to remain available after page refreshes.

---

# 🔄 CRUD

The admin dashboard demonstrates:

### Create

Add a new product.

### Read

Load products from the REST API.

### Update

Edit product information.

### Delete

Delete products from the catalog.

Custom admin-created products are persisted locally.

---

# 🧪 Running Locally

Clone the repository:

```bash
git clone https://github.com/YOUR-USERNAME/ecommerce-capstone.git
```

Open the project folder:

```bash
cd ecommerce-capstone
```

Because the application uses ES modules, run it through a local server.

For VS Code:

1. Install Live Server.
2. Right-click `index.html`.
3. Select "Open with Live Server".

---

# ☁️ Deployment

## Vercel

1. Push the project to GitHub.
2. Open Vercel.
3. Import the GitHub repository.
4. Select the project.
5. Deploy.

No build command is required.

The output directory is the project root.

---

## Netlify

1. Push the project to GitHub.
2. Open Netlify.
3. Select "Add new site".
4. Import the GitHub repository.
5. Deploy.

No build command is required.

---

# 📱 Responsive Design

The application uses CSS media queries to support:

* Desktop screens
* Tablets
* Smartphones

---

# 🎯 Capstone Requirements

| Requirement               | Implementation        |
| ------------------------- | --------------------- |
| Authentication simulation | Login / Logout        |
| Interactive catalog       | Product grid          |
| REST API                  | Fetch API             |
| Search                    | Dynamic search        |
| Filtering                 | Category filtering    |
| Sorting                   | Price / rating / name |
| CRUD                      | Admin dashboard       |
| Persistent state          | LocalStorage          |
| Responsive UI             | CSS media queries     |
| Cloud deployment          | Vercel / Netlify      |
| GitHub repository         | Git version control   |
| Documentation             | README                |

---

# 🔮 Future Improvements

Possible future improvements:

* Real backend authentication
* MongoDB / PostgreSQL
* Payment gateway
* Real order management
* Admin authentication
* Wishlist UI
* Product reviews
* Dark mode
* Progressive Web App
* Backend API
* JWT authentication

---

# 👨‍💻 Author

Student Capstone Project

Built using HTML, CSS and JavaScript ES6+.

---

# 📜 License

This project is created for educational and portfolio purposes.
