# UniSort — Dataset & Instrument Brief for Data Viz Final Project

> **Purpose of this file.** A self-contained handoff document. In a fresh conversation you can hand this
> file to an analyst/agent and they will understand: what UniSort is, exactly what data it produces, the
> full survey instrument and scoring math behind it, and ready-to-use sample datasets — enough to design a
> dashboard or data story without opening the codebase.
>
> This file is **descriptive, not prescriptive**: it documents the data faithfully and leaves the choice of
> insights, angles, and chart types to the design conversation.

---

## 1. What UniSort Is

**UniSort** ("The Daily Sorting Hat") is a Next.js web app that matches Filipino college applicants to one
of the "Big Four" universities in Metro Manila based on a personality/preferences quiz. The four universities:

| Code | University | One-line identity (per app's own research) |
|------|-----------|---------------------------------------------|
| `admu` | Ateneo de Manila University | Jesuit, holistic formation, "conyo" elite, green Katipunan campus, strong support services |
| `dlsu` | De La Salle University | Trimester grind, corporate/professional networking, modern vertical campus, "Happy Thursday" |
| `up`   | University of the Philippines | Free tuition, activist/independent, secular, diverse, dysfunctional-but-beloved admin (CRS) |
| `ust`  | University of Santo Tomas | Catholic tradition, block sections, uniforms, "Waterworld" flooding, resilient middle-class |

The app has three data-producing surfaces:
1. **The Sorting Quiz** → writes to `quiz_results` (the primary analytic dataset).
2. **The Freedom Wall** → an anonymous post/reply board → writes to `posts`.
3. **A live Stats page** → already aggregates `quiz_results` into charts (Recharts).

**Tech stack:** Next.js 16 (App Router), PostgreSQL on Neon, Drizzle ORM, Better Auth, Recharts, Tiptap.

---

## 2. The Datasets (Database Schema)

Source of truth: [`db/schema.ts`](../db/schema.ts). Two tables matter for analysis.

### 2.1 `quiz_results` — PRIMARY dataset

One row per completed quiz. This is the dataset most suited to a dashboard/data story.

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid (PK) | random |
| `name` | text | user-entered display name (free text, not verified — treat as a nickname) |
| `top_match` | enum `admu \| dlsu \| up \| ust` | the winning university |
| `scores` | jsonb `{admu, dlsu, up, ust}` | **raw** total points per university (integers) |
| `created_at` | timestamp | server time of completion |

**Critical detail — how `top_match` and `scores` are derived** (from [`components/quiz/quiz-view.tsx`](../components/quiz/quiz-view.tsx) and [`lib/quiz/scoring.ts`](../lib/quiz/scoring.ts)):

- `scores[uni]` = **raw sum** of the point weights of every choice the user picked, for that university.
- `top_match` is **NOT** simply the highest raw score. It is `argmax( scores[uni] / maxPossible[uni] )`
  — i.e. the university with the highest **percentage of its own maximum**. This matters because the four
  universities have different maximum attainable totals, so raw scores are **not directly comparable across
  universities**. (See §4 for the normalization constants.)
- A user answers all 30 questions; a few questions have 3 choices, most have 4.

**Analytic consequence:** if you want a *fair* cross-university comparison you should normalize raw scores
using the MIN/MAX constants in §4 (`normalized% = (raw - min) / (max - min) * 100`). Raw scores alone will
systematically favor UP (highest ceiling, 576) and understate UST (lowest ceiling, 497).

### 2.2 `posts` — Freedom Wall (secondary dataset)

Anonymous board with threaded replies and emoji reactions.

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid (PK) | |
| `content` | text | rich-text/HTML body |
| `parent_id` | uuid nullable | `null` = top-level post; else it's a reply (self-referential, arbitrarily nested) |
| `tags` | text[] | e.g. `["admu"]`, `["general","hot-take"]`. Values seen: `general, admu, dlsu, up, ust` + category tags like `hot-take` |
| `image_url` | text nullable | optional attached image |
| `reactions` | jsonb `{like, love, haha, wow, sad, angry}` | counts per reaction type |
| `created_at` | timestamp | |
| `is_deleted` | boolean | soft-delete flag; filter `= false` |

**Other tables** (`user`, `session`, `account`, `verification`) are auth/Better-Auth plumbing — **not**
analytically interesting and mostly empty of real users (quiz is anonymous). Ignore them.

---

## 3. The Survey Instrument (the Quiz)

Source: [`lib/quiz/quiz-data.ts`](../lib/quiz/quiz-data.ts). This is effectively a **weighted survey
instrument** — every answer option carries a point weight toward each of the four universities. It doubles
as a rich data dictionary of *what dimensions of student life are being measured*.

### 3.1 Structure

- **30 questions**, each belonging to one **section**.
- **12 sections**, grouped into **4 macro-categories** (mapping from [`lib/quiz/categories.ts`](../lib/quiz/categories.ts)):

| Macro-category | Sections it contains |
|----------------|----------------------|
| **Academic Experience** | Academic Structure & Admin Support · Schedule, Pace & Structure |
| **Social & Cultural Fit** | Social Environment, Class & Language · Student Organizations & Networking |
| **Campus Life** | Campus Environment, Aesthetics & Safety · Lifestyle, Food & Financials · Social Life & Traditions |
| **Values & Identity** | Values, Religion & Personal Growth · Political Climate & Activism · Inclusivity, Expression & Mental Health |

### 3.2 Shape of each question

```jsonc
{
  "section": "Academic Structure & Admin Support",
  "question": "Your ideal learning environment includes:",
  "choices": [
    { "text": "Oral exams and discussions where I defend my ideas verbally", "admu": 20, "dlsu": 2, "up": 6, "ust": 3 },
    { "text": "Fast-paced lectures with multiple assessments...",            "admu": 6,  "dlsu": 20, "up": 4, "ust": 6 },
    ...
  ],
  "rationale": "ADMU is famous for oral exams in Philosophy... DLSU's trimestral system... "
}
```

Every choice has a `rationale` string explaining the real-world basis (great source of narrative captions
for a data story). Weights are integers, typically `0–20`, where `20` = the answer most characteristic of
that university.

### 3.3 The 12 sections & sample question themes

The full text of all 30 questions and their weights lives in `sample-data/quiz_questions.json` (extracted
verbatim). Themes by section:

1. **Academic Structure & Admin Support** — oral exams vs volume/memorization; expectation of hand-holding; enlistment systems (Ateneo organized ↔ UP's "Hunger Games" CRS).
2. **Schedule, Pace & Structure** — trimester vs semester; on-time vs delayed graduation; block vs flexible schedules.
3. **Social Environment, Class & Language** — "conyo" vs "kanal" humor; English-as-instruction; comfort with an elite/wealthy student body; finding community as a provincial/low-income student.
4. **Student Organizations & Networking** — intense "apps" processes; orgs as corporate training vs advocacy vs brotherhood; networking style.
5. **Political Climate & Activism** — frontline activism ↔ suppressed expression (UP militant ↔ UST OSA-censored).
6. **Campus Environment, Aesthetics & Safety** — campus vibe; getting around; "the Bubble" vs urban grit; **flooding**; safety concerns.
7. **Lifestyle, Food & Financials** — lunch budget (₱60 ↔ ₱250+); financial priority (free tuition ↔ premium ROI).
8. **Social Life & Traditions** — weeknight drinking culture; large-scale traditions (Paskuhan, UP Fair).
9. **Values, Religion & Personal Growth** — role of religion (secular UP ↔ mandatory theology UST); desired personal transformation.
10. **Inclusivity, Expression & Mental Health** — dress-code/appearance freedom; LGBTQ+ inclusivity; mental-health services.

*(Sections map to the 4 macro-categories per the table in §3.1.)*

---

## 4. Scoring & Normalization Constants

From [`lib/quiz/quiz-constants.ts`](../lib/quiz/quiz-constants.ts). Needed to fairly compare universities
and to reproduce the app's "match %" and compatibility tiers.

**Totals (all 30 questions answered):**

| Uni | MIN score | MAX score | Range |
|-----|-----------|-----------|-------|
| admu | 93 | 502 | 409 |
| dlsu | 88 | 531 | 443 |
| up   | 59 | 576 | 517 |
| ust  | 92 | 497 | 405 |

**Normalized match %** (what the app shows the user):
`normalized% = round( (raw_score − MIN) / (MAX − MIN) × 100 )`

**Per-category MAX** (for a per-dimension radar/heatmap — normalized the same way with per-category MIN):

| Category | admu | dlsu | up | ust |
|----------|-----:|-----:|---:|----:|
| Academic Experience | 113 | 124 | 140 | 102 |
| Social & Cultural Fit | 120 | 122 | 136 | 121 |
| Campus Life | 140 | 169 | 164 | 149 |
| Values & Identity | 129 | 116 | 136 | 125 |

**Per-category MIN:** admu `{15,21,32,25}` · dlsu `{11,19,27,31}` · up `{2,14,29,14}` · ust `{13,33,30,16}`
(order: Academic, Social, Campus, Values). Full constants in `sample-data/scoring_constants.json`.

**Compatibility tiers** (applied to normalized %): `≥85 Perfect Match · ≥70 Strong Alignment · ≥50 Good Fit · ≥30 Moderate Interest · <30 Low Compatibility`.

---

## 5. What the App Already Computes (don't re-invent; differentiate from)

The rubric requires your insights/viz to differ from what's already shown. The live Stats page
([`lib/dal/queries.ts`](../lib/dal/queries.ts), [`components/charts/`](../components/charts/)) already renders:

- **Summary "big number" cards** — total quizzes taken + count per university (`getQuizSummary`).
- **Overall results distribution** — bar + pie of `top_match` counts (`getOverallResultsDistribution`).
- **Average university scores** — bar of mean raw score per uni (`getAverageUniversityScores`).
- **Daily results over time** — stacked/grouped bar of daily top-match counts, filterable by uni & day-range (`getDailyResultsCounts`).
- **Individual scores pie** — per-user breakdown.

Chart library already in repo: **Recharts** (bar, pie). So a fresh project should lean into viz types the
app does **not** already use (e.g. radar per category, heatmap, slope/tornado/sankey, stream over time,
combo charts) and/or the **category-level** and **Freedom-Wall** data the Stats page ignores.

---

## 6. Sample Data (synthetic, ready to load)

Located in [`sample-data/`](sample-data/). **These are synthetic** — generated by simulating realistic
respondents through the *actual* scoring weights and constants above, so distributions and score ranges are
faithful to what the real app produces. Use them to prototype; swap for a real DB export before final
submission if desired (see §7).

| File | Rows | Grain | Best for |
|------|-----:|-------|----------|
| `quiz_results.csv` | 400 | one row per respondent (mirrors DB table; scores as 4 columns) | KPI cards, top-match distribution, time series |
| `quiz_results_long.csv` | 1,600 | one row per respondent × university (tidy/long) | Tableau-friendly; grouped bars, slope charts, score comparisons |
| `quiz_results_categories.csv` | 6,400 | respondent × macro-category × university | radar charts, category heatmaps, "where each uni wins" |
| `freedom_wall_posts.csv` | 105 | one row per post/reply (45 top-level + 60 replies), reactions split into columns + `total_reactions` | engagement analysis, reaction mix, tag activity |
| `quiz_questions.json` | 30 Qs | full instrument with weights + rationale | data dictionary, narrative captions, "which question discriminates most" |
| `scoring_constants.json` | — | MIN/MAX totals + per-category | normalization, match %, tiers |

**Generated sample aggregates** (so you know what to expect, N=400):

- Top-match distribution: **ADMU 36.3% · UP 26.3% · DLSU 23.0% · UST 14.5%**
- Avg raw score: admu 314 · dlsu 291 · up 289 · ust 245
- Avg **normalized %**: admu 54 · dlsu 46 · up 44 · ust 38 *(note how normalization compresses the gap that raw scores exaggerate)*
- Date range: ~60 days ending 2026-07-06.

### Sample rows

`quiz_results.csv`:
```
id,name,top_match,score_admu,score_dlsu,score_up,score_ust,created_at
08e3fb91-...,"Althea Villanueva",ust,160,189,307,455,2026-05-07T22:09:31.749Z
df561435-...,"Ysabel Torres",dlsu,279,371,229,276,2026-05-07T22:18:57.350Z
```

`quiz_results_long.csv` (tidy — one uni per row, `is_top_match` flag):
```
id,name,top_match,university,raw_score,is_top_match,created_at
08e3fb91-...,"Althea Villanueva",ust,admu,160,0,2026-05-07T...
08e3fb91-...,"Althea Villanueva",ust,ust,455,1,2026-05-07T...
```

`freedom_wall_posts.csv`:
```
id,content,parent_id,tags,react_like,...,total_reactions,created_at,is_deleted
0a7aac7b-...,"the green campus genuinely lowers my cortisol...",,"up|question",17,...,42,2026-05-24T...,false
```

> ⚠️ **On raw vs normalized in the sample:** `scores` columns are **raw** (matching the DB). Apply §4
> normalization for fair cross-university comparison. `top_match` in the sample already uses the correct
> percentage-of-max rule, so a respondent's `top_match` can differ from their single highest raw column
> (e.g. a "UP" raw score often looks large but loses on percentage).

---

## 7. Getting REAL data (optional, for final submission)

The app has a live Neon Postgres (`DATABASE_URL` in `.env`). To export real rows instead of the synthetic
sample:

- The live JSON stats endpoint is `GET /api/stats` (summary + distribution + average scores) and
  `GET /api/stats/daily?days=30&filter=all` (daily counts). These are already aggregated.
- For row-level export, run SQL against Neon, e.g.
  `COPY (SELECT id, name, top_match, scores, created_at FROM quiz_results) TO STDOUT WITH CSV HEADER;`
  or `SELECT ... FROM post WHERE is_deleted = false;`
- **Caution:** real `name` values are user-entered and may contain PII-ish nicknames — anonymize before publishing.

Whether the real dataset has enough rows for a compelling story is unknown from the code alone — verify row
counts first; the synthetic 400-row set is a safe fallback that is statistically well-behaved.

---

## 8. Data Dictionary Quick-Reference (for the analyst)

| Field | Values / Range | Gotchas |
|-------|----------------|---------|
| `top_match` | `admu, dlsu, up, ust` | percentage-of-max winner, not raw-max winner |
| `scores.admu` | 93–502 | raw; normalize before comparing to other unis |
| `scores.dlsu` | 88–531 | raw |
| `scores.up`   | 59–576 | raw; **highest ceiling** — inflated in raw comparisons |
| `scores.ust`  | 92–497 | raw; **lowest ceiling** — deflated in raw comparisons |
| category scores | see §4 per-category MAX | 4 categories × 4 unis per respondent |
| `tags` | `general, admu, dlsu, up, ust, hot-take, confession, question, rant` | array; a post can carry a uni tag + a category tag |
| `reactions` | 6 keys, non-negative ints | `like, love, haha, wow, sad, angry` |
| `parent_id` | null or uuid | null ⇒ top-level post; else reply (can nest) |
| `created_at` | timestamp | server time; use for trend/time-series |

---

## 9. Grounding Sources in the Repo (if deeper context is needed)

- `big-4-research/` — the underlying qualitative research (PDFs + markdown per university) that justifies
  every quiz weight. Excellent primary-source material for the "Context / Background of the topic" section
  the rubric asks for.
- `lib/quiz/result-data.ts` — the per-university verdict copy across score bands (tone/voice reference).
- `context.md`, `ai.md`, `GEMINI.md` — project design notes.

---

*Generated as a handoff brief. All quiz weights, scoring math, and constants are quoted verbatim from the
UniSort codebase as of commit `1d675e7`. Sample CSV/JSON data is synthetic but faithful to the real scoring model.*
