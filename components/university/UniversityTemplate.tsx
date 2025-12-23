import { Container } from "../layout/Container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

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
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="relative w-full py-24 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundColor: color }}
        />
        <div className="relative max-w-6xl mx-auto px-4 md:px-8 text-center space-y-4 sm:space-y-6">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight"
            style={{ color }}
          >
            {name}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-muted-foreground">
            &quot;{slogan}&quot;
          </p>
        </div>
      </section>

      <Container className="space-y-12 py-12 -mt-12 relative z-10">
        {/* Overview Card */}
        <Card
          className="border-t-4 shadow-lg"
          style={{ borderTopColor: color }}
        >
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl" style={{ color }}>
              Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
              {overview}
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Culture Card */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl" style={{ color }}>
                Campus Culture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-muted-foreground">{culture}</p>
            </CardContent>
          </Card>

          {/* Student Life Card */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl" style={{ color }}>
                Student Life
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-muted-foreground">
                {studentLife}
              </p>
            </CardContent>
          </Card>
        </div>

        <section className="text-center pt-8">
          <Link
            className="inline-block px-6 sm:px-8 py-3 sm:py-4 text-white rounded-full text-base sm:text-lg font-medium hover:opacity-90 transition-opacity shadow-md"
            style={{ backgroundColor: color }}
            href="/quiz"
          >
            Take the Quiz to Find Your Match →
          </Link>
        </section>
      </Container>
    </div>
  );
}
