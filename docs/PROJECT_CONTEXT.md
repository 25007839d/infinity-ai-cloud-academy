# 🚀 Infinity AI Cloud Academy

**Project Context Document**

Version: **v1.0.0**

Last Updated: **31 July 2026**

Status: **Architecture Completed | Development Started**

---

# Project Overview

Infinity AI Cloud Academy is a modern AI-powered EdTech platform focused on:

- Data Engineering
- Artificial Intelligence
- Machine Learning
- Cloud Computing
- DevOps
- Software Engineering

The project is designed as a scalable SaaS platform rather than a simple course website.

---

# Vision

Create India's best practical learning platform where students can:

Visitor
↓

Book Demo
↓

Register

↓

Become Student

↓

Learn

↓

Build Projects

↓

Earn Certificate

↓

Placement

↓

Alumni

---

# Current Development Phase

Current Version

v1.0.0

Completed

✅ Architecture

✅ Folder Structure

✅ Design System

✅ Documentation

🚧 Website Refactoring

Pending

Student Portal

Authentication

CRM

LMS

AI Mentor

Placement Portal

---

# Technology Stack

## Frontend

- React 19
- Vite
- Tailwind CSS
- React Router
- Framer Motion

## Backend

- Supabase

## Database

- PostgreSQL

## Hosting

Current

GitHub Pages

Future

Vercel / GCP Cloud Run

---

# Project Structure

src/

admin/

assets/

components/

config/

content/

contexts/

data/

hooks/

lib/

modules/

pages/

routes/

seo/

services/

types/

utils/

---

# Components

## UI

Button

Card

Badge

SectionTitle

Input (Planned)

Modal (Planned)

Loader (Planned)

Toast (Planned)

---

## Academy

CourseCard

ProjectCard

RoadmapCard

ResourceCard

FeatureCard

---

## Authentication

ProtectedAction

AuthModal

Student Portal

---

# Design Rules

Pages

↓

Business Components

↓

UI Components

↓

Services

↓

Supabase

Never call Supabase directly from components.

---

# Folder Rules

components/ui

Reusable UI

components/academy

Business Components

services

Business Logic

pages

Compose Components

config

Application Configuration

data

Business Data

content

Marketing Content

---

# Configuration

config/

navigation.js

site.js

socialLinks.js

roles.js

permissions.js

constants.js

theme.js

routes.js

---

# Data Layer

data/

courses.js

projects.js

roadmaps.js

resources.js

faq.js

team.js

statistics.js

partners.js

features.js

---

# Content Layer

content/

hero.js

about.js

homepage.js

footer.js

seo.js

policies.js

---

# Current Authentication

Supabase Email Authentication

Future Plan

Phone Authentication

WhatsApp Integration

---

# Student Portal Flow

Visitor

↓

Student Portal

↓

Authentication

↓

Complete Profile

↓

Dashboard

---

# CRM Flow

Visitor

↓

Lead

↓

Demo

↓

Payment

↓

Student

↓

Placement

↓

Alumni

---

# Database (Planned)

profiles

students

courses

course_modules

course_lessons

course_enrollments

projects

resources

roadmaps

crm_leads

payments

certificates

notifications

user_activity

companies

jobs

applications

---

# Development Principles

- No duplicate code
- Reuse components
- Business logic inside services
- Configuration inside config
- Static content inside content
- Static business data inside data
- Components must remain reusable
- Responsive first
- Dark theme by default

---

# Git Workflow

main

↓

develop

↓

feature/*

Examples

feature/navbar-refactor

feature/student-portal

feature/dashboard

feature/crm

---

# Current Progress

Architecture

██████████ 100%

Design System

██████████ 100%

Website

████████░░ 80%

Student Portal

█░░░░░░░░░ 10%

Authentication

█░░░░░░░░░ 10%

CRM

██░░░░░░░░ 20%

LMS

░░░░░░░░░░ 0%

AI Mentor

░░░░░░░░░░ 0%

---

# Active Sprint

Sprint 3.1

Goal

Refactor website foundation without changing UI.

Tasks

- Navbar Refactor
- Footer Refactor
- Hero Refactor
- CourseCard Refactor
- ProjectCard Refactor
- ResourceCard Refactor
- RoadmapCard Refactor

---

# Next Sprint

Sprint 3.2

Student Portal

Authentication

Complete Profile

Dashboard

---

# Long-Term Roadmap

v1.0

Architecture + Website

v1.1

Website Refactoring

v1.2

Authentication

v1.3

Student Dashboard

v1.4

CRM

v1.5

Learning Management System

v2.0

AI Mentor

v3.0

Mobile App

---

# Important Decisions

- React + Vite selected
- Tailwind CSS selected
- Supabase selected as backend
- Component-based architecture
- Modular folder structure
- Design System mandatory
- Service layer mandatory
- No direct database access from UI
- Config/Data/Content separation
- MVP-first development strategy

---

# Development Workflow

Requirement

↓

Architecture Review

↓

Design

↓

Implementation

↓

Testing

↓

Git Commit

↓

Documentation Update

↓

Release

---

# Next Task

Continue Sprint 3.1 by implementing the Navbar Module using:

- Shared Button component
- navigation.js
- site.js
- Modular navbar components

No visual UI changes, only architecture improvements.