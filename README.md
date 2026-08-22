# GearUp 🏋️
### Rent Sports & Outdoor Gear Instantly

GearUp is a backend API for a sports and outdoor equipment rental platform. The idea is simple: customers can find the gear they need, rent it for a specific period, make payments, and return the equipment when they're done.

Providers can manage their gear inventory and handle rental orders, while admins can manage users, categories, gear listings, and overall platform activities.

## 🔗 Live Link

https://assignment-4-nine-lac.vercel.app

---

## ✨ Main Features

### 👤 Authentication
- User registration and login
- JWT-based authentication
- Role-based authorization
- Supported roles:
  - Customer
  - Provider
  - Admin
- Get currently authenticated user

### 🏕️ Gear Management
- Browse available sports and outdoor gear
- View individual gear details
- Filter gear by:
  - Category
  - Brand
  - Price
  - Availability
- Providers can add, update, and remove their gear
- Manage gear stock and availability

### 🛒 Rental Orders
- Customers can place rental orders
- Select rental start and end dates
- Calculate rental price based on the rental period
- Customers can view their rental orders
- Providers can view incoming rental orders
- Providers can update rental status

### 💳 Payment
- Stripe Checkout integration
- Create checkout sessions for rental orders
- Track payment status
- Payment history for customers
- View individual payment details
- Stripe webhook support for verifying successful payments

### ⭐ Reviews
- Customers can review gear after returning it
- Rating system from 1 to 5
- Customers cannot review a rental before it is returned
- Prevent duplicate reviews for the same rental

### 🛡️ Admin Management
- View users
- Manage user status
- View gear listings
- Manage categories
- Monitor rental activities
- View payment history

---

## 👥 User Roles

| Role | What they can do |
|------|------------------|
| **Customer** | Browse gear, rent equipment, make payments, track orders and leave reviews |
| **Provider** | Manage gear inventory and handle rental orders |
| **Admin** | Manage users, categories, gear, rentals and platform activities |

---

## 🔄 Rental Order Flow

```text
PLACED
   ↓
CONFIRMED
   ↓
PAID
   ↓
PICKED_UP
   ↓
RETURNED