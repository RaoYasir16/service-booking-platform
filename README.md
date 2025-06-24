# 🛠️ Service Booking Platform

A Node.js-based multi-role service booking platform where users can book services, and providers can list and manage their offerings.

---

## 🚀 Features

- ✅ User & Provider Registration/Login (JWT Auth)
- 🔐 Role-based Authorization (Admin, User, Provider)
- 📋 Providers can create, update, delete services
- 🧾 Users can book services
- 📦 Admin can manage users and providers (delete, stats)
- 💬 Real-time WebSocket chat (optional)
- 📊 Dashboard-ready stats (bookings, earnings, services)

---

## 🏗️ Built With

- **Node.js** + **Express.js**
- **PostgreSQL** with **Sequelize ORM**
- **JWT** for authentication
- **bcrypt** for password hashing
- **dotenv** for environment configs
- **UUID** for unique ID generation

---

## 📂 Project Structure

service-booking-platform/
├── config/
│ └── config.json # Sequelize DB config
├── controllers/
├── middleware/
├── models/
├── routes/
├── migrations/
├── .env
├── .gitignore
├── server.js
└── README.md

