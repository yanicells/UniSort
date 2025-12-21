export const questions = {
  questions: [
    {
      section: "Academic Structure & Admin Support",
      question: "Your ideal learning environment includes:",
      choices: [
        {
          text: "Oral exams and discussions where I defend my ideas verbally",
          admu: 20,
          dlsu: 2,
          up: 6,
          ust: 3,
        },
        {
          text: "Fast-paced lectures with multiple assessments throughout the term",
          admu: 6,
          dlsu: 20,
          up: 4,
          ust: 6,
        },
        {
          text: "Independent study with minimal lectures and self-directed learning",
          admu: 3,
          dlsu: 4,
          up: 20,
          ust: 1,
        },
        {
          text: "Traditional exams and high-volume memorization",
          admu: 1,
          dlsu: 3,
          up: 2,
          ust: 20,
        },
      ],
      rationale:
        "ADMU is famous for oral exams in Philosophy and Theology. DLSU's trimestral system creates fast-paced assessment cycles. UP emphasizes independent learning with minimal guidance. UST focuses on traditional, volume-heavy pedagogy for board exam preparation.",
    },
    {
      section: "Academic Structure & Admin Support",
      question:
        'How much "hand-holding" or administrative support do you expect?',
      choices: [
        {
          text: "I expect efficient systems. If I pay high tuition, I want aircon, working websites, and clear processes.",
          admu: 6,
          dlsu: 12,
          up: 0,
          ust: 3,
        },
        {
          text: "I expect to be cared for as a person, with accessible mental health support and guidance.",
          admu: 17,
          dlsu: 6,
          up: 1,
          ust: 2,
        },
        {
          text: "I expect nothing. I am ready to fight for my class slots, camp out for forms, and navigate a broken system.",
          admu: 2,
          dlsu: 2,
          up: 20,
          ust: 5,
        },
      ],
      rationale:
        'UP\'s "CRS" and admin are notoriously difficult/broken. DLSU is viewed as "getting what you pay for" in efficiency. ADMU emphasizes cura personalis (care). UST\'s admin is often viewed as repressive or bureaucratic.',
    },
    {
      section: "Academic Structure & Admin Support",
      question: "When you need to enlist in classes, you prefer:",
      choices: [
        {
          text: "An organized system even if competitive",
          admu: 9,
          dlsu: 8,
          up: 0,
          ust: 5,
        },
        {
          text: "First-come-first-served with some luck involved",
          admu: 4,
          dlsu: 6,
          up: 4,
          ust: 3,
        },
        {
          text: "Fixed block schedules decided for me",
          admu: 1,
          dlsu: 2,
          up: 0,
          ust: 20,
        },
        {
          text: "I can handle a chaotic, frustrating system if needed",
          admu: 6,
          dlsu: 6,
          up: 20,
          ust: 3,
        },
      ],
      rationale:
        'ADMU has the most organized enrollment. DLSU\'s AnimoSys crashes frequently but is functional. UP\'s CRS is described as "Hunger Games" requiring "prerog" (begging). UST uses pre-determined block sections. UP\'s system is famously dysfunctional.',
    },
    {
      section: "Schedule, Pace & Structure",
      question: "Your preferred pace of academic life:",
      choices: [
        {
          text: "Fast-paced with three terms per year, minimal breaks",
          admu: 6,
          dlsu: 20,
          up: 0,
          ust: 2,
        },
        {
          text: "Moderate semester pace with traditional breaks",
          admu: 9,
          dlsu: 0,
          up: 7,
          ust: 9,
        },
        {
          text: "Flexible, self-directed pace",
          admu: 5,
          dlsu: 2,
          up: 20,
          ust: 1,
        },
      ],
      rationale:
        "DLSU's trimestral system is uniquely fast-paced (\"14 weeks of hell\"). ADMU and UST use traditional semesters. UP's pace is self-directed but delays are normalized. The trimester creates constant urgency DLSU students describe as relentless.",
    },
    {
      section: "Schedule, Pace & Structure",
      question: "How do you want your university to challenge you?",
      choices: [
        {
          text: "Through intellectual rigor and critical thinking",
          admu: 14,
          dlsu: 4,
          up: 15,
          ust: 4,
        },
        {
          text: "Through volume and endurance testing",
          admu: 2,
          dlsu: 5,
          up: 6,
          ust: 18,
        },
        {
          text: "Through speed and time management demands",
          admu: 2,
          dlsu: 18,
          up: 2,
          ust: 6,
        },
        {
          text: "Through comprehensive support that pushes me to grow",
          admu: 17,
          dlsu: 6,
          up: 0,
          ust: 3,
        },
      ],
      rationale:
        "ADMU and UP emphasize critical thinking (Core Curriculum vs independent analysis). UST focuses on volume and memorization. DLSU demands efficient time management due to trimester pace. ADMU provides supportive challenge; UP and UST test survival abilities.",
    },
    {
      section: "Schedule, Pace & Structure",
      question: "What is your preferred schedule structure?",
      choices: [
        {
          text: 'Block sections - same classmates for all subjects, 7 AM to 7 PM schedule to build a "trauma bond"',
          admu: 2,
          dlsu: 1,
          up: 0,
          ust: 20,
        },
        {
          text: "Flexible/independent - I choose my own schedule and classmates, even if unpredictable or lonely",
          admu: 10,
          dlsu: 7,
          up: 17,
          ust: 0,
        },
        {
          text: "Fast-paced variable schedule requiring elite time management",
          admu: 4,
          dlsu: 18,
          up: 2,
          ust: 3,
        },
        {
          text: "Structured but balanced - mix of core classes with time for consultations and reflection",
          admu: 18,
          dlsu: 7,
          up: 3,
          ust: 6,
        },
      ],
      rationale:
        "UST's 7-7 block sections are defining. UP offers maximum flexibility through CRS. DLSU's trimester demands efficient scheduling. ADMU provides structured balance supporting cura personalis.",
    },
    {
      section: "Schedule, Pace & Structure",
      question:
        'The thought of graduating "on time" vs potentially being delayed:',
      choices: [
        {
          text: "Graduating on time is essential to me",
          admu: 8,
          dlsu: 9,
          up: 1,
          ust: 5,
        },
        {
          text: "I'm okay with delays if it means better learning",
          admu: 3,
          dlsu: 4,
          up: 10,
          ust: 4,
        },
        {
          text: "Delays would cause significant stress",
          admu: 7,
          dlsu: 8,
          up: 1,
          ust: 8,
        },
      ],
      rationale:
        'UP normalizes delays due to CRS and academic difficulty (being "delayed" is destigmatized). DLSU\'s trimester structure allows for catch-up. UST has debarment risks but summer terms help. ADMU has good retention support. UP students view delays as badges of survival.',
    },
    {
      section: "Social Environment, Class & Language",
      question: "What is your preferred style of social interaction and humor?",
      choices: [
        {
          text: '"Conyo" banter with Western-influenced humor and niche interests - it\'s my natural way of speaking',
          admu: 18,
          dlsu: 20,
          up: 1,
          ust: 5,
        },
        {
          text: '"Chill" and inclusive - I code-switch between conyo and "kanal" humor depending on the crowd',
          admu: 12,
          dlsu: 10,
          up: 6,
          ust: 18,
        },
        {
          text: '"Kanal," relatable, grounded humor where being "street-smart" is valued over pretense',
          admu: 2,
          dlsu: 4,
          up: 20,
          ust: 18,
        },
        {
          text: "Serious, ideology-infused debate where social conversations often turn political or philosophical",
          admu: 9,
          dlsu: 2,
          up: 18,
          ust: 3,
        },
      ],
      rationale:
        'ADMU and DLSU are centers of "Conyo" culture. DLSU is more inclusive/adaptable. UST prides itself on being "kanal" and relatable. UP views "Conyo" as a "Burgis" marker and prefers politicized discourse.',
    },
    {
      section: "Social Environment, Class & Language",
      question:
        "How do you feel about English being the dominant language of instruction and social interaction on campus?",
      choices: [
        {
          text: "I prefer it; it's the language of global opportunity and academic discourse",
          admu: 17,
          dlsu: 15,
          up: 6,
          ust: 7,
        },
        {
          text: "I'm comfortable with it, but I appreciate a campus where code-switching to Filipino is common and natural",
          admu: 5,
          dlsu: 10,
          up: 17,
          ust: 17,
        },
        {
          text: "I'm critical of it; it can be an exclusionary barrier and undermines our national language",
          admu: 1,
          dlsu: 3,
          up: 20,
          ust: 6,
        },
        {
          text: "It doesn't matter to me; I'll adapt to whatever linguistic code helps me fit in and succeed",
          admu: 8,
          dlsu: 12,
          up: 7,
          ust: 18,
        },
      ],
      rationale:
        'ADMU has a strong "conyo" English hegemony. DLSU and UP show more fluid code-switching. UP has active discourse about language and elitism. UST students pride themselves on being "social chameleons" who adapt.',
    },
    {
      section: "Social Environment, Class & Language",
      question:
        "How comfortable are you with a socially elite or wealthy student environment?",
      choices: [
        {
          text: "Very comfortable - I come from or relate to that background",
          admu: 14,
          dlsu: 18,
          up: 0,
          ust: 4,
        },
        {
          text: "Uncomfortable - I strongly prefer a grounded, socioeconomically diverse environment",
          admu: 10,
          dlsu: 2,
          up: 20,
          ust: 18,
        },
        {
          text: "Neutral - I can adapt and find my crowd regardless of dominant class culture",
          admu: 10,
          dlsu: 8,
          up: 10,
          ust: 15,
        },
      ],
      rationale:
        'ADMU and DLSU have strong "conyo elite" cultures despite scholarship programs. UP and UST are more socioeconomically diverse and grounded. UP struggles with "burgis invasion." UST is most middle-class. Scholars at ADMU/DLSU report feeling alienated.',
    },
    {
      section: "Social Environment, Class & Language",
      question:
        "You come from a provincial public school or a lower-income background. How important is it to find a community of similar students?",
      choices: [
        {
          text: "Crucial: I need a sanctuary or formal support group to navigate potential culture shock",
          admu: 20,
          dlsu: 12,
          up: 6,
          ust: 7,
        },
        {
          text: 'Important, but I\'m confident I can "code-switch" and adapt to the dominant campus culture',
          admu: 10,
          dlsu: 18,
          up: 10,
          ust: 16,
        },
        {
          text: "Somewhat important, but the campus is diverse enough that I'll find my people regardless",
          admu: 5,
          dlsu: 7,
          up: 18,
          ust: 14,
        },
        {
          text: "Not a priority; I expect to be judged solely on my merit and resilience",
          admu: 3,
          dlsu: 4,
          up: 12,
          ust: 20,
        },
      ],
      rationale:
        'ADMU has Ateneo Gabay for scholars. DLSU scholars report an inclusive vibe but still need to adapt. UP is the most socioeconomically diverse (despite gentrification). UST\'s "trauma bonding" and middle-class melt pot can integrate students through shared struggle.',
    },
    {
      section: "Student Organizations & Networking",
      question:
        "The idea of joining organizations through rigorous, sometimes intense application processes:",
      choices: [
        {
          text: "Excites me - I value exclusivity and proving myself",
          admu: 10,
          dlsu: 12,
          up: 20,
          ust: 14,
        },
        {
          text: "Intimidates me - I prefer easier, more welcoming entry",
          admu: 15,
          dlsu: 7,
          up: 0,
          ust: 5,
        },
        {
          text: "Doesn't matter much - I may not join organizations",
          admu: 4,
          dlsu: 5,
          up: 2,
          ust: 4,
        },
      ],
      rationale:
        'UP has the most intense "apps" processes (psychological pressure, hazing-like elements reported). UST and DLSU also have competitive org applications. ADMU\'s org culture is professional but less brutal. Students avoiding intense org culture should avoid UP.',
    },
    {
      section: "Student Organizations & Networking",
      question:
        "What role should student organizations play in your college life?",
      choices: [
        {
          text: "Professional training ground - highly structured, corporate simulation for resume building",
          admu: 15,
          dlsu: 18,
          up: 1,
          ust: 5,
        },
        {
          text: "Political/advocacy platform - service-oriented, expected to take stands on national issues",
          admu: 6,
          dlsu: 2,
          up: 20,
          ust: 8,
        },
        {
          text: "Family-like brotherhood/sisterhood - hard to get into, provides lifelong bonds and academic survival support",
          admu: 15,
          dlsu: 6,
          up: 20,
          ust: 18,
        },
        {
          text: "Social/creative space limited by admin bureaucracy and red tape",
          admu: 2,
          dlsu: 4,
          up: 4,
          ust: 20,
        },
      ],
      rationale:
        'DLSU orgs are corporate simulations. UP orgs are highly politicized with intense "apps" creating loyalty. UST orgs provide social bonds but are heavily regulated by OSA. ADMU orgs are professional but less corporate than DLSU. UP and UST both emphasize survival support (old exams, tips).',
    },
    {
      section: "Student Organizations & Networking",
      question:
        "Your approach to networking and building professional connections:",
      choices: [
        {
          text: "I actively seek networking opportunities and corporate training",
          admu: 16,
          dlsu: 20,
          up: 3,
          ust: 7,
        },
        {
          text: "I prefer authentic connections over transactional networking",
          admu: 14,
          dlsu: 8,
          up: 14,
          ust: 15,
        },
        {
          text: "Networking isn't a priority for me",
          admu: 2,
          dlsu: 1,
          up: 10,
          ust: 5,
        },
      ],
      rationale:
        "DLSU and ADMU orgs function as corporate training grounds with strong alumni networks. ADMU's SOM particularly emphasizes networking. UP's org culture is service-oriented rather than professional. UST balances both approaches.",
    },
    {
      section: "Political Climate & Activism",
      question: "How do you view political activism and your role in it?",
      choices: [
        {
          text: "Essential and frontline - I want to be actively involved in protests and grassroots movements, even if it involves risk",
          admu: 4,
          dlsu: 1,
          up: 20,
          ust: 5,
        },
        {
          text: 'Important but moderate - I prefer intellectual discourse, institutional advocacy, and "radical moderation" over street protests',
          admu: 15,
          dlsu: 8,
          up: 6,
          ust: 7,
        },
        {
          text: "Supportive but not active - I care about issues but prioritize career and studies over participation",
          admu: 8,
          dlsu: 18,
          up: 1,
          ust: 10,
        },
        {
          text: "Suppressed - I want to speak out but fear administrative punishment",
          admu: 7,
          dlsu: 8,
          up: 0,
          ust: 15,
        },
      ],
      rationale:
        'UP is the center of militant grassroots activism ("Tibak culture") with real risks (red-tagging). ADMU practices "radical moderation" (critiqued as performative - Twitter threads, campus rallies). DLSU is pragmatic/issue-based (tuition protests). UST students are restive but heavily suppressed by OSA censorship and conservative administration.',
    },

    {
      section: "Campus Environment, Aesthetics & Safety",
      question: "Which campus vibe appeals to you most?",
      choices: [
        {
          text: "A green sanctuary - lots of trees, open fields, beautiful and stress-reducing, distinct from city noise",
          admu: 20,
          dlsu: 1,
          up: 18,
          ust: 8,
        },
        {
          text: "A modern vertical campus - air-conditioned buildings, elevators, function over form",
          admu: 8,
          dlsu: 20,
          up: 0,
          ust: 4,
        },
        {
          text: "Historical and characterful - old arches and tradition, accepting some decay and maintenance issues",
          admu: 5,
          dlsu: 1,
          up: 8,
          ust: 20,
        },
        {
          text: "An open public park - vast walking distances, nature mixed with crumbling infrastructure and accessibility",
          admu: 10,
          dlsu: 0,
          up: 20,
          ust: 2,
        },
      ],
      rationale:
        'ADMU is a "green bubble" sanctuary. DLSU is vertical/modern in concrete jungle (Henry Sy facilities). UST is defined by Spanish colonial history and character. UP is an open campus with "beautiful ruins" aesthetic. All except DLSU prioritize natural beauty; DLSU prioritizes functionality.',
    },
    {
      section: "Campus Environment, Aesthetics & Safety",
      question: "How do you prefer to get around campus?",
      choices: [
        {
          text: "I don't mind walking long distances, even in the heat/sun.",
          admu: 12,
          dlsu: 0,
          up: 20,
          ust: 6,
        },
        {
          text: 'I need a "compact" campus or elevators; I hate sweating before class.',
          admu: 2,
          dlsu: 20,
          up: 0,
          ust: 7,
        },
        {
          text: "I rely on a car or campus shuttles because the campus is huge/gated.",
          admu: 17,
          dlsu: 9,
          up: 4,
          ust: 2,
        },
      ],
      rationale:
        "UP is a walking campus. DLSU is vertical (elevators). ADMU is a car/shuttle campus. UST is compact but requires walking/wading.",
    },
    {
      section: "Campus Environment, Aesthetics & Safety",
      question: 'How do you handle "The Bubble" vs exposure to urban reality?',
      choices: [
        {
          text: "I prefer a comfortable, safe bubble - I've lived a sheltered life and that's okay",
          admu: 17,
          dlsu: 12,
          up: 0,
          ust: 1,
        },
        {
          text: "I want exposure to gritty reality daily - I'm street-smart and can navigate jeeps, floods, and urban challenges",
          admu: 2,
          dlsu: 4,
          up: 20,
          ust: 20,
        },
        {
          text: "I want a bubble to retreat to, but with easy access to the city when I choose",
          admu: 8,
          dlsu: 20,
          up: 4,
          ust: 5,
        },
        {
          text: "Moderate - I can commute and adapt but prefer some safety and structure",
          admu: 10,
          dlsu: 12,
          up: 12,
          ust: 14,
        },
      ],
      rationale:
        'ADMU is the ultimate sheltered "Bubble" (car culture, gated campus). UP and UST force daily exposure to Philippine urban reality (commute, poverty, street smarts required). DLSU is a bubble inside a gritty area (Taft) - condo culture offers refuge. UP and UST students develop resilience through necessity.',
    },
    {
      section: "Campus Environment, Aesthetics & Safety",
      question: 'Dealing with "The Flood":',
      choices: [
        {
          text: "Deal breaker. I cannot study somewhere that floods waist-deep.",
          admu: 10,
          dlsu: 6,
          up: 10,
          ust: 0,
        },
        {
          text: "It's an adventure. I'm willing to wade or ride a boat if needed.",
          admu: 0,
          dlsu: 5,
          up: 3,
          ust: 20,
        },
        {
          text: "I'll just live in a high-rise condo nearby to avoid it.",
          admu: 3,
          dlsu: 17,
          up: 0,
          ust: 6,
        },
      ],
      rationale:
        "UST is legendary for flooding (Waterworld). DLSU (Taft) floods but has condo culture. ADMU/UP are generally safer from flood disruption (ADMU is on a hill, UP is vast).",
    },
    {
      section: "Campus Environment, Aesthetics & Safety",
      question: "What is your biggest concern regarding campus safety?",
      choices: [
        {
          text: "Theft or snatching in open, public areas within or immediately around campus",
          admu: 6,
          dlsu: 18,
          up: 20,
          ust: 12,
        },
        {
          text: "Harassment (sexual or otherwise) from within the university community (peers, professors)",
          admu: 14,
          dlsu: 10,
          up: 14,
          ust: 10,
        },
        {
          text: "Overly repressive security or administration that polices student behavior and expression",
          admu: 4,
          dlsu: 2,
          up: 6,
          ust: 20,
        },
        {
          text: "Navigating natural elements like flooding or extreme heat during commutes",
          admu: 2,
          dlsu: 6,
          up: 10,
          ust: 20,
        },
      ],
      rationale:
        "DLSU's Taft and UP's open campus have notable theft issues. ADMU had the \"Time's Up\" movement addressing internal harassment. UST's OSA is the epitome of repressive security. UST's \"Waterworld\" flooding is a legendary safety/annoyance concern.",
    },
    {
      section: "Values, Religion & Personal Growth",
      question:
        "What is your stance on religion in your university experience?",
      choices: [
        {
          text: "I want a secular education with no mandatory mass or theology classes",
          admu: 0,
          dlsu: 0,
          up: 20,
          ust: 0,
        },
        {
          text: "Very important - I want traditional Catholic structures, rituals, religious community and formation",
          admu: 8,
          dlsu: 10,
          up: 0,
          ust: 20,
        },
        {
          text: "I value critical, philosophical approach to faith through heavy Philo/Theo curriculum that questions everything",
          admu: 20,
          dlsu: 6,
          up: 2,
          ust: 4,
        },
        {
          text: "Open to exposure and light requirements but not mandatory participation or heavy theology",
          admu: 10,
          dlsu: 18,
          up: 8,
          ust: 6,
        },
      ],
      rationale:
        "UP is the only secular institution. UST is most Catholic (mandatory theology, Mass, Angelus, conservative). ADMU (Jesuit) is famous for heavy Core Curriculum with critical, questioning approach to theology. DLSU (La Salle) is Catholic but pragmatic with lighter religious requirements. Non-religious students struggle most at UST.",
    },
    {
      section: "Values, Religion & Personal Growth",
      question:
        "What kind of personal transformation are you seeking from university?",
      choices: [
        {
          text: "To become an articulate, well-rounded leader with strong moral compass and philosophical depth",
          admu: 20,
          dlsu: 8,
          up: 10,
          ust: 12,
        },
        {
          text: "To become a critical, independent thinker unafraid to challenge systems and authority",
          admu: 11,
          dlsu: 5,
          up: 20,
          ust: 4,
        },
        {
          text: "To become a competent, efficient professional ready to excel in the corporate world",
          admu: 10,
          dlsu: 20,
          up: 2,
          ust: 8,
        },
        {
          text: "To become a resilient, street-smart survivor with hardened work ethic and practical skills",
          admu: 3,
          dlsu: 7,
          up: 16,
          ust: 20,
        },
      ],
      rationale:
        'ADMU\'s "Philosopher-King" (holistic formation via Core Curriculum). UP\'s "Activist-Intellectual" (independent critical thinking). DLSU\'s "Corporate Achiever" (efficiency and professional networking). UST\'s "Resilient Soldier" (survival through volume and endurance). Each university\'s culture primes students for distinct formation.',
    },
    {
      section: "Values, Religion & Personal Growth",
      question:
        "How much do you value university prestige, rankings, and school pride?",
      choices: [
        {
          text: "Immensely - I want the social capital of a top-tier institution and will proudly defend my school",
          admu: 18,
          dlsu: 14,
          up: 18,
          ust: 16,
        },
        {
          text: "Important for program reputation - I value specific strengths of my chosen field over general rankings",
          admu: 14,
          dlsu: 18,
          up: 18,
          ust: 18,
        },
        {
          text: "Moderate - I'm proud but critical of flaws; I'm skeptical of prestige culture and prefer authentic community",
          admu: 12,
          dlsu: 10,
          up: 14,
          ust: 10,
        },
        {
          text: "Low priority - I'm here for the degree and personal growth, not the brand name or mascot",
          admu: 4,
          dlsu: 4,
          up: 6,
          ust: 4,
        },
      ],
      rationale:
        'ADMU\'s elite reputation is pronounced with strong school pride. DLSU emphasizes program-specific excellence and corporate networking value. UP combines "Iskolar ng Bayan" identity with fierce UAAP pride despite skepticism of elitism. UST has "defensive pride" (students defend school fiercely despite admin issues) and internal prestige through survival. All Big 4 have strong school spirit, but approaches to prestige differ - ADMU/DLSU embrace it, UP critiques it while still proud, UST earns it through endurance.',
    },
    {
      section: "Values, Religion & Personal Growth",
      question: 'Which "Green Flag" matters most to you?',
      choices: [
        {
          text: 'A community that is "down-to-earth," "kanal" (relatable), and warm.',
          admu: 7,
          dlsu: 7,
          up: 15,
          ust: 20,
        },
        {
          text: 'A culture of "efficiency," good facilities, and professional networking.',
          admu: 6,
          dlsu: 20,
          up: 0,
          ust: 5,
        },
        {
          text: 'A focus on "holistic formation," philosophy, and caring for the person.',
          admu: 20,
          dlsu: 6,
          up: 2,
          ust: 3,
        },
        {
          text: 'Absolute "academic freedom" and the diversity of people you meet.',
          admu: 8,
          dlsu: 4,
          up: 20,
          ust: 3,
        },
      ],
      rationale:
        "Matches the core \"Green Flags\" identified in the research: UST's community/humility, DLSU's facilities/network, ADMU's formation, UP's freedom/diversity.",
    },
    {
      section: "Inclusivity, Expression & Mental Health",
      question:
        'How important is "Freedom of Expression" regarding your appearance (hair color, clothes) on campus?',
      choices: [
        {
          text: "Non-negotiable. I need absolute freedom to wear what I want and express my identity.",
          admu: 10,
          dlsu: 8,
          up: 20,
          ust: 0,
        },
        {
          text: "I don't mind a dress code or uniform; it actually saves me the stress of choosing outfits.",
          admu: 2,
          dlsu: 5,
          up: 0,
          ust: 20,
        },
        {
          text: 'I prefer looking polished or "corporate ready," so a smart casual vibe or dress code is fine.',
          admu: 12,
          dlsu: 14,
          up: 2,
          ust: 8,
        },
      ],
      rationale:
        'UP has no dress code and high expression freedom. UST is the only Big 4 with a strict uniform and hair policies. DLSU and ADMU have dress codes but are generally more relaxed than UST, though DLSU leans towards a "corporate/polished" look.',
    },
    {
      section: "Inclusivity, Expression & Mental Health",
      question: "How important is LGBTQ+ inclusivity and support to you?",
      choices: [
        {
          text: "Extremely important - I need explicit institutional support, safe spaces, and loud/proud visibility",
          admu: 18,
          dlsu: 10,
          up: 20,
          ust: 2,
        },
        {
          text: "Very important - I want a space where expression is totally normalized and non-conformity is the norm",
          admu: 15,
          dlsu: 10,
          up: 20,
          ust: 3,
        },
        {
          text: "Important but I can navigate less progressive spaces if the student body is tolerant",
          admu: 12,
          dlsu: 14,
          up: 14,
          ust: 14,
        },
        {
          text: "Not a major factor in my decision",
          admu: 8,
          dlsu: 10,
          up: 10,
          ust: 10,
        },
      ],
      rationale:
        "UP and ADMU are most LGBTQ+ friendly (UP has absolute freedom and normalization, ADMU has Gender Hubs and Pride March with institutional support). DLSU is moderately progressive and tolerant. UST administration is least supportive with actively discriminatory policies (bans cross-dressing), though student body is accepting. UP's culture makes non-conformity the norm.",
    },
    {
      section: "Inclusivity, Expression & Mental Health",
      question:
        "How important is it for you to have strong mental health support services available?",
      choices: [
        {
          text: "Extremely important - I need accessible counseling and wellness resources",
          admu: 20,
          dlsu: 8,
          up: 2,
          ust: 2,
        },
        {
          text: "Important but I can manage mostly on my own",
          admu: 10,
          dlsu: 14,
          up: 8,
          ust: 6,
        },
        {
          text: "Not a priority - I rely on friends and personal resilience",
          admu: 2,
          dlsu: 6,
          up: 16,
          ust: 18,
        },
      ],
      rationale:
        'ADMU leads in mental health support with comprehensive services. UP and UST have severely understaffed services (10-12 week wait times reported). DLSU offers moderate support. UP and UST students bond through "trauma" rather than institutional care.',
    },
    {
      section: "Lifestyle, Food & Financials",
      question:
        "You're choosing where to eat lunch on a regular day. What's your budget and priority?",
      choices: [
        {
          text: "₱60-₱100: I seek out the hidden, budget-friendly canteens, even if it's a trek",
          admu: 11,
          dlsu: 6,
          up: 20,
          ust: 20,
        },
        {
          text: "₱120-₱200: I go to the reliable, central student food court for convenience and socializing",
          admu: 16,
          dlsu: 18,
          up: 12,
          ust: 10,
        },
        {
          text: "₱250+: I enjoy eating at trendy cafes or restaurants near campus as a regular social activity",
          admu: 18,
          dlsu: 16,
          up: 4,
          ust: 2,
        },
        {
          text: "Cost varies: I prioritize bringing food or cooking to save money, relying on campus pantries",
          admu: 4,
          dlsu: 5,
          up: 18,
          ust: 10,
        },
      ],
      rationale:
        "UP and UST have strong, affordable food cultures (Area 2, Dapitan). ADMU and DLSU have central food courts (JSEC, Agno) but also high-cost surrounding areas (Regis, Taft). UP's dorm culture often involves strict budgets. The high-cost choice fits ADMU's Katipunan and DLSU's Taft gentrification.",
    },
    {
      section: "Lifestyle, Food & Financials",
      question: "What is your financial priority when considering university?",
      choices: [
        {
          text: "Minimizing cost - tuition must be free or very low, even if it means facing resource scarcity",
          admu: 5,
          dlsu: 1,
          up: 20,
          ust: 7,
        },
        {
          text: "Maximizing value - I'm willing to pay high tuition for top-notch facilities, support services, and career ROI",
          admu: 18,
          dlsu: 20,
          up: 1,
          ust: 8,
        },
        {
          text: "Seeking balance - I'll rely on scholarships and budget living, accepting some financial stress for the education",
          admu: 18,
          dlsu: 8,
          up: 15,
          ust: 10,
        },
        {
          text: "Cost is secondary - I will find a way to afford the university that fits me best, regardless of price",
          admu: 14,
          dlsu: 14,
          up: 6,
          ust: 10,
        },
      ],
      rationale:
        "UP offers free undergraduate tuition. DLSU is most expensive (₱90k+/term), ADMU has consistent tuition increases. UST is most affordable among private Big 4. ADMU and DLSU students expect value for money with premium facilities. All four have scholars (~20% at ADMU/DLSU) who navigate financial stress, but it's a defining feature of private schools.",
    },
    {
      section: "Social Life & Traditions",
      question: "How do you feel about regular weeknight drinking culture?",
      choices: [
        {
          text: "That's exactly the social life I want",
          admu: 6,
          dlsu: 20,
          up: 8,
          ust: 6,
        },
        {
          text: "Occasional participation is fine",
          admu: 12,
          dlsu: 14,
          up: 14,
          ust: 10,
        },
        {
          text: "Not my scene - I prefer other activities",
          admu: 10,
          dlsu: 4,
          up: 10,
          ust: 12,
        },
      ],
      rationale:
        'DLSU is famous for "Happy Thursday" drinking culture (despite admin crackdowns). ADMU has drinking scenes but less systematic. UP has activist-centered socializing. UST has party culture but less institutionalized than DLSU\'s Thursday tradition.',
    },
    {
      section: "Social Life & Traditions",
      question:
        "How important is a vibrant, large-scale campus tradition (like a Christmas fair or a concert series) to you?",
      choices: [
        {
          text: "Very Important; it's the emotional payoff and highlight of the school year",
          admu: 8,
          dlsu: 10,
          up: 17,
          ust: 20,
        },
        {
          text: "Important, but I'm critical if it becomes too commercialized or loses its original spirit",
          admu: 10,
          dlsu: 6,
          up: 20,
          ust: 10,
        },
        {
          text: "Somewhat Important; it's a fun excuse to party and socialize",
          admu: 12,
          dlsu: 16,
          up: 10,
          ust: 14,
        },
        {
          text: "Not Important; I prefer smaller, organic gatherings or don't prioritize school-sponsored events",
          admu: 6,
          dlsu: 8,
          up: 12,
          ust: 2,
        },
      ],
      rationale:
        "UST's Paskuhan is the definitive, can't-miss tradition. UP Fair is major but constantly critiqued for commercialization. DLSU's \"Happy Thursday\" legacy points to a social party culture. Some UP students are cynical about large events.",
    },
  ],
};
