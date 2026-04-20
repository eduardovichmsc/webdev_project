# Handmade Jewelry Store

Online store of unique handmade jewelry from the **Simuero** brand.

**Project Overview**

This project is a modern jewelry e-commerce website designed to showcase and sell handcrafted jewelry products online. The platform represents a minimalist and elegant brand focused on uniqueness, natural aesthetics, and emotional connection with customers.

The website combines visual storytelling with functional e-commerce features, allowing users not only to browse and purchase jewelry but also to explore the philosophy and identity behind the brand.

The main goal of the project is to create a seamless, visually appealing, and user-friendly online shopping experience that reflects the premium nature of the products.

**Purpose of the Website**

The website is created to:
• Present jewelry collections in a modern and aesthetic way
• Provide a convenient platform for online shopping
• Build a strong brand identity through design and storytelling
• Ensure smooth interaction between users and the system

**Authentication and Authorization (/login and /register)**

A user authentication system is implemented, allowing users to register and log into their accounts.

During registration, users fill out a form with username, email, password, and password confirmation, including client-side validation.

For login, users enter their email and password. The server returns JWT tokens (access and refresh), which are stored in localStorage. An HTTP interceptor automatically attaches tokens to authorized requests.

Error handling includes validation errors (400) and incorrect credentials (401).

The navigation bar includes links to “Catalog,” “Profile,” and “Logout,” and is hidden on authentication pages.


**Home Page — Jewelry Catalog (/catalog)**

The main page displays jewelry items as cards with:
• Product image
• Name
• Category
• Price
• Short description

Functionality includes:
• Filtering by category
• Search by name with debounce
• Optional sorting

If no results are found, a reset option is provided.

Clicking on a product opens a detailed page with full information and an option to add it to the cart.



**Cart and Ordering System**

Users can:
• Add or remove products from the cart
• Change quantity
• View total price

The checkout process includes order summary and confirmation. Selected items are sent to the server and stored as an order.



**User Profile (/profile)**

The profile section includes:
• User information (username, email)
• Avatar placeholder (initials)

Main features:
• Viewing active orders
• Viewing order history
• Editing personal data
• Canceling orders (with confirmation)

If no data is available, informative messages are displayed.

All actions include loading states and error handling.



**Architecture and API Interaction**

The application is built using service-based architecture:
• AuthService — authentication and token handling
• ProductService — product data
• CartService — cart management
• OrderService — order processing
• UserService — user data


## Contributors

- **Darzhan Eduarduly**
- **Yenlik Yerkin**
- **Inkar Serikkul**
