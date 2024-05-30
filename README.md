# Techgene Wishlist Backend Service

This project implements a wishlist backend service for an e-commerce platform, allowing guest users to create, manage, and share wishlists without signing up.

## Live Demo

You can test the live API deployed on Fly.io at:

<https://techgene.fly.dev>

## Features

* **Guest User Wishlists:** Enables guests to create and manage wishlists without accounts.
* **Product Management:** Add, remove, and view products in a wishlist.
* **Sharing:** Share wishlists via unique URLs.
* **Privacy:** Control wishlist visibility (public or private).
* **Product Details:** Populates wishlist items with name, image, and price from the product database.
* **Security:**
  * CSRF protection, input validation, HTTPS.
  * JWT authentication for protected routes.
  * Hashed session IDs for guest user privacy.
* **Scalability:** Designed for potential scaling with Redis caching and MongoDB sharding.

## API Endpoints

The main API endpoints are listed below. For a full list of API endpoints, refer to the [Postman Collection](/Techgene.postman_collection.json) or watch this [video](https://drive.google.com/file/d/1hac4QCF7PSW4w1GN0deG86jjQGfE9PQP/view?usp=sharing)

### Public

* **`GET /a3EKUErmxgAdLFYqznOo`:** Retrieves a unique CSRF token to prevent CSRF attacks.
* **`POST /wishlists`:** Creates a new wishlist and returns a `wishlistId` and a JWT token.
* **`GET /wishlists/:wishlistId`:** Retrieves a wishlist (accessible if `isPrivate` is false).

### Protected (Require valid JWT token in `Authorization: Bearer <token>` header)

* **`DELETE /wishlists/:wishlistId`:** Deletes a wishlist.
* **`PATCH /wishlist/:wishlistId/privacy`:** Toggles the `isPrivate` status of a wishlist.
* **`POST /wishlists/:wishlistId/items`:** Adds a product to a wishlist.
* **`DELETE /wishlists/:wishlistId/items/:productId`:** Removes a product from a wishlist.

### (For Testing Purposes - Admin Routes)

* **`POST /products`:** Adds a product to the database.
* **`DELETE /products/:productId`:** Soft deletes a product (sets `isDeleted` to true).
* **`PATCH /products/:productId/availability`:** Toggles the `inStock` status of a product.

## Getting Started

> Please make sure to use the specified node version for this project: v.20.11.1

1. **Clone the repository:** `git clone <repository-url>`
2. **Install dependencies:** `yarn install`
3. **Environment Variables:**
    * Duplicate the [`.env.example` file](/.env.example) as `.env`.
    * Fill in your MongoDB connection string (`MONGODB_URI`) and JWT secret (`JWT_SECRET`).
    * If you have issues with this, you can work with the live demo for testing
4. **Start the server in DEVELOPMENT mode:** `yarn dev`. Uses `nodemon` for fast refresh
5. **Start the server in PRODUCTION mode:** `yarn build` then `yarn start`

## Technologies Used

* **Nx:** Monorepo management.
* **TypeScript:** For type safety and maintainability.
* **Express:** For building the RESTful API.
* **Mongoose:** For MongoDB object modelling.
* **MongoDB Atlas:** Database service.
* **Redis:** (Optional) For caching improvements.
* **Helmet, cors, csurf:** For security.
* **Winston:** For logging.
* **jsonwebtoken:** For JWT authentication.

## Additional Notes

> Frontend Responsibilities are managed in the POSTMAN collection using scripts

* **Frontend Responsibilities:**
  * Stores the JWT securely in localStorage.
  * Includes the JWT in the `Authorization` header for protected routes.
  * Handles authentication errors gracefully.
* **Soft Deletes:**  Products marked as `isDeleted` or `outOfStock` are handled in the frontend.
* **Wishlist IDs:** Hashed to protect user privacy. Only the original creator can modify a list.
* **Cron Jobs:** (Optional) Can be set up to clean up soft-deleted products and expired wishlists.

## Future Improvements

* **Sorting/Filtering:** Add endpoints for sorting and filtering wishlist items.
* **Real-Time Updates:** Explore WebSockets or SSE for real-time wishlist updates.
* **User Accounts:** Allow users to sign up to persist their wishlists.
* **Testing:** Add comprehensive unit and end-to-end tests.

> For complete insight into my planning process check [here](/planning.md)

## Contributing

Contributions are welcome! Please open issues or submit pull requests.
