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
    username    VARCHAR(50)  NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,
    name        VARCHAR(100) NOT NULL,
    email       VARCHAR(100) NOT NULL,
    phone       VARCHAR(15),
    created_at  TIMESTAMP DEFAULT NOW()
);

-- yoga_class
CREATE TABLE IF NOT EXISTS yoga_class (
    id                SERIAL PRIMARY KEY,
    name              VARCHAR(100)    NOT NULL,
    description       TEXT,
    duration_minutes  INT             NOT NULL,
    schedule          VARCHAR(100)    NOT NULL,
    capacity          INT             NOT NULL,
    fee               DECIMAL(10, 2)  NOT NULL,
    created_at        TIMESTAMP DEFAULT NOW()
);

-- booking
CREATE TABLE IF NOT EXISTS booking (
    id              SERIAL PRIMARY KEY,
    booking_number  VARCHAR(20)  NOT NULL UNIQUE,
    user_name       VARCHAR(100) NOT NULL,
    user_email      VARCHAR(100) NOT NULL,
    user_phone      VARCHAR(15)  NOT NULL,
    class_id        INT          NOT NULL REFERENCES yoga_class(id),
    preferred_date  DATE         NOT NULL,
    status          VARCHAR(20)  NOT NULL DEFAULT 'PENDING',
    remark          TEXT,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- enquiry
CREATE TABLE IF NOT EXISTS enquiry (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    email       VARCHAR(100) NOT NULL,
    phone       VARCHAR(15),
    message     TEXT         NOT NULL,
    is_read     BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMP DEFAULT NOW()
);

-- page
CREATE TABLE IF NOT EXISTS page (
    id          SERIAL PRIMARY KEY,
    page_type   VARCHAR(20) NOT NULL UNIQUE,
    content     TEXT        NOT NULL,
    updated_at  TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- Step 3: Seed data (run AFTER first startup)
-- =============================================

-- Admin account (password: admin123 — BCrypt hash)
INSERT INTO admin (username, password, name, email, phone, created_at)
VALUES (
    'admin',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    'FlexiZen Admin',
    'admin@flexizen.com',
    '9876543210',
    NOW()
) ON CONFLICT (username) DO NOTHING;

-- CMS Pages
INSERT INTO page (page_type, content, updated_at)
VALUES ('ABOUT_US', 'Welcome to FlexiZen – your digital yoga studio. We offer a variety of yoga classes for all levels.', NOW())
ON CONFLICT (page_type) DO NOTHING;

INSERT INTO page (page_type, content, updated_at)
VALUES ('CONTACT_US', 'Email: info@flexizen.com | Phone: +91-9876543210 | Address: 123 Yoga Lane, Pune, Maharashtra', NOW())
ON CONFLICT (page_type) DO NOTHING;
