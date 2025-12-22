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
        max: 20,
        text: "You completely crumble under QPI pressure and oral exam culture. The conyo bubble would isolate you instantly and drain your energy.",
      },
      {
        min: 20,
        max: 30,
        text: "You find Core Curriculum requirements overwhelming and exhausting. Elite social hierarchies and networking expectations alienate you from the start.",
      },
      {
        min: 30,
        max: 35,
        text: "The Philosophy oral exams stress you out way too much. You struggle badly with the articulate generalist expectations and constant reflection.",
      },
      {
        min: 35,
        max: 40,
        text: "You get drained by org professionalism and corporate simulation culture. Katipunan costs and Loyola Heights lifestyle hurt your budget significantly.",
      },
      {
        min: 40,
        max: 45,
        text: "You handle structured academics okay but feel pressure constantly. The SOSE versus SOM divide confuses you and elite gatekeeping wears you down.",
      },
      {
        min: 45,
        max: 50,
        text: "You manage the guided rigor decently but conyo divides frustrate you. Social chameleon behavior exhausts you more than it helps you fit in.",
      },
      {
        min: 50,
        max: 55,
        text: "You appreciate cura personalis support when you need it. However, you still feel caught between different social circles that don't quite click.",
      },
      {
        min: 55,
        max: 60,
        text: "You're adjusting to the Atenean accent and intellectual discourse style. The green campus sanctuary helps you decompress during heavy academic weeks.",
      },
      {
        min: 60,
        max: 65,
        text: "You're getting better at oral synthesis and defending ideas verbally. Your navigation of the social landscape improves with each semester.",
      },
      {
        min: 65,
        max: 70,
        text: "You genuinely appreciate Jesuit formation and guided reflection now. Theology discussions actually engage you instead of feeling like pure requirements.",
      },
      {
        min: 70,
        max: 80,
        text: "You thrive under the articulate generalist curriculum and formation. QPI pressure motivates you rather than breaks you down over time.",
      },
      {
        min: 80,
        max: 90,
        text: "You excel at oral exams and find them intellectually stimulating. The Katipunan bubble becomes your productive sanctuary during intense academic periods.",
      },
      {
        min: 90,
        max: 101,
        text: "You embody the Atenean Philosopher-King ideal completely. Magis mentality and cura personalis define how you approach growth and leadership naturally.",
      },
    ],
  },
  dlsu: {
    winner:
      "DLSU matches your energy perfectly. You thrive in the trimestral pace instead of drowning in it. Agno food and condo life suit your independence. Corporate training excites you rather than stresses you. Henry Sy libraries become your productivity hub.",
    ranges: [
      {
        min: 0,
        max: 20,
        text: "You get absolutely crushed by trimester sprints and can't recover. Fourteen weeks of hell with no semester breaks destroys your work-life balance.",
      },
      {
        min: 20,
        max: 30,
        text: "You struggle badly with the relentless academic pace and pressure. Elevator wars and facility congestion stress you out every single day.",
      },
      {
        min: 30,
        max: 35,
        text: "CCS mortality rates and dropout statistics terrify you constantly. The corporate simulation culture feels fake and exhausting to maintain daily.",
      },
      {
        min: 35,
        max: 40,
        text: "You can't keep up with the efficiency demands at all. Taft safety issues and urban chaos drain your mental energy significantly.",
      },
      {
        min: 40,
        max: 45,
        text: "You appreciate modern facilities but the pace still overwhelms you. Happy Thursday culture doesn't offset your weekly stress and burnout levels.",
      },
      {
        min: 45,
        max: 50,
        text: "You enjoy Agno food and dining convenience genuinely. However, the trimestral grind still pushes you past your comfortable limits regularly.",
      },
      {
        min: 50,
        max: 55,
        text: "You're slowly adapting your time management and workflow systems. Condo culture and independent lifestyle start working decently for your needs.",
      },
      {
        min: 55,
        max: 60,
        text: "You're catching the work-hard-play-hard Lasallian rhythm gradually. The fourteen-week sprint feels more manageable with each passing term.",
      },
      {
        min: 60,
        max: 65,
        text: "You find Henry Sy libraries genuinely boost your productivity. Green Archers energy and Animo spirit start building naturally through involvement.",
      },
      {
        min: 65,
        max: 70,
        text: "You've locked into the trimestral pace and workflow completely. Corporate simulation training feels natural and aligned with your career goals.",
      },
      {
        min: 70,
        max: 80,
        text: "You thrive under efficiency pressure and time management demands. The infrastructure and facilities actively elevate your academic performance consistently.",
      },
      {
        min: 80,
        max: 90,
        text: "You dominate the trimester system and turn sprints into wins. Happy Thursday culture and networking opportunities fuel your professional development.",
      },
      {
        min: 90,
        max: 101,
        text: "You run like a perfectly optimized efficiency machine daily. The Corporate Achiever identity and pragmatic hustle define your Lasallian experience naturally.",
      },
    ],
  },
  up: {
    winner:
      "UP is where you belong. You turn CRS chaos into diskarte victories. Terror profs make you stronger instead of breaking you down. Area 2 becomes your second home instantly. Grandstand activism fires up your critical mind. Taxpayer responsibility drives you forward with purpose.",
    ranges: [
      {
        min: 0,
        max: 20,
        text: "You break down completely during CRS hell and enlistment chaos. You lack the raw grit needed to survive terror professors and administrative dysfunction.",
      },
      {
        min: 20,
        max: 30,
        text: "You feel deeply humiliated begging for prerog slots repeatedly. Burgis tensions and scholarship dynamics drain you emotionally every single day.",
      },
      {
        min: 30,
        max: 35,
        text: "Intense org apps and hazing culture traumatize you badly. The level of activism and political engagement completely overwhelms your comfort zone.",
      },
      {
        min: 35,
        max: 40,
        text: "You struggle badly with sink-or-swim independent learning expectations. Daily commute delays and jeepney chaos ruin your schedule and mood.",
      },
      {
        min: 40,
        max: 45,
        text: "You find some community with Area 2 friends slowly. However, the enlistment lottery system still feels deeply unfair and demoralizing.",
      },
      {
        min: 45,
        max: 50,
        text: "You learn basic diskarte strategies to survive and get by. Red-tagging concerns and political tensions worry you more than you expected.",
      },
      {
        min: 50,
        max: 55,
        text: "You experience real trauma bonding with batchmates that works. Your resilience grows through shared struggles and collective survival support.",
      },
      {
        min: 55,
        max: 60,
        text: "You question systems naturally without fear or hesitation now. Professor roulette and academic uncertainty don't panic you like before.",
      },
      {
        min: 60,
        max: 65,
        text: "You participate in Grandstand rallies and activism comfortably. The beautiful ruins aesthetic and open campus culture feel right to you.",
      },
      {
        min: 65,
        max: 70,
        text: "You feel genuinely motivated by Iskolar ng Bayan responsibility. Sink-or-swim culture becomes manageable as your grit solidifies completely.",
      },
      {
        min: 70,
        max: 80,
        text: "You thrive on terror prof challenges and academic freedom. Taxpayer duty and public service drive your purpose and motivation daily.",
      },
      {
        min: 80,
        max: 90,
        text: "You lead org initiatives effectively and embrace leadership naturally. Your diskarte skills and resilience become your greatest competitive advantages.",
      },
      {
        min: 90,
        max: 101,
        text: "You embody the Activist-Intellectual archetype perfectly. Raw grit and critical thinking define your UP identity and worldview completely.",
      },
    ],
  },
  ust: {
    winner:
      "UST matches your endurance style. You handle 7-7 block schedules without breaking down. Your blockmates become your ride-or-die support system. Paskuhan makes every bit of suffering worth it for you. Dapitan rewards your grind and debarment pressure motivates you to excel.",
    ranges: [
      {
        min: 0,
        max: 20,
        text: "You get completely destroyed by rigid block schedules daily. Debarment warnings and academic probation terrify you from the very start.",
      },
      {
        min: 20,
        max: 30,
        text: "You find volume-heavy exams impossible to manage effectively. OSA rules and administrative strictness suffocate your personal freedom constantly.",
      },
      {
        min: 30,
        max: 35,
        text: "Mandatory uniform policies annoy you every single day. España floods and Waterworld chaos disrupt your routine and commute regularly.",
      },
      {
        min: 35,
        max: 40,
        text: "You feel crushed by FOP and AMV workload demands. You have zero work-life balance and burnout hits you harder than expected.",
      },
      {
        min: 40,
        max: 45,
        text: "You genuinely love Dapitan food and affordable dining options. However, brutal schedules and volume still feel overwhelming despite this comfort.",
      },
      {
        min: 45,
        max: 50,
        text: "You get valuable support and help from your blockmates. Terror profs and memorization requirements still push you past your limits.",
      },
      {
        min: 50,
        max: 55,
        text: "Paskuhan celebrations redeem some of your academic suffering genuinely. The lights and tradition give you something meaningful to anticipate.",
      },
      {
        min: 55,
        max: 60,
        text: "You experience real trauma bonding with your block section. Your endurance builds steadily through shared struggles and collective support.",
      },
      {
        min: 60,
        max: 65,
        text: "You handle Summer Capital quirks and España chaos just fine. Kanal humor and relatable UST culture match your style perfectly.",
      },
      {
        min: 65,
        max: 70,
        text: "You manage volume workload effectively with solid systems now. Your block loyalty becomes unbreakable through thick and thin.",
      },
      {
        min: 70,
        max: 80,
        text: "You thrive under debarment pressure and use it as fuel. Board exam preparation culture and volume training strengthen your endurance.",
      },
      {
        min: 80,
        max: 90,
        text: "You dominate the grind and turn suffering into success. USTe rhythm and Thomasian spirit flow naturally through your identity daily.",
      },
      {
        min: 90,
        max: 101,
        text: "You embody the Resilient Soldier archetype completely. Block loyalty and endurance define your Thomasian experience and character naturally.",
      },
    ],
  },
};
