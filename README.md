# 🎓 TKK LMS

<p align="center">
  <img src="https://img.shields.io/badge/Stack-PERN-0F766E?style=for-the-badge" alt="PERN" />
  <img src="https://img.shields.io/badge/Backend-NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/Frontend-React-149ECA?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Database-PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Payments-Razorpay-2B4AFD?style=for-the-badge" alt="Razorpay" />
</p>

<p align="center">
  <b>Production-oriented, security-aware Udemy-style LMS starter for India-based trainer businesses 🇮🇳</b>
</p>

---

## ✨ What This Project Includes

- 🧱 PERN monorepo foundation with clear separation of frontend, backend, infra, and docs
- 🔐 Security-first backend scaffolding (RBAC hooks, token flows, audit-ready design)
- 🎥 Lesson player flow with forensic watermark overlay deterrence
- 💳 Razorpay-ready payment + coupon + installment starter modules
- 📊 Admin and student analytics starter endpoints/UI
- 🧪 Databricks Practice Lab fallback button support per course/lesson
- 📚 Full architecture + PRD + roadmap in docs

## 🗂️ Monorepo Layout

- backend: NestJS API (Node.js + Express adapter), Prisma ORM, PostgreSQL schema
- frontend: React + TypeScript + Vite (public, student, admin portal starter)
- docs: PRD, architecture, API catalog, security strategy, roadmap
- infra: Local Docker infra (Postgres + Redis)

## 🧰 Tech Logos At A Glance

| Layer | Tech |
|---|---|
| Frontend | ⚛️ React + TypeScript + Vite |
| Backend | 🛡️ NestJS + Node.js |
| Database | 🐘 PostgreSQL + Prisma |
| Cache/Queue (ready) | 🧠 Redis |
| Payments | 💸 Razorpay (UPI/Card/Netbanking/Wallet) |
| Hosting path | ☁️ Cloudflare/Vercel + Render/Railway/Fly + Managed Postgres |

## 🚀 Quick Start

### 1) Start Infra

```bash
cd infra
docker compose up -d
```

### 2) Start Backend

```bash
cd ../backend
npm install
cp .env.example .env
npx prisma generate
npx prisma migrate dev --name init
npm run start:dev
```

### 3) Start Frontend

```bash
cd ../frontend
npm install
cp .env.example .env
npm run dev
```

## 🌐 Default Local URLs

- Frontend: http://localhost:5173
- Backend API: http://localhost:4000/api/v1
- PostgreSQL: localhost:5432
- Redis: localhost:6379


# Use this to test:
- Frontend: http://localhost:5173/
- Login page: http://localhost:5173/login
- Course player (after login): http://localhost:5173/student/lesson/databricks-playlist-course/playlist-main

# Dummy login credentials:
- Email: student@tkklms.demo
- Password: Demo@12345


## 🔒 Security Reality Check

This LMS implements strong practical deterrence and access control, but no browser-based system can guarantee total prevention of:

- screen recording
- screenshots
- screen sharing

YouTube unlisted mode is supported as MVP workflow, but premium content should migrate to DRM in Phase 2.

## 🧭 Product and Architecture Docs

For the full blueprint (PRD, APIs, DB, RBAC, roadmap, risk register, deployment/testing plans):

- docs/MASTER_PLAN.md

## 🛣️ Suggested Next Build Steps

1. Wire Prisma service into all modules (replace demo/in-memory service logic).
2. Add JWT auth guard + enrollment guard to protected endpoints.
3. Integrate real Razorpay order creation and idempotent webhook reconciliation.
4. Add seed scripts for roles/permissions/admin bootstrap user.
5. Add E2E tests for checkout, lesson access, live class joins, and installments.

---

Built for practical scale, security honesty, and cost efficiency. 🚀
