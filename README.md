# Conversational AI

Conversational AI is a context aware search application implemented using LLMs.

> **Warning**
> This project is still in development and is not ready for production use.
>
> It uses new technologies (drizzle ORM) which are subject to change and may break your application.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Database Management:** [Supabase](https://supabase.com)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com)
- **File Uploads:** [uploadthing](https://uploadthing.com)
- **Payments infrastructure:** [Stripe](https://stripe.com)

## Features to be implemented

- [x] Database connection and authentication with **Supabase**
- [x] Setup API routes with **tRPC** and **React Query**
- [x] Index and query embeddings with **OpenAI** and **LlamaIndex**
- [ ] File uploads with **uploadthing**
- [ ] ORM using **Drizzle ORM**
- [ ] Validation with **Zod**
- [ ] Payment subscriptions with **Stripe**
- [ ] CRUD user roles (user and admin)

## Roadmap

Phase 1
- [ ] Design and implement the UI for chat page (with dynamic chat as URL params)
- [ ] Create and edit project/topics functionalities

Phase 2
- [ ] Billing system for user subscription via Stripe API
- [ ] Dialog flow system for users to configure how the bot should respond in certain scenarios

## Running Locally

1. Clone the repository

   ```bash
   git clone https://github.com/kenneth-1203/conversational-ai.git
   ```

2. Install dependencies using npm

   ```bash
   npm install
   ```

3. Copy the `.env.example` to `.env` and update the variables.

   ```bash
   cp .env.example .env
   ```

4. Start the development server

   ```bash
   npm run dev
   ```

5. Push the database schema

   ```bash
   npm run db:push
   ```

6. Start the Stripe webhook listener

   ```bash
   npm run stripe:listen
   ```
