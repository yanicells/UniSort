# UniSort

**UniSort** is an interactive, newspaper-themed web application designed to help students find their perfect university match among the Philippines' "Big Four" universities: Ateneo de Manila University (ADMU), De La Salle University (DLSU), University of the Philippines (UP), and University of Santo Tomas (UST).

> _"The Daily Sorting Hat: Find Your Fit, Own Your Story"_

## Key Features

### **Personality Matching Quiz**

A rigorous, personality-based assessment that peers into your soul to match you with a campus culture.

- **Detailed Verdicts:** Get a comprehensive analysis of why you fit a specific university.
- **Shareable Results:** Generate beautiful, "newspaper clipping" style result cards to share on social media.
- **Match Distribution:** See how you score across all four universities, not just your top match.

### **How the Quiz Works (Logic & Strategy)**

The sorting quiz isn't arbitrary; it uses a structured, weighted scoring algorithm to carefully calculate your university identity.

- **Weighted Choices:** Every question choice carries specific point values for all four universities. A single answer might heavily favor UP while slightly aligning with UST, allowing for accurate, nuanced personality mapping.
- **Categorical Breakdown:** Questions evaluate different dimensions of student life (e.g., academic vibe, social habits, campus culture). The system tracks your alignment across these specific subsets.
- **Score Normalization:** To eliminate inherent bias in the question data, raw scores are carefully normalized against the absolute maximum and minimum possible scores for each university. This guarantees a mathematically fair percentage match.
- **Tiered Verdicts:** Your final normalized percentages dictate your compatibility tier (from "Perfect Match" all the way to "Low Compatibility"), triggering the specific personalized verdict displayed at the end.

### **Freedom Wall**

An anonymous, community-driven space to spill the tea, share hot takes, and confess campus secrets.

- **Interactive Posts:** React to posts with custom emojis.
- **Rich Text Editor:** Share your thoughts with style using our Tiptap-powered editor.
- **Tags & Filters:** Sort posts by university tags (ADMU, DLSU, UP, UST) or categories like "Hot Take".

### **Data Insights & Stats**

In an era of misinformation, data is king. We aggregate personality distributions and compatibility scores into digestible visualizations.

- **Live Charts:** View real-time statistics on university match rates.
- **Demographics:** Understand the "vibe" of the current applicant pool.

### **Immersive "Tabloid" Design**

The entire application features a unique, retro-modern newspaper aesthetic ("The Daily Sorting Hat") with marquee text, bold typography, and paper textures, making the experience feel like reading a campus broadsheet.

## Tech Stack

Built with modern web technologies for performance and scalability:

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) (via [Neon](https://neon.tech/))
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication:** [Better Auth](https://www.better-auth.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/), [Lucide Icons](https://lucide.dev/)
- **Rich Text:** [Tiptap](https://tiptap.dev/)
- **Visualization:** [Recharts](https://recharts.org/)
- **Image Generation:** [html2canvas](https://html2canvas.hertzen.com/)

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yanicells/UniSort.git
    cd UniSort
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    bun install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file and configure your database connection and auth secrets.

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

5.  **Open your browser:**
    Navigate to [http://localhost:3000](http://localhost:3000) to view the app.

## Contribution

We welcome contributions! Whether it's correcting university trivia, adding new quiz questions, or improving the codebase.

1.  Fork the Project
2.  Create your Feature Branch
3.  Commit your Changes
4.  Push to the Branch
5.  Open a Pull Request

## Note

UniSort is a personal project created for entertainment and informational purposes only. University descriptions intentionally include both strengths and drawbacks, drawn from real student voices — not every experience will resonate, and that's okay. This website is not affiliated with, endorsed by, sponsored by, or connected to Ateneo de Manila University, De La Salle University, University of the Philippines, University of Santo Tomas, or any other educational institution mentioned. All university names, logos, and trademarks are the property of their respective owners.
