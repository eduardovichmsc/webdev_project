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


## Contributors

- **Darzhan Eduarduly**
- **Yenglik Sailaukhan**
- **Inkar Serikkul**
