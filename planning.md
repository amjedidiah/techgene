# Planning

Develop a backend service for a wishlist feature.
Users should be able to add products to their wishlist, remove products, view their wishlist, and ideally share it with others without having to sign up on the platform.

## Data Model

- [x] Set up data model using Mongoose as follows

```ts
const Wishlist = new Schema(
  {
    sessionId: {
      type: String,
      required: true,
    },
    items: [
      {
        productId: { type: String, required: true },
        addedAt: { type: Date, default: Date.now },
      },
    ],
    isShareable: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
```

## API Endpoints

The frontend can use `Axios`, `Fetch` or Postman to interact with these API endpoints.
Postman will be used for testing.

### Public

- `POST /wishlist`: Creates a new wishlist and returns a wishlistId and a JWT token(from the auto-generated sessionId).
- `GET /wishlist/:wishlistId`: Retrieves a wishlist.

### Private

- `DELETE /wishlist/:wishlistId`: Deletes an entire wishlist.
- `POST /wishlist/:wishlistId/items`: Adds a product to a wishlist.
- `DELETE /wishlist/:wishlistId/items/:productId`: Remove a product from a wishlist.
- `PATCH /wishlist/:wishlistId/shareable`: Toggles the shareable status of a wishlist (requires a valid JWT token).

## Key Features

### Session Management

#### Backend

- [ ] Generate unique sessionId and wishlistId.
- [ ] Store wishlist data with sessionId and wishlistId.
- [ ] Create a JWT token from the sessionId.
- [ ] Return wishlistId and JWT to frontend.
- [ ] Retrieve and validate the JWT token for subsequent protected API requests
- [ ] If they match, allow the modification. If not, return an error: 403 Forbidden

#### Frontend

- [ ] Securely store JWT token in localStorage.
- [ ] Include JWT token in the Authorization header(`Bearer <token>`) for private API requests.
- [ ] Handle authentication errors gracefully.

### Sharing

- [ ] Generate a shareable URL with the wishlistId.
- [ ] Adding a mechanism to revoke sharing

### Security

- [ ] Validate user input to prevent injection attacks.
- [ ] Use HTTPS to secure data transmission.

### Error Handling

- [ ] Provide meaningful error messages and HTTP status codes for client-side handling.

### Documentation

- [ ] Create clear and comprehensive API documentation using Postman.

## Enhancements

### Product Details

- [ ] In the `GET /wishlist/:wishlistId` response, include relevant product details (e.g., name, image, price) fetched from the product database or API, to  provide a more complete user experience.

### Sorting and Filtering

- [ ] Add endpoints for sorting wishlist items (e.g., by date added, product name) and filtering them (e.g., by product category, price range).

```yaml
GET /wishlist/:wishlistId?sort=dateAdded&filter=category:electronics
```

### Scalability

- [ ] Consider Redis for caching and explore MongoDB sharding for potential future scaling

### Security Enhancement

- [x] Implement CSRF protection, and other security measures using Helmet, and cors.

> Test here: <https://securityheaders.com/>

### Notifications

- [ ] Email notifications when a wishlisted item goes on sale or is back in stock.

### Multiple Wishlists

## Tech Stack

- Nx
- TypeScript: Instead of plain JavaScript for enhanced code maintainability and to catch errors early on.
- Express
- Mongoose: For streamlined MongoDB interactions and schema validation.
- Redis: For fast caching of wishlist data, especially for high traffic.
- Helmet, cors, CSRF: To enhance security.
- WInston: Logging.
- JWT

## Deployment

AWS EBS

## Testing

Not applicable
