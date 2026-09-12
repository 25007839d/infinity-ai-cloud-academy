# Infinity AI Cloud Academy

# Folder Structure

Version: 1.0

Status: Active

Last Updated: July 2026

---

# Purpose

This document defines the folder organization for the Infinity AI Cloud Academy project.

Every developer must follow this structure.

---

# Root Structure

```
infinity-ai-cloud-academy/

docs/

public/

src/

package.json

vite.config.js

README.md
```

---

# src Structure

```
src

admin/

assets/

components/

config/

contexts/

hooks/

pages/

routes/

seo/

services/

utils/
```

---

# Folder Responsibilities

## admin/

Contains the complete Admin CRM.

Examples

- Dashboard
- Leads
- Students
- Payments
- Reports
- Analytics

---

## assets/

Static assets.

Examples

Images

Icons

Fonts

Videos

Logos

---

## components/

Reusable UI and business components.

Structure

```
components/

academy/

auth/

layout/

student/

ui/

Home/

about/

contact/

courses/

course-details/

projects/

resources/

roadmaps/
```

---

# components/ui

Contains reusable UI components.

Examples

```
Button

Card

Badge

Input

Select

Textarea

Modal

Drawer

Loader

Avatar

Dropdown

ProgressBar

Toast

SectionTitle
```

No business logic.

Only presentation.

---

# components/academy

Business reusable components.

Examples

```
CourseCard

ProjectCard

RoadmapCard

ResourceCard

FeatureCard

StatsCard

InstructorCard

CertificateCard
```

---

# components/auth

Authentication related components.

Examples

```
ProtectedAction

PhoneLogin

OTPVerification

ProfileCompletion

StudentPortalModal
```

---

# components/student

Student dashboard components.

Examples

```
DashboardHeader

ContinueLearning

CourseProgress

RecentActivity

ProfileCard

CertificateCard
```

---

# components/layout

Shared layouts.

Examples

```
Navbar

Footer

ScrollToTop

PageContainer

SectionContainer
```

---

# pages/

Contains route-level pages.

Example

```
Home

Courses

Projects

Resources

Roadmaps

Contact

About

StudentPortal

StudentDashboard
```

Pages should only compose components.

---

# routes/

Application routing.

Examples

```
AppRoutes

AdminRoutes

ProtectedRoutes
```

---

# services/

Business logic.

Examples

```
authService

courseService

projectService

resourceService

studentService

analyticsService

paymentService

server/database
```

No UI code.

---

# contexts/

React Context.

Examples

```
AuthContext

ThemeContext

StudentContext
```

---

# hooks/

Reusable React hooks.

Examples

```
useAuth

useCourse

useStudent

useDebounce

usePagination
```

---

# utils/

Utility functions.

Examples

```
date

validation

csvExport

formatCurrency

constants
```

---

# config/

Configuration.

Examples

```
environment

navigation

theme

roles
```

---

# Naming Convention

Components

PascalCase

Example

```
CourseCard.jsx
```

---

Hooks

camelCase

Example

```
useAuth.js
```

---

Services

camelCase

Example

```
courseService.js
```

---

Utilities

camelCase

Example

```
csvExport.js
```

---

Contexts

PascalCase

Example

```
AuthContext.jsx
```

---

Folders

camelCase

Example

```
studentPortal
```

or existing feature folders

```
course-details
```

---

# Import Order

1. React

2. Third-party Libraries

3. Context

4. Services

5. Components

6. Utilities

7. Assets

8. CSS

Example

```jsx
import { useState } from "react";

import { Link } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

import { getCourses } from "../services/courseService";

import Button from "../components/ui/Button";

import logo from "../assets/logo.png";

import "./App.css";
```

---

# Component Rules

Components should:

- Be reusable
- Be small
- Accept props
- Avoid duplicated logic
- Avoid API calls unless required

---

# Page Rules

Pages should:

- Assemble components
- Call services
- Manage page state
- Avoid duplicate UI

---

# Service Rules

Services:

- Call Supabase
- Call APIs
- Perform business logic
- Never contain JSX

---

# Future Structure

As the platform grows, new folders may be added:

```
mobile/

trainer/

placement/

affiliate/

community/

ai/
```

These modules must follow the same architectural principles.

---

# Folder Structure Statement

The folder structure is designed to support long-term scalability, modular development, and code reuse. Every new feature should fit into the existing architecture instead of creating parallel or duplicate structures.