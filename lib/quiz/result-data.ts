export type UniversityResultData = {
  winner: string;
  ranges: {
    min: number;
    max: number;
    text: string;
  }[];
};

export const universityFeedback: Record<string, UniversityResultData> = {
  admu: {
    winner:
      "Ateneo fits you perfectly. You handle QPI pressure and oral exams better than most. Conyo networking comes naturally to you. The green Katipunan campus energizes you during heavy terms. Jesuit reflection and cura personalis match how you grow.",
    ranges: [
      {
        min: 0,
        max: 30,
        text: "You completely crumble under QPI pressure and oral exam culture. The conyo bubble and elite social hierarchies would isolate you from day one.",
      },
      {
        min: 30,
        max: 35,
        text: "You find Core Curriculum overwhelming and Philosophy orals paralyzing. The articulate generalist expectations and constant networking drain you every single day.",
      },
      {
        min: 35,
        max: 40,
        text: "You struggle badly with org professionalism and guided rigor. Katipunan costs hurt your wallet and the SOSE-SOM divide confuses you constantly.",
      },
      {
        min: 40,
        max: 44,
        text: "You barely manage academics but conyo gatekeeping exhausts you daily. Social chameleon behavior wears you down and elite circles stress you out.",
      },
      {
        min: 44,
        max: 48,
        text: "You appreciate support when stressed but feel socially isolated. Different Ateneo circles don't click and the bubble feels suffocating often.",
      },
      {
        min: 48,
        max: 52,
        text: "You're adjusting slowly to intellectual discourse but struggle consistently. The green campus helps but elite dynamics and pressure still drain you.",
      },
      {
        min: 52,
        max: 56,
        text: "You're improving at oral synthesis and social navigation gradually. Jesuit reflection starts resonating beyond just fulfilling academic requirements now.",
      },
      {
        min: 56,
        max: 60,
        text: "You handle QPI pressure better each term and adapt well. Theology discussions engage you more genuinely than you initially expected them to.",
      },
      {
        min: 60,
        max: 64,
        text: "You genuinely appreciate Jesuit formation and guided growth now. The articulate generalist curriculum challenges you in productive and meaningful ways.",
      },
      {
        min: 64,
        max: 68,
        text: "You connect with cura personalis deeply and thrive academically. Oral exams feel intellectually stimulating rather than purely stressful or terrifying.",
      },
      {
        min: 68,
        max: 75,
        text: "You thrive under QPI pressure and oral exam culture completely. The Katipunan sanctuary and Jesuit values align perfectly with your growth style.",
      },
      {
        min: 75,
        max: 90,
        text: "You excel at oral synthesis and navigate conyo culture naturally. The green bubble becomes your productive sanctuary during heavy academic terms.",
      },
      {
        min: 90,
        max: 100,
        text: "You embody the Philosopher-King ideal completely and effortlessly. Magis mentality and cura personalis define your leadership and worldview naturally.",
      },
    ],
  },
  dlsu: {
    winner:
      "DLSU matches your energy perfectly. You thrive in the trimestral pace instead of drowning in it. Agno food and condo life suit your independence. Corporate training excites you rather than stresses you. Henry Sy libraries become your productivity hub.",
    ranges: [
      {
        min: 0,
        max: 30,
        text: "You get absolutely crushed by the trimester sprint repeatedly. Fourteen weeks of hell with no breaks destroys your balance and sanity completely.",
      },
      {
        min: 30,
        max: 35,
        text: "You struggle badly with relentless pace and efficiency demands daily. CCS mortality rates terrify you and corporate simulation culture exhausts you constantly.",
      },
      {
        min: 35,
        max: 40,
        text: "You appreciate modern facilities but the grind overwhelms you badly. Taft safety issues scare you and Happy Thursday doesn't offset your burnout.",
      },
      {
        min: 40,
        max: 44,
        text: "You enjoy Agno food but the pace drains you completely. The trimestral system pushes you past comfortable limits and recovery feels impossible.",
      },
      {
        min: 44,
        max: 48,
        text: "You're slowly adapting but efficiency pressure stresses you out. Condo culture helps slightly but the fourteen-week sprint still overwhelms you regularly.",
      },
      {
        min: 48,
        max: 52,
        text: "You're catching some rhythm but the pace challenges you daily. Work-hard-play-hard culture feels draining more often than it feels energizing right now.",
      },
      {
        min: 52,
        max: 56,
        text: "You find Henry Sy libraries boost your productivity noticeably now. Green Archers energy starts building through org involvement and social connections.",
      },
      {
        min: 56,
        max: 60,
        text: "You're locking into the trimestral pace and workflow better. Corporate training feels more aligned with your career goals and personal strengths.",
      },
      {
        min: 60,
        max: 64,
        text: "You've adapted to efficiency culture and thrive under pressure. The infrastructure actively elevates your academic performance and productivity each term.",
      },
      {
        min: 64,
        max: 68,
        text: "You handle the trimester system comfortably and efficiently now. Happy Thursday and networking fuel your professional development and social life genuinely.",
      },
      {
        min: 68,
        max: 75,
        text: "You thrive under time management demands and efficiency pressure. The modern facilities and corporate culture match your energy and workflow perfectly.",
      },
      {
        min: 75,
        max: 90,
        text: "You dominate the trimester system and turn sprints into wins. Animo spirit and pragmatic hustle define your success strategy and mindset daily.",
      },
      {
        min: 90,
        max: 100,
        text: "You run like a perfectly optimized efficiency machine naturally. The Corporate Achiever identity and infrastructure define your Lasallian experience completely.",
      },
    ],
  },
  up: {
    winner:
      "UP is where you belong. You turn CRS chaos into diskarte victories. Terror profs make you stronger instead of breaking you down. Area 2 becomes your second home instantly. Grandstand activism fires up your critical mind. Taxpayer responsibility drives you forward with purpose.",
    ranges: [
      {
        min: 0,
        max: 30,
        text: "You break down completely during CRS hell and enlistment chaos. You lack the raw grit needed to survive terror profs and administrative dysfunction.",
      },
      {
        min: 30,
        max: 35,
        text: "You feel humiliated begging for prerog slots and struggling constantly. Intense org apps traumatize you and activism levels completely overwhelm your comfort zone.",
      },
      {
        min: 35,
        max: 40,
        text: "You struggle with sink-or-swim learning and commute chaos badly. Area 2 helps slightly but the enlistment lottery feels unfair and demoralizing daily.",
      },
      {
        min: 40,
        max: 44,
        text: "You learn basic diskarte but it drains you mentally. Red-tagging concerns and political tensions worry you way more than you ever expected.",
      },
      {
        min: 44,
        max: 48,
        text: "You experience some trauma bonding but administrative chaos stresses you. Your resilience grows slowly but the dysfunction still drains your energy consistently.",
      },
      {
        min: 48,
        max: 52,
        text: "You're questioning systems without fear but CRS still frustrates you. Professor roulette causes anxiety and independent learning feels isolating at times.",
      },
      {
        min: 52,
        max: 56,
        text: "You participate in Grandstand rallies and activism more comfortably now. The beautiful ruins aesthetic and open campus culture start feeling right.",
      },
      {
        min: 56,
        max: 60,
        text: "You feel motivated by Iskolar ng Bayan responsibility genuinely. Sink-or-swim culture becomes manageable as your grit and resilience solidify steadily.",
      },
      {
        min: 60,
        max: 64,
        text: "You handle terror prof challenges and academic freedom well. The independent learning style matches your natural strengths and critical thinking patterns.",
      },
      {
        min: 64,
        max: 68,
        text: "You thrive on CRS chaos and turn it into wins. Taxpayer duty and public service drive your purpose and motivation every single day.",
      },
      {
        min: 68,
        max: 75,
        text: "You dominate diskarte strategies and academic freedom completely. Area 2 becomes your sanctuary and activism fires up your critical mind naturally.",
      },
      {
        min: 75,
        max: 90,
        text: "You lead org initiatives naturally and embrace leadership challenges. Your resilience and critical thinking become your greatest competitive advantages daily.",
      },
      {
        min: 90,
        max: 100,
        text: "You embody the Activist-Intellectual archetype perfectly and completely. Raw grit and questioning authority define your UP identity and worldview naturally.",
      },
    ],
  },
  ust: {
    winner:
      "UST matches your endurance style. You handle 7-7 block schedules without breaking down. Your blockmates become your ride-or-die support system. Paskuhan makes every bit of suffering worth it for you. Dapitan rewards your grind and debarment pressure motivates you to excel.",
    ranges: [
      {
        min: 0,
        max: 30,
        text: "You get completely destroyed by rigid block schedules daily. Debarment warnings and volume-heavy exams terrify you from the very start.",
      },
      {
        min: 30,
        max: 35,
        text: "You find volume exams impossible and OSA rules suffocating completely. España floods and uniform policies disrupt your routine and mood every single day.",
      },
      {
        min: 35,
        max: 40,
        text: "You feel crushed by FOP workload and zero balance constantly. Dapitan food helps slightly but brutal schedules still overwhelm you beyond your limits.",
      },
      {
        min: 40,
        max: 44,
        text: "You get blockmate support but still struggle with endurance badly. Terror profs and memorization requirements push you past your breaking point regularly.",
      },
      {
        min: 44,
        max: 48,
        text: "Paskuhan celebrations help but academic suffering still drains you. You're building endurance slowly but volume workload challenges you beyond comfort consistently.",
      },
      {
        min: 48,
        max: 52,
        text: "You experience trauma bonding but the grind still exhausts you. Your endurance grows through struggles but España chaos and schedules frustrate you often.",
      },
      {
        min: 52,
        max: 56,
        text: "You handle Summer Capital quirks and España chaos more decently. Kanal humor and relatable UST culture match your communication style well now.",
      },
      {
        min: 56,
        max: 60,
        text: "You manage volume workload better with improving systems now. Your block loyalty becomes stronger and deeper through thick and thin experiences.",
      },
      {
        min: 60,
        max: 64,
        text: "You've adapted to the 7-7 grind and endure well. Dapitan rewards your consistent effort and blockmates genuinely become your family support.",
      },
      {
        min: 64,
        max: 68,
        text: "You thrive under debarment pressure and use it as fuel. Board exam culture and volume training strengthen your endurance and work ethic.",
      },
      {
        min: 68,
        max: 75,
        text: "You dominate the grind and turn suffering into success. USTe rhythm and block loyalty define your daily experience and Thomasian identity.",
      },
      {
        min: 75,
        max: 90,
        text: "You excel under volume pressure and schedule demands completely. Paskuhan and Thomasian spirit fuel your motivation and pride every single day.",
      },
      {
        min: 90,
        max: 100,
        text: "You embody the Resilient Soldier archetype perfectly and naturally. Block loyalty and endurance define your Thomasian character and experience completely.",
      },
    ],
  },
};
