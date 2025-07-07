# ABNEG Portal – Enhanced Smart Prompts for Cursor (Categorized by Stage)

## Stage 1: Development Environment Setup

# ABNEG Portal – Enhanced Smart Prompts for Cursor

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [x] Create a new React project scaffold using Vite and TypeScript. Install Tailwind CSS and configure it with PostCSS and Autoprefixer. Verify utility classes are working with a demo page.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [x] Install and configure ShadCN UI in the project. Integrate its core dependencies (Radix UI, CVA) and render a test component like a button or card in the demo layout.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [x] Set up Auth0 authentication. Register the app with Auth0 and add environment variables. Implement login and signup using Auth0's prebuilt UI components and test with social login.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [x] Add the `@auth0/nextjs` and `@auth0/backend` packages and wrap the app in the `<Auth0Provider>`. Configure protected routes using `useUser` and `!useUser` wrappers. (In Vite, you use `@auth0/auth0-react` and have already implemented these wrappers.)

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [x] Provision a Neon PostgreSQL database. Connect to it from the app using Drizzle ORM and generate a sample schema to confirm database operations.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---


## Stage 2: Authentication & Access Control

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [x] Add base schemas in Drizzle for `users`, `members`, and `roles`. Write a migration and apply it to the Neon instance.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [x] Create base REST endpoints using Express or Vite Dev Server. Scaffold a test route like `/api/hello` that returns sample JSON. Confirm route is accessible from the frontend.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [x] Implement session-aware navigation by detecting Auth0 session and showing user avatar with dropdown if authenticated, or login button if not.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [x] Create role metadata for Auth0 users (e.g., "admin", "member") and store in a `roles` table via Drizzle. Link it to user ID and assign on registration.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [x] Set up route guards using a custom Auth0 middleware. Redirect users based on role: members to `/dashboard`, admins to `/admin`.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---


## Stage 3: Member Portal Functionality

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Build a role management dashboard for Super Admin. List all users, their assigned roles, and allow manual role reassignment using Drizzle + REST mutations.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Restrict `/admin` and other private routes to users with the "admin" role using Auth0's `useUser` + `getSession` + server-side `getSession()`.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Build a member dashboard at `/dashboard` displaying name, status, and active subscriptions from Drizzle.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Implement a form to update member profile info (name, phone, location) with Drizzle update query and REST mutation.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Create a loan application form for members. Validate input using Zod and submit via REST to a `loan_requests` table.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---


## Stage 4: Public Website & Informational Pages

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Add event registration functionality. List all events from `events` table and allow RSVP. Save RSVP responses in `registrations` table.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Display member transaction history using Flutterwave receipts linked to the logged-in user. Include status, date, and amount.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Build a homepage with mission, call-to-action (Join Us), and featured content blocks. Include a "Become a Member" button.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Create the About page with preamble, objectives, and operational regions from static content.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Design the Leadership page displaying Executive Council and Board members with bios and photos.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---


## Stage 5: Payments, Subscriptions, and Invoicing

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Build Events & News section with blog-style entries. Support featured image, tags, and pagination.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Implement a Contact page with ABNEG office locations, embedded map, and WhatsApp/email integration using `mailto:` and `wa.me/`.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Integrate Flutterwave for Mobile Money payments. Use Flutterwave's JavaScript SDK to initiate payment and webhook for confirmation.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Integrate PayPal for online payments via credit/debit cards using PayPal Checkout SDK.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Create a payment summary UI showing current dues, amount paid, and next due date.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---


## Stage 6: Admin Portal (CMS & Governance Tools)

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Generate receipts after successful payment and store in a `payment_receipts` table linked to `user_id`.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Enable admin panel to configure subscription amounts and generate invoices for all members.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Build admin dashboard at `/admin` with navigation to Members, Loans, Events, Reports, and Files.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Add Members Table with filters (region, type, status), edit/delete actions, and linked profile view.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Create Loan Review table listing loan applications with status control (approved, rejected, pending).

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---


## Stage 7: Voting, Polls & AGM Tools

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Build document uploader (constitution, AGM minutes, policies). Store in `documents` table with download/view links.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Create committee management panel with CRUD for committee names, members, roles, and tasks.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Develop secure AGM voting tool. Restrict vote access to eligible users using Auth0 and session-based validation.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Store vote submissions in a `votes` table and prevent double voting per user + question ID.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Display vote results in real-time or after voting window closes. Use progress bars or percentages.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---


## Stage 8: Diaspora Engagement Tools

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Add polling system for internal consultations. Allow admins to initiate polls with 2+ options.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Archive past polls and vote results in a view-only admin report.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Create a Diaspora Stories submission form with image and narrative fields stored in `diaspora_stories`.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Enable admin approval of stories before public publishing.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Display approved stories on the public site in carousel or timeline view.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---


## Stage 9: DevOps, Performance, Security

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Add a directory of diaspora chapters and contacts with regional sorting.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Embed donation links or QR codes on diaspora landing page.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Set up CI/CD pipeline with GitHub + Vercel. Enable preview deploys for feature branches.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Implement OWASP Top 10 protections: XSS prevention, CSRF tokens, input validation via Zod.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Add audit logging for all admin actions using `@auth0/backend` and Drizzle.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---


## Stage 10: Testing & Launch

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Encrypt all sensitive member data at rest using PostgreSQL features or field-level encryption logic.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Ensure Lighthouse score of 90+ for performance, accessibility, and SEO.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Write unit tests for all REST routers using Jest or Vitest with mocked Auth0 sessions and DB.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Add integration tests for critical flows: login, payment, loan application.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Test all public pages for mobile responsiveness and form validation.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---


You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Conduct soft launch with council members. Collect feedback and track using Notion or GitHub issues.

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

You are an expert full-stack developer working on the ABNEG Portal.
Your task is to implement the following requirement:

### TASK
- [ ] Launch publicly. Monitor usage with Vercel analytics and enable support contact channel (WhatsApp/email).

### EXPECTATIONS
- Use best practices for clean, modular code.
- Follow the project’s existing tech stack: Vite, React, ShadCN, TailwindCSS, Drizzle ORM, and Auth0.
- Ensure functionality is testable and clearly documented.
- Place code in the appropriate folders under `src/` and create any missing files.
- When done, describe your implementation and suggest the next logical task.
### FORMAT
Respond only with updated source files and a summary of what you implemented.

---

