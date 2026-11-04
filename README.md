# Sadu Real Estate Development (سدو)
### Full-Stack MERN Architecture · Riyadh · Jeddah · Mecca · Medina · Dubai

A distinctive real estate development platform purpose-built for the primary markets: **Riyadh**, **Jeddah**, **Mecca**, **Medina**, and **Dubai**.

Engineered using the **MERN Stack** (MongoDB, Express.js, React, Node.js) with an editorial architectural aesthetic, comprehensive property due-diligence data, and a streamlined 3-column inquiry pipeline (Name, Mobile, Looking for).

---

## 🏛️ Brand & Strategic Concept

**Sadu Real Estate Development** operates on a **direct developer partner model**:
1. **Who We Serve:** Discerning family offices, private wealth allocators, corporate owner-occupiers, and international investors seeking prime assets.
2. **Which Locations:** Exclusive markets: **Riyadh**, **Jeddah**, **Mecca**, and **Medina**, alongside **Dubai real estate**.
3. **Why Clients Trust Us:** Direct developer channel agreements, zero broker markups, and end-to-end conveyance to official title deeds.
4. **Transparent Preview Standards:** All listings and projections are realistic sample assets for concept review and can be seamlessly updated via the MongoDB database.

---

## 💻 Tech Stack & Architecture

- **Frontend:** React 18, Vite, React Router 6, Tailwind CSS v4, Lucide Icons, Google Fonts (*Playfair Display* & *Plus Jakarta Sans*).
- **Backend API:** Node.js, Express.js REST API, Morgan HTTP logging, CORS security, Port auto-resilience.
- **Database & Persistence:** MongoDB & Mongoose ORM.
  - **Graceful Zero-Config Fallback:** If a MongoDB connection is not configured or unavailable, the backend automatically operates with an in-memory repository. All filters, queries, and inquiry submissions remain 100% operational out of the box!
- **Orchestration:** Root `concurrently` scripts to run client and server simultaneously, and `vercel.json` for one-click Vercel serverless deployment.

---

## 📂 Project Structure

```text
abcd/
├── vercel.json                # Vercel Monorepo Serverless & SPA routing config
├── api/
│   └── index.js               # Vercel Serverless Function entrypoint wrapping Express
├── package.json               # Root dependencies & scripts (concurrently dev, seed, install)
├── .env.example               # Root environment configuration reference
├── README.md                  # Comprehensive documentation & setup guide
│
├── server/                    # Node.js & Express REST Backend
│   ├── config/
│   │   └── db.js              # MongoDB connection with serverless pooling & fallback
│   ├── models/
│   │   ├── Property.js        # Mongoose Schema for Curated Listings
│   │   └── Inquiry.js         # Mongoose Schema for Client Inquiries
│   ├── routes/
│   │   ├── propertyRoutes.js  # GET (filter/search/sort), GET :id, POST
│   │   ├── inquiryRoutes.js   # GET inquiries, POST new inquiry, PATCH status
│   │   └── statsRoutes.js     # System health & market corridor metrics
│   ├── data/
│   │   └── sampleData.js      # Curated dataset for 7 prime properties & inquiries
│   ├── scripts/
│   │   └── seed.js            # Database seeding script for MongoDB
│   ├── .env.example           # Server environment template
│   ├── package.json           # Server dependencies & scripts
│   └── server.js              # Express application & serverless export
│
└── client/                    # React + Vite Frontend
    ├── public/
    │   └── assets/            # High-resolution architectural photography
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx               # Editorial header, reading scroll bar, mobile drawer
    │   │   ├── Footer.jsx               # Corridor hubs, REGA notes, contact
    │   │   ├── PropertyCard.jsx         # Architectural cards with specs & actions
    │   │   ├── PropertyFilter.jsx       # Multi-criteria filter bar (City, Type, Price, Beds)
    │   │   ├── InquiryModal.jsx         # Contextual brief submission & WhatsApp link
    │   │   ├── MortgageCalculator.jsx   # Islamic financing & yield pro-forma model
    │   │   ├── ScrollReveal.jsx         # Subtle scroll-triggered animation utility
    │   │   ├── BackToTop.jsx            # Floating smooth scroll-to-top button
    │   │   └── DatabaseStatusIndicator.jsx # Live MERN stack & database status pill
    │   ├── pages/
    │   │   ├── HomePage.jsx             # Hero, 3 corridors, featured units, model
    │   │   ├── PropertiesPage.jsx       # Full portfolio with real-time filters
    │   │   ├── PropertyDetailPage.jsx   # Unit gallery, specs, transit times, calculator
    │   │   ├── AboutPage.jsx            # Advisory philosophy & channel partner model
    │   │   ├── ServicesPage.jsx         # 4 investor pathways & 5-stage roadmap
    │   │   ├── PartnershipsPage.jsx     # Developer channel onboarding & intake form
    │   │   ├── ContactPage.jsx          # Kingdom office addresses & direct brief form
    │   │   └── InquiriesDashboardPage.jsx # Live pipeline & inquiry status management
    │   ├── services/
    │   │   └── api.js                   # API client with offline fallback resilience
    │   ├── data/
    │   │   └── staticFallback.js        # Bundled property dataset
    │   ├── App.jsx                      # App routes & global modal state
    │   ├── index.css                    # Tailwind CSS & editorial styling
    │   └── main.jsx                     # React root mount
    ├── vite.config.js                   # Vite config with API proxy to port 5001
    └── package.json                     # Frontend dependencies
```

---

## ⚡ Deploying to Vercel (1-Click Monorepo Setup)

You can deploy this entire full-stack project **directly on Vercel**:
- The **React frontend** is built and served from Vercel's global Edge CDN with SPA routing.
- The **Express.js backend** runs serverlessly via `api/index.js` handling all `/api/*` endpoints.
- If you don't connect a database immediately, the site runs seamlessly on Vercel in **Demo Mode**. To make data persistent across invocations, simply add your free **MongoDB Atlas** connection string!

### Steps to Deploy on Vercel:
1. Go to [vercel.com](https://vercel.com) and click **"Add New Project"** &rarr; **"Import Git Repository"**.
2. Select your repository: `harshitt0418/real-state-demo`.
3. Vercel automatically detects the `vercel.json` configuration (Build command: `cd client && npm install && npm run build`, Output Directory: `client/dist`).
4. **Environment Variables (Optional):**
   - `MONGODB_URI`: Your MongoDB Atlas URI (e.g., `mongodb+srv://user:pass@cluster.mongodb.net/miras_real_estate`).
   - `NODE_ENV`: `production`
5. Click **"Deploy"**.
6. Once deployed, your site and all API endpoints (`/api/properties`, `/api/inquiries`, `/api/health`, `/api/stats`) are live immediately!

---

## 🚀 Local Quickstart Guide

### 1. Prerequisites
- **Node.js** v18+ (tested on Node v24.13)
- **npm** v9+
- *(Optional)* **MongoDB** (Local `mongod` or MongoDB Atlas URI). If omitted, the application runs automatically in **Demo Mode**.

---

### 2. Installation
Run from the root workspace directory:

```bash
# Install root, server, and client dependencies
npm run install:all
```

Or install individually:
```bash
npm install
cd server && npm install
cd ../client && npm install
```

---

### 3. Environment Configuration
Create `.env` files from the provided `.env.example` templates:

#### Root:
```bash
cp .env.example .env
```

#### Server (`server/.env`):
```ini
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/miras_real_estate
CLIENT_URL=http://localhost:5173
CONTACT_EMAIL=advisory@miras-re.sa
CONTACT_WHATSAPP=+966501234567
```

#### Client (`client/.env`):
```ini
VITE_API_URL=/api
VITE_COMPANY_NAME="MIRĀS Real Estate Advisory"
VITE_CONTACT_EMAIL="advisory@miras-re.sa"
VITE_CONTACT_PHONE="+966 11 482 9900"
VITE_WHATSAPP="+966501234567"
```

---

### 4. Running the Application Locally

#### Option A: Run Both Concurrently (Recommended for Development)
```bash
npm run dev
```
- **React Frontend (Vite):** [http://localhost:5173](http://localhost:5173)
- **Express Backend API:** [http://localhost:5001](http://localhost:5001)

#### Option B: Run Express Server (Serves Full App + API)
```bash
npm run server
```
- Open [http://localhost:5001](http://localhost:5001) in your browser.
- The server automatically serves the built React client, API endpoints, and static images.

---

### 5. Connecting Live MongoDB & Seeding Data *(Optional)*

If you have MongoDB installed locally or have a MongoDB Atlas connection string:
1. Ensure your MongoDB service is running (or set `MONGODB_URI` in `server/.env`).
2. Run the seeder to populate the database with the 7 curated properties and sample client inquiries:
   ```bash
   npm run seed
   ```
3. Restart the server (`npm run server` or `npm run dev`).
4. The floating status indicator at the bottom-left will show **MongoDB Live**.

---

## 📡 REST API Reference

| Method | Endpoint | Description | Query Parameters / Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | System health & DB connection status | None |
| `GET` | `/api/stats` | Market metrics, listing count & pipeline | None |
| `GET` | `/api/properties` | Fetch curated listings | `city`, `type`, `minPrice`, `maxPrice`, `beds`, `search`, `sort` |
| `GET` | `/api/properties/:id` | Fetch single property detail | `:id` (e.g. `riyadh-olaya-apartment`) |
| `POST` | `/api/properties` | Create / add a property unit | Property JSON object |
| `GET` | `/api/inquiries` | Retrieve all registered client briefs | `status`, `city` |
| `POST` | `/api/inquiries` | Submit acquisition brief or inquiry | `{ name, email, phone, cityOfInterest, inquiryType, message }` |
| `PATCH`| `/api/inquiries/:id/status` | Update status of an inquiry | `{ status: "Under Review" }` |

---

## 🎨 Design & Editorial Standards

- **Restrained Architectural Palette:** Deep Mineral Charcoal (`#0F1216`), Travertine Stone (`#151A21`), Sandstone Ochre (`#C5A265`), Warm Linen (`#F3EFEA`).
- **Typography:** *Playfair Display* for editorial confidence paired with *Plus Jakarta Sans* for technical specs and SAR currency figures.
- **Subtle Scroll Motion & Animations:** 
  - Lightweight scroll-triggered reveals (`ScrollReveal`) using `IntersectionObserver` with smooth cubic-bezier easing.
  - Staggered entrances for property cards, corridor highlights, and roadmap steps.
  - Hairline gold scroll reading progress bar integrated into the header navigation.
  - Floating smooth back-to-top trigger that gracefully reveals after scrolling past the fold.
  - Full support for `prefers-reduced-motion: reduce` to ensure accessibility and comfort.
- **Interactive Tools:** Capital & Yield Mortgage Calculator with amortized monthly installments, down payments, and net operational yield metrics.
- **Fiduciary Dashboard:** Inquiries pipeline view at `/inquiries` for reviewing incoming investor submissions in real-time.
- **Accessibility:** Tested for keyboard navigation, screen-reader headings, high contrast, and responsive viewports (Mobile, Tablet, Desktop).

---

*Designed and engineered as a comprehensive MERN showcase for modern Saudi real estate advisory.*
