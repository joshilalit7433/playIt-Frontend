# 🏟️ PlayIt – Turf Booking Platform

**PlayIt** is a full-stack MERN-based turf booking platform designed to simplify field reservations through subscriptions and role-based access. Built with a modern UI, secure payments via Stripe, and robust backend logic, it empowers users to browse, book, and manage turfs effortlessly.

🚀 **Live Demo**: [https://playit-webapp.netlify.app](https://playit-webapp.netlify.app)

---

## 💡 Project Overview

This platform provides role-specific dashboards and controls for users, turf owners, and admins:

- 👤 **Users** can browse, filter, and subscribe to turfs
- 🧾 **Turf Owners** can list and manage their fields and bookings
- 🛠️ **Admins** control turf approval and platform moderation

---

## 🔧 Tech Stack

| Layer         | Technologies Used                                              |
|---------------|---------------------------------------------------------------|
| Frontend      | React.js, Tailwind CSS                                        |
| Backend       | Node.js, Express.js                                           |
| Database      | MongoDB with Mongoose ORM                                     |
| Auth          | JWT + Role-Based Access Control                               |
| File Uploads  | Multer                                                        |
| Payments      | Stripe Integration                                            |
| API Testing   | Postman                                                       |
| Deployment    | Netlify (Frontend) + Render (Backend)                         |

---

## 🔥 Key Features

### 🔐 Role-Based Access
- 👤 **Users**: Browse, filter, and subscribe to turfs based on time slots and dates
- 🏟️ **Turf Owners**: Add turfs, manage listings and view bookings
- 👨‍💼 **Admins**: Approve/reject turf submissions and moderate activity

### 📅 Subscription-Based Booking
- Users purchase subscriptions via **Stripe**
- Turf booking is **date-based and time slot-specific**
- Conflict checking prevents **double bookings**

### 🧠 Smart Filtering
- Filter turfs by:
  - ✅ Location
  - ✅ Price
  - ✅ Sports Type

