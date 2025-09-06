

A full-stack web application to sell and buy sustainable 2nd hand products  
This project is a simple marketplace platform where users can sign up, log in, and post products.  

---

## 🚀 Features
- 👤 **User Authentication** with JWT
- 🛒 **Shopping Cart** functionality
- 📦 **Product Listings** with categories (Electronics, Fashion, Home, etc.)
- 🌱 **Database Seeding** script for demo data
- ⚡ **Backend:** Node.js + Express + SQLite
- 🎨 **Frontend:** React (if included in repo)

---

## 📂 Project Structure
```bash
nmithackathon-main/
│
├── server/ # Backend (Express + SQLite)
│ ├── config/ # Database configuration
│ ├── controllers/ # API logic
│ ├── middleware/ # Authentication
│ ├── routes/ # API routes
│ ├── seed.js # Database seeding script
│ └── server.js # Main backend entry point
│
├── client/ (optional) # React frontend if included
│
└── README.md
```


---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/nmithackathon-main.git
cd nmithackathon-main
```
2. Install Dependencies
Backend:

```bash

cd server
npm install
```
Frontend :

```bash


npm install
npm run dev
```
3. Environment Variables
Create a .env file inside the server/ folder:

```env

PORT=3001
JWT_SECRET=your-secret-key
```
4. Run Database Seed
This initializes tables and inserts demo data:

```bash

cd server
node seed.js
```
You should see:

```css

🌱 Seeding database...
✅ Database tables initialized
📦 Connected to SQLite database
✅ Seeding complete!
```
5. Start the Server
```bash

npm run dev
Server runs at: http://localhost:3001
```

🌱 Demo Data
```Users

alice@example.com / password123

bob@example.com / password123

Products

Laptop (Electronics, ₹50,000)

White Shirt (Fashion, ₹1,200)

Chair (Home, ₹3,000)
```

🛠️ Tech Stack
Backend: Node.js, Express

Database: SQLite

Authentication: JWT

Frontend: React (if included)

🤝 Contributing
Fork this repo

Create a new branch (feature/my-feature)

Commit changes

Push and open a PR

📜 License
This project is licensed under the MIT License.

```yaml


---

⚡ This version is **clean, hackathon-ready, and developer-friendly**.  

Do you also want me to add a **Problem → Solution → Impact** section (for judges/pitch deck style), or should I keep it strictly technical?



```




