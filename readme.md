<div align="center">

# ✨ Clearify - Modern Task Management Application

### _Organize, Prioritize, and Achieve with Seamless Task Management_

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

[![Live Demo](https://img.shields.io/badge/🚀-Live_Demo-success?style=for-the-badge)](https://clearify-official.vercel.app)


</div>

---

## 📋 Overview

**Clearify** is a feature-rich, modern task management application designed to boost productivity and streamline workflow organization. Built with cutting-edge technologies like React and Vite.js, Clearify offers an intuitive drag-and-drop interface, real-time synchronization, and responsive design that adapts seamlessly across desktop, tablet, and mobile devices. Whether you're managing personal tasks or coordinating team projects, Clearify provides the tools you need to stay organized and focused.

---

## ✨ Key Features

### 🎯 Core Functionality

- **Drag-and-Drop Task Management** - Intuitive interface for reordering tasks and organizing priorities with smooth animations
- **Real-Time Updates** - Instant synchronization across all devices using WebSocket connections
- **Firebase Authentication** - Secure user login with email/password and Google OAuth integration
- **CRUD Operations** - Complete task lifecycle management (Create, Read, Update, Delete)
- **Task Categorization** - Organize tasks by status, priority, or custom categories
- **Persistent Storage** - Cloud-based data storage ensuring tasks are never lost

### 🎨 User Experience

- **Responsive Design** - Fully optimized layout for mobile, tablet, and desktop devices
- **Modern UI/UX** - Clean, minimalist interface with smooth transitions and animations
- **Dark Mode Support** - Eye-friendly theme options for comfortable viewing
- **Interactive Components** - Dynamic task cards with hover effects and visual feedback
- **Loading States** - Skeleton screens and loading indicators for better UX
- **Toast Notifications** - Real-time feedback for user actions (success, error, info)

### 🔐 Security & Authentication

- **Firebase Auth Integration** - Industry-standard authentication and authorization
- **Protected Routes** - Route guards ensuring only authenticated users access app features
- **JWT Token Management** - Secure token storage and automatic refresh
- **Session Persistence** - Stay logged in across browser sessions
- **Password Reset** - Email-based password recovery system

### ⚡ Performance Optimizations

- **Vite.js Build Tool** - Lightning-fast Hot Module Replacement (HMR) and optimized builds
- **Code Splitting** - Lazy loading of components for faster initial load times
- **Optimized Re-renders** - React.memo and useMemo for efficient component updates
- **API Request Caching** - Axios interceptors for optimized data fetching
- **Image Optimization** - Lazy loading and compressed assets

---

## 🛠️ Technologies & Stack

### Frontend Framework

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI library for building components | ^18.x |
| **Vite.js** | Next-generation frontend build tool | ^5.x |
| **React Router** | Client-side routing and navigation | ^6.x |
| **React DnD** | Drag-and-drop functionality | ^16.x |

### Styling & UI

| Technology | Purpose | Version |
|------------|---------|---------|
| **Tailwind CSS** | Utility-first CSS framework | ^3.x |
| **PostCSS** | CSS transformation and optimization | ^8.x |
| **Autoprefixer** | CSS vendor prefixing | Latest |
| **React Icons** | Icon library for UI elements | ^5.x |

### Backend Integration

| Technology | Purpose | Version |
|------------|---------|---------|
| **Axios** | HTTP client for API requests | ^1.x |
| **Firebase** | Authentication and real-time database | ^10.x |
| **WebSocket** | Real-time bidirectional communication | Latest |

### Development Tools

| Technology | Purpose | Version |
|------------|---------|---------|
| **ESLint** | Code linting and quality checks | ^8.x |
| **Prettier** | Code formatting | Latest |
| **Vercel** | Deployment and hosting platform | Latest |

---

## 🎯 Feature Breakdown

### Task Management System

#### **Create Tasks**
- Add new tasks with title, description, and priority
- Set due dates and assign categories
- Rich text support for task descriptions
- Duplicate existing tasks for quick creation

#### **Edit & Update**
- Inline editing with auto-save functionality
- Update task status (To Do, In Progress, Completed)
- Modify priority levels (High, Medium, Low)
- Change due dates and categories

#### **Delete & Archive**
- Soft delete with undo option
- Permanent deletion after confirmation
- Archive completed tasks for reference
- Bulk delete operations

#### **Organization**
- Drag-and-drop reordering within categories
- Move tasks between different status columns
- Filter by priority, category, or due date
- Search functionality for quick task finding

### Authentication Flow

```
1. User visits Clearify
2. Redirected to Login/Register page
3. Authenticates via Firebase (Email or Google)
4. JWT token stored in localStorage
5. Redirected to Dashboard
6. Token sent with all API requests
7. Auto-refresh on token expiration
```

### Real-Time Synchronization

```
User A creates task → WebSocket → Server → Database
                         ↓
                   Broadcasts update
                         ↓
User B's dashboard updates instantly (without refresh)
```

---

## 🏗️ Project Structure

```
clearify-client/
│
├── public/
│   └── assets/              # Static images and icons
│
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Auth/           # Login, Register, PasswordReset
│   │   ├── Dashboard/      # Main dashboard layout
│   │   ├── Tasks/          # Task cards, lists, modals
│   │   ├── Shared/         # Navbar, Footer, Loading
│   │   └── DragDrop/       # Drag-and-drop components
│   │
│   ├── pages/              # Route-based page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Dashboard.jsx
│   │
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.js      # Authentication logic
│   │   ├── useTasks.js     # Task management
│   │   └── useWebSocket.js # Real-time connection
│   │
│   ├── context/            # React Context API
│   │   ├── AuthContext.jsx
│   │   └── TaskContext.jsx
│   │
│   ├── utils/              # Helper functions
│   │   ├── api.js          # Axios instance & interceptors
│   │   ├── firebase.js     # Firebase configuration
│   │   └── helpers.js      # Utility functions
│   │
│   ├── routes/             # Route configuration
│   │   ├── PrivateRoute.jsx
│   │   └── PublicRoute.jsx
│   │
│   ├── App.jsx             # Root component
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles & Tailwind
│
├── .gitignore              # Git ignore rules
├── eslint.config.js        # ESLint configuration
├── index.html              # HTML template
├── package.json            # Dependencies & scripts
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── vercel.json             # Vercel deployment config
└── vite.config.js          # Vite build configuration
```

---

## 🌟 Technical Highlights

### What Makes Clearify Special

1. **Modern React Patterns** - Hooks, Context API, and functional components for clean, maintainable code

2. **Drag-and-Drop Excellence** - Smooth, intuitive task reordering with visual feedback and animations

3. **Real-Time Architecture** - WebSocket integration ensuring instant updates without page refreshes

4. **Performance Optimized** - Vite.js for blazing-fast development and optimized production builds

5. **Responsive Excellence** - Mobile-first design adapting seamlessly to any screen size

6. **Security First** - Firebase Authentication with protected routes and secure token management

7. **Production Ready** - Deployed on Vercel with CI/CD pipeline and environment management

---

## 🎨 Design System

### Color Palette
- **Primary**: Blue shades for actions and emphasis
- **Success**: Green for completed tasks and success messages
- **Warning**: Yellow/Orange for pending tasks
- **Danger**: Red for delete actions and errors
- **Neutral**: Gray scale for backgrounds and text

### Typography
- **Headings**: Inter or Poppins (bold, modern)
- **Body**: Inter or Roboto (clean, readable)
- **Code**: Fira Code or Consolas (monospace)

### Component Library
- Custom task cards with shadow and hover effects
- Reusable buttons with loading states
- Modal dialogs with backdrop blur
- Toast notifications with auto-dismiss
- Skeleton loading screens

---

## 🔄 State Management

### Global State (Context API)
- **AuthContext** - User authentication state and methods
- **TaskContext** - Task data and CRUD operations

### Local State (useState)
- Component-specific UI states
- Form inputs and validation
- Modal visibility and loading states

### Server State (React Query - Optional)
- API data caching and synchronization
- Automatic refetching on window focus
- Optimistic updates for better UX


---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# API Configuration
VITE_API_BASE_URL=https://your-backend-api.vercel.app

# WebSocket Configuration
VITE_WS_URL=wss://your-websocket-server.com
```

---

## 🏆 Key Achievements

- **Modern Tech Stack** - Latest React 18 with Vite for optimal performance
- **Drag-and-Drop** - Intuitive task reordering with smooth animations
- **Real-Time Sync** - WebSocket integration for instant updates
- **Secure Auth** - Firebase authentication with protected routes
- **Responsive Design** - Seamless experience across all devices
- **Production Ready** - Deployed on Vercel with CI/CD pipeline
- **Clean Code** - ESLint, Prettier, and best practices followed

---

## 🎓 Learning Outcomes

This project demonstrates proficiency in:

**React Development** - Hooks, Context API, and component architecture  
**State Management** - Global and local state handling patterns  
**Authentication** - Firebase integration and protected routing  
**API Integration** - Axios for HTTP requests and WebSocket for real-time data  
**Responsive Design** - Tailwind CSS and mobile-first approach  
**Performance** - Code splitting, lazy loading, and optimization techniques  
**Deployment** - Vercel hosting and environment configuration  

---

## 🔮 Future Enhancements

- [ ] Collaborative task boards for team management
- [ ] Task comments and activity timeline
- [ ] File attachments for tasks
- [ ] Calendar view for due dates
- [ ] Email notifications and reminders
- [ ] Advanced filtering and search
- [ ] Task templates for recurring tasks
- [ ] Analytics and productivity insights
- [ ] Offline mode with service workers
- [ ] Mobile app (React Native)


---

## 🔗 Related Repositories

- **Backend API**: [practice-15-server](https://github.com/zahid-official/practice-15-server)

---

<div align="center">

### ⭐ If you find this project helpful, please consider giving it a star!

Clearify is Proudly Built by **Zahidul Islam**

[Live Demo](https://clearify-official.vercel.app) • [Backend Repository](https://github.com/zahid-official/practice-15-server)

</div>
