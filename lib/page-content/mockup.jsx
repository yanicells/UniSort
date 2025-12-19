import React, { useState } from "react";
import {
  BookOpen,
  MapPin,
  Users,
  AlertTriangle,
  Heart,
  Coffee,
  Train,
  Briefcase,
  Menu,
  X,
  Terminal,
  ChevronRight,
  Star,
  Shield,
  Search,
  Layout,
  Smartphone,
  FileText,
  Newspaper,
  Grid,
  Type,
  Maximize,
  Columns,
  Flame,
  Droplets,
  Clock,
  Landmark,
  Target,
  MessageCircle,
  BarChart3,
  ArrowRight,
  Smile,
  ThumbsUp,
  Quote,
  Lightbulb,
  UserCheck,
  UserX,
  HelpCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";

// --- CONTENT DATABASE ---
const UNIV_DATA = {
  admu: {
    id: "admu",
    name: "Ateneo de Manila",
    publication: "THE BLUE & WHITE",
    color: "#0038A8",
    secondary: "#E1E8F5",
    headline: "THE JESUIT PHILOSOPHER-KING",
    subhead:
      "The Liberal Arts Gauntlet, The Conyo Hegemony & The Radical Moderate",
    intro:
      "Ateneo de Manila University (ADMU) is a private Jesuit research university in Quezon City, founded in 1859. Known for its liberal arts Core Curriculum emphasizing Philosophy and Theology, ADMU is one of the Philippines' premier institutions with strong programs in humanities, social sciences, and business. The university follows the Jesuit tradition of cura personalis (care for the whole person) in its educational approach.",
    stats: {
      tuition: "₱80k-90k",
      vibe: "Urban Sanctuary",
      survival: "Oral Exams",
    },
    marquee:
      "BREAKING: QPI RETENTION POLICY 'CULLS' SOPHOMORES /// JSEC PRICES HIT ALL-TIME HIGH /// TRAFFIC ON KATIPUNAN PARALYZES GATE 3",
    mainStory: {
      title: "The Liberal Arts Gauntlet",
      body: "If you choose Ateneo, you aren't just choosing a major; you are choosing a comprehensive intellectual formation. The 'Ateneo Way' is anchored in a mandatory Core Curriculum that requires everyone—from Computer Science to Theater Arts students—to take a heavy load of Philosophy, Theology, and History. The defining rite of passage here is the **Oral Exam** (or 'orals'). Instead of just filling out Scantron sheets, you will often find yourself sitting across from a professor, being 'grilled' on existential concepts. This creates a culture of 'Guided Rigor'. While you’ll get more structural support than at a state university, the expectations for reflexive articulation are high. You are trained to be an 'articulate generalist' who can synthesize complex ideas on your feet. However, the pressure is constant due to the **Quality Point Index (QPI)**. This numeric retention standard acts as a 'Sword of Damocles' over your head. If you don't maintain your QPI, you face the very real threat of being 'culled' from your program or the university entirely.",
      highlight:
        "The Oral Exam: A rite of passage where you are 'grilled' on existential concepts to become an 'articulate generalist'.",
      extraSections: [
        {
          title: "The 'Org' as Corporate Simulation",
          text: "If academics are the mind of Ateneo, the 'Org' is its soul. Participation is almost a cultural mandate. Ateneo organizations operate with a level of professionalism that mimics multinational corporations, complete with rigorous recruitment processes and 'corporate' hierarchies. This is the ultimate training ground for the Philippine elite. However, it leads to the 'BS Org' phenomenon, where students prioritize their organizations over their actual degrees, leading to toxic productivity and burnout.",
        },
        {
          title: "Identity: The Radical Moderate",
          text: "Ateneo is explicitly Catholic and Jesuit, but the experience is more about 'secularization through theology' than indoctrination. Theology and Philosophy classes often encourage you to deconstruct your faith to build it back on a stronger foundation. Politically, the campus is a stronghold of 'Radical Moderation'. Students are generally socially liberal—pro-LGBTQ+ and anti-dictatorship—but their activism is often critiqued as 'performative' or confined to safe spaces like Twitter/X. The 2025 AEWU labor strike highlighted this tension, as students had to reconcile the university’s teachings on social justice with its corporate-style management of campus workers.",
        },
        {
          title: "Practical Realities: The High Cost of Belonging",
          text: "Ateneo is undeniably expensive, with annual tuition hikes being a persistent source of student grievance. Beyond tuition, the 'Ateneo Lifestyle' requires significant financial maneuvering. Katipunan has gentrified to the point where an average student budget is often insufficient for daily meals at Regis Center or UPTC. While the university offers robust scholarship programs (~18-20% of students), scholars often report 'masking' their financial status to fit into the dominant culture. On the plus side, student support services—especially for mental health through the Gender Hub or guidance office—are generally viewed as superior and more accessible than those in other universities.",
        },
      ],
    },
    campus: {
      title: "The Urban Sanctuary",
      text: "The Loyola Heights campus is frequently described as a 'Green Flag' because it feels like an 'Urban Sanctuary'. With its sprawling fields, abundance of trees, and open spaces like the Bellarmine Field, it provides a mental health refuge that is rare in Metro Manila. Daily life, however, is a negotiation between this 'Bubble' and the logistical realities of Katipunan Avenue. If you are a commuter, you will face the 'Katipunan Gauntlet'—a multi-modal struggle involving the LRT, jeeps, and tricycles. Inside the gates, you have access to state-of-the-art facilities like **Arete**, though you’ll quickly notice a divide between the shiny new buildings and older classrooms that lack consistent air conditioning. Food is a major part of the daily rhythm, and where you eat often signals your budget. The **John Gokongwei Student Enterprise Center (JSEC)** is the social hub where student-run stalls offer trendy but pricier meals. If you're on a budget, you'll learn the 'trek' to the **ISO Canteen** or **Ebai’s** at the dorms, where meals are more affordable.",
      spots: [
        "JSEC (Social Hub)",
        "ISO Canteen (Budget)",
        "Arete (Arts)",
        "Bellarmine Field",
      ],
    },
    culture: {
      title: "The Conyo Hegemony",
      text: "The 'Conyo' accent—a specific blend of English and Tagalog—serves as the primary linguistic code on campus. While it functions as a social neutralizer for some, it can be a barrier to entry for provincial or lower-income students who may feel 'intellectually inadequate' if they aren't fluent in it. There is a visible class hierarchy, often distinguished between 'Old Rich' (low-key, wearing simple clothes) and the 'Nouveau Riche' (more brand-conscious). You’ll see students being fetched by drivers in SUVs while others wait for the campus e-jeep. This 'Bubble' can feel alienating if you aren't part of the 'homegrown' cliques from schools like Ateneo High School or Xavier.",
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
      "You will thrive at Ateneo if you value **intellectual depth** and **holistic formation** over pure technical training. It’s for the student who doesn't mind debating Philosophy at 8:00 AM and who appreciates a high-trust, resource-rich environment. You’ll love it if you are looking for a 'corporate simulation' through the org scene and want to build a high-value network for the future.",
    whoStruggles:
      "You might struggle if you are fiercely independent and hate being 'molded' by institutional values, or if you are on a very tight budget and feel alienated by the high cost of Katipunan living. If you prefer a 'sink or swim' environment without 'paternalistic' guidance, you might find the Ateneo 'Bubble' a bit too suffocating.",
  },
  dlsu: {
    id: "dlsu",
    name: "De La Salle",
    publication: "THE GREEN ARCHER",
    color: "#006B3C",
    secondary: "#E8F5E9",
    headline: "THE CORPORATE FORGE",
    subhead: "14 Weeks of Hell: The High-Velocity Trimestral Sprint",
    intro:
      "De La Salle University (DLSU) is a private Catholic research university founded in 1911 by the De La Salle Brothers. Located in the heart of Manila along Taft Avenue, it is a premier institution recognized for its excellence in business, engineering, and computer studies. Operating on a distinct trimestral system, DLSU focuses on producing corporate-ready graduates through a blend of pragmatic education and Lasallian values.",
    stats: {
      tuition: "₱90k+",
      vibe: "Vertical City",
      survival: "No Sleep",
    },
    marquee:
      "ENROLLMENT WARS: ANIMOSYS CRASHES AGAIN /// HAPPY THURSDAY CROWDS SPILL ONTO TAFT /// ELEVATOR QUEUES REACH 30 MINUTES",
    mainStory: {
      title: "The 14-Week Sprint",
      body: "The defining characteristic of your life at DLSU will be the trimestral system. Unlike other universities that operate on semesters, DLSU compresses the academic year into three 14-week terms. This creates a relentless, high-velocity environment where 'procrastination' isn't just a bad habit—it’s a catastrophic risk. You will often hear the joke: 'Isang quiz sa Ateneo, LT (Long Test) na nyan sa Lasalle.' This pace shapes your entire psyche, forcing you to develop elite time-management skills often described as 'min-maxing' your education. To mitigate this, the university implements an **Independent Learning Week (ILW)** in Week 9, though students often find it functions more as a 'catch-up' period for asynchronous workloads than a genuine break.",
      highlight:
        "Min-Maxing: The elite time-management skill required to survive the trimestral system without burnout.",
      extraSections: [
        {
          title: "Identity: The Corporate Forge",
          text: "DLSU operates with a spirit of corporate pragmatism. Even its religious identity is pragmatic; while Catholic, the focus is less on deep theological debate and more on social adaptability and efficiency. Students often view themselves as 'consumers' of education, demanding transparency in tuition fee increases (TFI) and value for the high cost of attendance. Politics at DLSU is often institutionally led by the De La Salle Brothers, who take strong stances on human rights. The student body itself tends to be centrist or pragmatic, mobilizing most reliably when their economic interests are threatened, such as during the #AyokongMagMahal tuition protest campaigns.",
        },
        {
          title: "Organizations & Career: Networking as a Lifestyle",
          text: "Student organizations (orgs) at DLSU are professional training grounds. Structured under the **Council of Student Organizations (CSO)**, they mimic corporate hierarchies with a focus on project management and marketing. Joining an org is seen as a crucial way to build a resume and access influential alumni networks. However, the **University Student Government (USG)** currently faces a crisis of legitimacy. Many students have grown tired of 'performative' leadership, leading to a rise in 'Abstain' votes during elections as a form of protest.",
        },
        {
          title: "Practical Realities: The Price of Efficiency",
          text: "DLSU is one of the most expensive universities in the country, with tuition often exceeding ₱90,000 per term. In exchange, you get highly efficient administrative processes and state-of-the-art facilities. The university also maintains a high 'scholar' population (~20-25%), which challenges the monolithic rich-kid stereotype and injects a culture of 'grind' and meritocracy into campus life.",
        },
      ],
    },
    campus: {
      title: "The Vertical Sanctuary",
      text: "DLSU is a vertical campus in a concrete jungle. You will spend a significant amount of time waiting for elevators in the **Andrew Gonzalez Hall**, where queues can last 20-30 minutes. The 'crown jewel' of the campus is the **Henry Sy Sr. Hall (The Henry)**, a state-of-the-art library that serves as a social hub and a peaceful study sanctuary away from the pollution and noise of Taft Avenue. Daily survival involves navigating the Taft ecosystem. You’ll eat at the **Agno food court**, the culinary heart of campus known for budget-friendly staples like bacsilog. However, once you step outside the gates, you must be street-smart. Taft is prone to flooding and safety concerns like snatching, necessitating a certain level of urban awareness.",
      spots: [
        "The Henry (Library)",
        "Agno Food Court",
        "Andrew Gonzalez Hall",
        "Taft Avenue",
      ],
    },
    culture: {
      title: "The Inclusive Conyo",
      text: "While stereotyped as an enclave for the 'conyo' elite, the social reality is more nuanced. The 'conyo' sociolect—a mix of English and Tagalog with a specific accent—is dominant, featuring slang like 'carps' (game) or 'scoobs' (no). However, students pride themselves on being 'social chameleons' who can switch between high-end 'aircon' humor and grounded 'kanal' humor. The community is surprisingly chill and less intellectually snobbish than other top schools. Wealth is visible through designer bags and nearby high-rise condos, but the social barriers are permeable. You will also encounter a strong 'work hard, play hard' ethos, historically centered around **Happy Thursday**, a drinking culture that serves as a release valve for the high-stress academic schedule.",
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
      "You will thrive at DLSU if you are **pragmatic, efficient, and resilient**. This school is for students who want a 'fast lane' to their careers and value professional networking. You need to be someone who can handle a rapid-fire pace without needing constant hand-holding.",
    whoStruggles:
      "You might struggle if you prefer a slow, contemplative academic pace or if you feel deeply alienated by visible wealth and 'conyo' culture. Those who require a high degree of administrative 'cura personalis' might find DLSU's 'student-as-consumer' relationship a bit cold or transactional.",
  },
  up: {
    id: "up",
    name: "U.P. Diliman",
    publication: "THE ISKO DAILY",
    color: "#7B1113",
    secondary: "#FBE9E7",
    headline: "BASTION OF CRITICAL SURVIVAL",
    subhead: "Beautiful Decay, Systemic Abandonment, and The Prerog Ritual",
    intro:
      "The University of the Philippines Diliman (UPD) is the flagship campus of the national university system, established in 1949 in Quezon City. As a state university offering free undergraduate tuition, UP is renowned for its academic excellence, research output, and deep-seated history of student activism. Its sprawling 493-hectare campus is the largest and most comprehensive in the UP system.",
    stats: {
      tuition: "FREE",
      vibe: "Open Park",
      survival: "Hunger Games",
    },
    marquee:
      "CRS ENLISTMENT FAILURE RATE AT 40% /// RED-TAGGING FEARS RISE /// IKOT JEEP FARE HIKE PROTESTED /// AREA 2 RENOVATION SPARKS OUTRAGE",
    mainStory: {
      title: "The Architecture of Resilience",
      body: "At UP, education isn’t something handed to you; it is something you wrestle from the system. The university culture does not prioritize traditional 'nurturing' but instead creates a Darwinian 'sink or swim' environment where you are expected to adapt or leave. You will often hear the term 'independent learning,' which students frequently describe as a euphemism for 'systemic abandonment'. It is common for professors to act more as facilitators than teachers, expecting you to bridge massive knowledge gaps through self-study, YouTube, and peer support. Before you even step into a classroom, you must survive the **Computerized Registration System (CRS)**. Because slots for popular General Education (GE) classes are scarce, enlistment is a high-stakes lottery. When the system fails you, you resort to **'prerog'**—physically lining up or emailing professors to beg for a slot, sometimes being asked to sing, dance, or write emotional appeals.",
      highlight:
        "The Prerog: Physically lining up or emailing professors to beg for a slot, sometimes performing talents just to get in.",
      extraSections: [
        {
          title: "Identity: Critical Nationalism",
          text: "The core value of a UP student is **'Critical Nationalism'**. You are taught that you owe your education to the Filipino taxpayers, which creates a mandate to serve the nation rather than just pursuing personal profit. Activism is campus DNA; even if you aren't a 'Tibak' (hardcore activist), you will encounter rallies and class walkouts. However, the current climate is fraught with fear due to 'red-tagging'. Unlike other universities, UP is strictly secular—no mandatory theology classes, fostering a diverse subculture of beliefs.",
        },
        {
          title: "Organizations & Career: Institutionalized Trauma",
          text: "In UP, joining an organization (an 'org') is an intense, semester-long commitment known as the **'Apps' process**. Many orgs maintain **'Kupal Culture,'** involving power-tripping and hazing-like rituals. You might be forced to complete a 'Sig Sheet' where you must hunt down every member. While criticized as psychological torture, members rationalize these practices as a way to build 'batch unity' and 'grit'.",
        },
        {
          title: "Practical Realities: The Frugal Student",
          text: "Life in UP is dictated by a tight budget and logistical hurdles. While undergraduate tuition is free, hidden costs like dorm fees, food, and high-spec gadgets create a financial burden. Mental health is a major concern; **PsychServ** is severely understaffed, with wait times stretching to 10-12 weeks. Safety is also an issue; because UP is an open public campus, theft is a constant threat.",
        },
      ],
    },
    campus: {
      title: "Beautiful Ruins",
      text: "The physical atmosphere of UPD is one of **'beautiful decay'**. You will study in historic buildings with peeling paint and broken chairs, but you will also walk under stunning acacia trees and spend sunsets at the Sunken Garden. Because the campus is vast, walking several kilometers a day is normal. The **'Ikot'** and **'Toki'** jeepneys are the lifeblood of campus mobility. This environment dictates a casual dress code—slippers and 'dressed down' attire are the norm. For decades, **Area 2 (A2)** has been the culinary heart, offering iconic meals like Iskomai and Tofu Sisig. However, the recent introduction of the upscale **'DiliMall'** has sparked anger, seen as a symbol of gentrification replacing community-centric stalls.",
      spots: [
        "Sunken Garden",
        "Area 2 (Street Food)",
        "Main Library",
        "DiliMall",
      ],
    },
    culture: {
      title: "The 'Burgis' Invasion",
      text: "Historically known as the 'University of the People,' UP is currently grappling with a demographic shift. The introduction of free tuition combined with competitive admissions has led to the **'Burgis' (bourgeois) invasion**. There is a palpable tension between the 'Conyo Isko' (wealthy students) and the 'Purita' (students from lower-income families). Wealthy students are often expected to 'check their privilege'. Despite class frictions, UP remains arguably the most inclusive space for LGBTQ+ individuals, with no dress code and no religious moral policing.",
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
        desc: "Whether it’s a block, region, or org, you need a buddy to navigate the bureaucratic chaos.",
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
      "You will thrive at UP if you are **self-directed, resilient, and comfortable with chaos**. It is the perfect place for students who value intellectual independence over comfort and who don't need 'hand-holding' to succeed. If you enjoy questioning authority and fighting for your place, the 'Culture of Critical Survival' will mold you.",
    whoStruggles:
      "You will struggle if you need clear structure, efficient administrative processes, or a 'polished' campus experience. Those who find the 'prerog' system degrading or who cannot handle the psychological toll of 'independent learning' often find the UP environment more attritional than educational.",
  },
  ust: {
    id: "ust",
    name: "U.S.T.",
    publication: "THE TIGER'S ROAR",
    color: "#F1C40F", // Gold
    secondary: "#FFF9C4",
    accent: "#000000",
    headline: "THE TIGER'S DEN",
    subhead: "Survival of the Fittest in the Oldest University in Asia",
    intro:
      "The University of Santo Tomas (UST) is a private, Catholic research university in Manila, founded in 1611, making it the oldest university in Asia. Managed by the Order of Preachers (Dominicans), it is located in the heart of the University Belt. UST is widely recognized for its consistent excellence in health sciences, architecture, and accountancy, maintaining a strong reputation for producing topnotchers in national licensure exams.",
    stats: {
      tuition: "~₱60k",
      vibe: "Flood & Faith",
      survival: "Resilience",
    },
    marquee:
      "ESPAÑA FLOOD LEVELS RISING /// PASKUHAN LINEUP ANNOUNCED /// ANGKONG DIMSUM RUNS OUT OF SIOMAI /// OSA UNDER FIRE FOR CENSORSHIP",
    mainStory: {
      title: "High-Volume Survival Marathon",
      body: "If you choose UST, prepare yourself for a high-volume, high-pressure system. The academic culture here is less about 'finding yourself' and more about a 'survival of the fittest' mentality. One of the biggest shocks you will face is the **block section system**. Unlike other universities where you can curate your own schedule, your classes at UST are often rigid. In colleges like Pharmacy or Science, '7-to-7' schedules (7:00 AM to 7:00 PM) are a daily reality. The workload focuses heavily on quantity and endurance. You will likely encounter the 'terror professor' archetype: faculty who use intimidation or massive workloads as pedagogical tools. While the university produces technically competent graduates, it often does so through a 'sink or swim' model. Different colleges have their own flavors of stress: Accountancy is the 'Hunger Games' due to strict debarment; Architecture is 'the college that never sleeps'.",
      highlight:
        "The 4th C: 'Criticism'. Learning to handle 'terror profs' and arbitrary grading without crumbling.",
      extraSections: [
        {
          title: "Identity: Tradition vs. Repression",
          text: "Being a Thomasian means navigating a deeply Catholic environment. You will take mandatory Theology classes and hear the Angelus bell daily. The biggest cultural friction is between a modernizing student body and a conservative administration. The **Office for Student Affairs (OSA)** is frequently villainized for repressive policies, such as the 2024 TomasinoWeb censorship incident, highlighting an admin often perceived as obsessed with its pristine image.",
        },
        {
          title: "Organizations & Career: Professionalism and 'Palakasan'",
          text: "Joining a top-tier student organization like the *Varsitarian* or the Central Student Council is described as a 'bloodbath'. The application processes are rigorous, often mimicking corporate interviews. However, there are frequent complaints about 'Palakasan' (nepotism), where leadership roles allegedly go to those with the right connections. Despite this, employers view Thomasians as 'resilient' and 'trainable' due to the heavy workload they survive.",
        },
        {
          title: "Practical Realities: The Frugal Gourmet",
          text: "UST’s food culture is arguably the best and most affordable among the Big 4. **Dapitan Side** is the place for budget-friendly 'lutong bahay' and the legendary **Angkong** dimsum. P. Noval Side is home to trendier spots. You can easily survive on a budget of 100 pesos per meal. The cost of living in Sampaloc is lower than Katipunan or Taft, but the trade-off is infrastructure: dense, chaotic, and prone to crime.",
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
      "You will thrive at UST if you are **resilient, socially adaptable, and value community**. It is for students okay with a traditional, high-volume academic structure who find strength in 'trauma bonding'. If you enjoy a homey, grounded atmosphere and don't mind strict rules for a high-quality technical education, you will love it.",
    whoStruggles:
      "You might struggle if you are fiercely independent, desire a liberal political environment, or cannot handle high-pressure exam cultures. Students who want a 'chill' experience or find religious/administrative structure stifling often feel 'wrecked' by the system.",
  },
};

// --- COMPONENTS ---

const Masthead = ({ active, setActive }) => (
  <div className="bg-slate-900 text-white sticky top-0 z-50 shadow-xl border-b-4 border-slate-700">
    <div className="max-w-7xl mx-auto px-2 md:px-4">
      <div className="flex items-center justify-between py-3 overflow-x-auto no-scrollbar">
        <div className="flex space-x-1 md:space-x-4 min-w-max">
          <span className="font-serif font-black italic tracking-tighter text-xl mr-4 hidden md:block">
            THE CHRONICLE
          </span>

          <button
            onClick={() => setActive("home")}
            className={`px-4 py-1.5 rounded-sm font-bold text-xs md:text-sm uppercase tracking-wider transition-all border ${
              active === "home"
                ? "bg-orange-600 text-white border-orange-600 transform -skew-x-6"
                : "bg-transparent text-slate-400 border-transparent hover:text-white hover:border-slate-600"
            }`}
          >
            HOME
          </button>

          {Object.values(UNIV_DATA).map((univ) => (
            <button
              key={univ.id}
              onClick={() => setActive(univ.id)}
              className={`px-4 py-1.5 rounded-sm font-bold text-xs md:text-sm uppercase tracking-wider transition-all border ${
                active === univ.id
                  ? "bg-white text-black border-white transform -skew-x-6"
                  : "bg-transparent text-slate-400 border-transparent hover:text-white hover:border-slate-600"
              }`}
            >
              {univ.name}
            </button>
          ))}
          <button
            onClick={() => setActive("big4")}
            className={`px-4 py-1.5 rounded-sm font-bold text-xs md:text-sm uppercase tracking-wider transition-all border ${
              active === "big4"
                ? "bg-purple-600 text-white border-purple-600 transform -skew-x-6"
                : "bg-transparent text-slate-400 border-transparent hover:text-white hover:border-slate-600"
            }`}
          >
            Big 4
          </button>
        </div>
        <div className="text-[10px] text-slate-500 font-mono hidden md:block">
          VOL. 2025 • METRO MANILA
        </div>
      </div>
    </div>
  </div>
);

const HomePage = ({ setActive }) => (
  <div className="min-h-screen bg-[#f4f4f4] text-slate-900 font-serif pb-12">
    {/* Marquee */}
    <div className="bg-black text-white py-2 overflow-hidden whitespace-nowrap border-b-2 border-slate-800">
      <div className="animate-marquee inline-block font-mono text-xs md:text-sm font-bold tracking-widest">
        EXTRA! EXTRA! READ ALL ABOUT IT! /// 247 STUDENTS FOUND THEIR MATCH THIS
        WEEK /// ADMISSIONS SEASON IS HERE /// CHOOSE YOUR FIGHTER
      </div>
    </div>

    <div className="max-w-6xl mx-auto bg-white shadow-2xl min-h-screen border-x border-slate-300">
      {/* Front Page Header */}
      <header className="p-8 md:p-12 text-center border-b-4 border-black relative overflow-hidden bg-white">
        <div className="flex justify-between items-center border-b-2 border-black pb-2 mb-6">
          <span className="font-sans font-bold text-xs tracking-widest uppercase">
            The Daily Sorting Hat
          </span>
          <span className="font-sans font-bold text-xs tracking-widest uppercase">
            PHP 25.00
          </span>
        </div>
        <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-4">
          UNI SORT
        </h1>
        <div className="flex justify-center items-center gap-4 text-xs font-bold border-y border-black py-2 mt-4 max-w-lg mx-auto font-sans">
          <span>PERSONALITY QUIZ</span>
          <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
          <span>INSIGHTS</span>
          <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
          <span>FREEDOM WALL</span>
        </div>
      </header>

      {/* Main Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border-b-4 border-black">
        <div className="lg:col-span-8 p-6 md:p-10 border-r border-slate-300">
          <h2 className="text-5xl md:text-7xl font-bold leading-none mb-6 italic">
            Discover Where You Truly Belong
          </h2>
          <p className="text-xl leading-relaxed font-serif text-slate-600 mb-8 max-w-2xl">
            Find your perfect university match through our personality-based
            quiz, explore real student stories, and dive into campus culture
            across ADMU, DLSU, UP, and UST.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-black text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-orange-600 transition flex items-center justify-center gap-2">
              Take the Quiz <ArrowRight size={18} />
            </button>
            <button className="border-2 border-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-slate-100 transition flex items-center justify-center gap-2">
              Explore Freedom Wall <MessageCircle size={18} />
            </button>
          </div>
          <p className="mt-4 text-xs font-mono text-slate-400">
            Takes about 2 minutes · No sign-up required
          </p>
        </div>

        {/* Sidebar Stats */}
        <div className="lg:col-span-4 bg-slate-100 p-8 flex flex-col justify-center text-center border-t lg:border-t-0">
          <div className="border-4 border-black p-6 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <span className="block text-6xl font-black text-orange-600 mb-2">
              247
            </span>
            <span className="block font-bold uppercase text-sm tracking-widest">
              Students Matched
            </span>
            <div className="w-full h-1 bg-slate-200 mt-4 overflow-hidden">
              <div className="w-3/4 h-full bg-black animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 3-Column Features (Why UniSort?) */}
      <div className="p-6 md:p-10 border-b-4 border-black">
        <h3 className="font-sans font-bold text-sm uppercase tracking-[0.2em] mb-8 text-center text-slate-400">
          Why UniSort?
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Col 1 */}
          <div className="border-r border-slate-200 pr-4 last:border-0">
            <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-4 rounded-full">
              <Target size={24} />
            </div>
            <h4 className="font-bold text-xl mb-2">Personality Quiz</h4>
            <p className="text-sm leading-relaxed font-serif text-slate-600 mb-4">
              Answer 10 quick questions to see which university culture fits you
              best, with instant insights.
            </p>
            <a
              href="#"
              className="text-orange-600 font-bold text-xs uppercase hover:underline"
            >
              Start the quiz →
            </a>
          </div>

          {/* Col 2 */}
          <div className="border-r border-slate-200 pr-4 last:border-0">
            <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-4 rounded-full">
              <MessageCircle size={24} />
            </div>
            <h4 className="font-bold text-xl mb-2">Freedom Wall</h4>
            <p className="text-sm leading-relaxed font-serif text-slate-600 mb-4">
              Read and share anonymous stories about student life across
              campuses. React, comment, and join the conversation.
            </p>
            <a
              href="#"
              className="text-orange-600 font-bold text-xs uppercase hover:underline"
            >
              Browse posts →
            </a>
          </div>

          {/* Col 3 */}
          <div className="last:border-0">
            <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-4 rounded-full">
              <BarChart3 size={24} />
            </div>
            <h4 className="font-bold text-xl mb-2">University Insights</h4>
            <p className="text-sm leading-relaxed font-serif text-slate-600 mb-4">
              Explore curated overviews, campus culture highlights, and stats to
              help you decide where you fit.
            </p>
            <button
              onClick={() => setActive("big4")}
              className="text-orange-600 font-bold text-xs uppercase hover:underline"
            >
              View stats →
            </button>
          </div>
        </div>
      </div>

      {/* Freedom Wall Section */}
      <div className="bg-[#fffdf5] p-6 md:p-12">
        <div className="flex items-center justify-between mb-8 border-b-2 border-black pb-4">
          <h3 className="font-black text-3xl uppercase italic">
            Classifieds & Confessions
          </h3>
          <button className="text-xs font-bold bg-black text-white px-3 py-1 uppercase hover:bg-slate-800">
            Post Anonymously
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Post 1 */}
          <div className="bg-white p-4 border border-slate-300 shadow-sm hover:shadow-md transition cursor-pointer transform rotate-1">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                General • 4d ago
              </span>
              <MoreOptions />
            </div>
            <p className="font-mono text-sm mb-4">asdfasdf</p>
            <div className="flex items-center gap-1 text-slate-400 hover:text-orange-500">
              <ThumbsUp size={14} />{" "}
              <span className="text-xs font-bold">0</span>
            </div>
          </div>

          {/* Post 2 */}
          <div className="bg-white p-4 border border-slate-300 shadow-sm hover:shadow-md transition cursor-pointer transform -rotate-1">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                General • 4d ago
              </span>
              <MoreOptions />
            </div>
            <p className="font-mono text-sm mb-4">test pls</p>
            <div className="flex items-center gap-1 text-slate-400 hover:text-orange-500">
              <ThumbsUp size={14} />{" "}
              <span className="text-xs font-bold">0</span>
            </div>
          </div>

          {/* Post 3 */}
          <div className="bg-white p-4 border border-slate-300 shadow-sm hover:shadow-md transition cursor-pointer transform rotate-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                General • 4d ago
              </span>
              <MoreOptions />
            </div>
            <p className="font-mono text-sm mb-4">post newwww</p>
            <div className="flex items-center gap-1 text-slate-400 hover:text-orange-500">
              <ThumbsUp size={14} />{" "}
              <span className="text-xs font-bold">0</span>
            </div>
          </div>

          {/* Post 4 */}
          <div className="bg-white p-4 border border-slate-300 shadow-sm hover:shadow-md transition cursor-pointer transform -rotate-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                General • 4d ago
              </span>
              <MoreOptions />
            </div>
            <p className="font-mono text-sm mb-4">bruh</p>
            <div className="flex items-center gap-1 text-slate-400 hover:text-orange-500">
              <ThumbsUp size={14} />{" "}
              <span className="text-xs font-bold">0</span>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <button className="font-bold uppercase text-sm border-b-2 border-black hover:text-orange-600 transition">
            View All Posts →
          </button>
        </div>
      </div>
    </div>
  </div>
);

const MoreOptions = () => (
  <div className="flex gap-0.5">
    <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
    <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
    <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
  </div>
);

const TabloidLayout = ({ data }) => {
  // Determine text color based on background luminance/theme
  const isUst = data.id === "ust";

  return (
    <div className="min-h-screen bg-[#f4f4f4] text-slate-900 font-serif pb-12">
      {/* Marquee */}
      <div className="bg-black text-white py-2 overflow-hidden whitespace-nowrap border-b-2 border-slate-800">
        <div className="animate-marquee inline-block font-mono text-xs md:text-sm font-bold tracking-widest">
          {data.marquee} &nbsp; /// &nbsp; {data.marquee} &nbsp; /// &nbsp;{" "}
          {data.marquee}
        </div>
      </div>

      <div className="max-w-6xl mx-auto bg-white shadow-2xl min-h-screen border-x border-slate-300">
        {/* Paper Header */}
        <header className="p-6 md:p-12 text-center border-b-4 border-black relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-2"
            style={{ backgroundColor: data.color }}
          ></div>
          <p className="font-sans font-bold text-xs tracking-[0.3em] uppercase mb-4 text-slate-500">
            {data.stats.vibe}
          </p>
          <h1
            className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4"
            style={{ color: data.color }}
          >
            {data.publication}
          </h1>
          <div className="flex justify-center items-center gap-4 text-sm font-bold border-y border-black py-2 mt-6 max-w-2xl mx-auto">
            <span>TUITION: {data.stats.tuition}</span>
            <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
            <span>SURVIVAL: {data.stats.survival}</span>
            <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
            <span>
              LOC: {data.id === "admu" || data.id === "up" ? "QC" : "MANILA"}
            </span>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column (Main Story & Details) */}
          <div className="lg:col-span-8 p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-slate-200">
            {/* Intro */}
            {data.intro && (
              <div className="mb-6 pb-6 border-b border-slate-200">
                <p className="font-sans text-sm font-bold uppercase text-slate-400 mb-2 tracking-wider">
                  About The University
                </p>
                <p className="text-lg leading-relaxed">{data.intro}</p>
              </div>
            )}

            <div className="mb-8">
              <span className="bg-black text-white px-3 py-1 text-xs font-bold uppercase inline-block mb-3 transform -rotate-1">
                Cover Story
              </span>
              <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6 italic font-serif">
                {data.headline}
              </h2>
              <h3 className="text-xl md:text-2xl text-slate-500 font-sans font-light mb-8 leading-snug">
                {data.subhead}
              </h3>
            </div>

            <div className="prose prose-lg prose-slate font-serif">
              <p
                className="first-letter:text-6xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:leading-[0.8]"
                style={{ color: data.color }}
              >
                {data.mainStory.body.charAt(0)}
              </p>
              <p>{data.mainStory.body.substring(1)}</p>

              <div
                className="my-8 p-6 bg-slate-50 border-l-4"
                style={{ borderColor: data.color }}
              >
                <p className="font-bold text-lg italic text-slate-800">
                  "{data.mainStory.highlight}"
                </p>
              </div>

              {/* Extra Sections Rendered Here */}
              {data.mainStory.extraSections &&
                data.mainStory.extraSections.map((section, idx) => (
                  <div key={idx} className="mt-8">
                    <h4
                      className="font-sans font-bold uppercase text-sm tracking-widest mb-2"
                      style={{ color: data.color }}
                    >
                      {section.title}
                    </h4>
                    <p>{section.text}</p>
                  </div>
                ))}

              <h4
                className="font-sans font-bold uppercase text-sm tracking-widest mt-8 mb-4"
                style={{ color: data.color }}
              >
                Campus Reality
              </h4>
              <p>{data.campus.text}</p>
            </div>

            {/* Who Thrives Here Section */}
            {(data.whoThrives || data.whoStruggles) && (
              <div className="mt-12 pt-8 border-t-2 border-black">
                <h3 className="font-black text-2xl uppercase mb-6 flex items-center gap-2">
                  <Target size={24} style={{ color: data.color }} /> Final
                  Verdict
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  {data.whoThrives && (
                    <div>
                      <h4 className="font-bold text-emerald-600 flex items-center gap-2 mb-2 uppercase text-sm">
                        <UserCheck size={18} /> Who Thrives?
                      </h4>
                      <p className="text-sm leading-relaxed">
                        {data.whoThrives}
                      </p>
                    </div>
                  )}
                  {data.whoStruggles && (
                    <div>
                      <h4 className="font-bold text-red-600 flex items-center gap-2 mb-2 uppercase text-sm">
                        <UserX size={18} /> Who Struggles?
                      </h4>
                      <p className="text-sm leading-relaxed">
                        {data.whoStruggles}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column (Sidebar) */}
          <div className="lg:col-span-4 bg-[#fafafa]">
            {/* Top Widget: Culture */}
            <div className="p-8 border-b border-slate-200">
              <h3 className="font-black text-2xl uppercase mb-4 flex items-center gap-2">
                <Users size={24} style={{ color: data.color }} />
                Social Fabric
              </h3>
              <p className="text-sm leading-relaxed mb-4 font-serif">
                {data.culture.text}
              </p>
              <div className="bg-slate-200 p-3 text-xs font-mono border border-slate-300">
                POLITICS: {data.culture.politics}
              </div>
            </div>

            {/* Student Testimonials Widget */}
            {data.testimonials && (
              <div className="p-8 border-b border-slate-200">
                <h3
                  className="font-black text-xl uppercase mb-4 flex items-center gap-2"
                  style={{ color: data.color }}
                >
                  <Quote size={24} /> Student Voices
                </h3>
                <div className="space-y-6">
                  {data.testimonials.map((t, i) => (
                    <blockquote
                      key={i}
                      className="bg-slate-50 p-4 border-l-4 border-slate-300 italic text-slate-700 text-xs"
                    >
                      "{t.text}"
                      <footer className="text-[10px] font-bold text-slate-400 mt-2 not-italic">
                        — {t.source}
                      </footer>
                    </blockquote>
                  ))}
                </div>
              </div>
            )}

            {/* Survival Guide Widget */}
            {data.survivalTips && (
              <div className="p-8 border-b border-slate-200 bg-slate-100">
                <h3
                  className="font-black text-xl uppercase mb-4 flex items-center gap-2"
                  style={{ color: data.color }}
                >
                  <Lightbulb size={24} /> Survival Guide
                </h3>
                <ul className="space-y-4">
                  {data.survivalTips.map((tip, i) => (
                    <li key={i}>
                      <strong className="block text-sm font-bold text-slate-900 mb-1">
                        {tip.title}
                      </strong>
                      <p className="text-xs text-slate-600 leading-snug">
                        {tip.desc}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Middle Widget: Red/Green Flags */}
            <div className="p-8 border-b border-slate-200">
              <div className="mb-6">
                <h4 className="font-bold uppercase text-red-600 flex items-center gap-2 mb-2 text-sm">
                  <AlertTriangle size={16} /> Red Flags
                </h4>
                <ul className="space-y-2">
                  {data.redFlags.map((flag, i) => (
                    <li
                      key={i}
                      className="text-sm font-medium border-b border-dashed border-slate-300 pb-1"
                    >
                      {flag}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold uppercase text-emerald-600 flex items-center gap-2 mb-2 text-sm">
                  <Heart size={16} /> Green Flags
                </h4>
                <ul className="space-y-2">
                  {data.greenFlags.map((flag, i) => (
                    <li
                      key={i}
                      className="text-sm font-medium border-b border-dashed border-slate-300 pb-1"
                    >
                      {flag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Widget: Hotspots */}
            <div className="p-8" style={{ backgroundColor: data.secondary }}>
              <h3
                className="font-black text-xl uppercase mb-4 flex items-center gap-2"
                style={{ color: data.color }}
              >
                <MapPin size={20} /> Territory
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {data.campus.spots.map((spot, i) => (
                  <div
                    key={i}
                    className="bg-white p-3 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] flex justify-between items-center"
                  >
                    <span className="font-bold text-xs uppercase">{spot}</span>
                    <ChevronRight size={14} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Banner */}
        <div className="bg-black text-white p-4 md:p-8 text-center">
          <p className="font-mono text-xs uppercase opacity-70 mb-2">
            ADMISSIONS OPEN FOR SY 2025-2026
          </p>
          <h2 className="text-2xl md:text-3xl font-black italic">
            DO YOU HAVE WHAT IT TAKES?
          </h2>
        </div>
      </div>
    </div>
  );
};

const BigFourPage = () => (
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
      <header className="p-6 md:p-12 text-center border-b-4 border-black bg-purple-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
        <p className="font-sans font-bold text-xs tracking-[0.3em] uppercase mb-4 text-purple-200">
          The University Ecosystem
        </p>
        <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-2 text-white">
          THE BIG FOUR
        </h1>
        <p className="text-xl md:text-2xl font-serif italic text-purple-100 max-w-2xl mx-auto mt-4">
          "Gatekeepers of Cultural Capital & Architects of the Social Strata"
        </p>

        <div className="flex justify-center items-center gap-4 text-xs md:text-sm font-bold border-y border-purple-400/30 py-4 mt-8 max-w-4xl mx-auto font-mono text-purple-200">
          <span>EST. VARIOUS</span>
          <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
          <span>LOC: METRO MANILA</span>
          <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
          <span>STATUS: ELITE</span>
        </div>
      </header>

      {/* Intro Section */}
      <div className="p-8 md:p-12 border-b border-slate-200 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-black uppercase mb-6">Introduction</h2>
        <p className="text-lg leading-relaxed font-serif text-slate-700">
          Welcome to the "Big 4" ecosystem—the four universities in Metro Manila
          that serve as the primary architects of the Philippine social strata.
          The University of the Philippines (UP), Ateneo de Manila University
          (ADMU), De La Salle University (DLSU), and the University of Santo
          Tomas (UST) are more than just schools; they are gatekeepers of
          cultural capital and the nation’s premier training grounds for
          leadership. While their rivalries are most visible during the UAAP
          season, the true distinctions lie in their "hidden curriculums"—the
          unwritten rules of survival and the fundamentally different ways they
          transform students.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Col - Main Editorial */}
        <div className="lg:col-span-8 p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-slate-200">
          {/* Decision Dimensions */}
          <div className="mb-12">
            <span className="bg-purple-900 text-white px-3 py-1 text-xs font-bold uppercase inline-block mb-3 transform -rotate-1">
              Feature Analysis
            </span>
            <h2 className="text-4xl font-bold leading-tight mb-6 italic font-serif text-slate-900">
              The Decision Dimensions
            </h2>

            <div className="space-y-8">
              {/* 1. Academic Challenge */}
              <div>
                <h3 className="font-bold text-xl uppercase mb-3 border-b-2 border-black inline-block">
                  1. Academic Challenge
                </h3>
                <p className="mb-4">
                  The Big 4 test your limits in distinct ways. You must decide
                  whether you prefer intellectual depth, high-speed efficiency,
                  total independence, or sheer endurance.
                </p>
                <ul className="grid gap-3 text-sm">
                  <li className="bg-blue-50 p-3 border-l-4 border-blue-800">
                    <strong>ADMU (Reflexive Depth):</strong> Education is
                    anchored in a Liberal Arts "gauntlet". You are required to
                    take extensive Philosophy and Theology courses that
                    culminate in oral exams.
                  </li>
                  <li className="bg-green-50 p-3 border-l-4 border-green-700">
                    <strong>DLSU (Trimestral Velocity):</strong> The academic
                    year is a "sprint" divided into three 14-week terms. With
                    zero room for procrastination, the challenge is elite time
                    management.
                  </li>
                  <li className="bg-red-50 p-3 border-l-4 border-red-800">
                    <strong>UP (Independent Survival):</strong> UP prioritizes
                    "filtering" over nurturing. You are expected to bridge vast
                    knowledge gaps through independent study; professors act as
                    facilitators.
                  </li>
                  <li className="bg-yellow-50 p-3 border-l-4 border-yellow-500">
                    <strong>UST (Volume & Traditional Pedagogy):</strong> The
                    approach is volume-heavy and traditional, often involving 7
                    AM to 7 PM schedules. The curriculum is laser-focused on
                    licensure exam preparation.
                  </li>
                </ul>
              </div>

              {/* 2. Cost */}
              <div>
                <h3 className="font-bold text-xl uppercase mb-3 border-b-2 border-black inline-block">
                  2. Cost & Financial Reality
                </h3>
                <p className="mb-4">
                  Financial accessibility varies wildly, with an increasing
                  "inversion" of class demographics across the four schools.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-xs font-bold">
                  <div className="p-2 border border-red-200 bg-red-50 text-red-900">
                    UP: FREE
                  </div>
                  <div className="p-2 border border-yellow-200 bg-yellow-50 text-yellow-900">
                    UST: ~60k
                  </div>
                  <div className="p-2 border border-blue-200 bg-blue-50 text-blue-900">
                    ADMU: ~80k
                  </div>
                  <div className="p-2 border border-green-200 bg-green-50 text-green-900">
                    DLSU: ~90k
                  </div>
                </div>
              </div>

              {/* 3. Support Systems */}
              <div>
                <h3 className="font-bold text-xl uppercase mb-3 border-b-2 border-black inline-block">
                  3. Support Systems
                </h3>
                <p className="mb-4">
                  How much "hand-holding" do you need to thrive?
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                  <li>
                    <strong>ADMU:</strong> Leads in <em>cura personalis</em>,
                    offering accessible mental health services.
                  </li>
                  <li>
                    <strong>DLSU:</strong> Provides "efficiency as a form of
                    care" with organized systems.
                  </li>
                  <li>
                    <strong>UP:</strong> Characterized by "systemic
                    abandonment". Navigate bureaucratic chaos on your own.
                  </li>
                  <li>
                    <strong>UST:</strong> Often described as having a repressive
                    administration (OSA), forcing students to rely on peers.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Comparative Features (Newspaper Style) - UPDATED WITH HEADINGS */}
          <div className="border-t-4 border-black pt-6">
            <h3 className="font-black text-2xl uppercase mb-6 flex items-center gap-2">
              <Landmark size={24} /> The Team Rosters
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* UP Card */}
              <div className="border-2 border-red-800 p-4 bg-red-50/50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-red-900/10 rounded-bl-full -mr-8 -mt-8"></div>
                <h4 className="font-black text-red-900 text-xl mb-1 uppercase italic tracking-tighter">
                  UP FIGHTING MAROONS: <br /> UP FIGHT!
                </h4>
                <p className="text-xs font-bold uppercase text-red-600 mb-3 border-b border-red-200 pb-2">
                  Defining Trait: The Culture of Critical Survival
                </p>
                <p className="text-sm leading-relaxed mb-3">
                  <strong>You'll love it if...</strong> you are fiercely
                  independent, value academic freedom over comfort, and want to
                  be surrounded by radical diversity.
                </p>
                <p className="text-sm leading-relaxed mb-3">
                  <strong>You'll struggle if...</strong> you need efficient
                  systems, want a guaranteed four-year graduation, or cannot
                  handle "beautiful decay".
                </p>
                <div className="text-xs font-mono text-red-800 bg-red-100 inline-block px-2 py-1 font-bold">
                  Signature Experience: The "Prerog"
                </div>
              </div>

              {/* ADMU Card */}
              <div className="border-2 border-blue-800 p-4 bg-blue-50/50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-900/10 rounded-bl-full -mr-8 -mt-8"></div>
                <h4 className="font-black text-blue-900 text-xl mb-1 uppercase italic tracking-tighter">
                  ADMU BLUE EAGLES: <br /> ONE BIG FIGHT!
                </h4>
                <p className="text-xs font-bold uppercase text-blue-400 mb-3 border-b border-blue-200 pb-2">
                  Defining Trait: The Jesuit Philosopher-King
                </p>
                <p className="text-sm leading-relaxed mb-3">
                  <strong>You'll love it if...</strong> you want holistic
                  formation, love debating humanities, and value a supportive
                  "bubble" environment.
                </p>
                <p className="text-sm leading-relaxed mb-3">
                  <strong>You'll struggle if...</strong> you want a purely
                  technical education, are a staunch religious skeptic, or feel
                  alienated by "conyo" gatekeeping.
                </p>
                <div className="text-xs font-mono text-blue-800 bg-blue-100 inline-block px-2 py-1 font-bold">
                  Signature Experience: The "Orals"
                </div>
              </div>

              {/* DLSU Card */}
              <div className="border-2 border-green-700 p-4 bg-green-50/50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-green-900/10 rounded-bl-full -mr-8 -mt-8"></div>
                <h4 className="font-black text-green-900 text-xl mb-1 uppercase italic tracking-tighter">
                  DLSU GREEN ARCHERS: <br /> ANIMO LA SALLE!
                </h4>
                <p className="text-xs font-bold uppercase text-green-600 mb-3 border-b border-green-200 pb-2">
                  Defining Trait: The Corporate Forge
                </p>
                <p className="text-sm leading-relaxed mb-3">
                  <strong>You'll love it if...</strong> you want a fast-paced,
                  pragmatic environment, value professional networking, and
                  enjoy a "work hard, play hard" lifestyle.
                </p>
                <p className="text-sm leading-relaxed mb-3">
                  <strong>You'll struggle if...</strong> you are a slow learner
                  who needs time to digest concepts, or if you find "conyo"
                  social stratification alienating.
                </p>
                <div className="text-xs font-mono text-green-800 bg-green-100 inline-block px-2 py-1 font-bold">
                  Signature Experience: "Happy Thursday"
                </div>
              </div>

              {/* UST Card */}
              <div className="border-2 border-yellow-500 p-4 bg-yellow-50/50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500/10 rounded-bl-full -mr-8 -mt-8"></div>
                <h4 className="font-black text-yellow-700 text-xl mb-1 uppercase italic tracking-tighter">
                  UST GROWLING TIGERS: <br /> GO USTE!
                </h4>
                <p className="text-xs font-bold uppercase text-yellow-600 mb-3 border-b border-yellow-200 pb-2">
                  Defining Trait: The Resilient Soldier
                </p>
                <p className="text-sm leading-relaxed mb-3">
                  <strong>You'll love it if...</strong> you want a grounded
                  community, thrive in block sections, and want the best food
                  scene in the Big 4.
                </p>
                <p className="text-sm leading-relaxed mb-3">
                  <strong>You'll struggle if...</strong> you hate uniforms,
                  can’t stand a volume-heavy workload, or value administrative
                  transparency.
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
          {/* Decision Matrix Widget */}
          <div className="p-6 border-b border-slate-300 bg-slate-900 text-white">
            <h3 className="font-black text-xl uppercase mb-4 text-center border-b border-slate-700 pb-2">
              How to Choose?
            </h3>
            <ul className="space-y-4 text-sm font-sans">
              <li className="flex gap-3">
                <span className="text-slate-300">1.</span>
                <span className="text-slate-300">
                  <strong>Financial:</strong> Can you handle 80-90k tuition
                  (ADMU/DLSU) or need free (UP)?
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-slate-300">2.</span>
                <span className="text-slate-300">
                  <strong>Structure:</strong> Thrive under{" "}
                  <em>cura personalis</em> (ADMU) or chaos (UP)?
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-slate-300">3.</span>
                <span className="text-slate-300">
                  <strong>Tempo:</strong> Prefer 14-week sprints (DLSU) or
                  volume endurance (UST)?
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-slate-300">4.</span>
                <span className="text-slate-300">
                  <strong>Vibe:</strong> Comfortable in "Conyo" hegemony or
                  "Kanal" humor?
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
                    "ADMU = Rich Conyo?"
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
                    "DLSU = Party School?"
                  </strong>
                  <span className="text-[10px] font-bold bg-green-100 text-green-800 px-1 rounded">
                    TRUE
                  </span>
                </div>
                <p className="text-slate-500 text-xs">
                  "Happy Thursday" is legendary, but Engineering/CS have high
                  academic mortality rates.
                </p>
              </div>
              <div className="bg-white p-3 border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-1">
                  <strong className="block text-red-900">
                    "UP = Activists?"
                  </strong>
                  <span className="text-[10px] font-bold bg-red-100 text-red-800 px-1 rounded">
                    TRUE
                  </span>
                </div>
                <p className="text-slate-500 text-xs">
                  Center of radical thought, but facing a "Burgis Invasion"
                  (luxury cars in parking lots).
                </p>
              </div>
              <div className="bg-white p-3 border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-1">
                  <strong className="block text-yellow-900">
                    "UST = Conservative?"
                  </strong>
                  <span className="text-[10px] font-bold bg-yellow-100 text-yellow-800 px-1 rounded">
                    TRUE
                  </span>
                </div>
                <p className="text-slate-500 text-xs">
                  Admin is traditional, but the student body is rebellious (e.g.
                  TomasinoWeb controversy).
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
                  "UP students always get delayed"
                </strong>
                <span className="text-slate-600">
                  Normalized battle scar, often due to systemic enlistment
                  failures (CRS) rather than incompetence.
                </span>
              </li>
              <li className="text-xs">
                <strong className="block text-purple-700 mb-1">
                  "You need to be rich for ADMU/DLSU"
                </strong>
                <span className="text-slate-600">
                  Both have ~20% scholar population. Lifestyle costs are high,
                  but middle-class students "code-switch" to survive.
                </span>
              </li>
              <li className="text-xs">
                <strong className="block text-purple-700 mb-1">
                  "UST is apolitical"
                </strong>
                <span className="text-slate-600">
                  Students are active but suppressed by admin. Activism focuses
                  on internal rights and Catholic social teachings.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-black text-white p-8 text-center border-t-4 border-purple-500">
        <h2 className="text-3xl font-black italic uppercase mb-2">
          NO WRONG CHOICE.
        </h2>
        <p className="text-sm font-mono opacity-70 max-w-lg mx-auto mb-4">
          "There is no 'best' school, only the school that is best for YOU. The
          Big 4 are all premier institutions, and graduating from any of them
          carries immense weight in the professional world."
        </p>
        <p className="text-lg font-bold text-purple-400">
          Go get 'em, Future Isko, Blue Eagle, Archer, or Thomasian.
        </p>
      </div>
    </div>
  </div>
);

export default function UniversityChronicle() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen bg-slate-50">
      <Masthead active={activeTab} setActive={setActiveTab} />

      {activeTab === "home" ? (
        <HomePage setActive={setActiveTab} />
      ) : activeTab === "big4" ? (
        <BigFourPage />
      ) : (
        <TabloidLayout data={UNIV_DATA[activeTab]} />
      )}
    </div>
  );
}
