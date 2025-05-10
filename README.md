# 🛒 Medsta Back-end

**Medsta Back-end** is a full-featured e-commerce backend built with **NestJS**, **PostgreSQL**, and **Prisma ORM**.  
It allows users to register, browse products, place and track orders, and post reviews.  
An integrated **admin panel** enables management of categories, products, blogs, and more.

---

## 📦 Tech Stack

- **Backend Framework**: [NestJS](https://nestjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: JWT (JSON Web Token)

---

## 📁 Project Structure

```
src/
├── auth/              # JWT authentication logic
├── user/              # User registration and profile management
├── address/           # User addresses
├── category/          # Product categories
├── product/           # Product CRUD & queries
├── blog/              # Admin-created blogs
├── product-reviews/   # Product reviews by users
├── order/             # Order placement and tracking
├── prisma/            # PrismaService & database schema
├── main.ts            # App entry point
```

---

## ⚙️ Environment Setup

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://<USER>:<PASSWORD>@<HOST>:<PORT>/<DB_NAME>"
JWT_SECRET="your_jwt_secret"
PORT=9000
FRONTEND_URL="Your Front-end URL"
APP_PASSWORD="Password for email integration"
APP_EMAIL="Your Email"
APP_PROT=App port
```

---

## 🛠️ Prisma Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Open Prisma Studio
npx prisma studio
```

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone git@github.com:SaboorSohaib/medsta-backend.git
cd medsta-backend

```

# 📘 PostgreSQL CLI Reference for Medsta

This file contains essential PostgreSQL commands for setting up and managing your development database.

---

## 🗃️ Database Creation

```bash
# Create a new PostgreSQL database
createdb medsta_db

# Create a database with a specific owner
createdb -O your_db_user medsta_db
```

---

## 🗑️ Database Deletion

```bash
# Drop/delete a PostgreSQL database
dropdb medsta_db
```

---

## 👤 User Management

```bash
# Create a new PostgreSQL user
createuser your_db_user

# Create user with password and permissions (inside psql shell)
CREATE USER your_db_user WITH PASSWORD 'your_password';

# Grant privileges to a user
GRANT ALL PRIVILEGES ON DATABASE medsta_db TO your_db_user;
```

---

## 🏗️ Connecting to PostgreSQL

```bash
# Connect to the PostgreSQL database
psql -U your_db_user -d medsta_db
```

---

## 📋 List & Inspect

```bash
# List all databases
psql -l

# List all users
psql -c '\du'

# Inside psql shell: list tables
\dt

# Inside psql shell: describe a table
\d tablename
```

---

> 💡 Note: Escape backslashes (\) in shell scripts or markdown code blocks.

### 2. Run the App

```bash
# Development mode
npm run start:dev

# Production build
npm run build
npm run start:prod
```

App will be available at:  
`http://localhost:9000`

---

## 🔐 Authentication

All protected routes use JWT-based auth.

---

## 📘 API Overview

Medsta provides these RESTful endpoints:

| Module     | Route Prefix | Description                     |
| ---------- | ------------ | ------------------------------- |
| Auth       | `/auth`      | Register, login, refresh tokens |
| Users      | `/user`      | Profile management              |
| Address    | `/address`   | Manage shipping addresses       |
| Categories | `/category`  | CRUD categories                 |
| Products   | `/product`   | View/search/create products     |
| Blogs      | `/blog`      | Blog post CRUD (admin)          |
| Reviews    | `/review`    | Product review handling         |
| Orders     | `/order`     | Place and track orders          |

---

---

## 💡 Useful Commands

```bash
# Lint code
npm run lint

# Format code
npm run format

# Prisma commands
npx prisma generate
npx prisma migrate dev
npx prisma studio
```

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss improvements or fixes.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author

Built with ❤️ by Abdul Saboor Sohaib.
