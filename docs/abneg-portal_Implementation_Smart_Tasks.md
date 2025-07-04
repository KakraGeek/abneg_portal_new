# ABNEG Implementation Task List (Smart Prompts Edition)

This checklist replaces plain task descriptions with full, AI-executable prompts for development in Cursor. Each step is ready for direct execution using Cursor's AI Agent.

---

## ✅ Stage 1: Development Environment Setup

- [x] Create a new React project scaffold using Vite and TypeScript. Install Tailwind CSS and configure it with PostCSS and Autoprefixer. Verify utility classes are working with a demo page.
- [x] Install and configure ShadCN UI in the project. Integrate its core dependencies (Radix UI, CVA) and render a test component like a button or card in the demo layout.
- [x] Set up Clerk.dev authentication. Register the app with Clerk and add environment variables. Implement login and signup using Clerk's prebuilt UI components and test with social login.
- [x] Add the `@clerk/nextjs` and `@clerk/backend` packages and wrap the app in the `<ClerkProvider>`. Configure protected routes using `SignedIn` and `SignedOut` wrappers. (In Vite, you use `@clerk/clerk-react` and have already implemented these wrappers.)
- [x] Provision a Neon PostgreSQL database. Connect to it from the app using Drizzle ORM and generate a sample schema to confirm database operations.
- [x] Add base schemas in Drizzle for `users`, `members`, and `roles`. Write a migration and apply it to the Neon instance.
- [x] Create base REST endpoints using Express or Vite Dev Server. Scaffold a test route like `/api/hello` that returns sample JSON. Confirm route is accessible from the frontend.

---

## ✅ Stage 2: Authentication & Access Control

- [ ] Implement session-aware navigation by detecting Clerk session and showing user avatar with dropdown if authenticated, or login button if not.
- [ ] Create role metadata for Clerk users (e.g., "admin", "member") and store in a `roles` table via Drizzle. Link it to user ID and assign on registration.
- [ ] Set up route guards using a custom Clerk middleware. Redirect users based on role: members to `/dashboard`, admins to `/admin`.
- [ ] Build a role management dashboard for Super Admin. List all users, their assigned roles, and allow manual role reassignment using Drizzle + REST mutations.
- [ ] Restrict `/admin` and other private routes to users with the "admin" role using Clerk's `useAuth` + `getToken` + server-side `getAuth()`.


---

## ✅ Stage 3: Member Portal Functionality

- [ ] Build a member dashboard at `/dashboard` displaying name, status, and active subscriptions from Drizzle.
- [ ] Implement a form to update member profile info (name, phone, location) with Drizzle update query and REST mutation.
- [ ] Create a loan application form for members. Validate input using Zod and submit via REST to a `loan_requests` table.
- [ ] Add event registration functionality. List all events from `events` table and allow RSVP. Save RSVP responses in `registrations` table.
- [ ] Display member transaction history using Flutterwave receipts linked to the logged-in user. Include status, date, and amount.

---

## ✅ Stage 4: Public Website & Informational Pages

- [ ] Build a homepage with mission, call-to-action (Join Us), and featured content blocks. Include a "Become a Member" button.
- [ ] Create the About page with preamble, objectives, and operational regions from static content.
- [ ] Design the Leadership page displaying Executive Council and Board members with bios and photos.
- [ ] Build Events & News section with blog-style entries. Support featured image, tags, and pagination.
- [ ] Implement a Contact page with ABNEG office locations, embedded map, and WhatsApp/email integration using `mailto:` and `wa.me/`.

---

## ✅ Stage 5: Payments, Subscriptions, and Invoicing

- [ ] Integrate Flutterwave for Mobile Money payments. Use Flutterwave's JavaScript SDK to initiate payment and webhook for confirmation.
- [ ] Integrate PayPal for online payments via credit/debit cards using PayPal Checkout SDK.
- [ ] Create a payment summary UI showing current dues, amount paid, and next due date.
- [ ] Generate receipts after successful payment and store in a `payment_receipts` table linked to `user_id`.
- [ ] Enable admin panel to configure subscription amounts and generate invoices for all members.

---

## ✅ Stage 6: Admin Portal (CMS & Governance Tools)

- [ ] Build admin dashboard at `/admin` with navigation to Members, Loans, Events, Reports, and Files.
- [ ] Add Members Table with filters (region, type, status), edit/delete actions, and linked profile view.
- [ ] Create Loan Review table listing loan applications with status control (approved, rejected, pending).
- [ ] Build document uploader (constitution, AGM minutes, policies). Store in `documents` table with download/view links.
- [ ] Create committee management panel with CRUD for committee names, members, roles, and tasks.

---

## ✅ Stage 7: Voting, Polls & AGM Tools

- [ ] Develop secure AGM voting tool. Restrict vote access to eligible users using Clerk and session-based validation.
- [ ] Store vote submissions in a `votes` table and prevent double voting per user + question ID.
- [ ] Display vote results in real-time or after voting window closes. Use progress bars or percentages.
- [ ] Add polling system for internal consultations. Allow admins to initiate polls with 2+ options.
- [ ] Archive past polls and vote results in a view-only admin report.

---

## ✅ Stage 8: Diaspora Engagement Tools

- [ ] Create a Diaspora Stories submission form with image and narrative fields stored in `diaspora_stories`.
- [ ] Enable admin approval of stories before public publishing.
- [ ] Display approved stories on the public site in carousel or timeline view.
- [ ] Add a directory of diaspora chapters and contacts with regional sorting.
- [ ] Embed donation links or QR codes on diaspora landing page.

---

## ✅ Stage 9: DevOps, Performance, Security

- [ ] Set up CI/CD pipeline with GitHub + Vercel. Enable preview deploys for feature branches.
- [ ] Implement OWASP Top 10 protections: XSS prevention, CSRF tokens, input validation via Zod.
- [ ] Add audit logging for all admin actions using `@clerk/backend` and Drizzle.
- [ ] Encrypt all sensitive member data at rest using PostgreSQL features or field-level encryption logic.
- [ ] Ensure Lighthouse score of 90+ for performance, accessibility, and SEO.

---

## ✅ Stage 10: Testing & Launch

- [ ] Write unit tests for all REST routers using Jest or Vitest with mocked Clerk sessions and DB.
- [ ] Add integration tests for critical flows: login, payment, loan application.
- [ ] Test all public pages for mobile responsiveness and form validation.
- [ ] Conduct soft launch with council members. Collect feedback and track using Notion or GitHub issues.
- [ ] Launch publicly. Monitor usage with Vercel analytics and enable support contact channel (WhatsApp/email).

---
