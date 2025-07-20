# 🏦 Bank Information Management System

A **full-stack web application** to manage and view bank account details.  
Users can register, log in, and manage multiple bank accounts.  
Admins can view all user accounts and apply search and filter options.  

**Live Demo:** [Bank Management System](https://user-bank-management-system.netlify.app/)  
**Backend API:** [Backend on Render](https://user-bank-info-management.onrender.com)
**GIT REPO** (https://github.com/kamalnayantripathi/user-bank-info-management)

---

## 🚀 Features

### 👤 **User Panel**
- **Authentication**
  - User registration and login with **JWT tokens**.
  - Passwords securely hashed using **bcrypt**.
- **Bank Account Management**
  - Add multiple bank accounts with fields:
    - IFSC Code (validated)
    - Branch Name
    - Bank Name
    - Account Number (unique)
    - Account Holder Name
  - Edit existing bank accounts.
  - Delete bank accounts with confirmation popups.
  - View all saved bank accounts in a user-friendly UI.
- **Input Validation**
  - Enforces proper formats for IFSC codes, account numbers, and names.
  - Inline error messages and toast notifications.

---

### 🛠️ **Admin Panel**
- **View All User Accounts**  
  Admins can see every registered user's bank accounts.
- **Search & Filter**  
  - Filter accounts by username, bank name, branch, or IFSC code.
  - Clean search UI with dropdowns and a dedicated search button.
- **Read-Only Access**  
  Admins can only **view and filter** accounts (no editing or deletion).

---

## 🧰 Technology Stack

### **Frontend**
- **React** (Vite)
- **CSS** (No Tailwind as per requirements)
- **React Router DOM** for navigation.
- **React Toastify** for error/success messages.

### **Backend**
- **Node.js** + **Express.js**
- **MongoDB** with Mongoose ODM.
- **JWT Authentication** for secure access.
- **CORS Configured** for Netlify frontend.
- **Validation** via Mongoose schema and regex patterns.

---

## 📂 Database Structure

### **User Schema**
- `username`: String  
- `email`: String (unique)  
- `password`: Hashed string  
- `role`: String (`User` or `Admin`)  

### **Bank Account Schema**
- `userId`: Reference to User  
- `ifscCode`: Valid IFSC code format (e.g., `SBIN0001234`)  
- `bankName`: String  
- `branchName`: String  
- `accountNumber`: Unique numeric string (9–18 digits)  
- `accountHolderName`: Only letters and spaces  

---

## 🖥️ Deployment

- **Frontend:** Hosted on **Netlify**  
  Build command: `npm run build`  
  Publish directory: `dist`  

- **Backend:** Hosted on **Render**  
  Environment Variables:
  ```bash
  PORT=8000
  MONGO_URI=mongodb+srv://tripathikamalnayan3:rvnD6mPjMU1VeseA@cluster0.8dzx84p.mongodb.net/
  JWT_SECRET="user-bank-info-management-system"
  FRONTEND_URL=https://user-bank-management-system.netlify.app
