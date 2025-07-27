This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---

# 🧑‍💼 Mini Job Board App

A full-stack job board application built with **Next.js (App Router)** and **Supabase**. Users can sign up, post job listings, browse jobs, and filter by location or job type.

---

## 🚀 Live Demo

🌐 [https://mini-job-board-rosy-eight.vercel.app](https://mini-job-board-rosy-eight.vercel.app)

---

## 🛠️ Tech Stack

-   **Frontend**: Next.js 13 (App Router)
-   **Backend**: Supabase (Auth + Database)
-   **Styling**: Tailwind CSS
-   **Hosting**: Vercel

---

## 🧰 Features

-   🔐 User authentication (sign up / login with Supabase)
-   📝 Post job listings (title, description, company, type, location)
-   🌐 Public job board with filters (by location and type)
-   📄 View full job details
-   👤 User dashboard to edit or delete own job posts
-   ✅ Client-side validation + server actions

---

## ⚙️ Setup Instructions

1. **Clone the repo**

    ```bash
    git clone https://github.com/your-username/mini-job-board.git
    cd mini-job-board

    ```

2. Install dependencies

    ```bash
    npm install

    ```

3. Setup environment variables
   Create a .env.local file and add:

    ```bash
    NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
    NEXT_PUBLIC_SITE_URL=http://localhost:3000

    ```

4. Run locally

    ```bash
    npm run dev

    ```

5. Build the app

    ```bash
    npm run build
    npm start

    ```

6. Supabase Setup
   Enable Email Auth

    Create jobs table with fields:

    id, title, description, company_name, location, job_type, user_email, created_at

    Enable RLS and add policies to allow:

    Read: All users

    Insert/Update/Delete: Only if user_email = auth.email()

---

## 🧱 Architecture Overview

Next.js App Router is used for routing and page structure

Supabase handles authentication and database access

Server Actions (e.g. addJob) are used for database writes

Client Components (e.g. filters, auth form) for interactivity

Supabase client helpers (createClientComponentClient, createServerComponentClient) are used depending on the context

Only the authenticated user who created the job post is allowed to edit and delete it

---

## 📌 What to do to improve?

✅ Add pagination or infinite scroll on the job list

✅ Implement search by keyword (title or company)

✅ Add support for image/logo uploads per job post

✅ Improve UX for form validation and error messages

✅ Add unit tests for server actions and components

✅ Add admin role support with analytics dashboard

✅ Edit to server action on the edit Job

---
