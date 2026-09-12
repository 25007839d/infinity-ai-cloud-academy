# Infinity AI Cloud Academy

# Database Design

Version: 1.0

Status: Active

Database

MySQL (Hostinger)

---

# Purpose

This document defines the database schema used across the platform.

The database is designed using modular architecture.

Each module owns its own tables.

---

# Database Modules

Authentication

↓

Students

↓

Courses

↓

Projects

↓

Resources

↓

CRM

↓

Payments

↓

Analytics

↓

AI

---

# Entity Relationship Diagram (High Level)

profiles
    │
    ├──────────────┐
    │              │
students      crm_leads
    │              │
    │              │
course_enrollments
    │
courses
    │
course_modules
    │
course_lessons

---

# Authentication

Table

profiles

Purpose

Stores authenticated user information.

Columns

id

phone

email

full_name

role

status

created_at

updated_at

---

# Students

Table

students

Purpose

Student profile.

Columns

id

profile_id

experience

company

education

linkedin

github

resume_url

profile_completed

---

# Courses

Table

courses

Columns

id

slug

title

category

level

duration

price

rating

description

status

created_at

---

# Course Modules

course_modules

id

course_id

title

order_no

duration

---

# Course Lessons

course_lessons

id

module_id

title

video_url

notes_url

duration

is_preview

---

# Student Enrollment

course_enrollments

id

student_id

course_id

status

progress

joined_at

completed_at

---

# Projects

projects

id

title

slug

difficulty

github_url

demo_url

description

status

---

# Resources

resources

id

title

category

download_url

visibility

created_at

---

# Roadmaps

roadmaps

id

title

slug

pdf_url

thumbnail

---

# Certificates

certificates

id

student_id

course_id

certificate_url

issued_at

---

# CRM

crm_leads

id

full_name

phone

email

source

course

status

assigned_to

notes

created_at

---

# Demo Registrations

demo_registrations

id

full_name

phone

email

course

experience

status

created_at

---

# Payments

payments

id

student_id

course_id

amount

currency

payment_gateway

transaction_id

status

created_at

---

# Notifications

notifications

id

user_id

title

message

read

created_at

---

# Activity Log

user_activity

id

user_id

action

module

metadata

created_at

---

# Placement

companies

jobs

applications

interviews

offers

---

# AI

ai_sessions

resume_reviews

interview_sessions

roadmap_generations

---

# Roles

Visitor

Lead

Student

Trainer

Counsellor

Admin

Super Admin

---

# Relationships

Profile

↓

Student

↓

Enrollment

↓

Course

↓

Modules

↓

Lessons

---

# Security

JWT + HttpOnly Cookie Authentication

↓

Role Based Access

↓

Row Level Security

↓

Audit Logs

---

# Indexes

phone

email

course_id

student_id

status

created_at

---

# Future Tables

discussion_forum

forum_comments

community_groups

affiliate_users

coupons

subscriptions

mobile_devices

live_classes

attendance

recordings

quiz_attempts

assignments

coding_submissions

---

# Database Statement

The database is designed to support millions of records while maintaining modularity and high performance.