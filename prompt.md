# UniSort Complete UI/UX Design System & Implementation Spec

## 1. Official Brand Colors (Researched & Verified)

Replace all existing color codes with these official university colors:

```css
/* University Brand Colors */
--admu-blue: #001196;      /* Ateneo - Pantone 072 C Reflex Blue */
--dlsu-green: #00703C;     /* De La Salle Green */
--up-maroon: #7B1113;      /* UP Maroon */
--ust-gold: #FDB71A;       /* UST Gold (existing, verify if needed) */

/* Base Colors */
--background: #FFFFFF;      /* Pure white */
--foreground: #1a1a1a;     /* Softer black for text */
--border: #e5e5e5;         /* Light gray borders */
--background-subtle: #FAFAFA; /* Optional subtle bg for sections */
```

## 2. Typography System

```css
/* Headings - Use tight leading */
H1: text-4xl md:text-5xl font-bold leading-tight
H2: text-3xl md:text-4xl font-semibold leading-tight  
H3: text-2xl font-semibold leading-snug
Body: text-base leading-relaxed (default 16px)
Small: text-sm leading-normal

/* Font Stack */
Primary: Geist Sans (already configured)
Mono: Geist Mono
```

## 3. Layout System

### Container Strategy
```tsx
// Standard container for all pages
<main className="max-w-6xl mx-auto px-4 md:px-8 min-h-screen pt-20">
  {/* pt-20 accounts for fixed h-16 navbar + spacing */}
</main>
```

### Spacing Scale
```css
Section vertical spacing: space-y-6 md:space-y-8
Component spacing: space-y-4
Card padding: p-4 md:p-6
Page padding: px-4 md:px-8 (sides), py-8 md:py-12 (vertical)
```

### Responsive Breakpoints
```
sm: 640px   (rarely used)
md: 768px   (tablet - primary breakpoint)
lg: 1024px  (desktop - secondary breakpoint)
xl: 1280px  (large desktop - minimal usage)
```

## 4. Component Specifications

### Navigation Bar (Fixed Top)
```tsx
// Specs:
- Height: h-16
- Position: fixed top-0 w-full
- Background: bg-white border-b border-border
- Z-index: z-50
- Shadow: shadow-sm

// Desktop Layout (lg:)
- Logo: Left side, text "UniSort" (font-bold text-xl)
- Nav items: Horizontal right of logo
  Items: Home | Quiz | Freedom Wall | Universities ↓ | Stats
- Active state: Underline (border-b-2 border-foreground)
- Hover state: text-foreground/70 transition-colors duration-200

// Mobile Layout (<lg)
- Logo: Left side
- Hamburger: Right side (☰ icon)
- Menu: Slides from right, full-height overlay
  Background: bg-white, animate slide-in-right
```

### Cards
```tsx
// Standard card
className="bg-white rounded-xl shadow-sm border border-border p-4 md:p-6
           hover:shadow-md hover:-translate-y-1 transition-all duration-200"
```

### Buttons
```tsx
// Primary (CTAs)
className="bg-foreground text-white rounded-md px-6 py-3 
           hover:bg-foreground/90 transition-colors font-medium"

// Secondary
className="border border-border rounded-md px-6 py-3
           hover:bg-background-subtle transition-colors"

// Destructive (Delete)
className="bg-red-600 text-white rounded-md px-4 py-2
           hover:bg-red-700 transition-colors"

// University-themed buttons (on uni pages only)
- ADMU page: bg-[#001196] text-white
- DLSU page: bg-[#00703C] text-white  
- UP page: bg-[#7B1113] text-white
- UST page: bg-[#FDB71A] text-black
```

### University Color-Coded Tags
```tsx
// Freedom wall post tags - use university colors
const tagColors = {
  admu: "bg-[#001196] text-white",
  dlsu: "bg-[#00703C] text-white",
  up: "bg-[#7B1113] text-white",
  ust: "bg-[#FDB71A] text-black",
  general: "bg-gray-200 text-gray-800"
};

// Style: rounded-full px-3 py-1 text-sm font-medium
// Display: Show all tags on post, no limit
```

### Forms
```tsx
// Input fields
className="border border-border rounded-md px-4 py-2
           focus:outline-none focus:ring-2 focus:ring-foreground/20"

// Error messages
className="text-red-600 text-sm mt-1"

// Labels
className="text-sm font-medium text-foreground mb-1"
```

### Modals/Dialogs
```tsx
// Backdrop
className="fixed inset-0 bg-black/50 z-50 
           animate-in fade-in duration-200"

// Modal card
className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
           bg-white rounded-xl shadow-lg p-6 max-w-md w-full
           animate-in slide-in-from-bottom-4 duration-300"
```

### Reaction Modal (Facebook-Style)
```tsx
// Replace current modal with horizontal emoji bar
- Layout: Horizontal flex of 6 emojis
- Style: Inline popup above post (not full modal)
- Hover: Show emoji label tooltip
- Selected state: Scale emoji slightly, add bg-gray-100 circle
- Emojis: 👍 ❤️ 😂 😮 😢 😠
- Size: text-2xl with hover:scale-125 transition
```

### Loading States
```tsx
// Skeleton for posts
<div className="animate-pulse space-y-4">
  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
</div>

// Skeleton for charts
<div className="animate-pulse h-64 bg-gray-200 rounded-xl"></div>

// Page transitions: Instant (no fade)
```

### Toast Notifications
```tsx
// Position: Fixed top-right (top-20 right-4)
// Auto-dismiss: 3 seconds
// Style: bg-white border border-border shadow-lg rounded-md p-4
// Animation: Slide in from right, fade out
// Types: Success (green accent), Error (red accent), Info (blue accent)
```

## 5. Page-by-Page Layouts

### Homepage `/`

```tsx
<main className="min-h-screen">
  {/* Hero Section */}
  <section className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24 text-center">
    {/* Minimal gradient background */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 -z-10" />
    
    <h1 className="text-4xl md:text-6xl font-bold mb-4">
      {/* Catchy headline - e.g. "Discover Where You Truly Belong" */}
    </h1>
    <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
      {/* Brief value prop: "Find your perfect university match through our personality-based quiz" */}
    </p>
    <button className="bg-foreground text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-foreground/90">
      Take the Quiz →
    </button>
  </section>

  {/* Feature Grid - 3 columns */}
  <section className="max-w-6xl mx-auto px-4 md:px-8 py-12">
    <div className="grid md:grid-cols-3 gap-8">
      {/* Card 1: Personality Quiz */}
      {/* Card 2: Freedom Wall */}
      {/* Card 3: University Insights */}
      {/* Each card: icon, title, description, CTA link */}
    </div>
  </section>

  {/* Single Stat Preview */}
  <section className="max-w-6xl mx-auto px-4 md:px-8 py-12 text-center">
    <div className="bg-white rounded-xl shadow-sm border border-border p-8">
      <p className="text-5xl font-bold text-foreground mb-2">{totalQuizzes}</p>
      <p className="text-foreground/70">Students have found their match</p>
    </div>
  </section>

  {/* Recent Freedom Wall Posts */}
  <section className="max-w-6xl mx-auto px-4 md:px-8 py-12">
    <h2 className="text-3xl font-bold mb-6">Recent from Freedom Wall</h2>
    <div className="space-y-4">
      {/* Show 3-4 most recent posts (condensed cards) */}
    </div>
    <div className="text-center mt-6">
      <a href="/freedom-wall" className="text-foreground underline">View all posts →</a>
    </div>
  </section>
</main>
```

### Quiz Flow `/quiz`

#### Name Entry Screen
```tsx
<div className="max-w-2xl mx-auto px-4 py-16 text-center">
  <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to UniSort</h1>
  <p className="text-lg text-foreground/70 mb-2">Find your perfect university match</p>
  <p className="text-sm text-foreground/50 mb-8">Takes about 2 minutes</p>
  
  <input 
    type="text" 
    placeholder="Enter your name (optional)"
    className="w-full max-w-md mx-auto mb-4"
  />
  
  <div className="flex flex-col gap-3 max-w-md mx-auto">
    <button className="primary-button">Continue</button>
    <button className="secondary-button">Continue Anonymously</button>
  </div>
</div>
```

#### Question Display (Full-Screen Immersive)
```tsx
<div className="max-w-3xl mx-auto px-4 py-8 min-h-[80vh] flex flex-col justify-center">
  {/* Progress Bar - Fixed Top */}
  <div className="fixed top-16 left-0 right-0 h-2 bg-gray-200 z-40">
    <div 
      className="h-full bg-foreground transition-all duration-300"
      style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
    />
  </div>

  {/* Question */}
  <div className="text-center mb-8">
    <p className="text-sm text-foreground/50 mb-4">Question {current} of {total}</p>
    <h2 className="text-2xl md:text-3xl font-semibold">{question.text}</h2>
  </div>

  {/* Choices - Stacked Full Width */}
  <div className="space-y-3 max-w-2xl mx-auto w-full">
    {choices.map(choice => (
      <button className="w-full text-left p-4 border-2 border-border rounded-lg
                         hover:border-foreground transition-all">
        {choice.text}
      </button>
    ))}
  </div>

  {/* Navigation */}
  <div className="flex justify-between mt-8 max-w-2xl mx-auto w-full">
    <button className="secondary-button">← Back</button>
    <button className="primary-button">Next →</button>
  </div>
</div>
```

#### Results Page (Story Scroll Format - COMPLETE REDESIGN)
```tsx
<div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
  {/* Hero Section - Top Match Reveal */}
  <section className="text-center space-y-4">
    <h1 className="text-5xl md:text-6xl font-bold">Congratulations! 🎉</h1>
    <p className="text-2xl md:text-3xl text-foreground/80">
      You're a <span className="font-bold text-[{uni-color}]">{percentage}%</span> match with
    </p>
    <h2 className="text-4xl md:text-5xl font-bold" style={{ color: uniColor }}>
      {universityName}
    </h2>
    <p className="text-xl text-foreground/60 italic">"{universitySlogan}"</p>
  </section>

  {/* Section: Personality Fit */}
  <section className="bg-white rounded-xl shadow-sm border border-border p-8">
    <h3 className="text-2xl font-semibold mb-4">Your Personality Fit</h3>
    <p className="text-foreground/80 leading-relaxed">
      {personalizedDescription}
    </p>
  </section>

  {/* Section: Campus Vibe */}
  <section className="bg-white rounded-xl shadow-sm border border-border p-8">
    <h3 className="text-2xl font-semibold mb-4">Campus Vibe</h3>
    <p className="text-foreground/80 leading-relaxed">
      {campusVibeDescription}
    </p>
  </section>

  {/* Section: All Results Bar Chart */}
  <section className="bg-white rounded-xl shadow-sm border border-border p-8">
    <h3 className="text-2xl font-semibold mb-6">Your Full Results</h3>
    {/* Keep existing IndividualScoresPieChart or replace with bar chart */}
    <IndividualScoresPieChart data={scores} />
  </section>

  {/* Section: Other Universities */}
  <section className="space-y-4">
    <h3 className="text-2xl font-semibold">Other Matches</h3>
    <div className="grid md:grid-cols-3 gap-4">
      {otherUniversities.map(uni => (
        <div className="bg-white rounded-lg shadow-sm border border-border p-4 text-center">
          <p className="text-3xl font-bold" style={{ color: uni.color }}>
            {uni.percentage}%
          </p>
          <p className="text-foreground/70 mt-2">{uni.name}</p>
        </div>
      ))}
    </div>
  </section>

  {/* CTAs - Horizontal Row */}
  <section className="flex flex-wrap gap-3 justify-center">
    <button className="primary-button" style={{ backgroundColor: topMatchColor }}>
      Explore {topMatchName} →
    </button>
    <button className="secondary-button">View All Universities</button>
    <button className="secondary-button">Share Results 🔗</button>
    <button className="secondary-button">Retake Quiz ↻</button>
  </section>
</div>
```

### Freedom Wall `/freedom-wall`

```tsx
<div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
  {/* Header with Create Button */}
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-3xl font-bold">Freedom Wall</h1>
    <button className="primary-button">+ New Post</button>
  </div>

  {/* Filters (Reddit-style horizontal pills) */}
  <div className="flex flex-wrap gap-2 mb-6 border-b border-border pb-4">
    <button className="pill-filter active">All</button>
    <button className="pill-filter">ADMU</button>
    <button className="pill-filter">DLSU</button>
    <button className="pill-filter">UP</button>
    <button className="pill-filter">UST</button>
    
    {/* Sort dropdown */}
    <select className="ml-auto border border-border rounded-md px-3 py-1">
      <option>Latest</option>
      <option>Most Liked</option>
      <option>Most Discussed</option>
      <option>This Week</option>
      <option>This Month</option>
    </select>
  </div>

  {/* Posts - Single Column, Reddit-like */}
  <div className="space-y-4">
    {posts.map(post => (
      <div className="bg-white rounded-xl shadow-sm border border-border p-6 
                      hover:shadow-md transition-shadow">
        {/* Post Header */}
        <div className="flex items-center gap-2 mb-3">
          {post.tags.map(tag => (
            <span className={`tag-${tag}`}>{tag.toUpperCase()}</span>
          ))}
          <span className="text-sm text-foreground/50">• {timeAgo}</span>
        </div>

        {/* Post Content - FULL content, not truncated */}
        <div className="prose max-w-none mb-4">
          <PostContent html={post.content} />
        </div>

        {/* Post Image (if exists) */}
        {post.image && (
          <img 
            src={post.image} 
            className="w-full max-h-96 object-cover rounded-lg mb-4 cursor-pointer"
            onClick={() => openImageModal(post.image)}
          />
        )}

        {/* Reactions Bar - Show breakdown */}
        <div className="flex items-center gap-4 text-sm text-foreground/70">
          <button className="flex items-center gap-1 hover:text-foreground">
            <span className="flex">
              {/* Show unique reaction emojis that were used */}
              {post.reactions.types.map(emoji => emoji)}
            </span>
            <span>{post.reactions.total}</span>
          </button>
          <button className="hover:text-foreground">
            💬 {post.commentsCount} comments
          </button>
        </div>
      </div>
    ))}

    {/* Infinite Scroll Trigger */}
    <div ref={loadMoreRef} className="py-8 text-center">
      {isLoading && <div className="animate-pulse">Loading more posts...</div>}
    </div>
  </div>

  {/* Floating Action Button (FAB) - Bottom Right */}
  <button className="fixed bottom-8 right-8 w-14 h-14 bg-foreground text-white 
                     rounded-full shadow-lg hover:scale-110 transition-transform
                     flex items-center justify-center text-2xl z-40">
    +
  </button>
</div>

/* Pill Filter Style */
.pill-filter {
  @apply px-4 py-1.5 rounded-full border border-border 
         hover:bg-background-subtle transition-colors;
}
.pill-filter.active {
  @apply bg-foreground text-white border-foreground;
}
```

### University Pages `/admu` `/dlsu` `/up` `/ust`

```tsx
<div className="min-h-screen">
  {/* Hero Banner - Full width, university themed */}
  <section 
    className="w-full py-20 md:py-32"
    style={{ backgroundColor: universityColor }}
  >
    <div className="max-w-6xl mx-auto px-4 md:px-8 text-center text-white">
      <h1 className="text-5xl md:text-6xl font-bold mb-4">{universityName}</h1>
      <p className="text-xl md:text-2xl opacity-90">"{universitySlogan}"</p>
    </div>
  </section>

  {/* Content Sections - Scroll format */}
  <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 space-y-16">
    
    {/* Overview Section */}
    <section id="overview">
      <h2 className="text-3xl font-bold mb-6" style={{ color: universityColor }}>
        Overview
      </h2>
      <div className="prose max-w-none text-foreground/80 leading-relaxed">
        {/* AI-researched overview content */}
      </div>
    </section>

    {/* Campus Culture Section */}
    <section id="culture">
      <h2 className="text-3xl font-bold mb-6" style={{ color: universityColor }}>
        Campus Culture
      </h2>
      <div className="prose max-w-none text-foreground/80 leading-relaxed">
        {/* AI-researched culture content */}
      </div>
    </section>

    {/* Stats Section */}
    <section id="stats">
      <h2 className="text-3xl font-bold mb-6" style={{ color: universityColor }}>
        By the Numbers
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {/* Stat cards: enrollment, programs, etc */}
        <div className="bg-white rounded-xl shadow-sm border border-border p-6 text-center">
          <p className="text-4xl font-bold" style={{ color: universityColor }}>
            {statValue}
          </p>
          <p className="text-foreground/70 mt-2">{statLabel}</p>
        </div>
      </div>
    </section>

    {/* Student Life Section */}
    <section id="student-life">
      <h2 className="text-3xl font-bold mb-6" style={{ color: universityColor }}>
        Student Life
      </h2>
      <div className="prose max-w-none text-foreground/80 leading-relaxed">
        {/* AI-researched student life content */}
      </div>
    </section>

    {/* Personal Touches Section (AI-researched additions) */}
    <section id="personal">
      <h2 className="text-3xl font-bold mb-6" style={{ color: universityColor }}>
        What Students Say
      </h2>
      <div className="space-y-4">
        {/* Testimonials/quotes from research */}
      </div>
    </section>

    {/* CTA */}
    <section className="text-center">
      <button 
        className="px-8 py-4 text-white rounded-md text-lg font-medium hover:opacity-90"
        style={{ backgroundColor: universityColor }}
      >
        Take the Quiz to Find Your Match →
      </button>
    </section>
  </div>
</div>
```

### Stats Page `/stats`

```tsx
<div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
  <h1 className="text-3xl font-bold mb-6">Quiz Statistics</h1>

  {/* Summary Cards - Top */}
  <div className="grid md:grid-cols-4 gap-4 mb-8">
    <div className="bg-white rounded-xl shadow-sm border border-border p-6">
      <p className="text-3xl font-bold text-foreground">{totalQuizzes}</p>
      <p className="text-foreground/70 text-sm mt-1">Total Quizzes</p>
    </div>
    <div className="bg-white rounded-xl shadow-sm border border-border p-6">
      <p className="text-3xl font-bold text-[#001196]">{admuCount}</p>
      <p className="text-foreground/70 text-sm mt-1">ADMU Matches</p>
    </div>
    <div className="bg-white rounded-xl shadow-sm border border-border p-6">
      <p className="text-3xl font-bold text-[#00703C]">{dlsuCount}</p>
      <p className="text-foreground/70 text-sm mt-1">DLSU Matches</p>
    </div>
    {/* UP and UST cards */}
  </div>

  {/* NEW: Overall Bar Chart (like results page) */}
  <div className="bg-white rounded-xl shadow-sm border border-border p-6 mb-8">
    <h2 className="text-2xl font-semibold mb-4">Overall Match Distribution</h2>
    {/* Bar chart showing percentages of each uni selected */}
    <OverallResultsBarChart /> {/* Create this component similar to individual results */}
  </div>

  {/* Charts Grid - 2 Columns on Desktop */}
  <div className="grid lg:grid-cols-2 gap-8">
    {/* Pie Chart */}
    <div className="bg-white rounded-xl shadow-sm border border-border p-6">
      <h2 className="text-2xl font-semibold mb-4">Results Distribution</h2>
      <Suspense fallback={<ChartSkeleton />}>
        <OverallResultsPieChart />
      </Suspense>
    </div>

    {/* 30-Day Bar Chart */}
    <div className="bg-white rounded-xl shadow-sm border border-border p-6">
      <h2 className="text-2xl font-semibold mb-4">Last 30 Days</h2>
      <Suspense fallback={<ChartSkeleton />}>
        <DailyResultsBarChart days={30} />
      </Suspense>
    </div>

    {/* 7-Day Bar Chart */}
    <div className="bg-white rounded-xl shadow-sm border border-border p-6">
      <h2 className="text-2xl font-semibold mb-4">Last 7 Days</h2>
      <Suspense fallback={<ChartSkeleton />}>
        <DailyResultsBarChart days={7} />
      </Suspense>
    </div>

    {/* Empty state if no data */}
    {totalQuizzes === 0 && (
      <div className="col-span-2 text-center py-12 text-foreground/50">
        <p>No quiz data yet. Charts will appear once students take the quiz.</p>
      </div>
    )}
  </div>
</div>
```

### Admin Page `/admin`

```tsx
// Keep minimal, functional table
<div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
  <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
  
  <div className="bg-white rounded-lg border border-border overflow-hidden">
    <table className="w-full">
      <thead className="bg-gray-50 border-b border-border">
        <tr>
          <th className="px-4 py-3 text-left text-sm font-medium">ID</th>
          <th className="px-4 py-3 text-left text-sm font-medium">Content Preview</th>
          <th className="px-4 py-3 text-left text-sm font-medium">Tags</th>
          <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
          <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
        </tr>
      </thead>
      <tbody>
        {/* Rows with delete button */}
      </tbody>
    </table>
  </div>
</div>
```

## 6. SEO Optimization Requirements

### Meta Tags (Every Page)
```tsx
// app/layout.tsx - Global
export const metadata = {
  title: "UniSort - Find Your Perfect University Match",
  description: "Discover which Philippine university fits your personality through our quiz. Explore ADMU, DLSU, UP, and UST campus culture.",
  keywords: "university quiz, Philippines, ADMU, DLSU, UP, UST, college finder",
  authors: [{ name: "UniSort Team" }],
  openGraph: {
    title: "UniSort - Find Your Perfect University Match",
    description: "Discover which Philippine university fits your personality",
    images: ['/og-image.png'], // Create 1200x630 OG image
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "UniSort - Find Your Perfect University Match",
    description: "Discover which Philippine university fits your personality",
    images: ['/og-image.png'],
  }
};

// Page-specific metadata
// app/(app)/quiz/page.tsx
export const metadata = {
  title: "Take the Quiz - UniSort",
  description: "Take our 2-minute personality quiz to find your perfect university match among ADMU, DLSU, UP, and UST."
};

// app/(app)/freedom-wall/page.tsx
export const metadata = {
  title: "Freedom Wall - UniSort",
  description: "Read and share anonymous thoughts about university life at ADMU, DLSU, UP, and UST."
};

// University pages - dynamic titles
// app/(app)/admu/page.tsx
export const metadata = {
  title: "Ateneo de Manila University (ADMU) - UniSort",
  description: "Learn about ADMU's campus culture, academic programs, and student life. Discover if Ateneo is right for you."
};
```

### Structured Data (JSON-LD)
```tsx
// Add to university pages
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Ateneo de Manila University",
  "description": "{university description}",
  "url": "https://unisort.com/admu",
  "sameAs": [
    "https://www.facebook.com/ateneoofficial",
    "https://twitter.com/ateneodemanila"
  ]
}
</script>
```

### Sitemap & Robots
```txt
// public/robots.txt
User-agent: *
Allow: /
Sitemap: https://unisort.com/sitemap.xml

// Auto-generate sitemap.xml with Next.js
// app/sitemap.ts
export default function sitemap() {
  return [
    { url: 'https://unisort.com', lastModified: new Date() },
    { url: 'https://unisort.com/quiz', lastModified: new Date() },
    { url: 'https://unisort.com/freedom-wall', lastModified: new Date() },
    { url: 'https://unisort.com/admu', lastModified: new Date() },
    { url: 'https://unisort.com/dlsu', lastModified: new Date() },
    { url: 'https://unisort.com/up', lastModified: new Date() },
    { url: 'https://unisort.com/ust', lastModified: new Date() },
    { url: 'https://unisort.com/stats', lastModified: new Date() },
  ];
}
```

## 7. Infinite Scroll Implementation (Twitter/Facebook Style)

### Freedom Wall Infinite Scroll
```tsx
// Use Intersection Observer
import { useEffect, useRef, useState } from 'react';

const POSTS_PER_PAGE = 10;

function FreedomWall() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const loadMoreRef = useRef(null);

  // Filter states
  const [selectedUniversity, setSelectedUniversity] = useState('all');
  const [sortBy, setSortBy] = useState('latest'); // latest, most-liked, most-discussed

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMorePosts();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading]);

  async function loadMorePosts() {
    setIsLoading(true);
    const newPosts = await fetchPosts({
      page,
      limit: POSTS_PER_PAGE,
      university: selectedUniversity,
      sortBy
    });
    
    if (newPosts.length < POSTS_PER_PAGE) {
      setHasMore(false);
    }
    
    setPosts(prev => [...prev, ...newPosts]);
    setPage(prev => prev + 1);
    setIsLoading(false);
  }

  // Reset on filter change
  useEffect(() => {
    setPosts([]);
    setPage(1);
    setHasMore(true);
    loadMorePosts();
  }, [selectedUniversity, sortBy]);

  return (
    <div>
      {/* Filters */}
      <Filters 
        selectedUniversity={selectedUniversity}
        setSelectedUniversity={setSelectedUniversity}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Posts */}
      <div className="space-y-4">
        {posts.map(post => <PostCard key={post.id} post={post} />)}
      </div>

      {/* Load more trigger */}
      <div ref={loadMoreRef} className="py-8 text-center">
        {isLoading && <div className="animate-pulse">Loading more posts...</div>}
        {!hasMore && posts.length > 0 && (
          <p className="text-foreground/50">You've reached the end!</p>
        )}
      </div>
    </div>
  );
}
```

### Filter Options
```tsx
// University filter: All, ADMU, DLSU, UP, UST
// Sort options:
- Latest (createdAt DESC)
- Most Liked (reactions count DESC)
- Most Discussed (comments count DESC)
- This Week (createdAt > 7 days ago)
- This Month (createdAt > 30 days ago)

// Date filters modify the query, not client-side filtering
```

### Backend Query Requirements
```tsx
// lib/dal/queries.ts - Update getWallPosts
export async function getWallPosts({
  page = 1,
  limit = 10,
  university = 'all', // 'all' | 'admu' | 'dlsu' | 'up' | 'ust'
  sortBy = 'latest', // 'latest' | 'most-liked' | 'most-discussed'
  timeRange = 'all' // 'all' | 'week' | 'month'
}) {
  let query = db
    .select()
    .from(posts)
    .where(eq(posts.parentId, null))
    .limit(limit)
    .offset((page - 1) * limit);

  // Filter by university tag
  if (university !== 'all') {
    query = query.where(sql`${posts.tags}::text LIKE '%${university}%'`);
  }

  // Filter by time range
  if (timeRange === 'week') {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    query = query.where(gte(posts.createdAt, weekAgo));
  } else if (timeRange === 'month') {
    const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    query = query.where(gte(posts.createdAt, monthAgo));
  }

  // Sort
  switch (sortBy) {
    case 'most-liked':
      // Need to add reactions count aggregation
      break;
    case 'most-discussed':
      // Need to add comments count aggregation
      break;
    default:
      query = query.orderBy(desc(posts.createdAt));
  }

  return await query;
}
```

## 8. Responsiveness Checklist

### Critical Breakpoints to Test
```tsx
// Mobile: 375px, 414px (iPhone)
// Tablet: 768px, 834px (iPad)
// Desktop: 1280px, 1440px, 1920px

// Responsive padding patterns:
px-4 md:px-8 lg:px-12           // Horizontal
py-6 md:py-8 lg:py-12           // Vertical
text-base md:text-lg lg:text-xl // Text
grid-cols-1 md:grid-cols-2 lg:grid-cols-3 // Grids
```

### Mobile-Specific Adjustments
```tsx
// Navigation: Hamburger menu < 1024px
// Hero text: Reduce from 6xl to 4xl on mobile
// Buttons: Full width on mobile (w-full md:w-auto)
// Forms: Stack labels above inputs on mobile
// Cards: No hover effects on touch devices
// Charts: Reduce height on mobile (h-48 md:h-64)
// Modal: Full screen on mobile (h-screen rounded-none md:rounded-xl)
```

### Touch-Friendly Targets
```tsx
// All interactive elements minimum 44x44px (Apple guidelines)
// Buttons: py-3 (48px height) minimum
// Increase touch targets on mobile: p-4 md:p-3
```

## 9. Accessibility Requirements

```tsx
// Focus indicators (default but ensure visible)
focus:outline-none focus:ring-2 focus:ring-foreground/20

// Skip to main content link
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>

// Aria labels for icon buttons
<button aria-label="Open menu">☰</button>
<button aria-label="React to post">😊</button>

// Alt text for all images
<img src={post.image} alt={post.altText || "Post image"} />

// Form error announcements
<span role="alert" className="text-red-600">{error}</span>

// Color contrast ratios
- Normal text: 4.5:1 minimum (WCAG AA)
- Large text (18pt+): 3:1 minimum
- Test university colors against white backgrounds
```

## 10. Animation & Transition Specifications

```css
/* Global transition classes */
.transition-default {
  @apply transition-all duration-200 ease-in-out;
}

.transition-slow {
  @apply transition-all duration-300 ease-in-out;
}

/* Specific animations */
.hover-lift {
  @apply hover:-translate-y-1 hover:shadow-md transition-all duration-200;
}

.fade-in {
  animation: fadeIn 200ms ease-in;
}

.slide-up {
  animation: slideUp 300ms ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0; 
    transform: translateY(10px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

/* Keep animations subtle and fast */
/* No animations on reduced-motion preference */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 11. Implementation Priority Order

### Phase 1: Foundation (Critical - Do First)
1. Update university colors to official hex codes
2. Build Navigation component (desktop + mobile)
3. Define layout wrapper with fixed nav + container
4. Update typography scale globally
5. Implement toast notification system

### Phase 2: Core Pages
6. Homepage redesign (hero + features + stats + recent posts)
7. Quiz flow redesign (name entry + questions + progress bar)
8. Quiz results complete redesign (story scroll format)
9. Freedom wall infinite scroll + filters
10. Freedom wall reaction modal update (Facebook style)

### Phase 3: Content Pages
11. University pages (themed layout + content structure ready for AI research)
12. Stats page (add summary cards + new bar chart + 2-col grid)
13. Create post page (improve form UI)

### Phase 4: Polish
14. Loading skeletons for all async content
15. Empty states for all pages
16. Error pages (404, 500)
17. Image modal for freedom wall posts
18. Toast notifications for all actions

### Phase 5: Optimization
19. SEO meta tags + structured data
20. Sitemap generation
21. Responsiveness testing and fixes
22. Accessibility audit and fixes
23. Performance optimization (lazy loading, etc)

## 12. File Structure & Component Organization

```
components/
├── layout/
│   ├── Navbar.tsx           (NEW - fixed top nav)
│   ├── Footer.tsx           (NEW - minimal footer)
│   └── Container.tsx        (NEW - reusable max-w-6xl wrapper)
├── ui/
│   ├── Toast.tsx            (NEW - notification system)
│   ├── Modal.tsx            (UPDATE - standardized modal)
│   └── Skeleton.tsx         (NEW - loading skeletons)
├── freedom-wall/
│   ├── PostCard.tsx         (UPDATE - Reddit-style card)
│   ├── ReactionBar.tsx      (NEW - Facebook-style reactions)
│   ├── FilterBar.tsx        (NEW - university/sort filters)
│   └── InfiniteScroll.tsx   (NEW - intersection observer logic)
├── quiz/
│   ├── NameEntry.tsx        (UPDATE - welcoming design)
│   ├── QuestionView.tsx     (UPDATE - immersive full-screen)
│   ├── ProgressBar.tsx      (NEW - colored progress indicator)
│   └── ResultsStory.tsx     (NEW - complete redesign)
└── charts/
    └── OverallBarChart.tsx  (NEW - for stats page)
```
Note: "Installed Sonner toast notification library via shadcn for user feedback notifications (post created, reactions added, errors). Sonner provides a lightweight, accessible toast system that integrates seamlessly with our existing shadcn/ui components. The toast notifications will provide non-intrusive feedback for user actions across the application."

## Summary

This is a **complete UI/UX overhaul** transforming UniSort from prototype to production. Key improvements:

1. **Official university colors** properly implemented throughout
2. **Consistent layout system** (max-w-6xl, responsive padding, fixed nav)
3. **Homepage** with proper hero, features, and engagement hooks
4. **Quiz flow** upgraded to immersive full-screen with story-format results
5. **Freedom wall** with Reddit-style cards, Facebook-style reactions, infinite scroll, and filters
6. **University pages** with full theming and scroll sections
7. **Stats page** with summary cards, new bar chart, 2-column layout
8. **SEO optimization** (meta tags, structured data, sitemap)
9. **Full responsiveness** tested across all breakpoints
10. **Accessibility compliance** (WCAG AA standards)
