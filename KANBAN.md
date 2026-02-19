# Handcrafted Haven — Kanban Board

Use this board in two ways:
- Keep this file as your planning source in the repo.
- Copy each card title into a GitHub Issue, then add issues to a GitHub Project board.

## Board Columns

### Backlog
- [ ] Add order history page for buyers
- [ ] Add seller analytics (views, conversion, top products)
- [ ] Add wishlist/favorites for products
- [ ] Add product image upload (instead of emoji/text only)
- [ ] Add pagination or infinite scroll for browse catalog
- [ ] Add email notifications for order placed and new reviews

### To Do
- [ ] **Checkout persistence** — Save placed orders to `data/orders.json` and expose `/api/orders`
- [ ] **My Orders page** — Show past orders for current user with totals and dates
- [ ] **Input hardening** — Sanitize/validate all API inputs consistently
- [ ] **Error UX polish** — Standardize user-friendly error banners across pages
- [ ] **Mobile nav polish** — Improve wrapped nav spacing/line breaks in all headers
- [ ] **Accessibility pass** — Keyboard navigation + visible focus states on interactive controls

### In Progress
- [ ] **Responsive QA sweep** — Verify behavior at 320px / 375px / 768px across all routes
- [ ] **Seller dashboard mobile pass** — Confirm listing form and card grids feel clean on small screens

### Review / QA
- [ ] **Auth flow regression test** — Register → Login → Welcome → Logout
- [ ] **Marketplace regression test** — Browse filters → Product page → Add review
- [ ] **Cart/checkout regression test** — Add items → Update qty → Checkout success
- [ ] **Link audit** — Footer links, featured cards, seller profile links

### Done
- [x] Register and login API with persisted users
- [x] Personalized welcome page and auth-aware navigation
- [x] Product, seller, and review APIs with file-backed storage
- [x] Browse filters (category/min/max) with API-driven data
- [x] Cart page, quantity updates, totals, and checkout flow
- [x] Footer support routes (`/contact`, `/privacy-policy`, `/terms-of-service`)
- [x] Contrast improvements with AA/AAA token verification
- [x] Responsive utility classes applied across key pages

---

## Suggested GitHub Labels
- `type:feature`
- `type:bug`
- `type:refactor`
- `type:docs`
- `priority:high`
- `priority:medium`
- `priority:low`
- `area:auth`
- `area:marketplace`
- `area:cart-checkout`
- `area:ui-responsive`

## Suggested Milestones
- `M1 - Marketplace Stability`
- `M2 - Orders & Buyer Experience`
- `M3 - Seller Growth Features`

## Quick Issue Template (copy into each issue)

**Goal**
- 

**Scope**
- 

**Acceptance Criteria**
- [ ] 
- [ ] 

**Technical Notes**
- 

**Out of Scope**
- 
