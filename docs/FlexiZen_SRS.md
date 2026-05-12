# Software Requirements Specification (SRS)
# FlexiZen – Digital Yoga Registration & Scheduling System

**Version:** 1.0  
**Date:** May 2026  
**Status:** Draft

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Overall Description](#2-overall-description)
3. [Tech Stack](#3-tech-stack)
4. [Folder Structure](#4-folder-structure)
5. [System Features & Requirements](#5-system-features--requirements)
6. [Non-Functional Requirements](#6-non-functional-requirements)
7. [Database Design](#7-database-design)
8. [API Endpoints](#8-api-endpoints)
9. [Development Phases](#9-development-phases)
10. [Constraints & Assumptions](#10-constraints--assumptions)

---

## 1. Introduction

### 1.1 Purpose
This document describes the complete software requirements for **FlexiZen**, a Digital Yoga Registration and Scheduling System. It covers functional requirements, non-functional requirements, system architecture, tech stack, folder structure, and a phased development plan.

### 1.2 Project Overview
FlexiZen is a web-based application that allows a yoga studio to manage its classes, bookings, and enquiries digitally. It eliminates manual paper-based booking by providing an online portal for users to browse and book yoga classes, and a dedicated admin panel to manage all operations.

### 1.3 Scope
The system consists of two modules:
- **Admin Module** – Manage classes, bookings, enquiries, reports, and profile.
- **User Module** – Browse classes, book sessions, and submit enquiries (no registration required).

### 1.4 Definitions & Acronyms

| Term | Description |
|---|---|
| SRS | Software Requirements Specification |
| MVC | Model-View-Controller |
| JPA | Java Persistence API |
| ORM | Object Relational Mapping |
| DAO | Data Access Object |
| BCrypt | Password hashing algorithm |
| CORS | Cross-Origin Resource Sharing |
| WAR | Web Application Archive |
| DDL | Data Definition Language |

---

## 2. Overall Description

### 2.1 System Perspective
FlexiZen is a full-stack web application with:
- A **Spring MVC** REST backend (deployed as WAR on Apache Tomcat)
- A **React + Vite** frontend (served separately)
- A **PostgreSQL** database managed via Hibernate/JPA using `EntityManager`
- **Session-based authentication** using Spring Security

### 2.2 User Classes

| User | Description |
|---|---|
| Admin | Single admin who manages the entire system. Must log in with credentials. |
| User | Any visitor to the website. No registration required. Can browse and book classes. |

### 2.3 Operating Environment
- **Backend:** Java JDK 21, Apache Tomcat 10+
- **Frontend:** Any modern browser (Chrome, Firefox, Edge)
- **Database:** PostgreSQL 15+
- **OS:** Windows / Linux / macOS (development), Linux (deployment)

### 2.4 Design & Implementation Constraints
- No Spring Boot — plain Spring Framework only
- XML-based configuration only (no Java-based `@Configuration`)
- No DTO layer — models used directly
- No database migration tools
- Session-based auth — no JWT
- `EntityManager` used directly in all DAO implementations

---

## 3. Tech Stack

### 3.1 Backend

| Layer | Technology | Version |
|---|---|---|
| Language | Java | JDK 21 |
| Framework | Spring Web MVC | 6.x |
| Security | Spring Security | 6.x |
| ORM | Hibernate / JPA | 6.x |
| Database Driver | PostgreSQL JDBC | 42.x |
| Build Tool | Maven | 3.x |
| Password Hashing | BCrypt (Spring Security Crypto) | 6.x |
| JSON Serialization | Jackson | 2.x |
| Server | Apache Tomcat | 10.x |

### 3.2 Frontend

| Layer | Technology | Version |
|---|---|---|
| Library | React | 18.x |
| Build Tool | Vite | 5.x |
| CSS Framework | Tailwind CSS | 3.x |
| HTTP Client | Axios | 1.x |
| Routing | React Router DOM | 6.x |
| State Management | React Context API | — |

### 3.3 Database

| Technology | Version |
|---|---|
| PostgreSQL | 15+ |

### 3.4 Version Control

| Technology | Platform |
|---|---|
| Git | GitHub |

---

## 4. Folder Structure

### 4.1 Backend Structure

```
flexizen/
└── backend/
    ├── src/
    │   ├── main/
    │   │   ├── java/com/flexizen/
    │   │   │   │
    │   │   │   ├── controller/
    │   │   │   │   ├── AuthController.java         # login, logout, session check
    │   │   │   │   ├── AdminController.java        # admin profile, password change
    │   │   │   │   ├── ClassController.java        # yoga class CRUD
    │   │   │   │   ├── BookingController.java      # booking management
    │   │   │   │   ├── EnquiryController.java      # enquiry management
    │   │   │   │   └── PageController.java         # about us, contact us content
    │   │   │   │
    │   │   │   ├── model/
    │   │   │   │   ├── Admin.java                  # @Entity
    │   │   │   │   ├── YogaClass.java              # @Entity
    │   │   │   │   ├── Booking.java                # @Entity
    │   │   │   │   ├── Enquiry.java                # @Entity
    │   │   │   │   └── Page.java                   # @Entity
    │   │   │   │
    │   │   │   ├── dao/
    │   │   │   │   ├── AdminDao.java               # interface
    │   │   │   │   ├── ClassDao.java               # interface
    │   │   │   │   ├── BookingDao.java             # interface
    │   │   │   │   ├── EnquiryDao.java             # interface
    │   │   │   │   └── PageDao.java                # interface
    │   │   │   │
    │   │   │   ├── dao/impl/
    │   │   │   │   ├── AdminDaoImpl.java           # EntityManager based
    │   │   │   │   ├── ClassDaoImpl.java
    │   │   │   │   ├── BookingDaoImpl.java
    │   │   │   │   ├── EnquiryDaoImpl.java
    │   │   │   │   └── PageDaoImpl.java
    │   │   │   │
    │   │   │   ├── service/
    │   │   │   │   ├── AuthService.java            # interface
    │   │   │   │   ├── AdminService.java           # interface
    │   │   │   │   ├── ClassService.java           # interface
    │   │   │   │   ├── BookingService.java         # interface
    │   │   │   │   ├── EnquiryService.java         # interface
    │   │   │   │   └── PageService.java            # interface
    │   │   │   │
    │   │   │   ├── service/impl/
    │   │   │   │   ├── AuthServiceImpl.java
    │   │   │   │   ├── AdminServiceImpl.java
    │   │   │   │   ├── ClassServiceImpl.java
    │   │   │   │   ├── BookingServiceImpl.java
    │   │   │   │   ├── EnquiryServiceImpl.java
    │   │   │   │   └── PageServiceImpl.java
    │   │   │   │
    │   │   │   ├── exception/
    │   │   │   │   ├── GlobalExceptionHandler.java # @ControllerAdvice
    │   │   │   │   ├── ResourceNotFoundException.java
    │   │   │   │   └── UnauthorizedException.java
    │   │   │   │
    │   │   │   └── util/
    │   │   │       ├── PasswordUtil.java           # BCrypt helper
    │   │   │       └── ApiResponse.java            # { status, message, data } wrapper
    │   │   │
    │   │   └── webapp/
    │   │       └── WEB-INF/
    │   │           ├── web.xml                     # DispatcherServlet, session config
    │   │           ├── spring-config.xml           # DataSource, EntityManagerFactory, TransactionManager
    │   │           ├── spring-security.xml         # session-based security, BCrypt bean
    │   │           └── spring-mvc.xml              # CORS, Jackson, annotation-driven MVC
    │   │
    │   └── test/
    │       └── java/com/flexizen/
    │           ├── service/
    │           │   ├── ClassServiceTest.java
    │           │   └── BookingServiceTest.java
    │           └── dao/
    │               └── BookingDaoTest.java
    │
    └── pom.xml
```

### 4.2 Frontend Structure

```
flexizen/
└── frontend/
    ├── public/
    ├── src/
    │   ├── main.jsx
    │   ├── App.jsx
    │   │
    │   ├── api/
    │   │   ├── axiosInstance.js        # baseURL + withCredentials: true
    │   │   ├── authApi.js
    │   │   ├── classApi.js
    │   │   ├── bookingApi.js
    │   │   └── enquiryApi.js
    │   │
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── ClassCard.jsx
    │   │   ├── BookingTable.jsx
    │   │   └── ProtectedRoute.jsx      # guards admin routes
    │   │
    │   ├── pages/
    │   │   ├── user/
    │   │   │   ├── Home.jsx
    │   │   │   ├── Classes.jsx
    │   │   │   ├── ClassDetail.jsx
    │   │   │   ├── BookClass.jsx
    │   │   │   ├── AboutUs.jsx
    │   │   │   └── ContactUs.jsx
    │   │   └── admin/
    │   │       ├── Login.jsx
    │   │       ├── Dashboard.jsx
    │   │       ├── ManageClasses.jsx
    │   │       ├── ManageBookings.jsx
    │   │       ├── ManageEnquiries.jsx
    │   │       ├── Reports.jsx
    │   │       ├── SearchBooking.jsx
    │   │       └── Profile.jsx
    │   │
    │   ├── context/
    │   │   └── AuthContext.jsx         # session state (isLoggedIn, admin info)
    │   │
    │   ├── hooks/
    │   │   └── useAuth.js              # custom hook for AuthContext
    │   │
    │   └── utils/
    │       └── formatDate.js
    │
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

### 4.3 Root Structure

```
flexizen/
├── backend/
├── frontend/
├── .gitignore
└── README.md
```

---

## 5. System Features & Requirements

### 5.1 Authentication Module

#### FR-AUTH-01: Admin Login
- Admin enters username and password
- System validates credentials using BCrypt
- On success, a server-side session is created
- On failure, error message is returned

#### FR-AUTH-02: Admin Logout
- Session is invalidated on logout
- Admin is redirected to login page

#### FR-AUTH-03: Session Check
- Frontend checks session status on app load
- Unauthenticated access to admin routes redirects to login

---

### 5.2 Admin Module

#### FR-ADMIN-01: View Dashboard
- Total new bookings
- Total approved bookings
- Total cancelled bookings
- Total bookings
- Total read enquiries
- Total unread enquiries
- Total enquiries
- Total classes

#### FR-ADMIN-02: Manage Profile
- Admin can update name, email, phone
- Admin can change password (old password verified before update)

#### FR-ADMIN-03: Manage Classes
- Add a new yoga class (name, description, duration, schedule, capacity, fee)
- Update existing class details
- Delete a class
- View list of all classes

#### FR-ADMIN-04: Manage Bookings
- View new (pending) bookings
- Approve a booking with optional remark
- Cancel a booking with optional remark
- View approved bookings
- View cancelled bookings

#### FR-ADMIN-05: Manage Enquiries
- View all enquiries (read / unread)
- Mark enquiry as read
- Delete enquiry

#### FR-ADMIN-06: Reports
- View bookings filtered by date range
- View enquiry details filtered by date range

#### FR-ADMIN-07: Search Booking
- Search for a booking using booking number
- Display full booking details

#### FR-ADMIN-08: Manage Pages
- Update About Us page content
- Update Contact Us page content

---

### 5.3 User Module

#### FR-USER-01: Home Page
- Display welcome banner and overview of FlexiZen
- Display featured/upcoming classes

#### FR-USER-02: Browse Classes
- View list of all available yoga classes
- View details of a specific class (description, schedule, duration, fee)

#### FR-USER-03: Book a Class
- User fills booking form (name, email, phone, preferred date)
- System generates a unique booking number
- Booking is saved with status "Pending"
- Booking number is shown to the user for future reference

#### FR-USER-04: About Us
- Display static about us content (managed by admin)

#### FR-USER-05: Contact Us
- Display contact details (managed by admin)
- User can submit an enquiry (name, email, phone, message)

---

## 6. Non-Functional Requirements

### 6.1 Security
- All admin routes protected by Spring Security session filter
- Passwords stored using BCrypt hashing (never plain text)
- CORS configured to allow only the React frontend origin
- Session timeout configured in `web.xml`
- CSRF protection handled by Spring Security

### 6.2 Performance
- Page load time under 3 seconds for all user-facing pages
- Admin dashboard loads within 2 seconds
- Database queries optimized using JPQL with indexed columns

### 6.3 Usability
- Responsive UI using Tailwind CSS
- Clear error messages for all form validations
- Consistent API response format using `ApiResponse` wrapper

### 6.4 Maintainability
- Strict separation of layers: Controller → Service → DAO → Model
- Interface-based DAO and Service layers for easy swapping
- All XML configurations clearly commented

### 6.5 Scalability
- Email notifications planned for future version
- Architecture supports adding new modules without restructuring

---

## 7. Database Design

### 7.1 Tables

#### admin
| Column | Type | Constraints |
|---|---|---|
| id | SERIAL | PRIMARY KEY |
| username | VARCHAR(50) | NOT NULL, UNIQUE |
| password | VARCHAR(255) | NOT NULL (BCrypt) |
| name | VARCHAR(100) | NOT NULL |
| email | VARCHAR(100) | NOT NULL |
| phone | VARCHAR(15) | |
| created_at | TIMESTAMP | DEFAULT NOW() |

#### yoga_class
| Column | Type | Constraints |
|---|---|---|
| id | SERIAL | PRIMARY KEY |
| name | VARCHAR(100) | NOT NULL |
| description | TEXT | |
| duration_minutes | INT | NOT NULL |
| schedule | VARCHAR(100) | NOT NULL |
| capacity | INT | NOT NULL |
| fee | DECIMAL(10,2) | NOT NULL |
| created_at | TIMESTAMP | DEFAULT NOW() |

#### booking
| Column | Type | Constraints |
|---|---|---|
| id | SERIAL | PRIMARY KEY |
| booking_number | VARCHAR(20) | NOT NULL, UNIQUE |
| user_name | VARCHAR(100) | NOT NULL |
| user_email | VARCHAR(100) | NOT NULL |
| user_phone | VARCHAR(15) | NOT NULL |
| class_id | INT | FOREIGN KEY → yoga_class(id) |
| preferred_date | DATE | NOT NULL |
| status | VARCHAR(20) | DEFAULT 'PENDING' |
| remark | TEXT | |
| created_at | TIMESTAMP | DEFAULT NOW() |

#### enquiry
| Column | Type | Constraints |
|---|---|---|
| id | SERIAL | PRIMARY KEY |
| name | VARCHAR(100) | NOT NULL |
| email | VARCHAR(100) | NOT NULL |
| phone | VARCHAR(15) | |
| message | TEXT | NOT NULL |
| is_read | BOOLEAN | DEFAULT FALSE |
| created_at | TIMESTAMP | DEFAULT NOW() |

#### page
| Column | Type | Constraints |
|---|---|---|
| id | SERIAL | PRIMARY KEY |
| page_type | VARCHAR(20) | NOT NULL (ABOUT_US / CONTACT_US) |
| content | TEXT | NOT NULL |
| updated_at | TIMESTAMP | DEFAULT NOW() |

---

## 8. API Endpoints

### 8.1 Auth

| Method | URL | Access | Description |
|---|---|---|---|
| POST | `/api/auth/login` | Public | Admin login |
| POST | `/api/auth/logout` | Admin | Admin logout |
| GET | `/api/auth/session` | Public | Check session status |

### 8.2 Admin

| Method | URL | Access | Description |
|---|---|---|---|
| GET | `/api/admin/profile` | Admin | Get admin profile |
| PUT | `/api/admin/profile` | Admin | Update admin profile |
| PUT | `/api/admin/change-password` | Admin | Change password |

### 8.3 Dashboard

| Method | URL | Access | Description |
|---|---|---|---|
| GET | `/api/admin/dashboard` | Admin | Get all dashboard counts |

### 8.4 Classes

| Method | URL | Access | Description |
|---|---|---|---|
| GET | `/api/classes` | Public | Get all classes |
| GET | `/api/classes/{id}` | Public | Get class by ID |
| POST | `/api/classes` | Admin | Add new class |
| PUT | `/api/classes/{id}` | Admin | Update class |
| DELETE | `/api/classes/{id}` | Admin | Delete class |

### 8.5 Bookings

| Method | URL | Access | Description |
|---|---|---|---|
| POST | `/api/bookings` | Public | Create new booking |
| GET | `/api/bookings` | Admin | Get all bookings |
| GET | `/api/bookings/status/{status}` | Admin | Get bookings by status |
| GET | `/api/bookings/search/{bookingNumber}` | Admin | Search by booking number |
| PUT | `/api/bookings/{id}/approve` | Admin | Approve booking |
| PUT | `/api/bookings/{id}/cancel` | Admin | Cancel booking |

### 8.6 Enquiries

| Method | URL | Access | Description |
|---|---|---|---|
| POST | `/api/enquiries` | Public | Submit enquiry |
| GET | `/api/enquiries` | Admin | Get all enquiries |
| PUT | `/api/enquiries/{id}/read` | Admin | Mark as read |
| DELETE | `/api/enquiries/{id}` | Admin | Delete enquiry |

### 8.7 Reports

| Method | URL | Access | Description |
|---|---|---|---|
| GET | `/api/reports/bookings` | Admin | Bookings by date range |
| GET | `/api/reports/enquiries` | Admin | Enquiries by date range |

### 8.8 Pages

| Method | URL | Access | Description |
|---|---|---|---|
| GET | `/api/pages/{type}` | Public | Get page content |
| PUT | `/api/pages/{type}` | Admin | Update page content |

---

## 9. Development Phases

### Phase 1 — Project Setup & Configuration
**Goal:** Get a running skeleton with DB connection verified.

- Create Maven web project structure
- Write `pom.xml` with all dependencies
- Configure `web.xml` (DispatcherServlet, session timeout)
- Configure `spring-config.xml` (DataSource, EntityManagerFactory, TransactionManager)
- Configure `spring-mvc.xml` (CORS, Jackson, annotation-driven)
- Configure `spring-security.xml` (login URL, protected routes, BCrypt bean
?=- Set up PostgreSQL database
- Set up React + Vite + Tailwind
- Configure `axiosInstance.js` with `withCredentials: true`

**Deliverable:** Backend starts on Tomcat, frontend starts on Vite dev server, DB connection verified.  
**Estimated Effort:** 1–2 days

---

### Phase 2 — Database & Model Layer
**Goal:** All entities mapped and tables created by Hibernate.

- Design all tables in PostgreSQL
- Write `Admin.java`, `YogaClass.java`, `Booking.java`, `Enquiry.java`, `Page.java` with JPA annotations
- Set `hibernate.hbm2ddl.auto=update` to auto-create tables
- Verify tables in PostgreSQL

**Deliverable:** All tables created in the database.  
**Estimated Effort:** 1 day

---

### Phase 3 — Authentication (Session Based)
**Goal:** Admin can log in and out; routes are protected.

- `AdminDao` interface + `AdminDaoImpl` (find by username via EntityManager)
- `AuthService` interface + `AuthServiceImpl` (validate credentials, BCrypt check)
- `AuthController` (login, logout, session check endpoints)
- `spring-security.xml` finalized (session management, protected route patterns)
- Frontend: Login page, `AuthContext.jsx`, `ProtectedRoute.jsx`, `useAuth.js`

**Deliverable:** Admin login/logout working end-to-end with session.  
**Estimated Effort:** 2–3 days

---

### Phase 4 — Core Admin Features
**Goal:** Admin can manage classes and view dashboard.

- `ClassDao` + `ClassDaoImpl` (CRUD via EntityManager)
- `ClassService` + `ClassServiceImpl`
- `ClassController` (add, update, delete, list endpoints)
- `AdminDao` + `AdminDaoImpl` (update profile, change password)
- `AdminService` + `AdminServiceImpl`
- `AdminController` (profile, password endpoints)
- Dashboard counts query in service layer
- Frontend: ManageClasses, Dashboard, Profile pages

**Deliverable:** Admin can manage classes and view dashboard stats.  
**Estimated Effort:** 3–4 days

---

### Phase 5 — User-Facing Features
**Goal:** Users can browse classes and submit bookings and enquiries.

- `BookingDao` + `BookingDaoImpl` (save booking, generate booking number)
- `BookingService` + `BookingServiceImpl`
- `BookingController` (create booking endpoint)
- `EnquiryDao` + `EnquiryDaoImpl`
- `EnquiryService` + `EnquiryServiceImpl`
- `EnquiryController` (submit enquiry endpoint)
- `PageDao` + `PageDaoImpl` (fetch page content)
- `PageService` + `PageServiceImpl`
- `PageController`
- Frontend: Home, Classes, ClassDetail, BookClass, ContactUs, AboutUs pages

**Deliverable:** User can browse, book classes, and submit enquiries.  
**Estimated Effort:** 2–3 days

---

### Phase 6 — Booking & Enquiry Management (Admin)
**Goal:** Admin can fully manage bookings and enquiries.

- Extended `BookingDaoImpl` (list by status, search by booking number)
- Extended `BookingController` (approve, cancel, list by status, search)
- Extended `EnquiryDaoImpl` (mark as read, delete, list all)
- Extended `EnquiryController` (mark read, delete, list)
- Frontend: ManageBookings, ManageEnquiries, SearchBooking pages

**Deliverable:** Admin can approve/cancel bookings and manage enquiries.  
**Estimated Effort:** 3–4 days

---

### Phase 7 — Reports
**Goal:** Admin can view filtered reports.

- Report queries in `BookingDaoImpl` and `EnquiryDaoImpl` (date range filter using JPQL)
- Report endpoints in controllers
- Frontend: Reports page with date range picker

**Deliverable:** Admin can generate booking and enquiry reports by date range.  
**Estimated Effort:** 1–2 days

---

### Phase 8 — Exception Handling & Testing
**Goal:** Robust error handling and basic test coverage.

- `GlobalExceptionHandler.java` — handle `ResourceNotFoundException`, `UnauthorizedException`, generic exceptions
- `ResourceNotFoundException.java` and `UnauthorizedException.java`
- `ApiResponse.java` wrapper used consistently in all controllers
- JUnit 5 + Mockito tests for `ClassServiceTest`, `BookingServiceTest`
- API testing with Postman (all endpoints)
- Frontend: loading states, error messages, empty states

**Deliverable:** All errors handled gracefully; core services have unit tests.  
**Estimated Effort:** 2–3 days

---

### Phase 9 — Deployment
**Goal:** Application live and accessible.

- Build backend as WAR (`mvn clean package`)
- Deploy WAR on Apache Tomcat
- Build frontend (`npm run build`)
- Deploy frontend on Vercel or Netlify
- Verify session works across origins (CORS + credentials)
- Write `README.md` with setup instructions

**Deliverable:** FlexiZen live and fully functional.  
**Estimated Effort:** 1–2 days

---

### Phase Summary

| Phase | Focus | Effort |
|---|---|---|
| 1 | Project Setup & Configuration | 1–2 days |
| 2 | Database & Model Layer | 1 day |
| 3 | Authentication | 2–3 days |
| 4 | Core Admin Features | 3–4 days |
| 5 | User-Facing Features | 2–3 days |
| 6 | Booking & Enquiry Management | 3–4 days |
| 7 | Reports | 1–2 days |
| 8 | Exception Handling & Testing | 2–3 days |
| 9 | Deployment | 1–2 days |
| **Total** | | **16–24 days** |

---

## 10. Constraints & Assumptions

### 10.1 Constraints
- Plain Spring Framework only — no Spring Boot
- XML-based configuration only — no Java `@Configuration` classes
- No DTO layer — model objects used directly
- No database migration tools (Flyway/Liquibase)
- Email/notification features deferred to future version
- Single admin user (no multi-admin support in v1)
- `EntityManager` used directly in all DAOs — no Spring Data JPA repositories

### 10.2 Assumptions
- PostgreSQL is installed and accessible during development
- Apache Tomcat 10+ is available for backend deployment
- Admin account is seeded manually in the database for v1
- Users do not need to register — bookings are made with name, email, and phone only
- Booking number is system-generated (e.g., `FZ-20260001`)

### 10.3 Future Enhancements (v2)
- Email confirmation on booking and enquiry submission
- In-app notifications for admin on new bookings/enquiries
- Multi-admin support with roles
- User registration and login
- Online payment integration (Razorpay / Stripe)
- Calendar view for class schedules
- PDF receipt generation for bookings

---

*End of SRS Document — FlexiZen v1.0*
