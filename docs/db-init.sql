-- =============================================
-- FlexiZen Database Setup Script
-- Run this in PostgreSQL before first startup.
-- =============================================

-- Step 1: Create the database
CREATE DATABASE flexizen;

-- Step 2: Connect to the database
\c flexizen;

-- =============================================
-- NOTE: Hibernate will auto-create all tables
-- on first startup (hbm2ddl.auto=update).
-- The DDL below is for reference only.
-- =============================================

-- admin
CREATE TABLE IF NOT EXISTS admin (
    id          SERIAL PRIMARY KEY,
    username    VARCHAR(50) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,
    name        VARCHAR(100) NOT NULL,
    email       VARCHAR(100) NOT NULL,
    phone       VARCHAR(20),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- yoga_class
CREATE TABLE IF NOT EXISTS yoga_class (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    description TEXT,
    duration_minutes INT NOT NULL,
    schedule    VARCHAR(100),
    capacity    INT NOT NULL,
    fee         DECIMAL(10,2) NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- booking
CREATE TABLE IF NOT EXISTS booking (
    id              SERIAL PRIMARY KEY,
    booking_number  VARCHAR(20) NOT NULL UNIQUE,
    customer_name   VARCHAR(100) NOT NULL,
    customer_email  VARCHAR(100) NOT NULL,
    customer_phone  VARCHAR(15) NOT NULL,
    class_id        INT REFERENCES yoga_class(id),
    status          VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- enquiry
CREATE TABLE IF NOT EXISTS enquiry (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    email       VARCHAR(100) NOT NULL,
    subject     VARCHAR(200),
    message     TEXT NOT NULL,
    is_read     BOOLEAN DEFAULT FALSE,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- page
CREATE TABLE IF NOT EXISTS page (
    id          SERIAL PRIMARY KEY,
    type        VARCHAR(20) NOT NULL UNIQUE,
    title       VARCHAR(100) NOT NULL,
    content     TEXT NOT NULL,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- Seed Data
-- =============================================

-- Default Admin: admin / admin123
INSERT INTO admin (username, password, name, email) 
VALUES ('admin', '$2a$10$hKDVYxLefVLYWtpzSSeG7.Z8ZwwGzxe7C/pUXWrbJck35G.S6W1mS', 'System Admin', 'admin@flexizen.com');

-- Initial CMS Pages
INSERT INTO page (type, title, content) VALUES 
('ABOUT', 'About FlexiZen', 'Welcome to FlexiZen Yoga Studio. We provide a peaceful space for your physical and mental transformation.'),
('CONTACT', 'Contact Us', 'We are located in the heart of Serenity City. Reach out to us for any queries.');
