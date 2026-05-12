# FlexiZen – Digital Yoga Registration & Scheduling System

FlexiZen is a full-stack web application designed for yoga studios to manage classes, bookings, and enquiries digitally. It provides a seamless experience for users to browse and book classes, and a powerful admin panel for studio operations.

## 🚀 Tech Stack

### Backend
- **Java 21**
- **Spring Web MVC 6.x** (Plain Framework, XML Config)
- **Spring Security 6.x** (Session-based)
- **Hibernate / JPA 6.x** (EntityManager)
- **PostgreSQL 15+**
- **Maven** (Build Tool)
- **Jackson** (JSON)

### Frontend
- **React 18**
- **Vite** (Build Tool)
- **Tailwind CSS** (Styling)
- **Axios** (HTTP Client)
- **React Router 6**

## 📂 Project Structure

```
flexizen/
├── backend/            # Spring MVC Backend (Maven)
├── frontend/           # React Frontend (Vite)
├── docs/               # SRS, DB SQL, and Status Reports
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites
- JDK 21+
- Node.js 20+
- PostgreSQL 15+
- Apache Tomcat 10+ (for deployment)

### 1. Database Setup
1. Create a database named `flexizen` in PostgreSQL.
2. Execute the initialization script found in `docs/db-init.sql`.
3. Update `backend/src/main/webapp/WEB-INF/spring-config.xml` with your DB credentials.

### 2. Backend Setup
1. Navigate to `backend/`.
2. Build the project:
   ```bash
   mvn clean package -DskipTests
   ```
3. Deploy the generated `target/flexizen.war` to your Tomcat server.

### 3. Frontend Setup
1. Navigate to `frontend/`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update `frontend/src/api/axiosInstance.js` with your backend API URL.
4. Run development server:
   ```bash
   npm run dev
   ```
5. Or build for production:
   ```bash
   npm run build
   ```

## 🔑 Default Credentials
- **Admin Username:** `admin`
- **Admin Password:** `Admin@123` (Hashed with BCrypt in DB)

## ✅ Features Implemented (Phases 1-9)
- **Phase 1-2:** Core architecture and DB mapping.
- **Phase 3:** Secure Session-based Authentication.
- **Phase 4:** Admin Class Management & Dashboard.
- **Phase 5:** User Class Browsing & Booking.
- **Phase 6:** Admin Booking Approval/Cancellation & Enquiry Management.
- **Phase 7:** Advanced Reports with Date Range Filtering.
- **Phase 8:** Global Exception Handling & Service Unit Tests.
- **Phase 9:** Production Build & Deployment Prep.

---
*Developed as part of the FlexiZen v1.0 release.*
