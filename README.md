<div align="center">

# ✦ Studio.Inked ✦

### Premium Tattoo Booking Platform

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)

<br/>

**A sleek, full-stack booking system built for tattoo artists who want to ditch DMs and manage their clients like a pro.**

Clients book online → Artists manage from a dashboard → Everyone's happy.

<br/>

[Report Bug](https://github.com/nikhil1176/Studio.Inked/issues) · [Request Feature](https://github.com/nikhil1176/Studio.Inked/issues)

---

</div>

<br/>

## 🔥 Why Studio.Inked?

Most tattoo artists manage bookings through **Instagram DMs and phone calls** — messy, unprofessional, and they lose clients. Studio.Inked solves this with:

- 🎯 **Online Booking** — Clients book 24/7 without calling or DMing
- 🖼️ **Portfolio Showcase** — Professional gallery that beats an Instagram feed
- 📊 **Admin Dashboard** — All bookings in one place, status tracking, search & filters
- 📸 **Reference Upload** — Clients upload tattoo reference images directly
- 🔐 **Secure Login** — Google OAuth + Email/Password authentication
- 📱 **Mobile-First** — Looks premium on every device

<br/>

## ✨ Features

<table>
<tr>
<td width="50%">

### 🏠 Landing Page
- Animated Aurora background (WebGL)
- Hero section with CTA
- Services showcase (4 specialties)
- Gallery with hover effects
- Contact section + Google Maps
- Sticky glassmorphism navbar

</td>
<td width="50%">

### 📝 Booking Form
- Multi-section layout (Contact → Tattoo → Notes)
- Tattoo style & size selection
- Body placement input
- Reference image upload (Cloudinary)
- Date picker with future-only validation
- Real-time form validation

</td>
</tr>
<tr>
<td width="50%">

### 📊 Admin Dashboard
- Card-grid booking view
- Status management (Pending → Confirmed → Completed/Cancelled)
- Search by name, email, phone
- Sort by date (newest/oldest/appointment)
- Filter by status
- Image lightbox viewer
- Toast notifications
- Live clock + session stats

</td>
<td width="50%">

### 🔐 Artist Login Portal
- Email/Password authentication
- Google OAuth integration
- Fluid cursor effect (WebGL)
- Cinematic background with ink-flow
- NextAuth session management
- Protected admin routes

</td>
</tr>
</table>

<br/>

## 🎨 Design Philosophy

Studio.Inked is designed to feel **luxury and premium** — not like a generic template.

| Element | Choice |
|---------|--------|
| **Color Palette** | Deep black (#050505) + Gold accent (#C5A059) |
| **Typography** | Playfair Display (headings) + Inter (body) |
| **Backgrounds** | WebGL Aurora, Liquid Ether, Fluid Cursor effects |
| **Animations** | Framer Motion — scroll reveals, hover states, page transitions |
| **UI Components** | Custom-built with shadcn/ui + Radix primitives |
| **Dark Mode** | Native dark theme throughout |

<br/>

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                    CLIENT BROWSER                    │
│                                                     │
│  Landing Page ─── Booking Form ─── Artist Portal    │
│       │               │                │            │
│       └───────────────┴────────────────┘            │
│                       │                             │
│              Next.js API Routes                     │
│           (Proxy to Backend API)                    │
└───────────────────────┬─────────────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────────────┐
│                  EXPRESS.JS SERVER                     │
│                                                       │
│  /api/bookings ─── /api/auth ─── /api/upload          │
│       │                │              │               │
│       ▼                ▼              ▼               │
│   MongoDB          bcrypt.js      Cloudinary          │
│   (Mongoose)       (Hashing)      (Image CDN)        │
└───────────────────────────────────────────────────────┘
```

<br/>

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 16 · React 19 · TailwindCSS 4 |
| **UI/UX** | Framer Motion · shadcn/ui · Radix UI |
| **WebGL Effects** | Three.js · OGL |
| **Auth** | NextAuth.js (Credentials + Google OAuth) |
| **Backend** | Express.js 5 · Node.js |
| **Database** | MongoDB Atlas (Mongoose 9) |
| **Image Storage** | Cloudinary |
| **Styling** | TailwindCSS 4 · tw-animate-css |

<br/>

## 📂 Project Structure

```
TATTOO/
├── frontend/                    # Next.js App
│   └── src/
│       ├── app/
│       │   ├── page.js              # 🏠 Landing Page
│       │   ├── layout.js            # Root Layout + Fonts
│       │   ├── globals.css          # Global Styles
│       │   ├── book/
│       │   │   └── page.jsx         # 📝 Booking Form
│       │   ├── admin/
│       │   │   └── page.jsx         # 📊 Admin Dashboard
│       │   ├── artist-portal/
│       │   │   └── page.jsx         # 🔐 Login Page
│       │   ├── api/                 # Next.js API Proxy Routes
│       │   │   ├── bookings/
│       │   │   ├── admin/
│       │   │   ├── auth/
│       │   │   └── upload/
│       │   └── components/
│       │       ├── AuroraBackground.jsx
│       │       ├── BackgroundGradient.jsx
│       │       ├── LiquidEther.jsx
│       │       └── SplashCursor.jsx
│       └── AuthProvider.jsx
│
├── backend/                     # Express.js API
│   ├── server.js                # Entry Point
│   ├── config/                  # DB & Auth Config
│   ├── controllers/
│   │   ├── authController.js    # Login/Register Logic
│   │   └── bookingController.js # CRUD Bookings
│   ├── models/
│   │   ├── Admin.js             # Admin Schema
│   │   └── Booking.js           # Booking Schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── bookingRoutes.js
│   └── middleware/              # Auth Middleware
│
├── sales_script.md              # Sales & Outreach Guide
├── tattoo_studio_leads.csv      # Lead Database
└── README.md                    # You are here!
```

<br/>

## ⚡ Quick Start

### Prerequisites

- **Node.js** 18+
- **MongoDB Atlas** account (or local MongoDB)
- **Cloudinary** account (for image uploads)
- **Google Cloud Console** project (for OAuth — optional)

### 1. Clone the Repo

```bash
git clone https://github.com/nikhil1176/Studio.git
cd Studio
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/tattoo-studio
FRONTEND_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend:

```bash
npm start
```

### 3. Setup Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

### 4. Open in Browser

```
🏠 Landing Page:      http://localhost:3000
📝 Book Appointment:  http://localhost:3000/book
🔐 Artist Login:      http://localhost:3000/artist-portal
📊 Admin Dashboard:   http://localhost:3000/admin
```

<br/>

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/bookings` | Create a new booking |
| `GET` | `/api/bookings` | Get all bookings |
| `PATCH` | `/api/bookings/:id` | Update booking status |
| `POST` | `/api/auth/register` | Register new admin |
| `POST` | `/api/auth/login` | Admin login |
| `POST` | `/api/upload` | Upload image to Cloudinary |

<br/>

## 🗺️ Roadmap

- [x] Landing page with premium design
- [x] Online booking form with image upload
- [x] Admin dashboard with status management
- [x] Google OAuth + Email/Password auth
- [x] WebGL background effects
- [ ] Portfolio management (artist uploads own work)
- [ ] Email/WhatsApp notifications on booking
- [ ] SEO optimization
- [ ] Multi-artist support
- [ ] Analytics dashboard
- [ ] PWA support

<br/>

## 🤝 Contributing

This project is currently in active development. If you'd like to contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<br/>

## 📬 Contact

**Nikhil Kanwal** — Developer & Creator

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/nikhil-kanwal-74a270266)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/nikhil1176)

<br/>

---

<div align="center">

**Built with 🖤 and ☕ by Nikhil Kanwal**

*Turning tattoo studios digital, one artist at a time.*

</div>
