# Infinity AI Cloud Academy

# System Architecture

Version: 1.0

Status: Active

Last Updated: July 2026

---

# 1. Overview

Infinity AI Cloud Academy is designed as a modular SaaS platform.

The architecture separates the system into independent modules that can evolve without affecting each other.

---

# 2. High-Level Architecture

                          Users
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
   Visitors              Students             Administrators
        │                    │                    │
        ▼                    ▼                    ▼

                 Infinity AI Cloud Academy

        ┌────────────────────────────────────────────┐
        │                                            │
        │            Public Website                  │
        │                                            │
        └────────────────────────────────────────────┘
                             │
                             ▼
                  Authentication Service
                             │
                             ▼
                 Student Portal / Dashboard
                             │
                             ▼
                    Learning Management System
                             │
                             ▼
                       Admin CRM & Analytics

---

# 3. Platform Modules

## Public Website

Purpose:

Generate traffic and convert visitors into students.

Modules

- Home
- Courses
- Projects
- Resources
- Roadmaps
- About
- Contact
- Blog (Future)

---

## Student Portal

Purpose

Provide students access to learning.

Modules

- Dashboard
- My Courses
- Downloads
- Certificates
- Progress
- Projects
- Interview Preparation
- Placement
- Profile

---

## CRM

Purpose

Manage leads and admissions.

Modules

- Leads
- Demo Registrations
- Students
- Follow-ups
- Payments
- Analytics

---

## Admin Portal

Purpose

Platform management.

Modules

- Course Management
- Resource Management
- Roadmap Management
- Student Management
- CRM
- Reports
- Settings

---

## AI Platform

Purpose

Provide AI-assisted learning.

Modules

- AI Mentor
- Resume Review
- Interview Simulator
- Career Advisor
- Roadmap Generator

---

# 4. Frontend Architecture

React

↓

React Router

↓

Layouts

↓

Pages

↓

Reusable Components

↓

Services

↓

Supabase

---

# 5. Backend Architecture

Frontend

↓

Supabase Authentication

↓

Supabase Database

↓

Storage

↓

Edge Functions (Future)

↓

External APIs

---

# 6. Database Architecture

Authentication

↓

Profiles

↓

Students

↓

Courses

↓

Projects

↓

Resources

↓

Payments

↓

Certificates

↓

Analytics

---

# 7. Authentication Flow

Visitor

↓

Student Portal

↓

Phone Number

↓

WhatsApp OTP

↓

Profile Completion

↓

Student Dashboard

---

# 8. CRM Workflow

Visitor

↓

Demo Registration

↓

CRM Lead

↓

Counsellor

↓

Payment

↓

Student

↓

Placement

↓

Alumni

---

# 9. Student Journey

Discover Course

↓

Book Demo

↓

Counselling

↓

Enrollment

↓

Learning

↓

Projects

↓

Assessment

↓

Certificate

↓

Placement

↓

Alumni

---

# 10. Admin Workflow

Admin Login

↓

Dashboard

↓

Lead Management

↓

Student Management

↓

Course Management

↓

Analytics

↓

Reports

---

# 11. Technology Stack

Frontend

- React
- Vite
- Tailwind CSS
- Framer Motion

Backend

- Supabase

Database

- PostgreSQL

Authentication

Current

- Email Authentication

Future

- Phone Authentication
- WhatsApp OTP

Deployment

Current

- GitHub Pages

Future

- Vercel
- GCP Cloud Run

---

# 12. Future Services

Payment Gateway

Email Service

WhatsApp Service

AI APIs

Notification Service

Video Streaming

Live Classes

---

# 13. Scalability Strategy

The architecture follows modular design.

Each module can evolve independently.

Future modules can be added without affecting existing functionality.

Examples

- Mobile App
- Instructor Portal
- Affiliate Portal
- Corporate Training
- Multi-language Support

---

# 14. Security

Role-Based Access Control (RBAC)

Student

Trainer

Admin

Super Admin

Authentication

Authorization

Protected Routes

Activity Logs

Secure APIs

---

# 15. Deployment Architecture

Developer

↓

GitHub

↓

GitHub Actions (Future)

↓

Vercel / Cloud Run

↓

Production

↓

Users

---

# 16. Architecture Principles

Reusable Components

Reusable Services

No Duplicate Code

Component-Based Development

Service-Oriented Business Logic

Modular Folder Structure

Scalable Database Design

Documentation Driven Development

---

# Architecture Statement

Infinity AI Cloud Academy is designed as a scalable SaaS learning platform capable of supporting public users, students, trainers, counsellors, and administrators while maintaining clean architecture, reusable components, and modular development.