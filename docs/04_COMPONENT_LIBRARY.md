# Infinity AI Cloud Academy

# Component Library

Version: 1.0

Status: Active

---

# Purpose

This document defines every reusable component used throughout the platform.

The goal is:

- No duplicate UI
- Consistent design
- Faster development
- Easier maintenance

---

# Component Hierarchy

Application

↓

Pages

↓

Business Components

↓

UI Components

---

# UI Components

Reusable UI elements.

## Button

Purpose

Reusable button.

Variants

Primary

Secondary

Outline

Danger

Success

Ghost

Examples

- Explore Courses
- Student Portal
- Save
- Delete
- Book Demo

---

## Card

Purpose

Reusable container.

Variants

Default

Glass

Gradient

Outline

Used In

Courses

Projects

Resources

Roadmaps

Dashboard

CRM

Admin

---

## Badge

Purpose

Status indicators.

Examples

AI

Python

New

Featured

Joined

Demo Scheduled

---

## Input

Purpose

Forms.

Examples

Login

Search

Contact

Demo

Profile

---

## Select

Dropdown component.

---

## Textarea

Multiline input.

---

## Modal

Reusable popup.

Used In

Authentication

Delete Confirmation

Book Demo

Preview

---

## Drawer

Side Panel.

Used In

CRM

Lead Details

Student Details

---

## Loader

Loading Indicator.

---

## Empty State

No Data UI.

---

## Confirm Dialog

Delete Confirmation.

---

## Toast

Notifications.

---

## Avatar

User Image.

---

## Dropdown

Navigation

User Menu

Actions

---

## Progress Bar

Learning Progress

Upload Progress

Completion

---

## Section Title

Heading component.

---

# Academy Components

## CourseCard

Used In

Website

Dashboard

Featured

Admin

---

Course Structure

CourseHeader

↓

CourseStats

↓

TechnologyList

↓

CourseActions

---

## ProjectCard

ProjectHeader

↓

ProjectStats

↓

ProjectActions

---

## ResourceCard

ResourceHeader

↓

ResourceMeta

↓

DownloadAction

---

## RoadmapCard

RoadmapHeader

↓

Preview

↓

Download

---

## InstructorCard

Image

↓

Name

↓

Experience

↓

Social Links

---

## CertificateCard

Certificate Preview

↓

Download

---

## FeatureCard

Homepage

Landing Pages

Marketing

---

## TestimonialCard

Student Reviews

---

## FAQ

Accordion

---

# Student Components

DashboardHeader

ContinueLearning

CourseProgress

RecentActivity

UpcomingClass

ProfileCard

Downloads

CertificateCard

LearningStats

---

# CRM Components

LeadCard

LeadTimeline

LeadNotes

LeadStatus

LeadActions

PaymentCard

StudentCard

AnalyticsCard

StatCard

---

# Admin Components

DashboardStats

UserTable

CourseTable

PaymentTable

AnalyticsChart

SettingsCard

---

# Authentication Components

ProtectedAction

PhoneLogin

OTPVerification

CompleteProfile

StudentPortalModal

UserMenu

---

# Future Components

AI Mentor

Interview Simulator

Resume Review

Roadmap Generator

Career Advisor

Job Board

Community Feed

Discussion Card

Notification Center

---

# Component Rules

Every component should:

Be reusable

Accept props

Avoid duplicate logic

Support responsive layout

Support dark mode

Use Design System

---

# Composition Rules

Pages

↓

Business Components

↓

UI Components

Example

Course Page

↓

CourseCard

↓

Card

Button

Badge

SectionTitle

---

# Ownership

UI Components

Reusable everywhere.

Business Components

Reusable inside modules.

Pages

Should never duplicate UI components.

---

# Library Statement

The Component Library is the foundation of the Infinity AI Cloud Academy frontend.

Every new feature should first check whether an existing component can be reused before creating a new one.