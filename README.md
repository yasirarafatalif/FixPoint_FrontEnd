# 🔧 FixItNow – Your Trusted Home Service Platform

<p align="center">
  <b>A Modern Home Service Marketplace Connecting Customers with Trusted Professionals.</b>
</p>

<p align="center">
  Find reliable technicians, book home services, manage appointments, and enjoy hassle-free service experiences with FixItNow.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
</p>

<p align="center">
  <a href="YOUR_LIVE_FRONTEND_URL">🌐 Live Demo</a> •
  <a href="YOUR_BACKEND_URL">⚙️ Backend API</a> •
  <a href="#-features">✨ Features</a>
</p>

---

## 📌 About The Project

**FixItNow** is a modern, responsive home service marketplace built with Next.js. It connects customers with skilled and trusted service professionals, making it easier to find, book, and manage home services.

Whether someone needs plumbing, electrical repairs, cleaning, or other home maintenance services, FixItNow provides a convenient platform to discover professionals and book services online.

The platform includes three different user roles with dedicated dashboards and role-based functionalities.

## ✨ Features

### 🌍 Public Features
- Responsive and modern user interface.
- Browse available home services.
- Search and filter services.
- Explore professional technician profiles.
- View technician ratings, reviews, and pricing.
- Detailed technician profile pages.
- Interactive service booking experience.

### 👤 Customer Dashboard
- Secure user authentication.
- Browse and book home services.
- Select preferred technicians and time slots.
- Track booking status in real time.
- Cancel eligible bookings.
- Online payment integration.
- View payment history.
- Submit reviews after completed services.

### 🛠️ Technician Dashboard
- Technician profile management.
- Manage professional skills and experience.
- Set service pricing.
- Manage service availability.
- View incoming booking requests.
- Accept or decline booking requests.
- Update job progress.
- Mark services as completed.
- Track earnings and upcoming jobs.

### 🛡️ Admin Dashboard
- Platform overview and statistics.
- Manage registered users.
- Ban and unban users.
- Manage service categories.
- Monitor platform bookings.
- View platform-wide information.

### 💳 Payment System
- Integrated online payment workflow.
- Payment initiation after booking acceptance.
- Dedicated payment success and cancellation pages.
- Payment status tracking.

## 🔄 Booking Workflow

```text
Customer Registration / Login
          ↓
     Browse Services
          ↓
   Select a Technician
          ↓
   Choose Date & Time
          ↓
    Submit Booking
          ↓
 Technician Accepts Request
          ↓
      Online Payment
          ↓
    Service In Progress
          ↓
     Job Completed
          ↓
      Submit Review
```

## 👥 User Roles

| Role | Permissions |
|------|-------------|
| Customer | Browse services, book technicians, make payments, manage bookings and submit reviews. |
| Technician | Manage profiles, availability, booking requests and job progress. |
| Admin | Manage users, categories and platform activities. |

## 🧰 Technology Stack

### Frontend
- Next.js
- React.js
- TypeScript
- Tailwind CSS
- Next.js App Router

### Backend
- Node.js
- Express.js
- TypeScript
- REST API

### Authentication & Payment
- Role-Based Authentication
- JWT Authentication
- Stripe / SSLCommerz (as configured)

### Deployment
- Vercel

## 📂 Project Structure

```text
FixItNow/
├── public/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   ├── services/
│   │   ├── technicians/
│   │   ├── dashboard/
│   │   │   ├── customer/
│   │   │   ├── technician/
│   │   │   └── admin/
│   │   └── payment/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   ├── types/
│   └── utils/
├── public/
├── .env.example
├── next.config.ts
├── package.json
└── README.md
```

*Note: The structure above represents the main application organization.*

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the Project Directory

```bash
cd FixPoint_FrontEnd
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory.

```env
NEXT_PUBLIC_API_URL=YOUR_BACKEND_API_URL
```

Replace the value with your deployed backend API URL.

### 5. Start the Development Server

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| NEXT_PUBLIC_API_URL | Backend API base URL |

*Add any additional environment variables required by your actual configuration.*

## 🚀 Live Deployment

The frontend application is deployed using **Vercel**.

- **Frontend:** YOUR_LIVE_FRONTEND_URL
- **Backend:** YOUR_BACKEND_URL

## 📸 Screenshots

Add screenshots of your application here to showcase its design and functionality.

Suggested screenshots:

- Home Page
- Services Page
- Technician Profile
- Customer Dashboard
- Technician Dashboard
- Admin Dashboard
- Payment Page

## 🎯 Project Goals

- Build a user-friendly home service marketplace.
- Implement role-based dashboards and permissions.
- Create a seamless booking experience.
- Integrate secure online payment functionality.
- Develop a responsive and accessible interface.
- Connect the frontend with a RESTful backend API.

## 👨‍💻 Author

**Yasir Arafat Alif**

Full Stack Web Developer

- GitHub: [@yasirarafatalif](https://github.com/yasirarafatalif)

---

<p align="center">
  ⭐ If you find this project interesting, consider giving it a star!
</p>

<p align="center">
  Built with ❤️ by Yasir Arafat Alif
</p>
