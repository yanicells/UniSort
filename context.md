# UniSort - Codebase Context

## Overview

UniSort is a **Next.js 16 web application** that helps Filipino students discover their ideal Big 4 university match through an interactive personality quiz, anonymous freedom wall, and comprehensive university information pages. The application focuses on the four major universities in the Philippines: Ateneo de Manila University (ADMU), De La Salle University (DLSU), University of the Philippines (UP), and University of Santo Tomas (UST).

The project follows a modern full-stack architecture with server components by default, a Data Access Layer (DAL) pattern for database queries, and server actions for mutations. It features a newspaper-themed UI design that gives the application a unique editorial aesthetic.

**Core Features:**

- **Personality Quiz**: 30+ question assessment scoring users across 4 categories to determine university fit
- **Freedom Wall**: Anonymous posting system with rich text editing, image uploads, reactions, and nested comments
- **University Pages**: Detailed tabloid-style pages with information about each university's culture, campus, and academics
- **Statistics Dashboard**: Real-time analytics showing quiz result distributions and trends
- **Admin Panel**: Protected route for moderating freedom wall posts

## Quick Start

- **Primary Language(s)**: TypeScript (strict mode)
- **Framework(s)**: Next.js 16 (App Router), React 19
- **Package Manager**: Bun
- **Entry Point**: `app/layout.tsx` (root layout), `app/page.tsx` (home page)
- **Build Command**: `bun build`
- **Run Command**: `bun dev`
- **Database**: Neon PostgreSQL with Drizzle ORM

### Environment Variables Required

```bash
DATABASE_URL=             # Neon PostgreSQL connection string
GITHUB_CLIENT_ID=         # Better Auth GitHub OAuth
GITHUB_CLIENT_SECRET=     # Better Auth GitHub OAuth
BETTER_AUTH_SECRET=       # Session encryption key
UPLOADTHING_TOKEN=        # Image upload service
```

## Project Structure

### Directory Layout

```
UniSort/
├── app/                          # Next.js App Router
│   ├── (admin)/                  # Admin routes (login, post management)
│   │   ├── admin/page.tsx        # Admin dashboard (protected)
│   │   └── login/page.tsx        # Admin login page
│   ├── (app)/                    # Main application routes
│   │   ├── admu/page.tsx         # ADMU university page
│   │   ├── dlsu/page.tsx         # DLSU university page
│   │   ├── up/page.tsx           # UP university page
│   │   ├── ust/page.tsx          # UST university page
│   │   ├── big4/page.tsx         # Big 4 comparison page
│   │   ├── freedom-wall/         # Freedom wall feature
│   │   │   ├── page.tsx          # Wall listing
│   │   │   └── [id]/page.tsx     # Single post view
│   │   ├── quiz/page.tsx         # Quiz page
│   │   └── stats/page.tsx        # Statistics dashboard
│   ├── about/page.tsx            # About page
│   ├── api/                      # API routes
│   │   ├── auth/[...all]/        # Better Auth catch-all
│   │   ├── posts/route.ts        # Posts API (GET with filters)
│   │   ├── stats/                # Statistics APIs
│   │   │   ├── route.ts          # Summary stats
│   │   │   └── daily/route.ts    # Daily breakdown
│   │   └── uploadthing/          # Image upload handler
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   ├── globals.css               # Global styles & CSS variables
│   ├── error.tsx                 # Error boundary
│   ├── not-found.tsx             # 404 page
│   └── sitemap.ts                # Dynamic sitemap
├── components/                   # React components
│   ├── admin/                    # Admin components
│   ├── charts/                   # Recharts visualization components
│   ├── editor/                   # Tiptap rich text editor
│   ├── freedom-wall/             # Freedom wall components
│   ├── home/                     # Homepage components
│   ├── layout/                   # Layout components (Navbar, Footer, etc.)
│   ├── quiz/                     # Quiz components
│   ├── stats/                    # Statistics components
│   ├── ui/                       # shadcn/ui components
│   └── university/               # University page components
├── db/                           # Database layer
│   ├── drizzle.ts                # Database connection
│   └── schema.ts                 # Drizzle schema definitions
├── lib/                          # Utilities and business logic
│   ├── actions/                  # Server actions
│   ├── dal/                      # Data Access Layer
│   ├── page-content/             # Static content data
│   ├── quiz/                     # Quiz logic and data
│   ├── seo/                      # SEO utilities
│   ├── auth.ts                   # Better Auth configuration
│   ├── auth-client.ts            # Client-side auth
│   ├── auth-helper.ts            # Auth helper functions
│   └── uploadthing.ts            # UploadThing components
├── public/                       # Static assets
├── migrations/                   # Drizzle migrations output
└── big-4-research/               # Research documents
```

### Key Directories Explained

- **app/(app)/\***: Main user-facing routes grouped for shared layout purposes
- **app/(admin)/\***: Admin-only routes with role-based access control
- **app/api/\***: API route handlers for data fetching and external service integration
- **components/**: Organized by feature domain (freedom-wall, quiz, charts, etc.)
- **db/**: Database configuration and schema - single source of truth for data models
- **lib/dal/**: Data Access Layer - ALL database queries must go through here
- **lib/actions/**: Server actions for data mutations with proper error handling
- **lib/quiz/**: Quiz-specific business logic (questions, scoring, categories)
- **lib/page-content/**: Static university data for tabloid-style pages

## Architecture

### Design Pattern

The application follows a **Server-First Architecture** with the following patterns:

1. **Server Components by Default**: Pages and layouts are server components
2. **Data Access Layer (DAL)**: All database operations centralized in `lib/dal/queries.ts`
3. **Server Actions**: Mutations handled via React Server Actions in `lib/actions/`
4. **API Routes**: Used for client-side data fetching with filters/pagination

### Component Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Next.js App Router                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐       │
│  │  (app)/*     │    │  (admin)/*   │    │   api/*      │       │
│  │  Routes      │    │  Routes      │    │   Routes     │       │
│  └──────┬───────┘    └──────┬───────┘    └──────┬───────┘       │
│         │                   │                   │                │
│         ▼                   ▼                   ▼                │
│  ┌────────────────────────────────────────────────────────┐     │
│  │              Server Components / API Handlers           │     │
│  └────────────────────────┬───────────────────────────────┘     │
│                           │                                      │
│         ┌─────────────────┼─────────────────┐                   │
│         ▼                 ▼                 ▼                   │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐           │
│  │   DAL       │   │   Server    │   │   Auth      │           │
│  │ (queries.ts)│   │   Actions   │   │   Helper    │           │
│  └──────┬──────┘   └──────┬──────┘   └──────┬──────┘           │
│         │                 │                 │                   │
│         └─────────────────┼─────────────────┘                   │
│                           ▼                                      │
│  ┌────────────────────────────────────────────────────────┐     │
│  │              Drizzle ORM + Neon PostgreSQL              │     │
│  └────────────────────────────────────────────────────────┘     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

Client Components:
┌─────────────────────────────────────────────────────────────────┐
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  WallClient  │  │  QuizView    │  │  StatsClient │          │
│  │  (freedom    │  │  (quiz       │  │  (stats      │          │
│  │   wall UI)   │  │   logic)     │  │   charts)    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│         │                 │                 │                   │
│         └─────────────────┼─────────────────┘                   │
│                           ▼                                      │
│  ┌────────────────────────────────────────────────────────┐     │
│  │         fetch() to /api/* routes for data               │     │
│  └────────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
```

### Core Components

#### Data Access Layer (DAL)

- **Location**: `lib/dal/queries.ts`
- **Purpose**: Centralized database query functions - the ONLY place that directly interacts with the database
- **Key Functions**:
  - `getPosts()`, `getPostById()`, `createPost()`, `deletePost()` - Post operations
  - `getWallPosts()` - Paginated, filterable post listing
  - `getAllNestedComments()` - Recursive comment fetching
  - `addReaction()` - Reaction updates
  - `saveQuizResult()`, `getQuizSummary()` - Quiz result operations
  - `getDailyResultsCounts()`, `getAverageUniversityScores()` - Analytics
- **Dependencies**: `drizzle-orm`, `@neondatabase/serverless`
- **Used By**: Server actions, API routes, server components

#### Server Actions

- **Location**: `lib/actions/`
- **Files**:
  - `post-actions.ts` - Create/delete posts with retry logic
  - `quiz-actions.ts` - Save quiz results
  - `reaction-actions.ts` - Add reactions
  - `auth-actions.ts` - Sign in/out flows
- **Pattern**: All return `{ success: boolean, error?: string }` shape
- **Features**: Exponential backoff retry (MAX_RETRIES = 2)

#### Authentication System

- **Location**: `lib/auth.ts`, `lib/auth-helper.ts`, `lib/auth-client.ts`
- **Provider**: Better Auth with GitHub OAuth
- **Key Configuration**:
  - `cookieCache.enabled: false` - Prevents stale session data
  - Custom `role` field on user (`user` | `admin`)
  - Drizzle adapter for Neon PostgreSQL
- **Helper Functions**:
  - `getCurrentSession()` - Get current user session
  - `isAdmin()` - Check if user is admin
  - `requireAdmin()` - Protect routes (redirects if not admin)

#### Quiz System

- **Location**: `lib/quiz/`
- **Files**:
  - `quiz-data.ts` - 30+ questions with per-university scoring
  - `scoring.ts` - Score calculation with detailed breakdown
  - `categories.ts` - Question category mapping
  - `quiz-constants.ts` - Max/min scores per university
- **Scoring**: Each answer awards points per university (0-20 range), normalized against dynamic max scores

#### Freedom Wall

- **Location**: `components/freedom-wall/`
- **Key Components**:
  - `WallClient` - Main wall with infinite scroll, filtering, URL state
  - `Post` - Individual post card with reactions
  - `PostModal` - Create/reply modal with Tiptap editor
  - `PostContent` - Sanitized HTML rendering
  - `ReactionModal` - Emoji reaction picker

## Data Flow

### Request/Response Cycle - Freedom Wall Posts

1. **User visits `/freedom-wall`**
   - Server renders `WallClient` wrapper with Suspense
   - Client component mounts, reads URL params for initial filters

2. **Client fetches posts**
   - `WallClient` calls `fetch('/api/posts?page=1&sortBy=latest')`
   - API route (`app/api/posts/route.ts`) calls `getWallPosts()` from DAL
   - DAL queries database with filters, calculates comment counts
   - Returns JSON with posts array

3. **User creates a post**
   - `PostModal` collects content via Tiptap editor
   - Optional image upload via UploadThing
   - Calls server action `createPostAction()`
   - Server action calls `createPost()` in DAL
   - Client refreshes post list

4. **User adds a reaction**
   - `ReactionModal` captures reaction type
   - Calls server action `handleAddReaction()`
   - DAL updates JSONB reactions field
   - Client optimistically updates UI

### Quiz Flow

1. **User enters name** → stored in `localStorage`
2. **User answers questions** → answers tracked in state array
3. **Quiz completes**:
   - `calculateDetailedScores()` computes per-university totals
   - Determines `topMatch` based on normalized percentages
   - Calls `saveQuizResultAction()` to persist to database
   - Stores result in `localStorage` for persistence

### State Management

- **Server State**: Managed via API routes + React Server Components
- **Client State**: React `useState` for UI state, URL params for filters
- **Persistence**: `localStorage` for quiz progress/results
- **Caching**: Disabled (`dynamic = "force-dynamic"`) for real-time data

## Key Files Reference

### Configuration Files

| File                | Purpose                                             |
| ------------------- | --------------------------------------------------- |
| `package.json`      | Dependencies, scripts (uses Bun)                    |
| `drizzle.config.ts` | Drizzle Kit config (schema path, migrations output) |
| `tsconfig.json`     | TypeScript strict mode config                       |
| `next.config.ts`    | Next.js configuration                               |
| `components.json`   | shadcn/ui component registry                        |

### Entry Points

| File             | Purpose                                                |
| ---------------- | ------------------------------------------------------ |
| `app/layout.tsx` | Root layout with fonts, SEO, ToastProvider             |
| `app/page.tsx`   | Home page with recent posts, stats preview             |
| `db/drizzle.ts`  | Database connection singleton with lazy initialization |
| `lib/auth.ts`    | Better Auth configuration                              |

### Critical Business Logic

| File                                  | Purpose                                         |
| ------------------------------------- | ----------------------------------------------- |
| `lib/dal/queries.ts`                  | ALL database operations (408 lines)             |
| `lib/quiz/scoring.ts`                 | Quiz score calculation algorithm                |
| `lib/quiz/quiz-data.ts`               | Quiz questions and scoring weights (1023 lines) |
| `lib/page-content/university-data.ts` | University content for tabloid pages            |

## Database Schema

### Tables

#### `user`

```
id            TEXT PRIMARY KEY
name          TEXT NOT NULL
email         TEXT NOT NULL UNIQUE
emailVerified BOOLEAN DEFAULT false
image         TEXT
role          TEXT DEFAULT 'user'        -- 'user' | 'admin'
createdAt     TIMESTAMP DEFAULT NOW()
updatedAt     TIMESTAMP
```

#### `session`, `account`, `verification`

Better Auth managed tables for authentication. See `db/schema.ts` for full definitions.

#### `posts`

```
id         UUID PRIMARY KEY DEFAULT random()
content    TEXT NOT NULL                 -- HTML from Tiptap
parentId   UUID                          -- Self-reference for comments
tags       TEXT[] DEFAULT ['general']    -- ['general', 'admu', 'dlsu', 'up', 'ust']
imageUrl   TEXT                          -- UploadThing URL
reactions  JSONB DEFAULT {like:0, love:0, haha:0, wow:0, sad:0, angry:0}
createdAt  TIMESTAMP DEFAULT NOW()
isDeleted  BOOLEAN DEFAULT false         -- Soft delete
```

#### `quiz_results`

```
id        UUID PRIMARY KEY DEFAULT random()
name      TEXT NOT NULL
topMatch  TEXT NOT NULL                  -- ENUM: admu, dlsu, up, ust
scores    JSONB NOT NULL                 -- {admu: number, dlsu: number, up: number, ust: number}
createdAt TIMESTAMP DEFAULT NOW()
```

### Relationships

- `posts.parentId` → `posts.id` (self-referencing for nested comments)
- `session.userId` → `user.id` (cascade delete)
- `account.userId` → `user.id` (cascade delete)

### Database Commands

```bash
bun run db:push     # Push schema changes to Neon
bun run db:studio   # Open Drizzle Studio UI
```

## API Reference

### Posts API

#### `GET /api/posts`

Fetch paginated posts with filters.

| Parameter  | Type     | Default | Description                                   |
| ---------- | -------- | ------- | --------------------------------------------- |
| page       | number   | 1       | Page number                                   |
| limit      | number   | 10      | Posts per page                                |
| university | string[] | []      | Filter by tags (admu, dlsu, up, ust, general) |
| sortBy     | string   | latest  | Sort: latest, most-liked, most-discussed      |
| timeRange  | string   | all     | Filter: all, week, month                      |

**Response**:

```json
{
  "posts": [
    {
      "id": "uuid",
      "content": "<p>HTML content</p>",
      "tags": ["general"],
      "reactions": {"like": 5, "love": 2, ...},
      "createdAt": "2024-01-01T00:00:00Z",
      "imageUrl": "https://...",
      "commentCount": 3
    }
  ]
}
```

### Stats APIs

#### `GET /api/stats`

Get overall quiz statistics.

**Response**:

```json
{
  "summary": {"total": 1000, "admu": 250, "dlsu": 300, "up": 200, "ust": 250},
  "distribution": [{"uni": "admu", "count": 250}, ...],
  "averageScores": {"admu": 350, "dlsu": 380, ...}
}
```

#### `GET /api/stats/daily`

Get daily quiz results breakdown.

| Parameter | Type   | Default | Description                 |
| --------- | ------ | ------- | --------------------------- |
| days      | number | 30      | Number of days to fetch     |
| filter    | string | all     | Filter by university or all |

### Auth API

#### `[...all] /api/auth/*`

Better Auth catch-all route. Handles:

- `POST /api/auth/sign-in/social` - OAuth initiation
- `POST /api/auth/sign-out` - Sign out
- `GET /api/auth/session` - Get current session

### UploadThing API

#### `POST /api/uploadthing`

Image upload handler.

- Max file size: 4MB
- Max file count: 1
- Returns: `{ url: string }`

## Module Dependency Map

### Import Relationships

```
app/(app)/freedom-wall/page.tsx
  └── components/freedom-wall/wall-client.tsx
        ├── components/freedom-wall/post.tsx
        │     ├── components/freedom-wall/PostContent.tsx
        │     ├── components/freedom-wall/reaction-modal.tsx
        │     └── components/freedom-wall/image-lightbox.tsx
        ├── components/freedom-wall/post-modal.tsx
        │     └── components/editor/TiptapEditor.tsx
        └── components/freedom-wall/filter-bar.tsx

app/(app)/quiz/page.tsx
  └── components/quiz/quiz.tsx
        └── components/quiz/quiz-view.tsx
              ├── components/quiz/results.tsx
              └── lib/quiz/scoring.ts
                    ├── lib/quiz/quiz-data.ts
                    ├── lib/quiz/categories.ts
                    └── lib/quiz/quiz-constants.ts

lib/actions/post-actions.ts
  └── lib/dal/queries.ts
        └── db/drizzle.ts
              └── db/schema.ts
```

### Third-Party Dependencies

| Package                    | Purpose                       |
| -------------------------- | ----------------------------- |
| `better-auth`              | Authentication (GitHub OAuth) |
| `drizzle-orm`              | Database ORM                  |
| `@neondatabase/serverless` | PostgreSQL driver             |
| `@tiptap/react`            | Rich text editor              |
| `uploadthing`              | Image uploads                 |
| `recharts`                 | Chart visualizations          |
| `react-hook-form` + `zod`  | Form handling and validation  |
| `date-fns`                 | Date formatting               |
| `dompurify`                | HTML sanitization             |
| `lucide-react`             | Icons                         |

## Common Operations

### How to Add a New Database Table

1. **Define schema** in `db/schema.ts`:

   ```typescript
   export const newTable = pgTable("new_table", {
     id: uuid("id").primaryKey().defaultRandom(),
     // ... fields
   });
   ```

2. **Add relations** if needed:

   ```typescript
   export const newTableRelations = relations(newTable, ({ one, many }) => ({
     // ... relations
   }));
   ```

3. **Add to schema export**:

   ```typescript
   export const schema = { ...existing, newTable };
   ```

4. **Add queries** in `lib/dal/queries.ts`

5. **Create server action** in `lib/actions/`

6. **Push to database**:
   ```bash
   bun run db:push
   ```

### How to Add a New Freedom Wall Feature

1. **Update Post component** (`components/freedom-wall/post.tsx`) for UI changes
2. **Add DAL query** if new data needed
3. **Create server action** for mutations
4. **Update WallClient** for filtering/sorting

### How to Modify Quiz Questions

1. Edit `lib/quiz/quiz-data.ts` - add/modify questions
2. Each choice needs scores for all 4 universities
3. Run `scripts/calculate-max-scores.ts` to update constants
4. Update `lib/quiz/quiz-constants.ts` with new max/min scores

## Testing

Currently no automated tests. Manual testing recommended for:

- Quiz flow (name entry → questions → results → localStorage persistence)
- Freedom wall (create post → reactions → comments → filters)
- Admin flow (login → view posts → delete)

## Build & Deployment

### Build Process

```bash
bun build        # Creates .next/ production build
bun start        # Starts production server
```

### Environment Variables

| Variable               | Required | Description                       |
| ---------------------- | -------- | --------------------------------- |
| `DATABASE_URL`         | Yes      | Neon PostgreSQL connection string |
| `GITHUB_CLIENT_ID`     | Yes      | GitHub OAuth app ID               |
| `GITHUB_CLIENT_SECRET` | Yes      | GitHub OAuth secret               |
| `BETTER_AUTH_SECRET`   | Yes      | Session encryption key            |
| `UPLOADTHING_TOKEN`    | Yes      | UploadThing API token             |
| `BETTER_AUTH_URL`      | Optional | Auth callback URL base            |

### Deployment

- Optimized for Vercel deployment
- Uses Vercel Analytics (`@vercel/analytics`)
- Neon PostgreSQL for serverless-compatible database

## Security & Authentication

### Authentication Flow

1. User clicks "Login with GitHub" on `/login`
2. `signInSocial("github")` redirects to GitHub OAuth
3. GitHub redirects back with code
4. Better Auth creates session, sets cookie
5. Session available via `getCurrentSession()`

### Authorization

- **Admin routes**: Protected by `requireAdmin()` in server components
- Checks `user.role === "admin"`, redirects to `/` if not

### Sensitive Data

- Secrets stored in environment variables
- Session cookies are HTTP-only
- No client-side exposure of credentials

## Error Handling

### Server Action Pattern

```typescript
export async function someAction(data) {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      // ... operation
      return { success: true, data: result };
    } catch (error) {
      if (attempt < MAX_RETRIES) {
        await new Promise((r) => setTimeout(r, Math.pow(2, attempt) * 300));
      }
    }
  }
  return { success: false, error: "Operation failed" };
}
```

### API Route Pattern

```typescript
export async function GET() {
  try {
    const data = await dalFunction();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
```

## Development Guidelines

### Code Conventions

1. **Server Components by Default** - Only add `"use client"` when needed
2. **DAL Pattern** - Never query database directly in components
3. **TypeScript Strict** - No implicit any, use Zod for runtime validation
4. **Styling** - Tailwind classes, use `cn()` for conditional classes
5. **Icons** - Use `lucide-react` package

### Component Patterns

```typescript
// ✅ Server component (default)
export default async function Page() {
  const data = await getPosts();
  return <ClientComponent posts={data} />;
}

// ✅ Client component with proper hydration
"use client";
export function ClientComponent({ posts }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null; // Prevent hydration mismatch
  // ...
}
```

### Rich Text Handling

- Use `<TiptapEditor>` with `immediatelyRender: false` for SSR
- Use `<PostContent>` for display (sanitizes with DOMPurify)
- Validate by stripping HTML before checking length

### University Colors (CSS Variables)

```css
--admu-blue: #001196 --dlsu-green: #00703c --up-maroon: #7b1113
  --ust-gold: #fdb71a;
```

## Troubleshooting

### Common Issues

| Issue                     | Solution                                           |
| ------------------------- | -------------------------------------------------- |
| Stale session data        | Ensure `cookieCache.enabled: false` in auth config |
| Tiptap hydration error    | Use `immediatelyRender: false` in `useEditor()`    |
| Database connection error | Check `DATABASE_URL` env variable                  |
| Image upload fails        | Verify `UPLOADTHING_TOKEN` is set                  |
| Admin route accessible    | Check user role in database                        |

### Debug Commands

```bash
bun run db:studio    # Inspect database directly
bun dev              # Check terminal for error logs
```

## Performance Considerations

- **API caching disabled** (`dynamic = "force-dynamic"`) for real-time data
- **Comment counting** uses batch query with recursive map building
- **Infinite scroll** with pagination to limit initial load
- **Image optimization** via Next.js Image component where applicable

## Known Limitations

- No automated testing suite
- Single OAuth provider (GitHub only)
- No rate limiting on API routes
- Comments have no depth limit (potential performance issue with deep nesting)
- Quiz results stored indefinitely (no cleanup)

## Additional Resources

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [Better Auth Documentation](https://better-auth.com)
- [Tiptap Documentation](https://tiptap.dev/docs)
- [UploadThing Documentation](https://uploadthing.com/docs)

## Last Updated

**January 31, 2026** - Initial comprehensive context documentation
