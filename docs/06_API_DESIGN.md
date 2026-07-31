# Infinity AI Cloud Academy

# API Design

Version: 1.0

Status: Active

Backend

Supabase

Future

REST + Edge Functions

---

# Purpose

This document defines every service exposed by the platform.

The frontend should never directly access business logic.

Pages

↓

Services

↓

Supabase / APIs

---

# API Architecture

React Pages

↓

Business Services

↓

Supabase

↓

Database

---

# Authentication

## Login

POST

/auth/login

Purpose

Authenticate user.

---

## Logout

POST

/auth/logout

---

## Register

POST

/auth/register

---

## Phone Login

POST

/auth/phone

Future

---

## Verify OTP

POST

/auth/verify-otp

Future

---

## Refresh Session

GET

/auth/session

---

# Profile

GET

/profile

Update Profile

PUT

/profile

Complete Profile

POST

/profile/complete

---

# Courses

GET

/courses

Returns all courses.

---

GET

/courses/:slug

Returns course details.

---

POST

/courses

Admin

---

PUT

/courses/:id

Admin

---

DELETE

/courses/:id

Admin

---

# Course Modules

GET

/course-modules

GET

/course-modules/:id

POST

/course-modules

PUT

/course-modules

DELETE

/course-modules

---

# Lessons

GET

/course-lessons

POST

/course-lessons

PUT

/course-lessons

DELETE

/course-lessons

---

# Student

GET

/student/dashboard

GET

/student/profile

GET

/student/courses

GET

/student/certificates

GET

/student/downloads

GET

/student/progress

---

# Projects

GET

/projects

GET

/projects/:slug

POST

/projects

PUT

/projects

DELETE

/projects

---

# Resources

GET

/resources

GET

/resources/:slug

POST

/resources

PUT

/resources

DELETE

/resources

---

# Roadmaps

GET

/roadmaps

GET

/roadmaps/:slug

POST

/roadmaps

PUT

/roadmaps

DELETE

/roadmaps

---

# CRM

GET

/leads

GET

/leads/:id

POST

/leads

PUT

/leads/:id

DELETE

/leads/:id

---

# Demo Registration

POST

/demo-registration

GET

/demo-registration

PUT

/demo-registration/:id

DELETE

/demo-registration/:id

---

# Payments

GET

/payments

POST

/payments

PUT

/payments

Refund

POST

/payments/refund

Future

---

# Notifications

GET

/notifications

PUT

/notifications/read

DELETE

/notifications

---

# Certificates

GET

/certificates

POST

/certificates

---

# Placement

GET

/jobs

GET

/companies

POST

/applications

GET

/interviews

---

# AI

POST

/ai/mentor

POST

/ai/resume-review

POST

/ai/interview

POST

/ai/roadmap

---

# Analytics

GET

/dashboard

GET

/course-analytics

GET

/student-analytics

GET

/crm-analytics

---

# Admin

GET

/admin/dashboard

GET

/admin/users

GET

/admin/settings

PUT

/admin/settings

---

# Response Format

Success

{
  "success": true,
  "data": {}
}

---

Error

{
  "success": false,
  "message": "Error message"
}

---

# API Versioning

Current

v1

Future

v2

v3

---

# Security

Authentication Required

Student APIs

Admin APIs

Protected Routes

Role Validation

Rate Limiting

Activity Logging

---

# Future Integrations

Razorpay

WhatsApp

Google Drive

YouTube

GitHub

Google Calendar

Zoom

OpenAI

---

# API Statement

All business operations must be performed through Services.

Pages should never directly interact with Supabase or external APIs.