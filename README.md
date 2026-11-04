# MORA — React Native client app

A client-side beauty e-commerce prototype built with Expo, React Native and TypeScript for Android and iOS.

## Requirements
- Node.js LTS (compatible with Expo SDK 54)
- Expo Go on a physical device, or Android Studio emulator
- Visual Studio Code (recommended)

## Run locally
1. Extract this ZIP and open the `mora-client` folder in VS Code.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start Expo:
   ```bash
   npx expo start
   ```
4. Scan the QR code in Expo Go. For Android emulator, press `a`.

## Implemented client-side features
- Login and registration with basic validation and local demo session
- Home, shop, search and category filtering (Skincare / Makeup / Perfumes)
- Product detail screen
- Add/remove products and update quantities in cart
- Favorites saved locally
- Checkout form with delivery details and demo payment selection
- Local demo order creation and order history
- Editable demo profile and saved delivery addresses
- AsyncStorage persistence for demo account, cart, favorites, orders and addresses
- React Navigation stack + bottom tabs

## Demo limitations / production checklist
This is a frontend prototype. It does not connect to a server and does not authenticate securely. Demo login accepts any non-empty email/password; registration creates a local session. No real payment is taken and no actual order is transmitted. Do not enter real passwords or sensitive personal information.

Before production:
- Build a backend API and database for users, products, stock, addresses and orders.
- Implement secure authentication (password hashing on server, token handling and refresh/revocation).
- Use secure storage for auth tokens; AsyncStorage is not secure storage for secrets.
- Validate prices, stock, totals and order state on the server (never trust client totals).
- Integrate a payment provider and verify payment server-side.
- Add privacy policy, terms, consent, data deletion and appropriate security protections.
- Replace sample product images and product descriptions with MORA-owned/licensed assets and approved product data.
- Add loading/error/empty states, accessibility, tests, analytics only with consent, and app store configuration.

## Project layout
- `App.tsx`: providers and root navigation
- `src/context`: auth, cart, favorites/orders/address state
- `src/navigation`: auth stack, main tabs and detail/checkout routes
- `src/screens`: app screens
- `src/data/products.ts`: sample products (replace with API data)
- `src/components/UI.tsx`: shared UI components
- `src/theme.ts`: color palette and spacing
