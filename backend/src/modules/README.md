# Backend modules structure

This backend is now organized around feature modules so each website type can grow independently.

## Main folders

- `config/` - environment and shared configuration
- `middleware/` - auth, errors, upload, etc.
- `models/` - shared database models
- `services/` - shared application services
- `routes/` - legacy route wrappers for the existing platform APIs
- `modules/` - feature-based modules for future verticals

## Module layout

Each feature module now follows the same structure:

- `modules/ecommerce/` - ecommerce-specific module
  - `user/` - public/customer-facing APIs
  - `admin/` - admin-only APIs
  - `shared/` - shared types/helpers
- `modules/restaurant/` - restaurant-specific module
  - `user/` - public/customer-facing APIs
  - `admin/` - admin-only APIs
  - `shared/` - shared types/helpers
- `modules/hospital/` - hospital-specific module
  - `user/` - public/customer-facing APIs
  - `admin/` - admin-only APIs
  - `shared/` - shared types/helpers
- `modules/portfolio/` - portfolio-specific module
  - `user/` - public/customer-facing APIs
  - `admin/` - admin-only APIs
  - `shared/` - shared types/helpers

## Rule

- Keep shared platform logic in the platform layer
- Put business-specific APIs for each website type inside its own module under `modules/`
- Keep user-facing and admin-facing APIs separated by folder
- Use shared types only when the logic is truly common between both sides
