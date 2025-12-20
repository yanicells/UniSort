import { NewspaperMasthead } from "@/components/layout/NewspaperMasthead";
import Link from "next/link";
import { Github } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f4f4f4] text-slate-900 font-serif pb-12">
      <NewspaperMasthead />

      {/* Main Content "Pop-out" */}
      <div className="max-w-4xl mx-auto bg-white shadow-xl min-h-screen border-x border-slate-300 mt-8 mb-12">
        {/* Header */}
        <div className="p-8 md:p-12 border-b-4 border-black text-center">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block">
            Editorial Board • Vol. 1
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
            About UniSort
          </h1>
          <p className="font-serif text-lg italic text-slate-600 max-w-2xl mx-auto">
            &quot;The story behind the algorithm that knows you better than you
            know yourself.&quot;
          </p>
        </div>

        {/* Content Body */}
        <div className="p-8 md:p-12 space-y-12">
          {/* Why I Made This */}
          <section className="prose prose-slate max-w-none">
            <h2 className="font-sans font-black text-2xl md:text-3xl uppercase mb-6 flex items-center gap-3">
              <span className="bg-black text-white px-3 py-1 text-lg transform -rotate-2">
                WHY?
              </span>
              <span>The Origin Story</span>
            </h2>
            <div className="columns-1 md:columns-2 gap-8 text-justify leading-relaxed font-serif text-slate-800">
              <p className="mb-4 first-letter:text-5xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px]">
                UniSort was born out of a simple observation: choosing a
                university is often reduced to grades and location, ignoring the
                vibrant, distinct cultures that define the &quot;Big Four&quot;
                experience.
              </p>
              <p className="mb-4">
                We wanted to create something that felt less like a form and
                more like a journey—a digital sorting hat that considers your
                personality, social preferences, and values.
              </p>
              <p>
                By wrapping it in a nostalgic newspaper aesthetic, we pay homage
                to the rich tradition of campus journalism while delivering
                modern, data-driven insights. It is a labor of love, code, and a
                lot of caffeine.
              </p>
            </div>
          </section>

          {/* Content Creation Process */}
          <section className="prose prose-slate max-w-none">
            <h2 className="font-sans font-black text-2xl md:text-3xl uppercase mb-6 flex items-center gap-3">
              <span className="bg-black text-white px-3 py-1 text-lg transform rotate-1">
                PROCESS
              </span>
              <span>How It Was Made</span>
            </h2>
            <div className="space-y-6 text-justify leading-relaxed font-serif text-slate-800">
              <p>
                The journey began with <strong>Research Gathering</strong>,
                where we tapped into the pulse of student life. We posted
                questions to Freedom Walls and communities across the Big 4
                universities (ADMU, DLSU, UP, UST) to collect raw, unfiltered
                experiences about culture, academics, and social life. These
                insights were compiled into comprehensive research documents
                that served as the foundation for everything that followed.
              </p>
              <p>
                For <strong>Quiz Development</strong>, we fed these research
                PDFs to AI to identify distinct university characteristics. We
                generated initial questions based on these patterns and refined
                them multiple times to strip away generic phrasing. Each
                question was carefully mapped to personality traits that align
                with specific campus cultures—like QPI pressure tolerance for
                ADMU or the fast-paced trimestral life of DLSU.
              </p>
              <p>
                We then built a robust <strong>Scoring System</strong> that
                moved beyond simple binary results. We developed a
                percentage-based tier system (from 0% to 100%) to represent
                nuance. To bring these scores to life, we studied the engaging
                writing style of 16personalities, iterating heavily to find a
                direct, personal voice. We crafted detailed descriptions for
                every compatibility tier, ensuring that whether you matched 5%
                or 95%, the result felt accurate to the ground-truth research.
              </p>
              <p>
                Finally, during <strong>Refinement</strong>, we meticulously
                removed AI-sounding phrases and ensured every description was
                cited back to our initial research. We balanced honesty with
                appeal, highlighting both the struggles and triumphs of each
                university. The result is a system built on a key principle:{" "}
                <em>
                  Raw student voices → AI analysis → Human refinement → Research
                  validation.
                </em>
              </p>
            </div>
          </section>

          {/* How to Contribute */}
          <section className="bg-slate-50 border-2 border-black p-6 md:p-8 transform rotate-1">
            <h2 className="font-sans font-black text-xl md:text-2xl uppercase mb-4 border-b-2 border-black pb-2 inline-block">
              Join The Editorial Team
            </h2>
            <p className="font-serif text-slate-700 mb-6">
              This project is open-source and community-driven. We need your
              help to ensure our &quot;sorting hat&quot; remains accurate and
              our campus lore stays up-to-date.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold font-sans uppercase text-sm mb-2 text-slate-500">
                  How You Can Help
                </h3>
                <ul className="list-disc list-inside font-serif text-sm space-y-2">
                  <li>
                    <strong>Fact Check:</strong> Correct our university trivia.
                  </li>
                  <li>
                    <strong>Expand:</strong> Add more questions to the quiz.
                  </li>
                  <li>
                    <strong>Refine:</strong> Improve the &quot;Big 4&quot;
                    culture guides.
                  </li>
                  <li>
                    <strong>Code:</strong> Fix bugs or add new features.
                  </li>
                </ul>
              </div>
              <div className="flex flex-col justify-center items-center text-center p-4 border border-dashed border-slate-400">
                <Github size={48} className="mb-3" />
                <p className="text-xs font-mono mb-4 text-slate-500">
                  Fork the repo on GitHub
                </p>
                <a
                  href="https://github.com/yanicells/UniSort"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white px-6 py-2 font-bold uppercase text-xs tracking-widest hover:bg-slate-800 transition"
                >
                  Contribute Now
                </a>
              </div>
            </div>
          </section>

          {/* Footer of the page */}
          <div className="text-center pt-12 border-t border-slate-200">
            <Link
              href="/"
              className="font-bold font-mono text-xs uppercase hover:underline"
            >
              ← Back to Front Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
