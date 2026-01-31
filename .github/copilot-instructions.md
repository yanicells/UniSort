# UniSort - Copilot Instructions

## Project Overview

Next.js 16 app (App Router) helping Filipino students discover their Big 4 university fit (ADMU, DLSU, UP, UST) through a personality quiz, anonymous freedom wall, and university info pages. Uses **Bun** as package manager.

**Stack**: TypeScript (strict), Drizzle ORM + Neon PostgreSQL, Better Auth (GitHub OAuth), shadcn/ui, Tiptap editor, UploadThing, Recharts.

## Critical Architecture Patterns

### Data Access Layer (DAL) - MANDATORY

**ALL database queries go through `lib/dal/queries.ts`** - never import `db` directly in components/pages.

```typescript
// ✅ Correct
import { getPosts } from "@/lib/dal/queries";

// ❌ Never do this
import { db } from "@/db/drizzle";
```

### Server Actions Pattern

All mutations use server actions in `lib/actions/*` with retry logic:

```typescript
// Always return this shape
return { success: true, data: result };
return { success: false, error: "message" };
```

See `lib/actions/post-actions.ts` for exponential backoff pattern (MAX_RETRIES = 2).

### Auth Helpers - Use These, Not Direct Auth

```typescript
import { getCurrentSession, isAdmin, requireAdmin } from "@/lib/auth-helper";
// requireAdmin() auto-redirects unauthorized users
```

**Critical**: `cookieCache.enabled: false` in `lib/auth.ts` prevents stale sessions.

## Key Domain Knowledge

### Posts & Comments

Posts table uses self-referencing `parentId` for nested comments (unlimited depth). Schema in `db/schema.ts`:

- `content`: HTML from Tiptap
- `reactions`: JSONB `{ like, love, haha, wow, sad, angry }`
- `tags`: Array `["general", "admu", "dlsu", "up", "ust"]`
- `isDeleted`: Soft delete flag

### Quiz Scoring

Quiz logic in `lib/quiz/`:

- `quiz-data.ts`: 30+ questions with per-university point values (0-20 range)
- `scoring.ts`: Calculates normalized percentages against dynamic max scores
- `quiz-constants.ts`: Pre-calculated MAX_SCORES/MIN_SCORES per university

### University Colors (CSS Variables)

```css
--admu-blue: #001196;  --chart-1
--dlsu-green: #00703c; --chart-2
--up-maroon: #7b1113;  --chart-3
--ust-gold: #fdb71a;   --chart-4
```

## SSR/Client Boundary Rules

1. **Server Components by default** - only add `"use client"` when needed
2. **Tiptap SSR fix**: Always use `immediatelyRender: false` in `useEditor()`
3. **Hydration pattern** for client components:
   ```typescript
   const [mounted, setMounted] = useState(false);
   useEffect(() => setMounted(true), []);
   if (!mounted) return null;
   ```
4. **PostContent** uses dynamic `dompurify` import for client-only sanitization

## Event Handling in Clickable Cards

```typescript
// Container handles navigation
<div onClick={() => router.push(`/post/${id}`)}>
  // Nested buttons must stopPropagation
  <button onClick={(e) => { e.stopPropagation(); handleReaction(); }}>
```

## Commands

```bash
bun dev           # Dev server
bun run db:push   # Push schema to Neon
bun run db:studio # Drizzle Studio GUI
```

## Common Tasks

### Add Database Table

1. Define in `db/schema.ts` with relations
2. Add queries to `lib/dal/queries.ts`
3. Create server action in `lib/actions/`
4. Run `bun run db:push`

### Add Freedom Wall Feature

1. Update `components/freedom-wall/post.tsx` for UI
2. Add DAL query if new data needed
3. Create server action for mutations
4. Update `WallClient` for filtering/state

### Modify Quiz Questions

1. Edit `lib/quiz/quiz-data.ts` (each choice needs scores for all 4 universities)
2. Run `scripts/calculate-max-scores.ts`
3. Update `lib/quiz/quiz-constants.ts` with new max/min values

## Key File Reference

| Purpose            | Location                                       |
| ------------------ | ---------------------------------------------- |
| Database schema    | `db/schema.ts`                                 |
| All DB queries     | `lib/dal/queries.ts`                           |
| Auth config        | `lib/auth.ts`, `lib/auth-helper.ts`            |
| Quiz logic         | `lib/quiz/scoring.ts`, `lib/quiz/quiz-data.ts` |
| Freedom wall       | `components/freedom-wall/`                     |
| Rich text editor   | `components/editor/TiptapEditor.tsx`           |
| University content | `lib/page-content/university-data.ts`          |
| Global styles      | `app/globals.css`                              |
