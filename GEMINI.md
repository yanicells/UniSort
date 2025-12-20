# UniSort - Copilot Instructions

## Project Overview

UniSort is a Next.js 16 app helping students discover their university fit through an interactive quiz, freedom wall, and university information pages. Core features: personality-based university sorting (ADMU, DLSU, UP, UST), anonymous freedom wall with rich text posting, and data analytics.

**Tech Stack**: Next.js 16 (App Router), TypeScript (strict mode), Drizzle ORM + Neon PostgreSQL, Better Auth, shadcn/ui, Tiptap rich text editor, UploadThing for images, Recharts for analytics.

## Architecture

### Route Structure

- `app/(app)/*` - Main app routes (freedom wall, quiz, stats, university pages)
- `app/(admin)/*` - Admin routes (login, post management) - requires role-based auth
- `app/api/*` - API routes:
  - `api/auth/[...all]` - Better Auth catch-all route
  - `api/posts` - Post data endpoints
  - `api/stats/daily` - Analytics data
  - `api/uploadthing` - Image upload handler

### Data Layer Pattern

All database queries go through **Data Access Layer (DAL)** at `lib/dal/queries.ts` - never query database directly in components or pages. Server actions in `lib/actions/*` handle mutations and call `revalidatePath()` for cache invalidation.

```typescript
// ✅ Correct: Use DAL
import { getPosts } from "@/lib/dal/queries";
const posts = await getPosts();

// ❌ Incorrect: Direct db access in components
import { db } from "@/db/drizzle";
```

### Database Schema (`db/schema.ts`)

- **posts** table: Supports nested comments via self-referencing `parentId`, stores HTML content (from Tiptap), reactions as JSONB, soft-deletes via `isDeleted`
- **quizResults**: Stores per-university scores and top match. Universities enum: `["admu", "dlsu", "up", "ust"]`
- **Auth tables** (user, session, account, verification): Managed by Better Auth with Drizzle adapter
- **Important**: User table has `role` field (default: "user", admin: "admin") for access control

### Better Auth Configuration

Better Auth setup in [lib/auth.ts](lib/auth.ts) with critical configurations:

- Uses Drizzle adapter with Neon PostgreSQL
- GitHub OAuth provider (only auth method)
- `cookieCache.enabled: false` - **Critical**: Prevents stale session data in production
- Custom `role` field on user for admin features
- Next.js cookies plugin for server component auth

**Auth Helpers**: Use [lib/auth-helper.ts](lib/auth-helper.ts) functions (`getCurrentSession()`, `isAdmin()`, `requireAdmin()`) instead of direct auth calls.

### Rich Text Handling

Posts use **Tiptap editor** with HTML output. Always:

1. Use `<TiptapEditor>` component for input (in `components/editor/`)
2. Use `<PostContent>` for display (sanitizes with `isomorphic-dompurify`)
3. Validate by stripping HTML tags before checking length (see form validation pattern in `freedom-wall-form.tsx`)

### SSR/Client Boundaries

- **Critical**: Tiptap requires `immediatelyRender: false` in `useEditor()` config for SSR
- PostContent uses `isomorphic-dompurify` (not `dompurify`) for server-side sanitization
- Freedom wall: Server fetches data, passes to client component for interactions

### Event Handling Pattern

For clickable cards with nested buttons (reaction modal, images):

```typescript
// Container: onClick for navigation
<div onClick={() => router.push(`/post/${id}`)}>

  // Nested interactions: stopPropagation
  <button onClick={(e) => {
    e.stopPropagation();
    handleReaction();
  }}>
```

See `components/freedom-wall/post.tsx` and `reaction-modal.tsx` for reference.

## Development Workflows

### Package Manager

**Project uses Bun** - all commands use `bun` instead of npm/yarn/pnpm.

### Database

```bash
bun run db:push      # Push schema changes to Neon
bun run db:studio    # Open Drizzle Studio UI
```

See [drizzle.config.ts](drizzle.config.ts) for database configuration. Schema defined in [db/schema.ts](db/schema.ts), migrations output to `./migrations`.

### Running Dev Server

```bash
bun dev              # Start Next.js dev server (port 3000)
bun build            # Production build
bun start            # Start production server
bun lint             # Run ESLint
```

### Environment Variables Required

- `DATABASE_URL` - Neon PostgreSQL connection string
- `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` - Better Auth GitHub OAuth
- `UPLOADTHING_TOKEN` - Image upload service (for freedom wall image uploads)
- `BETTER_AUTH_SECRET` - Better Auth session encryption key

## Code Conventions

### Component Patterns

1. **Server Components by Default**: Only add `"use client"` when needed (hooks, event handlers)
2. **Form Handling**: React Hook Form + Zod schemas, shadcn/ui form components
3. **Styling**: Tailwind classes, no CSS modules. Use `cn()` utility for conditional classes
4. **Icons**: Use `lucide-react` package
5. **University Colors**: CSS variables for each school in [globals.css](app/globals.css):
   - `--admu-blue: #001196`
   - `--dlsu-green: #00703c`
   - `--up-maroon: #7b1113`
   - `--ust-gold: #fdb71a`
   - Also available as `--chart-1` through `--chart-4` for Recharts

### Server Actions

- Must be `"use server"` functions
- Always return `{ success: boolean, error?: string }` shape
- Call `revalidatePath()` after mutations
- See `lib/actions/post-actions.ts` pattern

### TypeScript Patterns

- Strict mode enabled - no implicit any
- Use Zod for runtime validation + type inference
- Database types auto-generated from schema via Drizzle

### Freedom Wall Specifics

- Posts support tags: `["general", "admu", "dlsu", "up", "ust"]`
- Reactions stored as JSONB: `{ like, love, haha, wow, sad, angry }`
- Comments are posts with `parentId` set (no depth limit)
- Images handled via UploadThing, optional per post

## Key Files for Context

- `db/schema.ts` - Complete data model
- `lib/dal/queries.ts` - All database queries
- `components/freedom-wall/` - Freedom wall feature components
- `components/quiz/` - Quiz implementation
- `lib/auth.ts` - Better Auth configuration
- `app/globals.css` - Tiptap/prose styling (lines 116+)

## Common Tasks

### Adding New Database Table

1. Define in `db/schema.ts` with relations
2. Add queries to `lib/dal/queries.ts`
3. Create server actions in `lib/actions/`
4. Run `bun run db:push`

### Adding New Form

1. Define Zod schema with validation
2. Use shadcn/ui form components
3. For rich text: use `<TiptapEditor>`, validate by stripping HTML
4. Create server action with `revalidatePath()`

### Admin Features

Check user role via `lib/auth-helper.ts` helpers. Admin routes in `app/(admin)/` directory.
