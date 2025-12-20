export interface UniversityData {
  id: string;
  name: string;
  publication: string;
  color: string;
  secondary: string;
  headline: string;
  subhead: string;
  intro: string;
  stats: {
    tuition: string;
    vibe: string;
    survival: string;
  };
  marquee: string;
  mainStory: {
    title: string;
    body: string;
    highlight: string;
    extraSections: Array<{
      title: string;
      text: string;
    }>;
  };
  campus: {
    title: string;
    text: string;
    spots: string[];
  };
  culture: {
    title: string;
    text: string;
    politics: string;
  };
  redFlags: string[];
  greenFlags: string[];
  testimonials: Array<{
    text: string;
    source: string;
  }>;
  survivalTips: Array<{
    title: string;
    desc: string;
  }>;
  whoThrives: string;
  whoStruggles: string;
}

export const universityData: Record<string, UniversityData> = {
  admu: {
    id: "admu",
    name: "Ateneo de Manila",
    publication: "THE BLUE EAGLES",
    color: "#0038A8",
    secondary: "#E1E8F5",
    headline: "THE JESUIT PHILOSOPHER-KING",
    subhead:
      "The Liberal Arts Gauntlet, The Conyo Hegemony & The Radical Moderate",
    intro:
      "Ateneo de Manila University (ADMU) is a private Jesuit research university in Quezon City, founded in 1859. Known for its liberal arts Core Curriculum emphasizing Philosophy and Theology, ADMU is one of the Philippines' premier institutions with strong programs in humanities, social sciences, and business. The university follows the Jesuit tradition of cura personalis (care for the whole person) in its educational approach.",
    stats: {
      tuition: "₱80k-90k",
      vibe: "One Big Fight!",
      survival: "Oral Exams",
    },
    marquee:
      "BREAKING: QPI RETENTION POLICY 'CULLS' SOPHOMORES /// JSEC PRICES HIT ALL-TIME HIGH /// TRAFFIC ON KATIPUNAN PARALYZES GATE 3",
    mainStory: {
      title: "The Liberal Arts Gauntlet",
      body: "If you choose Ateneo, you aren't just choosing a major; you are choosing a comprehensive intellectual formation. The 'Ateneo Way' is anchored in a mandatory Core Curriculum that requires everyone—from Computer Science to Theater Arts students—to take a heavy load of Philosophy, Theology, and History. The defining rite of passage here is the Oral Exam (or 'orals'). Instead of just filling out Scantron sheets, you will often find yourself sitting across from a professor, being 'grilled' on existential concepts. This creates a culture of 'Guided Rigor'. While you'll get more structural support than at a state university, the expectations for reflexive articulation are high. You are trained to be an 'articulate generalist' who can synthesize complex ideas on your feet. However, the pressure is constant due to the Quality Point Index (QPI). This numeric retention standard acts as a 'Sword of Damocles' over your head. If you don't maintain your QPI, you face the very real threat of being 'culled' from your program or the university entirely.",
      highlight:
        "The Oral Exam: A rite of passage where you are 'grilled' on existential concepts to become an 'articulate generalist'.",
      extraSections: [
        {
          title: "The 'Org' as Corporate Simulation",
          text: "If academics are the mind of Ateneo, the 'Org' is its soul. Participation is almost a cultural mandate. Ateneo organizations operate with a level of professionalism that mimics multinational corporations, complete with rigorous recruitment processes and 'corporate' hierarchies. This is the ultimate training ground for the Philippine elite. However, it leads to the 'BS Org' phenomenon, where students prioritize their organizations over their actual degrees, leading to toxic productivity and burnout.",
        },
        {
          title: "Identity: The Radical Moderate",
          text: "Ateneo is explicitly Catholic and Jesuit, but the experience is more about 'secularization through theology' than indoctrination. Theology and Philosophy classes often encourage you to deconstruct your faith to build it back on a stronger foundation. Politically, the campus is a stronghold of 'Radical Moderation'. Students are generally socially liberal—pro-LGBTQ+ and anti-dictatorship—but their activism is often critiqued as 'performative' or confined to safe spaces like Twitter/X. The 2025 AEWU labor strike highlighted this tension, as students had to reconcile the university's teachings on social justice with its corporate-style management of campus workers.",
        },
        {
          title: "Practical Realities: The High Cost of Belonging",
          text: "Ateneo is undeniably expensive, with annual tuition hikes being a persistent source of student grievance. Beyond tuition, the 'Ateneo Lifestyle' requires significant financial maneuvering. Katipunan has gentrified to the point where an average student budget is often insufficient for daily meals at Regis Center or UPTC. While the university offers robust scholarship programs (~18-20% of students), scholars often report 'masking' their financial status to fit into the dominant culture. On the plus side, student support services—especially for mental health through the Gender Hub or guidance office—are generally viewed as superior and more accessible than those in other universities.",
        },
      ],
    },
    campus: {
      title: "The Urban Sanctuary",
      text: "The Loyola Heights campus is frequently described as a 'Green Flag' because it feels like an 'Urban Sanctuary'. With its sprawling fields, abundance of trees, and open spaces like the Bellarmine Field, it provides a mental health refuge that is rare in Metro Manila. Daily life, however, is a negotiation between this 'Bubble' and the logistical realities of Katipunan Avenue. If you are a commuter, you will face the 'Katipunan Gauntlet'—a multi-modal struggle involving the LRT, jeeps, and tricycles. Inside the gates, you have access to state-of-the-art facilities like Arete, though you'll quickly notice a divide between the shiny new buildings and older classrooms that lack consistent air conditioning. Food is a major part of the daily rhythm, and where you eat often signals your budget. The John Gokongwei Student Enterprise Center (JSEC) is the social hub where student-run stalls offer trendy but pricier meals. If you're on a budget, you'll learn the 'trek' to the ISO Canteen or Ebai's at the dorms, where meals are more affordable.",
      spots: [
        "JSEC (Social Hub)",
        "ISO Canteen (Budget)",
        "Arete (Arts)",
        "Bellarmine Field",
      ],
    },
    culture: {
      title: "The Conyo Hegemony",
      text: "The 'Conyo' accent—a specific blend of English and Tagalog—serves as the primary linguistic code on campus. While it functions as a social neutralizer for some, it can be a barrier to entry for provincial or lower-income students who may feel 'intellectually inadequate' if they aren't fluent in it. There is a visible class hierarchy, often distinguished between 'Old Rich' (low-key, wearing simple clothes) and the 'Nouveau Riche' (more brand-conscious). You'll see students being fetched by drivers in SUVs while others wait for the campus e-jeep. This 'Bubble' can feel alienating if you aren't part of the 'homegrown' cliques from schools like Ateneo High School or Xavier.",
      politics:
        "Radical Moderation: Socially liberal but often critiqued as 'performative'.",
    },
    redFlags: [
      "Insular Elitism: High school lineage and 'conyo' culture can create exclusionary barriers.",
      "The 'Performative' Trap: Critique of 'pa-woke' activism—radical in theory, elite in lifestyle.",
      "Bureaucratic Paralysis: Sanggunian often criticized for over-consultation.",
    ],
    greenFlags: [
      "Cura Personalis in Action: Genuine investment in student well-being and mental health.",
      "Beautiful Environment: Green, sprawling campus is a major stress-reducer.",
      "Holistic Rigor: Learning how to think, argue, and articulate pays off long-term.",
    ],
    testimonials: [
      {
        text: "Ateneo will humble you to the core, not only with the environment but with academics too. Pressure is inevitable, of course you're studying in the top univ of the ph.",
        source: "Reddit, r/ADMU, 2025",
      },
      {
        text: "In Ateneo, however, being rich—or at least looking rich—is the norm. Flaunting luxury brands like Goyard or LV isn't seen as extraordinary.",
        source: "Reddit, r/Tomasino, 2025",
      },
      {
        text: "Ateneo will impart a 'Save the Philippines/the world' mentality... but I'm sorry to say I've been hurt by the emotional dishonesty and hypocrisy I found in some people.",
        source: "Reddit, r/ADMU, 2025",
      },
    ],
    survivalTips: [
      {
        title: "Master the 'Orals'",
        desc: "Don't just memorize; internalize. Practice articulating your arguments out loud with blockmates.",
      },
      {
        title: "Find the 'Budget' Map",
        desc: "If JSEC is draining your wallet, locate the ISO Canteen or LST for meals under ₱100.",
      },
      {
        title: "Watch Your QPI",
        desc: "Don't get too distracted by the vibrant org scene; the retention requirements are strict and being 'culled' is a reality.",
      },
      {
        title: "Code-Switch Comfortably",
        desc: "You don't have to 'fake' a conyo accent, but learning to navigate different social 'vibes' will help you network across cliques.",
      },
    ],
    whoThrives:
      "You will thrive at Ateneo if you value intellectual depth and holistic formation over pure technical training. It's for the student who doesn't mind debating Philosophy at 8:00 AM and who appreciates a high-trust, resource-rich environment. You'll love it if you are looking for a 'corporate simulation' through the org scene and want to build a high-value network for the future.",
    whoStruggles:
      "You might struggle if you are fiercely independent and hate being 'molded' by institutional values, or if you are on a very tight budget and feel alienated by the high cost of Katipunan living. If you prefer a 'sink or swim' environment without 'paternalistic' guidance, you might find the Ateneo 'Bubble' a bit too suffocating.",
  },
  dlsu: {
    id: "dlsu",
    name: "De La Salle",
    publication: "THE GREEN ARCHERS",
    color: "#006B3C",
    secondary: "#E8F5E9",
    headline: "THE CORPORATE FORGE",
    subhead: "14 Weeks of Hell: The High-Velocity Trimestral Sprint",
    intro:
      "De La Salle University (DLSU) is a private Catholic research university founded in 1911 by the De La Salle Brothers. Located in the heart of Manila along Taft Avenue, it is a premier institution recognized for its excellence in business, engineering, and computer studies. Operating on a distinct trimestral system, DLSU focuses on producing corporate-ready graduates through a blend of pragmatic education and Lasallian values.",
    stats: {
      tuition: "₱90k+",
      vibe: "Animo La Salle!",
      survival: "No Sleep",
    },
    marquee:
      "ENROLLMENT WARS: ANIMOSYS CRASHES AGAIN /// HAPPY THURSDAY CROWDS SPILL ONTO TAFT /// ELEVATOR QUEUES REACH 30 MINUTES",
    mainStory: {
      title: "The 14-Week Sprint",
      body: "The defining characteristic of your life at DLSU will be the trimestral system. Unlike other universities that operate on semesters, DLSU compresses the academic year into three 14-week terms. This creates a relentless, high-velocity environment where 'procrastination' isn't just a bad habit—it's a catastrophic risk. You will often hear the joke: 'Isang quiz sa Ateneo, LT (Long Test) na nyan sa Lasalle.' This pace shapes your entire psyche, forcing you to develop elite time-management skills often described as 'min-maxing' your education. To mitigate this, the university implements an Independent Learning Week (ILW) in Week 9, though students often find it functions more as a 'catch-up' period for asynchronous workloads than a genuine break.",
      highlight:
        "Min-Maxing: The elite time-management skill required to survive the trimestral system without burnout.",
      extraSections: [
        {
          title: "Identity: The Corporate Forge",
          text: "DLSU operates with a spirit of corporate pragmatism. Even its religious identity is pragmatic; while Catholic, the focus is less on deep theological debate and more on social adaptability and efficiency. Students often view themselves as 'consumers' of education, demanding transparency in tuition fee increases (TFI) and value for the high cost of attendance. Politics at DLSU is often institutionally led by the De La Salle Brothers, who take strong stances on human rights. The student body itself tends to be centrist or pragmatic, mobilizing most reliably when their economic interests are threatened, such as during the #AyokongMagMahal tuition protest campaigns.",
        },
        {
          title: "Organizations & Career: Networking as a Lifestyle",
          text: "Student organizations (orgs) at DLSU are professional training grounds. Structured under the Council of Student Organizations (CSO), they mimic corporate hierarchies with a focus on project management and marketing. Joining an org is seen as a crucial way to build a resume and access influential alumni networks. However, the University Student Government (USG) currently faces a crisis of legitimacy. Many students have grown tired of 'performative' leadership, leading to a rise in 'Abstain' votes during elections as a form of protest.",
        },
        {
          title: "Practical Realities: The Price of Efficiency",
          text: "DLSU is one of the most expensive universities in the country, with tuition often exceeding ₱90,000 per term. In exchange, you get highly efficient administrative processes and state-of-the-art facilities. The university also maintains a high 'scholar' population (~20-25%), which challenges the monolithic rich-kid stereotype and injects a culture of 'grind' and meritocracy into campus life.",
        },
      ],
    },
    campus: {
      title: "The Vertical Sanctuary",
      text: "DLSU is a vertical campus in a concrete jungle. You will spend a significant amount of time waiting for elevators in the Andrew Gonzalez Hall, where queues can last 20-30 minutes. The 'crown jewel' of the campus is the Henry Sy Sr. Hall (The Henry), a state-of-the-art library that serves as a social hub and a peaceful study sanctuary away from the pollution and noise of Taft Avenue. Daily survival involves navigating the Taft ecosystem. You'll eat at the Agno food court, the culinary heart of campus known for budget-friendly staples like bacsilog. However, once you step outside the gates, you must be street-smart. Taft is prone to flooding and safety concerns like snatching, necessitating a certain level of urban awareness.",
      spots: [
        "The Henry (Library)",
        "Agno Food Court",
        "Andrew Gonzalez Hall",
        "Taft Avenue",
      ],
    },
    culture: {
      title: "The Inclusive Conyo",
      text: "While stereotyped as an enclave for the 'conyo' elite, the social reality is more nuanced. The 'conyo' sociolect—a mix of English and Tagalog with a specific accent—is dominant, featuring slang like 'carps' (game) or 'scoobs' (no). However, students pride themselves on being 'social chameleons' who can switch between high-end 'aircon' humor and grounded 'kanal' humor. The community is surprisingly chill and less intellectually snobbish than other top schools. Wealth is visible through designer bags and nearby high-rise condos, but the social barriers are permeable. You will also encounter a strong 'work hard, play hard' ethos, historically centered around Happy Thursday, a drinking culture that serves as a release valve for the high-stress academic schedule.",
      politics:
        "Pragmatic & Consumerist: Students demand value for high tuition.",
    },
    redFlags: [
      "The Trimestral Burnout: The 'no break' system is mentally taxing.",
      "The Elevator Gauntlet: Daily source of stress in vertical buildings.",
      "Tuition Hikes: Constant annual increases (often ~8%) cause anxiety.",
      "Taft Safety: Urban hazards like snatching near the campus perimeter.",
    ],
    greenFlags: [
      "Efficiency and Facilities: 'The Henry' library is world-class.",
      "Catch-up Potential: Fail a course? Retake it next term without waiting a year.",
      "Job Readiness: Corporate org structure ensures high employability.",
      "Inclusive Social Vibe: Welcoming and generally non-judgmental.",
    ],
    testimonials: [
      {
        text: "Isang quiz sa Ateneo, LT (Long Test) na nyan sa Lasalle.",
        source: "Reddit, r/dlsu, 2024",
      },
      {
        text: "A lot of frosh aren't used to the trimestral setup so by the third term pagod na pagod na sila and you can really see the burnout hit.",
        source: "Reddit, r/dlsu, 2024",
      },
      {
        text: "The enrollment system is designed to screw you over EVERY TERM.",
        source: "Reddit, r/dlsu, 2023",
      },
      {
        text: "Students are tired of performative leadership... tired of parties treating positions like boxes to be filled.",
        source: "Reddit, r/dlsu, 2024",
      },
      {
        text: "My friends talk about trips to Switzerland while I count coins for laundry.",
        source: "Reddit, r/poor, 2024",
      },
    ],
    survivalTips: [
      {
        title: "Master the Trimester Speed",
        desc: "Do not procrastinate. Treat Week 1 like it's Week 5. Once requirements start, they don't stop.",
      },
      {
        title: "Strategic Enrollment",
        desc: "Be ready for the AnimoSys war. Have back-up schedules ready for when slots vanish.",
      },
      {
        title: "Use 'The Henry'",
        desc: "It's not just for books; it's the best place to nap, charge, and escape the heat.",
      },
      {
        title: "Join Orgs Wisely",
        desc: "Don't just join for a resume boost; find a community that supports your mental health.",
      },
    ],
    whoThrives:
      "You will thrive at DLSU if you are pragmatic, efficient, and resilient. This school is for students who want a 'fast lane' to their careers and value professional networking. You need to be someone who can handle a rapid-fire pace without needing constant hand-holding.",
    whoStruggles:
      "You might struggle if you prefer a slow, contemplative academic pace or if you feel deeply alienated by visible wealth and 'conyo' culture. Those who require a high degree of administrative 'cura personalis' might find DLSU's 'student-as-consumer' relationship a bit cold or transactional.",
  },
  up: {
    id: "up",
    name: "U.P. Diliman",
    publication: "THE FIGHTING MAROONS",
    color: "#7B1113",
    secondary: "#FBE9E7",
    headline: "BASTION OF CRITICAL SURVIVAL",
    subhead: "Beautiful Decay, Systemic Abandonment, and The Prerog Ritual",
    intro:
      "The University of the Philippines Diliman (UPD) is the flagship campus of the national university system, established in 1949 in Quezon City. As a state university offering free undergraduate tuition, UP is renowned for its academic excellence, research output, and deep-seated history of student activism. Its sprawling 493-hectare campus is the largest and most comprehensive in the UP system.",
    stats: {
      tuition: "FREE",
      vibe: "UP Fight!",
      survival: "Hunger Games",
    },
    marquee:
      "CRS ENLISTMENT FAILURE RATE AT 40% /// RED-TAGGING FEARS RISE /// IKOT JEEP FARE HIKE PROTESTED /// AREA 2 RENOVATION SPARKS OUTRAGE",
    mainStory: {
      title: "The Architecture of Resilience",
      body: "At UP, education isn't something handed to you; it is something you wrestle from the system. The university culture does not prioritize traditional 'nurturing' but instead creates a Darwinian 'sink or swim' environment where you are expected to adapt or leave. You will often hear the term 'independent learning,' which students frequently describe as a euphemism for 'systemic abandonment'. It is common for professors to act more as facilitators than teachers, expecting you to bridge massive knowledge gaps through self-study, YouTube, and peer support. Before you even step into a classroom, you must survive the Computerized Registration System (CRS). Because slots for popular General Education (GE) classes are scarce, enlistment is a high-stakes lottery. When the system fails you, you resort to 'prerog'—physically lining up or emailing professors to beg for a slot, sometimes being asked to sing, dance, or write emotional appeals.",
      highlight:
        "The Prerog: Physically lining up or emailing professors to beg for a slot, sometimes performing talents just to get in.",
      extraSections: [
        {
          title: "Identity: Critical Nationalism",
          text: "The core value of a UP student is 'Critical Nationalism'. You are taught that you owe your education to the Filipino taxpayers, which creates a mandate to serve the nation rather than just pursuing personal profit. Activism is campus DNA; even if you aren't a 'Tibak' (hardcore activist), you will encounter rallies and class walkouts. However, the current climate is fraught with fear due to 'red-tagging'. Unlike other universities, UP is strictly secular—no mandatory theology classes, fostering a diverse subculture of beliefs.",
        },
        {
          title: "Organizations & Career: Institutionalized Trauma",
          text: "In UP, joining an organization (an 'org') is an intense, semester-long commitment known as the 'Apps' process. Many orgs maintain 'Kupal Culture,' involving power-tripping and hazing-like rituals. You might be forced to complete a 'Sig Sheet' where you must hunt down every member. While criticized as psychological torture, members rationalize these practices as a way to build 'batch unity' and 'grit'.",
        },
        {
          title: "Practical Realities: The Frugal Student",
          text: "Life in UP is dictated by a tight budget and logistical hurdles. While undergraduate tuition is free, hidden costs like dorm fees, food, and high-spec gadgets create a financial burden. Mental health is a major concern; PsychServ is severely understaffed, with wait times stretching to 10-12 weeks. Safety is also an issue; because UP is an open public campus, theft is a constant threat.",
        },
      ],
    },
    campus: {
      title: "Beautiful Ruins",
      text: "The physical atmosphere of UPD is one of 'beautiful decay'. You will study in historic buildings with peeling paint and broken chairs, but you will also walk under stunning acacia trees and spend sunsets at the Sunken Garden. Because the campus is vast, walking several kilometers a day is normal. The 'Ikot' and 'Toki' jeepneys are the lifeblood of campus mobility. This environment dictates a casual dress code—slippers and 'dressed down' attire are the norm. For decades, Area 2 (A2) has been the culinary heart, offering iconic meals like Iskomai and Tofu Sisig. However, the recent introduction of the upscale 'DiliMall' has sparked anger, seen as a symbol of gentrification replacing community-centric stalls.",
      spots: [
        "Sunken Garden",
        "Area 2 (Street Food)",
        "Main Library",
        "DiliMall",
      ],
    },
    culture: {
      title: "The 'Burgis' Invasion",
      text: "Historically known as the 'University of the People,' UP is currently grappling with a demographic shift. The introduction of free tuition combined with competitive admissions has led to the 'Burgis' (bourgeois) invasion. There is a palpable tension between the 'Conyo Isko' (wealthy students) and the 'Purita' (students from lower-income families). Wealthy students are often expected to 'check their privilege'. Despite class frictions, UP remains arguably the most inclusive space for LGBTQ+ individuals, with no dress code and no religious moral policing.",
      politics: "Activism as DNA: Political engagement is unavoidable.",
    },
    redFlags: [
      "Systemic Failure of CRS: Enlistment is genuinely traumatic.",
      "'Terror' Professors: Mythologized for brilliance but often abrasive.",
      "Dilapidated Facilities: Crumbling buildings and lack of AC.",
    ],
    greenFlags: [
      "Unparalleled Academic Freedom: Trained to question every power dynamic.",
      "Vibrant Inclusivity: Sanctuary for gender expression; no dress code.",
      "Trauma Bonding: Shared struggle creates deep solidarity.",
    ],
    testimonials: [
      {
        text: "In my 5 years in UP, para kang pipigain na basahan. Tapos yung akala mo wala nang tubig, pipigain at pipigain ka hanggang sa wala nang maiwang.",
        source: "Reddit, r/peyups, 2023",
      },
      {
        text: "Akala ko pang-mahirap (gaya ko) ang UP, hindi pala haha... who struggles? mga walang pera na ang focus ay magtrabaho para makakain lol.",
        source: "Reddit, r/peyups, 2023",
      },
      {
        text: "Sa iba, ang bayad ay pera. Sa UP, ang bayad ay kaluluwa.",
        source: "Reddit, r/peyups, 2023",
      },
      {
        text: "UP Naming Mahal, but sometimes I really wonder, why is it so hard to love you?",
        source: "Unknown Student",
      },
    ],
    survivalTips: [
      {
        title: "Master the Art of the Prerog",
        desc: "Don't just rely on CRS. Show up to the first day of class and be prepared to write sincere appeal letters.",
      },
      {
        title: "Find Your 'Tribe' Early",
        desc: "Whether it's a block, region, or org, you need a buddy to navigate the bureaucratic chaos.",
      },
      {
        title: "Be Street-Smart",
        desc: "Keep valuables secure. Theft is real near campus gates and on jeepneys.",
      },
      {
        title: "Use Area 2 for Budgeting",
        desc: "Avoid the malls. Area 2 and campus kiosks remain the best places for 50–90 PHP meals.",
      },
    ],
    whoThrives:
      "You will thrive at UP if you are self-directed, resilient, and comfortable with chaos. It is the perfect place for students who value intellectual independence over comfort and who don't need 'hand-holding' to succeed. If you enjoy questioning authority and fighting for your place, the 'Culture of Critical Survival' will mold you.",
    whoStruggles:
      "You will struggle if you need clear structure, efficient administrative processes, or a 'polished' campus experience. Those who find the 'prerog' system degrading or who cannot handle the psychological toll of 'independent learning' often find the UP environment more attritional than educational.",
  },
  ust: {
    id: "ust",
    name: "U.S.T.",
    publication: "THE GROWLING TIGERS",
    color: "#F1C40F",
    secondary: "#FFF9C4",
    headline: "THE TIGER'S DEN",
    subhead: "Survival of the Fittest in the Oldest University in Asia",
    intro:
      "The University of Santo Tomas (UST) is a private, Catholic research university in Manila, founded in 1611, making it the oldest university in Asia. Managed by the Order of Preachers (Dominicans), it is located in the heart of the University Belt. UST is widely recognized for its consistent excellence in health sciences, architecture, and accountancy, maintaining a strong reputation for producing topnotchers in national licensure exams.",
    stats: {
      tuition: "~₱60k",
      vibe: "Go USTe!",
      survival: "Resilience",
    },
    marquee:
      "ESPAÑA FLOOD LEVELS RISING /// PASKUHAN LINEUP ANNOUNCED /// ANGKONG DIMSUM RUNS OUT OF SIOMAI /// OSA UNDER FIRE FOR CENSORSHIP",
    mainStory: {
      title: "High-Volume Survival Marathon",
      body: "If you choose UST, prepare yourself for a high-volume, high-pressure system. The academic culture here is less about 'finding yourself' and more about a 'survival of the fittest' mentality. One of the biggest shocks you will face is the block section system. Unlike other universities where you can curate your own schedule, your classes at UST are often rigid. In colleges like Pharmacy or Science, '7-to-7' schedules (7:00 AM to 7:00 PM) are a daily reality. The workload focuses heavily on quantity and endurance. You will likely encounter the 'terror professor' archetype: faculty who use intimidation or massive workloads as pedagogical tools. While the university produces technically competent graduates, it often does so through a 'sink or swim' model. Different colleges have their own flavors of stress: Accountancy is the 'Hunger Games' due to strict debarment; Architecture is 'the college that never sleeps'.",
      highlight:
        "The 4th C: 'Criticism'. Learning to handle 'terror profs' and arbitrary grading without crumbling.",
      extraSections: [
        {
          title: "Identity: Tradition vs. Repression",
          text: "Being a Thomasian means navigating a deeply Catholic environment. You will take mandatory Theology classes and hear the Angelus bell daily. The biggest cultural friction is between a modernizing student body and a conservative administration. The Office for Student Affairs (OSA) is frequently villainized for repressive policies, such as the 2024 TomasinoWeb censorship incident, highlighting an admin often perceived as obsessed with its pristine image.",
        },
        {
          title: "Organizations & Career: Professionalism and 'Palakasan'",
          text: "Joining a top-tier student organization like the Varsitarian or the Central Student Council is described as a 'bloodbath'. The application processes are rigorous, often mimicking corporate interviews. However, there are frequent complaints about 'Palakasan' (nepotism), where leadership roles allegedly go to those with the right connections. Despite this, employers view Thomasians as 'resilient' and 'trainable' due to the heavy workload they survive.",
        },
        {
          title: "Practical Realities: The Frugal Gourmet",
          text: "UST's food culture is arguably the best and most affordable among the Big 4. Dapitan Side is the place for budget-friendly 'lutong bahay' and the legendary Angkong dimsum. P. Noval Side is home to trendier spots. You can easily survive on a budget of 100 pesos per meal. The cost of living in Sampaloc is lower than Katipunan or Taft, but the trade-off is infrastructure: dense, chaotic, and prone to crime.",
        },
      ],
    },
    campus: {
      title: "Golden Cage & Waterworld",
      text: "The physical campus of UST is a dual experience: it is both a beautiful sanctuary and a legendary flood zone. The grounds are universally adored; walking under centuries-old trees provides a 'dopamine hit'. However, 'flood culture' is a genuine part of the identity. Navigating waist-deep water on España or being stranded during a typhoon is a 'badge of honor'. Safety is a mixed bag: the interior is safe, but the perimeter along España and P. Noval is notorious for snatchers.",
      spots: [
        "Main Building",
        "Lovers' Lane",
        "Carpark (Food)",
        "Dapitan/P. Noval",
      ],
    },
    culture: {
      title: "The Social Chameleon",
      text: "UST students pride themselves on being 'social chameleons'. Unlike the perceived elitism of Ateneo or La Salle, UST is a melting pot where wealthy students mix effortlessly with scholars. The mandatory uniform acts as a 'great equalizer'. The social vibe is grounded and 'down-to-earth'. Dating is also major; 'Lovers' Lane' is always bustling. The vibe is less intellectually snobbish and more community-focused, centered around 'trauma bonding' with your block.",
      politics:
        "Tradition vs. Repression: Modern students vs. Conservative Admin.",
    },
    redFlags: [
      "Administrative Repression: OSA known for censorship/strict control.",
      "Academic Attrition: Debarment culture creates constant anxiety.",
      "Archaic Rules: Strict dress codes, hair color bans, uniform regulations.",
    ],
    greenFlags: [
      "Paskuhan: The massive Christmas celebration is the emotional payoff.",
      "Grounded Community: Lack of pretension makes it easy to find friends.",
      "Affordable Food: Cheap, iconic eats surround the campus.",
      "Technical Competence: Rigorous focus on licensure exams.",
    ],
    testimonials: [
      {
        text: "The workload in UST is like being squeezed like a rag until nothing is left. You will be humbled by the 30-unit semesters and zero-based grading.",
        source: "Reddit, r/Tomasino, 2024",
      },
      {
        text: "We are 'social chameleons.' We can be 'conyo' when we need to, but we are most at home being 'kanal'. We don't have the intellectual snobbery of other schools.",
        source: "Reddit, r/Tomasino, 2023",
      },
    ],
    survivalTips: [
      {
        title: "Bond With Your Block",
        desc: "You spend 12 hours a day with them. They are your survival net. Don't go it alone.",
      },
      {
        title: "Master the Weather App",
        desc: "Obsessively check for floods on España. Know when to bring extra clothes.",
      },
      {
        title: "Eat at Angkong Early",
        desc: "The lines for dimsum get long. Strategic lunch timing is a skill.",
      },
      {
        title: "Develop a 'Thick Skin'",
        desc: "You will face terror profs and bureaucracy. Learn to handle criticism without crumbling.",
      },
    ],
    whoThrives:
      "You will thrive at UST if you are resilient, socially adaptable, and value community. It is for students okay with a traditional, high-volume academic structure who find strength in 'trauma bonding'. If you enjoy a homey, grounded atmosphere and don't mind strict rules for a high-quality technical education, you will love it.",
    whoStruggles:
      "You might struggle if you are fiercely independent, desire a liberal political environment, or cannot handle high-pressure exam cultures. Students who want a 'chill' experience or find religious/administrative structure stifling often feel 'wrecked' by the system.",
  },
};
