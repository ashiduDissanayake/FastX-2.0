# VogueNest & FastX – Supply Chain Management System (SCMS)

This is our Semester 3 project for the *Database Systems* module at the University of Moratuwa. It consists of two interlinked platforms:

- **VogueNest** – A clothing e-commerce platform for customers.
- **FastX** – A complete supply chain management system (SCMS) to handle logistics and delivery operations.

---

## 🛍️ VogueNest – E-Commerce Clothing Platform

VogueNest is a front-facing fashion marketplace where users can:
- Register & log in
- Browse trending clothes
- Star favorite items
- Add items to the cart
- Checkout using a location map for delivery

After checkout, the order is automatically handed over to **FastX** for logistics.

---

## 🚛 FastX – SCMS for Company A

FastX handles the delivery and transportation for a production company using **railway and truck-based logistics**. Key features include:

### 👥 User Roles
- **Main Manager**
- **Branch Manager**
- **Driver**
- **Driver Assistant**
- **Admin**

### 🚂 Logistics Management
- Orders transported by **train** to major cities: Colombo, Negombo, Galle, Matara, Jaffna, Trinco
- Local deliveries handled by **trucks**, routed based on customer-selected delivery routes
- Driver & Assistant scheduling based on rosters with constraints:
  - Max 40 hrs/week (drivers), 60 hrs/week (assistants)
  - No consecutive shifts (drivers), max 2 for assistants

### 📊 Reporting & Analytics
- Quarterly sales reports
- Top ordered items
- City & route-based sales stats
- Working hours of drivers & assistants
- Customer order reports

---

## 🧱 Technical Stack

- **Frontend**: React.js
- **Backend**: Node.js + Express (MVC Architecture)
- **Database**: MySQL
- **Database Features**:
  - Stored Procedures
  - Functions
  - Triggers
  - Foreign & Primary Keys
  - Proper Indexing

### 🔗 GitHub Repository
Add the link here once available.

---

## 📦 Dataset

- 40+ orders across 10 different delivery routes
- Custom train schedule with predefined item capacities
- Full delivery flow from customer to doorstep

---

## 👨‍💻 Team Scope

- **Ashidu Dissanayake** (Team Leader)
- Pathumi Ranasinghe
- Kasun Dilhara
- Yasith Imalka
- Sasini Rajamanukula

**Instructor**: Sheshan Premathilaka (University of Moratuwa)

---

## 📸 Screenshots & Schema

Please refer to the `/docs` folder for:
- DB schema
- App screenshots
- Sample reports

---

## 🚀 Getting Started

To run the project locally:

1. Clone the repository
2. Set up your `.env` using the given '.env.example' file with MySQL credentials
3. Run database migrations & seed data
4. Start backend server: `npm run dev`
5. Start frontend: `npm run dev`
