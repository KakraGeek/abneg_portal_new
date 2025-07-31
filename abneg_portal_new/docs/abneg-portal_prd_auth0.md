
# ABNEG Online Portal - Product Requirements Document (PRD)

## 1. Overview

**Project Title:** ABNEG Online Portal  
**Organization:** Agric Business Network - Ghana (ABNEG)  
**Prepared by:** Product Strategy Lead, ABNEG IT Team  
**Date:** July 1, 2025 (Updated)

### Background

ABNEG is a Ghana-based association of agricultural stakeholders committed to creating sustainable growth and opportunities for farmers, agro-processors, and agribusinesses. To streamline its operations and expand digital access to its services, ABNEG is building a secure and feature-rich online portal.

### Purpose

This PRD outlines the scope, objectives, and technical requirements for the development of the ABNEG Online Portal. It will guide the engineering and design teams to build an inclusive, intuitive, and secure platform that serves members, partners, and the general public.

## 2. Goals and Objectives

- Digitize ABNEG's operations and governance framework
- Enable secure and inclusive membership management
- Provide transparent access to financial records and AGM resources
- Facilitate market linkages, loan applications, and agro-input support
- Empower rural and diaspora members through digital accessibility

## 3. Target Users

- **Ordinary Members**: Farmers, agro-processors, local agribusinesses
- **Associate & Honorary Members**: Partners, donors, retired professionals
- **Executive Council & Committees**: Internal governance & management
- **Public Users**: Investors, researchers, government agencies
- **Administrators**: Secretariat staff and technical operators
- **Specialist Professionals**: Agricultural engineers, agronomists, soil and plant researchers

## 4. Key Features

### 4.1 Public Website (Unauthenticated Users)

- Homepage: Introduction, mission, vision, and call-to-action (Join Us)
- About ABNEG: Preamble, objectives, operational regions, history
- Leadership Directory: Executive Council and Board profiles
- Events & News: AGM calendar, emergency meetings, announcements
- Blog & Media Gallery: Posts, press releases, photos, videos
- Partnerships: Affiliate list, MOU uploads, business opportunities
- Contact Page: Office addresses, WhatsApp chat, email, help form

### 4.2 Member Portal (Authenticated Users)

- Secure Member Login/Registration (supporting email & phone)
- Membership Profile & Dashboard (subscription status, roles)
- Event Registration (AGM, EGM, training)
- Voting Portal (AGM decisions, elections)
- Loan Application & Tracking
- Market Linkage Directory Access (buyer/seller listing)
- Access to Subsidies & Agro-Input Requests
- Internal Notices & Member Feedback Form

### 4.3 Admin Portal

- Member Management (CRUD, filters by category, region, etc.)
- Financial Management (subscription tracking, donation logs)
- Content Management (news, media, event uploads)
- Document Uploads (AGM minutes, constitution, policies)
- Register of Members (view/export)
- Committee Management
- Voting & Polling Controls
- Audit Log & Reporting Dashboard

## 5. Technical Requirements

### 5.1 Platform

- Responsive Web Application (Mobile-first)
- Multilingual Support (English, French, Twi – future roadmap)
- Localization for Currency (Ghana Cedi – GHS symbol)

### 5.2 Tech Stack

- **Frontend**: React (Vite) + Tailwind CSS + ShadCN UI
- **Authentication**: Auth0 with RBAC, social login, and MFA
- **Backend**: RESTful API endpoints using Vite or Express
- **Database**: Neon PostgreSQL with Drizzle ORM
- **DevOps Hosting**: Vercel (frontend/backend functions)
- **Payments**: Flutterwave (Mobile Money), PayPal (Card/Online)

### 5.3 Payments

- Online Subscription & Donations via PayPal, credit/debit cards, and Mobile Money in Ghana (MTN Mobile Money, Telecel Cash, ATMoney) using Flutterwave's payment gateway
- Member invoicing & receipts

### 5.4 Integrations

- SMS/WhatsApp API (Twilio or Hubtel)
- Google Maps for Office Locations
- Stripe/PayPal for payment handling

## 6. Security & Compliance

- OWASP Top 10 controls integrated into DevOps pipeline
- HTTPS/TLS across all environments
- Data encryption at rest and in transit
- GDPR-compliant member data handling
- Audit logging of all admin activities

## 7. Reporting & Analytics

- Financial Reports (Monthly/Annual export)
- Membership Stats & Growth Trends
- Event Attendance Reports
- Custom Filter Reports (e.g., region, gender, occupation)

## 8. Performance & DevOps

- Hosted on Vercel (frontend/backend)
- PostgreSQL (via Neon) for persistent storage
- Drizzle ORM for database interaction
- REST API for communication
- CI/CD pipelines with performance tests and staging previews

## 9. Success Metrics

- 500+ verified members onboarded within 12 months
- 100% digitization of AGM processes (meetings, votes, reports)
- Average portal uptime of 99.95% per quarter
- Member satisfaction score >= 4.5/5 on usability feedback

## 10. Roadmap Milestones

| Milestone | Description                         | Due Date          |
| --------- | ----------------------------------- | ----------------- |
| M1        | PRD Finalization & Design Handoff   | July 5, 2025      |
| M2        | MVP Development Complete            | August 15, 2025   |
| M3        | Internal Testing & QA               | August 30, 2025   |
| M4        | Pilot Launch (Council & Committees) | September 5, 2025 |
| M5        | Public Launch                       | October 1, 2025   |

---
