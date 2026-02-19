Test accounts are as follows:
buyer.demo@handcraftedhaven.com
Password123!

artisan.demo@handcraftedhaven.com
Password123!

## Technologies Used

### Front-End

- HTML
- CSS
- JavaScript
- **Next.js**

### Back-End

- **Node.js**
- Database (to be determined)

### Project Management & Deployment

- Git & GitHub
- GitHub Projects (Kanban Board)
- **Vercel** (Deployment)

---

## Design Guidelines

- Consistent branding (colors, typography, layout)
- Clear and intuitive navigation
- Responsive and accessible UI
- SEO and performance best practices

---

## Project Management

- All tasks and user stories are managed using **GitHub Projects**
- The team follows collaborative Git workflows and best practices
- User stories and work items are continuously refined throughout the project

---

## Team Members

- Mafo Kisanga Glody
- Joy Oyaleke
- Sochima Ifedikwa

---

## Deployment

The application will be deployed using **Vercel** and made publicly accessible.

## Database Setup (Prisma + PostgreSQL on Vercel)

This project now uses **Prisma** for user authentication storage.

1. Install dependencies:

```bash
pnpm install
```

2. Set your environment variables in `.env`:

```bash
PRISMA_DATABASE_URL="prisma+postgres://..."
POSTGRES_URL="postgres://..."
```

3. Create/update your database schema (uses `POSTGRES_URL` as `directUrl`):

```bash
pnpm prisma:migrate --name init_users
```

4. Generate Prisma client (if needed manually):

```bash
pnpm prisma:generate
```

### Vercel Postgres Steps

1. In Vercel, open your project and go to **Storage**.
2. Create/connect a **Postgres** database.
3. Copy your Prisma runtime URL into `PRISMA_DATABASE_URL` and your direct DB URL into `POSTGRES_URL`.
4. Add both variables to Vercel environments (`Development`, `Preview`, `Production`).
5. Deploy your app.

### Auth Storage Notes

- Prisma schema: `prisma/schema.prisma`
- Prisma client singleton: `src/lib/prisma.ts`
- User auth data layer: `src/lib/auth-store.ts`

---

## Course Context

This project is developed as part of a group assignment to:

- Strengthen full-stack web development skills
- Build professionalism and teamwork
- Teach and learn collaboratively following the BYU-Idaho learning model

---

## License

This project is developed for educational purposes.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
