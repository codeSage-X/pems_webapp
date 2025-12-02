# PEMS Frontend - Personal Equipment Management System
**Modern Web Application for GeoPlex Oil & Gas Operations**


A modern, responsive web application for managing personnel, equipment, jobs, and logistics operations in the oil and gas industry. Built with Next.js 14, TypeScript, and Tailwind CSS.

---

## 🎯 Overview

PEMS Frontend provides an intuitive interface for:
- **Dashboard** - Real-time overview of operations and key metrics
- **User Management** - Employee directory with role-based access
- **Job Management** - Create, assign, and track job progress
- **Equipment Tracking** - Monitor inventory with maintenance alerts
- **Vehicle Management** - Fleet tracking with fuel and mileage monitoring
- **Client Portal** - Customer relationship management

Designed specifically for field operations teams in the Nigerian oil & gas sector.

---

## 🚀 Tech Stack

### Core Framework
- **Next.js 14** - React framework with App Router
- **React 18** - Modern UI library with hooks
- **TypeScript 5** - Type-safe JavaScript
- **Node.js 18+** - JavaScript runtime

### Styling & UI
- **Tailwind CSS 3** - Utility-first CSS framework
- **Headless UI** - Unstyled accessible UI components
- **Heroicons** - Beautiful hand-crafted SVG icons
- **shadcn/ui** - Re-usable component library
- **Framer Motion** - Animation library

### State Management & Data Fetching
- **React Query (TanStack Query)** - Server state management
- **Zustand** - Lightweight client state management
- **Axios** - HTTP client for API requests
- **SWR** - React hooks for data fetching (alternative)

### Forms & Validation
- **React Hook Form** - Performant form library
- **Zod** - TypeScript-first schema validation
- **date-fns** - Modern date utility library

### Authentication
- **JWT Tokens** - Secure token-based authentication
- **Context API** - Auth state management
- **Protected Routes** - Role-based access control
- **Session persistence** - LocalStorage/Cookies

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking
- **Vercel** - Deployment platform

---

## ✨ Key Features

### 🔐 Authentication & Authorization
- Secure login/logout functionality
- JWT token management
- Role-based access (BD_USER, OPS_MANAGER, ADMIN)
- Protected routes and pages
- Auto-logout on token expiry
- Remember me functionality

### 👥 User Management
- Employee directory with search
- Filter by role and status
- View user profiles with job history
- Update user information
- Status tracking (ACTIVE, ON_LEAVE, SICK)
- Real-time user status updates

### 📋 Job Management
- Interactive job board (Kanban-style)
- Create new jobs with form validation
- Assign employees and equipment
- Update job status with drag & drop
- Priority indicators (LOW, MEDIUM, HIGH, CRITICAL)
- Advanced filtering:
  - By status, priority, type
  - By employee or client
  - By date range
- Job search functionality
- Detailed job views with history
- Export job reports

### 🔧 Equipment/Inventory Tracking
- Comprehensive equipment catalog
- Visual status indicators
- Maintenance schedule calendar
- Serial number tracking
- Location-based filtering
- Equipment checkout/checkin
- Maintenance alerts (30-day warnings)
- Equipment usage history
- QR code generation (future)

### 🚗 Vehicle/Logistics Management
- Fleet overview dashboard
- Fuel level gauges (visual)
- Mileage tracking charts
- Vehicle status board
- Inspection scheduling
- Low fuel alerts (<30%)
- Vehicle assignment to jobs
- Maintenance history

### 🏢 Client Management
- Client directory
- Company profiles
- Job history per client
- Contact information
- Industry classification
- Active/Inactive status

### 📊 Dashboard & Analytics
- Key metrics overview
- Active jobs counter
- Equipment status breakdown
- Vehicle availability
- Recent activity feed
- Quick actions menu
- Performance charts

---

## 🎨 UI/UX Features

### Design System
- **Responsive Design** - Mobile, tablet, desktop optimized
- **Dark Mode** - Eye-friendly theme switching
- **Accessible** - WCAG 2.1 AA compliant
- **Loading States** - Skeleton loaders and spinners
- **Error Handling** - User-friendly error messages
- **Toast Notifications** - Success/error feedback
- **Empty States** - Helpful illustrations when no data

### User Experience
- **Fast Navigation** - Client-side routing
- **Search Everything** - Global search functionality
- **Keyboard Shortcuts** - Power user features
- **Responsive Tables** - Mobile-friendly data grids
- **Infinite Scroll** - Lazy loading for large lists
- **Real-time Updates** - Live data synchronization
- **Offline Support** - Service worker caching (PWA)

---

## 📁 Project Structure

```
pems-frontend/
├── app/                        # Next.js 14 App Router
│   ├── (auth)/                # Authentication routes
│   │   ├── login/            # Login page
│   │   └── register/         # Registration page
│   ├── (dashboard)/          # Protected dashboard routes
│   │   ├── dashboard/        # Main dashboard
│   │   ├── users/           # User management
│   │   ├── jobs/            # Job management
│   │   ├── equipment/       # Equipment tracking
│   │   ├── vehicles/        # Vehicle management
│   │   └── clients/         # Client management
│   ├── api/                  # API route handlers
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── components/               # React components
│   ├── ui/                  # Reusable UI components
│   ├── forms/               # Form components
│   ├── tables/              # Data table components
│   ├── charts/              # Chart components
│   └── layout/              # Layout components
├── lib/                     # Utility functions
│   ├── api.ts              # API client setup
│   ├── auth.ts             # Authentication helpers
│   ├── utils.ts            # Helper functions
│   └── constants.ts        # App constants
├── hooks/                   # Custom React hooks
│   ├── useAuth.ts          # Authentication hook
│   ├── useJobs.ts          # Jobs data hook
│   └── useUsers.ts         # Users data hook
├── types/                   # TypeScript type definitions
│   ├── user.ts
│   ├── job.ts
│   ├── equipment.ts
│   └── vehicle.ts
├── context/                 # React context providers
│   └── AuthContext.tsx     # Auth state provider
├── styles/                  # Global styles
│   └── globals.css
├── public/                  # Static assets
│   ├── images/
│   └── icons/
├── .env.local              # Environment variables
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18 or higher
- npm or yarn or pnpm
- Git

### Local Development

1. **Clone the repository**
```bash
git clone <repository-url>
cd pems-frontend
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Configure environment variables**

Create `.env.local`:
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_API_TIMEOUT=30000

# App Configuration
NEXT_PUBLIC_APP_NAME=PEMS
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Feature Flags
NEXT_PUBLIC_ENABLE_DARK_MODE=true
NEXT_PUBLIC_ENABLE_PWA=false
```

4. **Start development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Application available at: `http://localhost:3000`

---

## 🚢 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy to Vercel**
- Go to [vercel.com](https://vercel.com)
- Import repository
- Add environment variables
- Deploy

**Environment Variables (Production):**
```env
NEXT_PUBLIC_API_URL=https://your-api.railway.app/api
NEXT_PUBLIC_APP_NAME=PEMS
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### Alternative Platforms

#### Netlify
```bash
npm run build
netlify deploy --prod
```

#### Render
- Build Command: `npm run build`
- Start Command: `npm run start`
- Environment: Node 18+

---

## 📱 Responsive Breakpoints

```css
/* Mobile */
sm: 640px   /* Small devices (phones) */

/* Tablet */
md: 768px   /* Medium devices (tablets) */

/* Desktop */
lg: 1024px  /* Large devices (desktops) */
xl: 1280px  /* Extra large (large desktops) */
2xl: 1536px /* 2X large (ultra-wide) */
```

---

## 🎨 Theme Configuration

### Colors (Tailwind)
```javascript
// Primary - Oil & Gas industry blue
primary: '#1e3a8a'

// Status Colors
success: '#10b981'  // Green
warning: '#f59e0b'  // Amber
danger: '#ef4444'   // Red
info: '#3b82f6'     // Blue

// Job Priority
low: '#6b7280'      // Gray
medium: '#f59e0b'   // Amber
high: '#ef4444'     // Red
critical: '#dc2626' // Dark Red

// Equipment Status
operational: '#10b981'    // Green
maintenance: '#f59e0b'    // Amber
out_of_service: '#ef4444' // Red
```

---

## 🔌 API Integration

### Axios Configuration
```typescript
// lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

---

## 🧩 Component Examples

### Job Card Component
```tsx
interface JobCardProps {
  job: Job;
  onStatusChange: (id: number, status: JobStatus) => void;
}

export function JobCard({ job, onStatusChange }: JobCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold">{job.title}</h3>
      <p className="text-sm text-gray-600">{job.description}</p>
      <Badge priority={job.priority}>{job.priority}</Badge>
      <StatusSelect 
        value={job.status}
        onChange={(status) => onStatusChange(job.id, status)}
      />
    </div>
  );
}
```

### Data Table with Filters
```tsx
export function JobsTable() {
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    search: '',
  });

  const { data, isLoading } = useJobs(filters);

  return (
    <div>
      <FilterBar filters={filters} onChange={setFilters} />
      <Table data={data} loading={isLoading} />
    </div>
  );
}
```

---

## 🧪 Testing

### Run Tests
```bash
npm run test          # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### E2E Testing (Playwright)
```bash
npm run test:e2e      # End-to-end tests
```

---

## 📊 Performance Optimization

### Implemented Optimizations
- ✅ Server-side rendering (SSR)
- ✅ Static site generation (SSG)
- ✅ Image optimization (next/image)
- ✅ Code splitting
- ✅ Lazy loading
- ✅ Route prefetching
- ✅ API response caching
- ✅ Debounced search inputs
- ✅ Virtualized long lists
- ✅ Compressed assets

### Lighthouse Scores (Target)
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

---

## 🔒 Security Features

- **XSS Protection** - Sanitized user inputs
- **CSRF Tokens** - Cross-site request forgery prevention
- **Content Security Policy** - HTTP headers configured
- **Secure Cookies** - HttpOnly, Secure flags
- **Input Validation** - Client-side and server-side
- **Rate Limiting** - API request throttling
- **Environment Variables** - Secrets not exposed

---

## 🌍 Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run type-check   # TypeScript type checking
npm run analyze      # Analyze bundle size
```

---

## 🤝 Integration with Backend

### API Base URL
Development: `http://localhost:8000/api`
Production: `https://your-api.railway.app/api`

### Authentication Flow
1. User enters credentials
2. POST `/api/login` → Receive token
3. Store token in localStorage
4. Add token to all subsequent requests
5. Redirect to dashboard

### Data Flow
```
Component → Custom Hook → API Client → Backend API
           ↓
       React Query Cache
           ↓
       Re-render UI
```

---

## 🎯 User Roles & Permissions

### BD_USER (Business Development User)
- ✅ View dashboard
- ✅ Create jobs
- ✅ View users
- ✅ View equipment
- ✅ View vehicles
- ❌ Update job status
- ❌ Manage users

### OPS_MANAGER (Operations Manager)
- ✅ All BD_USER permissions
- ✅ Update job status
- ✅ Assign equipment
- ✅ Manage vehicles
- ✅ View analytics
- ❌ Delete users

### ADMIN
- ✅ Full access to all features
- ✅ User management
- ✅ System configuration
- ✅ Delete records

---

## 🐛 Common Issues & Solutions

### Issue: API Connection Failed
```
Solution: Check NEXT_PUBLIC_API_URL in .env.local
Ensure backend is running on correct port
```

### Issue: Authentication Token Expired
```
Solution: Implement token refresh logic
Or redirect user to login page
```

### Issue: Build Errors
```
Solution: Delete .next folder and node_modules
Run: npm install && npm run build
```



## 🗺️ Roadmap

### Phase 1 (Current)
- [x] Authentication & Authorization
- [x] User Management
- [x] Job Management
- [x] Equipment Tracking
- [x] Vehicle Management
- [x] Client Portal



## 🚀 Quick Start

```bash
# Clone and install
git clone <repo-url> && cd pems-frontend && npm install

# Configure API
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api" > .env.local

# Start development
npm run dev

# Open http://localhost:3000
```

**Default Login:**
```
Email: chukwu@pems.com
Password: 1234556
```

---

**Version:** 1.0.0  
**Last Updated:** December 2025  
**Status:** Production Ready ✅
