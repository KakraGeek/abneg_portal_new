
# ABNEG Online Portal – Simplified Architecture Schema (No tRPC)

## 🧱 Tech Stack Overview

| Layer            | Technology                            |
|------------------|----------------------------------------|
| Frontend         | React (Vite) + TypeScript              |
| Styling/UI       | Tailwind CSS + ShadCN UI               |
| Authentication   | Auth0 (RBAC, social login, MFA)    |
| Backend          | REST API Routes (Vite + Express)       |
| Database         | Neon PostgreSQL                        |
| ORM              | Drizzle ORM                            |
| Hosting          | Vercel (Frontend + Serverless API)     |
| Payments         | Flutterwave + PayPal                   |

---

## 📦 Folder Structure (src/)

```
/src
 ├── components/          # UI components
 ├── pages/               # React routes
 ├── api/                 # REST API route handlers
 │    ├── auth/           # Auth0 session + auth logic
 │    ├── members/        # Member CRUD, dues, events
 │    └── admin/          # Admin-level endpoints
 ├── lib/                 # Utilities (db, auth, validators)
 ├── db/                  # Drizzle schema + migration
 └── styles/              # Tailwind base styles
```

---

## 🔐 Authentication Flow

- Auth0 handles session and RBAC
- Protected routes via `useUser()` and `withAuth()` wrappers
- Admin pages gated by Auth0 role (`admin`)

---

## 🔄 API Routing (Express / Vite Dev Server / Vercel Edge)

- Define route handlers in `/api`
- Use `drizzle` directly inside route logic
- Return `res.json()` or `res.status(...).send(...)` formats
- Validate payloads with Zod

---

## 🧾 Database Schema Highlights

Tables (via Drizzle ORM):
- `users`
- `members`
- `events`
- `subscriptions`
- `loans`
- `votes`
- `documents`
- `diaspora_stories`

---

## 📈 DevOps + Deployment

- CI/CD via GitHub → Vercel
- Environment vars managed in Vercel dashboard
- Postgres via Neon cloud instance
- Performance/SEO audits using Lighthouse
- Audit logs via custom logging middleware

---

## 🔒 Security Considerations

- Auth0-based auth + session handling
- API validation using Zod
- Input/output sanitization
- HTTPS enforced on all endpoints
- OWASP Top 10 checks embedded in test pipeline

---

## ✅ Outcome

- Fewer moving parts
- Easier debugging
- Seamless deployment via Vercel
- No more tRPC blocking issues

