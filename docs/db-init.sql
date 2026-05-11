-- =============================================
-- FlexiZen Database Setup Script
-- Run this in PostgreSQL to create the database
-- and seed the initial admin account.
-- =============================================

-- Step 1: Create the database (run as superuser)
-- If the database already exists, skip this step.
CREATE DATABASE flexizen;

-- Step 2: Connect to the flexizen database
-- \c flexizen

-- Step 3: Seed the admin account
-- Password: admin123 (BCrypt hashed)
-- Hibernate will auto-create the tables on first startup (hbm2ddl.auto=update),
-- so run this INSERT *after* the first successful application startup.

-- INSERT INTO admin (username, password, name, email, phone, created_at)
-- VALUES (
--     'admin',
--     '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
--     'FlexiZen Admin',
--     'admin@flexizen.com',
--     '9876543210',
--     NOW()
-- );

-- Step 4: Seed initial pages (About Us & Contact Us)
-- Run this *after* the first successful application startup.

-- INSERT INTO page (page_type, content, updated_at)
-- VALUES ('ABOUT_US', 'Welcome to FlexiZen – your digital yoga studio.', NOW());

-- INSERT INTO page (page_type, content, updated_at)
-- VALUES ('CONTACT_US', 'Email: info@flexizen.com | Phone: +91-9876543210', NOW());
