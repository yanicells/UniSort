import Link from "next/link";
import { NewspaperMasthead } from "@/components/layout/NewspaperMasthead";
import { Landmark, Users, HelpCircle } from "lucide-react";
import { getFAQSchema } from "@/lib/seo/structured-data";
import { BIG4_COMPARISON_KEYWORDS } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Big 4 Universities Philippines Comparison | ADMU vs DLSU vs UP vs UST",
  description:
    "Complete comparison of Big 4 universities in the Philippines. Compare Ateneo de Manila University (ADMU), De La Salle University (DLSU), University of the Philippines (UP), and University of Santo Tomas (UST) culture, costs, academics, and student life. Find your perfect fit among the Big Four schools.",
  keywords: [...BIG4_COMPARISON_KEYWORDS, "big 4 universities philippines"],
  openGraph: {
    title: "Big 4 Universities Philippines – Complete Comparison Guide",
    description:
      "Compare Ateneo, La Salle, UP, and UST side-by-side. Culture, costs, academics, and honest student experiences.",
    type: "website",
    url: "https://unisort.ycells.com/big4",
  },
  alternates: {
    canonical: "https://unisort.ycells.com/big4",
  },
};

export default function Big4Page() {
  // FAQ schema for "How to Choose" section
  const faqSchema = getFAQSchema([
    {
      question:
        "How do I choose between Big 4 universities in the Philippines?",
      answer:
        "Consider 5 key factors: Financial reality (free UP vs 80-90k tuition ADMU/DLSU), support structure (cura personalis at ADMU vs systemic abandonment at UP), academic tempo (trimester sprints at DLSU vs volume endurance at UST), cultural vibe (conyo hegemony vs kanal humor), and political environment (daily activism at UP vs institutionalized advocacy at DLSU/ADMU/UST).",
    },
    {
      question:
        "What are the main differences between ADMU, DLSU, UP, and UST?",
      answer:
        "ADMU focuses on reflexive depth with Jesuit Liberal Arts. DLSU emphasizes trimestral velocity and professional networking. UP prioritizes independent survival and academic freedom. UST offers volume-heavy traditional pedagogy with block system support.",
    },
    {
      question: "Which Big 4 university is best for me?",
      answer:
        "There is no 'best' school, only the school that is best for YOU. Take the UniSort personality quiz to find which Big 4 university matches your learning style, values, and cultural preferences.",
    },
  ]);

  return (
    <>
      {/* JSON-LD FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <NewspaperMasthead />
      <div className="min-h-screen bg-[#f4f4f4] text-slate-900 font-serif pb-12">
        {/* Marquee */}
        <div className="bg-black text-white py-2 overflow-hidden whitespace-nowrap border-b-2 border-slate-800">
          <div className="animate-marquee inline-block font-mono text-xs md:text-sm font-bold tracking-widest">
            THE BATTLE FOR MANILA /// UAAP RIVALRIES INTENSIFY /// TUITION HIKES
            LOOMING /// CHOOSE YOUR FIGHTER
          </div>
        </div>

        <div className="max-w-7xl mx-auto bg-white shadow-2xl min-h-screen border-x border-slate-300">
          {/* Header */}
          <header className="p-6 md:p-12 text-center border-b-4 border-black bg-white text-black">
            <p className="font-sans font-bold text-xs tracking-[0.3em] uppercase mb-4 text-slate-500">
              Which One&apos;s For You?
            </p>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4">
              THE BIG FOUR
            </h1>
            <p className="text-xl md:text-2xl font-serif italic text-slate-700 max-w-2xl mx-auto mt-4">
              &ldquo;The Schools Everyone Compares Themselves To&rdquo;
            </p>

            <div className="flex flex-wrap justify-center items-center gap-3 text-sm md:text-base font-bold border-y border-slate-300 py-4 mt-8 max-w-4xl mx-auto">
              <Link
                href="/admu"
                className="text-[#001196] hover:underline font-black transition"
              >
                Blue Eagles
              </Link>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
              <Link
                href="/dlsu"
                className="text-[#00703c] hover:underline font-black transition"
              >
                Green Archers
              </Link>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
              <Link
                href="/up"
                className="text-[#7b1113] hover:underline font-black transition"
              >
                Fighting Maroons
              </Link>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
              <Link
                href="/ust"
                className="text-[#fdb71a] hover:underline font-black transition"
              >
                Growling Tigers
              </Link>
            </div>
          </header>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Col - Main Editorial */}
            <div className="lg:col-span-8 p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-slate-200">
              {/* Decision Dimensions */}
              <div className="mb-12">
                <span className="bg-purple-900 text-white px-3 py-1 text-xs font-bold uppercase inline-block mb-3 transform -rotate-1">
                  Feature Analysis
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-6 italic font-serif text-slate-900">
                  The Decision Dimensions
                </h2>

                <div className="space-y-8">
                  {/* 1. Academic Challenge */}
                  <div>
                    <h3 className="font-bold text-base sm:text-lg md:text-xl uppercase mb-3 border-b-2 border-black inline-block">
                      1. Academic Challenge
                    </h3>
                    <p className="mb-4">
                      The Big 4 test your limits in distinct ways. You must
                      decide whether you prefer intellectual depth, high-speed
                      efficiency, total independence, or sheer endurance.
                    </p>
                    <ul className="grid gap-3 text-xs sm:text-sm">
                      <li className="bg-blue-50 p-2 sm:p-3 border-l-4 border-blue-800">
                        <strong>ADMU (Reflexive Depth):</strong> Education is
                        anchored in a Liberal Arts &ldquo;gauntlet&rdquo;. You
                        are required to take extensive Philosophy and Theology
                        courses that culminate in oral exams.
                      </li>
                      <li className="bg-green-50 p-3 border-l-4 border-green-700">
                        <strong>DLSU (Trimestral Velocity):</strong> The
                        academic year is a &ldquo;sprint&rdquo; divided into
                        three 14-week terms. With zero room for procrastination,
                        the challenge is elite time management.
                      </li>
                      <li className="bg-red-50 p-3 border-l-4 border-red-800">
                        <strong>UP (Independent Survival):</strong> UP
                        prioritizes &ldquo;filtering&rdquo; over nurturing. You
                        are expected to bridge vast knowledge gaps through
                        independent study; professors act as facilitators.
                      </li>
                      <li className="bg-yellow-50 p-3 border-l-4 border-yellow-500">
                        <strong>UST (Volume & Traditional Pedagogy):</strong>{" "}
                        The approach is volume-heavy and traditional, often
                        involving 7 AM to 7 PM schedules. The curriculum is
                        laser-focused on licensure exam preparation.
                      </li>
                    </ul>
                  </div>

                  {/* 2. Cost */}
                  <div>
                    <h3 className="font-bold text-base sm:text-lg md:text-xl uppercase mb-3 border-b-2 border-black inline-block">
                      2. Cost & Financial Reality
                    </h3>
                    <p className="mb-4">
                      Financial accessibility varies wildly, with an increasing
                      &ldquo;inversion&rdquo; of class demographics across the
                      four schools.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-xs font-bold">
                      <div className="p-2 border border-red-200 bg-red-50 text-red-900">
                        UP: FREE
                      </div>
                      <div className="p-2 border border-yellow-200 bg-yellow-50 text-yellow-900">
                        UST: ~140k
                      </div>
                      <div className="p-2 border border-blue-200 bg-blue-50 text-blue-900">
                        ADMU: ~200k
                      </div>
                      <div className="p-2 border border-green-200 bg-green-50 text-green-900">
                        DLSU: ~250k
                      </div>
                    </div>
                  </div>

                  {/* 3. Support Systems */}
                  <div>
                    <h3 className="font-bold text-base sm:text-lg md:text-xl uppercase mb-3 border-b-2 border-black inline-block">
                      3. Support Systems
                    </h3>
                    <p className="mb-4">
                      How much &ldquo;hand-holding&rdquo; do you need to thrive?
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                      <li>
                        <strong>ADMU:</strong> Leads in <em>cura personalis</em>
                        , offering accessible mental health services.
                      </li>
                      <li>
                        <strong>DLSU:</strong> Provides &ldquo;efficiency as a
                        form of care&rdquo; with organized systems.
                      </li>
                      <li>
                        <strong>UP:</strong> Characterized by &ldquo;systemic
                        abandonment&rdquo;. Navigate bureaucratic chaos on your
                        own.
                      </li>
                      <li>
                        <strong>UST:</strong> Often described as having a
                        repressive administration (OSA), forcing students to
                        rely on peers.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Comparative Features (Newspaper Style) */}
              <div className="border-t-4 border-black pt-6">
                <h3 className="font-black text-xl sm:text-2xl uppercase mb-4 sm:mb-6 flex items-center gap-2">
                  <Landmark className="w-5 h-5 sm:w-6 sm:h-6" /> The Team
                  Rosters
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* UP Card */}
                  <div className="border-2 border-red-800 p-4 bg-red-50/50 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-red-900/10 rounded-bl-full -mr-8 -mt-8"></div>
                    <h4 className="font-black text-red-900 text-base sm:text-lg md:text-xl mb-1 uppercase italic tracking-tighter">
                      UP FIGHTING MAROONS: <br /> UP FIGHT!
                    </h4>
                    <p className="text-xs font-bold uppercase text-red-600 mb-3 border-b border-red-200 pb-2">
                      Defining Trait: The Culture of Critical Survival
                    </p>
                    <p className="text-sm leading-relaxed mb-3">
                      <strong>You&apos;ll love it if...</strong> you are
                      fiercely independent, value academic freedom over comfort,
                      and want to be surrounded by radical diversity.
                    </p>
                    <p className="text-sm leading-relaxed mb-3">
                      <strong>You&apos;ll struggle if...</strong> you need
                      efficient systems, want a guaranteed four-year graduation,
                      or cannot handle &ldquo;beautiful decay&rdquo;.
                    </p>
                    <div className="text-xs font-mono text-red-800 bg-red-100 inline-block px-2 py-1 font-bold">
                      Signature Experience: The &ldquo;Prerog&rdquo;
                    </div>
                  </div>

                  {/* ADMU Card */}
                  <div className="border-2 border-blue-800 p-4 bg-blue-50/50 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-blue-900/10 rounded-bl-full -mr-8 -mt-8"></div>
                    <h4 className="font-black text-blue-900 text-base sm:text-lg md:text-xl mb-1 uppercase italic tracking-tighter">
                      ADMU BLUE EAGLES: <br /> ONE BIG FIGHT!
                    </h4>
                    <p className="text-xs font-bold uppercase text-blue-400 mb-3 border-b border-blue-200 pb-2">
                      Defining Trait: The Jesuit Philosopher-King
                    </p>
                    <p className="text-sm leading-relaxed mb-3">
                      <strong>You&apos;ll love it if...</strong> you want
                      holistic formation, love debating humanities, and value a
                      supportive &ldquo;bubble&rdquo; environment.
                    </p>
                    <p className="text-sm leading-relaxed mb-3">
                      <strong>You&apos;ll struggle if...</strong> you want a
                      purely technical education, are a staunch religious
                      skeptic, or feel alienated by &ldquo;conyo&rdquo;
                      gatekeeping.
                    </p>
                    <div className="text-xs font-mono text-blue-800 bg-blue-100 inline-block px-2 py-1 font-bold">
                      Signature Experience: The &ldquo;Orals&rdquo;
                    </div>
                  </div>

                  {/* DLSU Card */}
                  <div className="border-2 border-green-700 p-4 bg-green-50/50 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-green-900/10 rounded-bl-full -mr-8 -mt-8"></div>
                    <h4 className="font-black text-green-900 text-base sm:text-lg md:text-xl mb-1 uppercase italic tracking-tighter">
                      DLSU GREEN ARCHERS: <br /> ANIMO LA SALLE!
                    </h4>
                    <p className="text-xs font-bold uppercase text-green-600 mb-3 border-b border-green-200 pb-2">
                      Defining Trait: The Corporate Forge
                    </p>
                    <p className="text-sm leading-relaxed mb-3">
                      <strong>You&apos;ll love it if...</strong> you want a
                      fast-paced, pragmatic environment, value professional
                      networking, and enjoy a &ldquo;work hard, play hard&rdquo;
                      lifestyle.
                    </p>
                    <p className="text-sm leading-relaxed mb-3">
                      <strong>You&apos;ll struggle if...</strong> you are a slow
                      learner who needs time to digest concepts, or if you find
                      &ldquo;conyo&rdquo; social stratification alienating.
                    </p>
                    <div className="text-xs font-mono text-green-800 bg-green-100 inline-block px-2 py-1 font-bold">
                      Signature Experience: &ldquo;Happy Thursday&rdquo;
                    </div>
                  </div>

                  {/* UST Card */}
                  <div className="border-2 border-yellow-500 p-4 bg-yellow-50/50 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500/10 rounded-bl-full -mr-8 -mt-8"></div>
                    <h4 className="font-black text-yellow-700 text-base sm:text-lg md:text-xl mb-1 uppercase italic tracking-tighter">
                      UST GROWLING TIGERS: <br /> GO USTE!
                    </h4>
                    <p className="text-xs font-bold uppercase text-yellow-600 mb-3 border-b border-yellow-200 pb-2">
                      Defining Trait: The Resilient Soldier
                    </p>
                    <p className="text-sm leading-relaxed mb-3">
                      <strong>You&apos;ll love it if...</strong> you want a
                      grounded community, thrive in block sections, and want the
                      best food scene in the Big 4.
                    </p>
                    <p className="text-sm leading-relaxed mb-3">
                      <strong>You&apos;ll struggle if...</strong> you hate
                      uniforms, can&apos;t stand a volume-heavy workload, or
                      value administrative transparency.
                    </p>
                    <div className="text-xs font-mono text-yellow-800 bg-yellow-100 inline-block px-2 py-1 font-bold">
                      Signature Experience: Paskuhan
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col - Sidebar Stats */}
            <div className="lg:col-span-4 bg-[#f8f8f8]">
              {/* What is the Big 4? */}
              <div className="p-6 border-b border-slate-300">
                <h3 className="font-black text-base sm:text-lg uppercase mb-4 border-b-2 border-black inline-block pb-1">
                  What is the Big 4?
                </h3>
                <p className="text-sm leading-relaxed font-serif text-slate-700">
                  Welcome to the &ldquo;Big 4&rdquo; ecosystem—the four
                  universities in Metro Manila that serve as the primary
                  architects of the Philippine social strata. The University of
                  the Philippines (UP), Ateneo de Manila University (ADMU), De
                  La Salle University (DLSU), and the University of Santo Tomas
                  (UST) are more than just schools; they are gatekeepers of
                  cultural capital and the nation&apos;s premier training
                  grounds for leadership. While their rivalries are most visible
                  during the UAAP season, the true distinctions lie in their
                  &ldquo;hidden curriculums&rdquo;—the unwritten rules of
                  survival and the fundamentally different ways they transform
                  students.
                </p>
              </div>

              {/* Decision Matrix Widget */}
              <div className="p-6 border-b border-slate-300 bg-white">
                <h3 className="font-black text-lg uppercase mb-4 border-b-2 border-black inline-block pb-1">
                  How to Choose?
                </h3>
                <ul className="space-y-4 text-sm font-sans">
                  <li className="flex gap-3">
                    <span className="text-slate-600">1.</span>
                    <span className="text-slate-700">
                      <strong>Financial:</strong> Can you handle 80-90k tuition
                      (ADMU/DLSU) or need free (UP)?
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-slate-600">2.</span>
                    <span className="text-slate-700">
                      <strong>Structure:</strong> Thrive under{" "}
                      <em>cura personalis</em> (ADMU) or chaos (UP)?
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-slate-600">3.</span>
                    <span className="text-slate-700">
                      <strong>Tempo:</strong> Prefer 14-week sprints (DLSU) or
                      volume endurance (UST)?
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-slate-600">4.</span>
                    <span className="text-slate-700">
                      <strong>Vibe:</strong> Comfortable in &ldquo;Conyo&rdquo;
                      hegemony or &ldquo;Kanal&rdquo; humor?
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-slate-600">4.</span>
                    <span className="text-slate-700">
                      <strong>Politics:</strong> Can you handle daily activism
                      (UP) or prefer institutionalized/safe advocacy
                      (DLSU/ADMU/UST)?
                    </span>
                  </li>
                </ul>
              </div>

              {/* Stereotypes Section */}
              <div className="p-6 border-b border-slate-300">
                <h3 className="font-black text-lg uppercase mb-4 flex items-center gap-2">
                  <Users size={18} /> Stereotype Watch
                </h3>
                <div className="space-y-4 text-sm">
                  <div className="bg-white p-3 border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-1">
                      <strong className="block text-blue-900">
                        &ldquo;ADMU = Rich Conyo?&rdquo;
                      </strong>
                      <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-1 rounded">
                        TRUE-ISH
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs">
                      Elite culture dominates, but 18% are scholars navigating
                      invisible divides.
                    </p>
                  </div>
                  <div className="bg-white p-3 border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-1">
                      <strong className="block text-green-900">
                        &ldquo;DLSU = Party School?&rdquo;
                      </strong>
                      <span className="text-[10px] font-bold bg-green-100 text-green-800 px-1 rounded">
                        TRUE
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs">
                      &ldquo;Happy Thursday&rdquo; is legendary, but
                      Engineering/CS have high academic mortality rates.
                    </p>
                  </div>
                  <div className="bg-white p-3 border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-1">
                      <strong className="block text-red-900">
                        &ldquo;UP = Activists?&rdquo;
                      </strong>
                      <span className="text-[10px] font-bold bg-red-100 text-red-800 px-1 rounded">
                        TRUE
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs">
                      Center of radical thought, but facing a &ldquo;Burgis
                      Invasion&rdquo; (luxury cars in parking lots).
                    </p>
                  </div>
                  <div className="bg-white p-3 border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-1">
                      <strong className="block text-yellow-900">
                        &ldquo;UST = Conservative?&rdquo;
                      </strong>
                      <span className="text-[10px] font-bold bg-yellow-100 text-yellow-800 px-1 rounded">
                        TRUE
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs">
                      Admin is traditional, but the student body is rebellious
                      (e.g. TomasinoWeb controversy).
                    </p>
                  </div>
                </div>
              </div>

              {/* Myth Busters */}
              <div className="p-6 bg-purple-50">
                <h3 className="font-black text-lg uppercase mb-4 flex items-center gap-2 text-purple-900">
                  <HelpCircle size={18} /> Common Myths
                </h3>
                <ul className="space-y-4">
                  <li className="text-xs">
                    <strong className="block text-purple-700 mb-1">
                      &ldquo;UP students always get delayed&rdquo;
                    </strong>
                    <span className="text-slate-600">
                      Normalized battle scar, often due to systemic enlistment
                      failures (CRS) rather than incompetence.
                    </span>
                  </li>
                  <li className="text-xs">
                    <strong className="block text-purple-700 mb-1">
                      &ldquo;You need to be rich for ADMU/DLSU&rdquo;
                    </strong>
                    <span className="text-slate-600">
                      Both have ~20% scholar population. Lifestyle costs are
                      high, but middle-class students &ldquo;code-switch&rdquo;
                      to survive.
                    </span>
                  </li>
                  <li className="text-xs">
                    <strong className="block text-purple-700 mb-1">
                      &ldquo;UST is apolitical&rdquo;
                    </strong>
                    <span className="text-slate-600">
                      Students are active but suppressed by admin. Activism
                      focuses on internal rights and Catholic social teachings.
                    </span>
                  </li>
                  <li className="text-xs">
                    <strong className="block text-purple-700 mb-1">
                      &ldquo;DLSU is easier than other Big 4 schools&rdquo;
                    </strong>
                    <span className="text-slate-600">
                      Trimestral velocity creates unique brutality—what takes a
                      semester elsewhere compresses into 14 weeks. CCS has
                      higher mortality rates than most STEM programs.
                    </span>
                  </li>
                  <li className="text-xs">
                    <strong className="block text-purple-700 mb-1">
                      &ldquo;All Lasallians speak conyo naturally&rdquo;
                    </strong>
                    <span className="text-slate-600">
                      Only students from exclusive feeder schools (LSGH, Zobel)
                      speak it natively. The rest code-switch or fake it, and
                      try-hards get mocked ruthlessly.
                    </span>
                  </li>
                  <li className="text-xs">
                    <strong className="block text-purple-700 mb-1">
                      &ldquo;UP is full of NPA/communist militants&rdquo;
                    </strong>
                    <span className="text-slate-600">
                      Most students are apolitical or moderate left. Red-tagging
                      creates safety fears, but hardcore activists are a vocal
                      minority, not the majority.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="bg-black text-white p-4 sm:p-6 md:p-8 text-center border-t-4 border-purple-500">
            <h2 className="text-2xl sm:text-3xl font-black italic uppercase mb-2">
              NO WRONG CHOICE.
            </h2>
            <p className="text-xs sm:text-sm font-mono opacity-70 max-w-lg mx-auto mb-4">
              &ldquo;There is no &apos;best&apos; school, only the school that
              is best for YOU. The Big 4 are all premier institutions, and
              graduating from any of them carries immense weight in the
              professional world.&rdquo;
            </p>
            <p className="text-lg font-bold text-purple-400">
              Go get &apos;em, Future Isko, Blue Eagle, Archer, or Thomasian.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
