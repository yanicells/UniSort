import { Container } from "../layout/Container";

interface UniversityTemplateProps {
  name: string;
  code: string;
  slogan: string;
  color: string;
  overview: string;
  culture: string;
  studentLife: string;
}

export function UniversityTemplate({
  name,
  code,
  slogan,
  color,
  overview,
  culture,
  studentLife,
}: UniversityTemplateProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name,
    description: overview,
    url: `https://unisort.com/${code.toLowerCase()}`,
  };

  return (
    <div className="min-h-screen">
      <section className="w-full py-20 md:py-32" style={{ backgroundColor: color }}>
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center text-white space-y-3">
          <h1 className="text-5xl md:text-6xl font-bold">{name}</h1>
          <p className="text-xl md:text-2xl opacity-90">"{slogan}"</p>
        </div>
      </section>

      <Container className="space-y-16 py-12">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <section id="overview">
          <h2 className="text-3xl font-bold mb-4" style={{ color }}>
            Overview
          </h2>
          <p className="text-foreground/80 leading-relaxed">{overview}</p>
        </section>

        <section id="culture">
          <h2 className="text-3xl font-bold mb-4" style={{ color }}>
            Campus Culture
          </h2>
          <p className="text-foreground/80 leading-relaxed">{culture}</p>
        </section>

        <section id="student-life">
          <h2 className="text-3xl font-bold mb-4" style={{ color }}>
            Student Life
          </h2>
          <p className="text-foreground/80 leading-relaxed">{studentLife}</p>
        </section>

        <section className="text-center">
          <a
            className="px-8 py-4 text-white rounded-md text-lg font-medium hover:opacity-90"
            style={{ backgroundColor: color }}
            href="/quiz"
          >
            Take the Quiz to Find Your Match →
          </a>
        </section>
      </Container>
    </div>
  );
}

