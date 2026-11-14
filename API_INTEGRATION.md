# API Integration Documentation

## FixItNow – Frontend API Mapping

| Endpoint | Called from | UI |
|---|---|---|
| POST /api/auth/register | authActions.ts → registerAction | /auth/register |
| POST /api/auth/login | authActions.ts → loginAction | /auth/login |
| GET /api/services | service/getServices.ts → getServices | /, /services |
| GET /api/technicians | service/getTechnicians.ts → getTechnicians | /services |
| GET /api/technicians/:id | service/getTechnician.ts → getTechnician | /technicians/[id] |
| GET /api/categories | service/getCategories.ts → getCategories | /, /services |
| GET /api/bookings | service/getBookings.ts → getMyBookings | /dashboard/customer |
| POST /api/bookings | bookingActions.ts → createBookingAction | /technicians/[id] (BookingForm) |
| PATCH /api/bookings/:id/cancel | bookingActions.ts → cancelBookingAction | /dashboard/customer/bookings |
| GET /api/payments | service/getPayments.ts → getMyPayments | /dashboard/customer/payments |
| POST /api/payments/create | paymentActions.ts → createPaymentAction | /dashboard/customer/bookings/[id]/pay |
| GET /api/technician/profile | service/getTechnicianProfile.ts → getTechnicianProfile | /dashboard/technician |
| PATCH /api/technician/profile | technicianActions.ts → updateTechnicianProfileAction | /dashboard/technician/profile |
| GET /api/technician/availability | service/getAvailability.ts → getAvailability | /dashboard/technician/availability |
| PATCH /api/technician/availability | technicianActions.ts → updateAvailabilityAction | /dashboard/technician/availability |
| GET /api/technician/bookings | service/getTechnicianBookings.ts → getTechnicianBookings | /dashboard/technician/bookings |
| PATCH /api/technician/bookings/:id | bookingActions.ts → updateTechnicianBookingAction | /dashboard/technician/bookings |
| GET /api/admin/users | service/getAdminUsers.ts → getAdminUsers | /dashboard/admin/users |
| PATCH /api/admin/users/:id | adminActions.ts → updateUserStatusAction | /dashboard/admin/users |
| GET /api/admin/bookings | service/getAdminBookings.ts → getAdminBookings | /dashboard/admin |
| GET /api/admin/categories | service/getAdminCategories.ts → getAdminCategories | /dashboard/admin/categories |
| POST /api/admin/categories | categoryActions.ts → createCategoryAction | /dashboard/admin/categories |
| PATCH /api/admin/categories/:id | categoryActions.ts → updateCategoryAction | /dashboard/admin/categories |
| DELETE /api/admin/categories/:id | categoryActions.ts → deleteCategoryAction | /dashboard/admin/categories |

## Authentication

Protected API requests use JWT authentication through the Authorization header.

`Authorization: Bearer <access_token>`

## Payment Integration

- Payment provider: Stripe or SSLCommerz (according to backend configuration).
- Payment initiation: POST /api/payments/create
- Payment success: /payment/success
- Payment cancellation: /payment/cancel
- Payment status must be verified through the backend before showing a successful payment state.

## Error Handling

- API errors: Toast notifications.
- Form validation: Inline error messages.
- Network errors: User-friendly error feedback.
- Page errors: Next.js error boundaries and error.tsx.
- Loading states: loading.tsx and skeleton components.

## Notes

All endpoint paths, HTTP methods, action names, request payloads and response formats must be verified against the actual FixItNow backend implementation before final submission.
