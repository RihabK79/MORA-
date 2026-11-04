# MORA — Remaining steps toward a production app

## Completed in this client prototype
- [x] Expo + React Native + TypeScript setup
- [x] Authentication-first navigation
- [x] Login and registration forms with basic validation
- [x] Product catalog, categories and search
- [x] Product details
- [x] Favorites
- [x] Cart and quantity controls
- [x] Checkout UI and demo order confirmation
- [x] Local order history
- [x] Profile edit and saved delivery addresses
- [x] AsyncStorage persistence for demo data

## Next implementation phase: real backend
1. Decide backend stack (e.g. Spring Boot, since it can be paired with this React Native client) and database schema.
2. Create entities/tables: Client, Product, Category, Address, Cart/CartItem (optional server cart), Order, OrderItem, Payment.
3. Implement REST endpoints for register/login, products, addresses, orders, and profile.
4. Hash passwords on the server; never store raw passwords. Add token expiration, refresh and revocation.
5. Replace local product array with API requests; add loading, empty and error states.
6. Decide cart persistence strategy (local cart synchronized at checkout or server cart).
7. Recalculate product price, discounts, shipping and stock on the server.
8. Integrate a payment provider that supports your target market. Do not collect card data directly in this app.
9. Add order status tracking and transactional email/SMS notifications.
10. Add privacy policy, terms, consent, deletion/export flows, and security review.
11. Test on Android and iOS physical devices; test accessibility, poor network, and edge cases.
12. Prepare store assets, app icons, splash screen, signing, release builds and store listing.

## Demo warning
This project is a frontend-only prototype. Any account, address or order stored in AsyncStorage exists only on that device and can be edited or removed by the user. Payment selection is a visual/demo step; no payment is processed and no order is sent to a business system. Do not use real customer data until a secure backend is connected.
