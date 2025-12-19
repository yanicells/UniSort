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
        max: 5,
        text: "You completely crumble under Ateneo's QPI system and oral exams terrify you. The conyo social culture would isolate you from day one.",
      },
      {
        min: 5,
        max: 10,
        text: "You find the Core Curriculum way too demanding for your style. The elite social codes and networking expectations alienate you.",
      },
      {
        min: 10,
        max: 15,
        text: "You get exhausted quickly by the humanities gauntlet and constant requirements. Org culture and hierarchies intimidate you too much.",
      },
      {
        min: 15,
        max: 20,
        text: "You manage the structured classes decently but social gatekeeping drains your energy. The pressure to fit into elite circles stresses you out.",
      },
      {
        min: 20,
        max: 25,
        text: "You handle some of the academic rigor but conyo divides frustrate you constantly. You feel caught between different school cultures that don't quite fit.",
      },
      {
        min: 25,
        max: 30,
        text: "You're confused by SOSE versus SOM dynamics and which path suits you. Katipunan costs and the Loyola Heights lifestyle hurt your wallet.",
      },
      {
        min: 30,
        max: 35,
        text: "You appreciate the guided learning approach and structured academics. You're still adjusting to the elite atmosphere but making progress.",
      },
      {
        min: 35,
        max: 40,
        text: "You're getting noticeably better at oral exams each term. Your social navigation skills improve with each semester and org involvement.",
      },
      {
        min: 40,
        max: 50,
        text: "You genuinely connect with cura personalis and the personal growth focus. You actually enjoy theology discussions and Jesuit-guided reflection.",
      },
      {
        min: 50,
        max: 65,
        text: "You thrive under QPI pressure and use it as motivation. The campus greenery and Katipunan sanctuary help you focus during intense periods.",
      },
      {
        min: 65,
        max: 101,
        text: "You excel at oral synthesis and articulating complex ideas under pressure. Jesuit values and Magis mentality resonate deeply with your worldview.",
      },
    ],
  },
  dlsu: {
    winner:
      "DLSU matches your energy perfectly. You thrive in the trimestral pace instead of drowning in it. Agno food and condo life suit your independence. Corporate training excites you rather than stresses you. Henry Sy libraries become your productivity hub.",
    ranges: [
      {
        min: 0,
        max: 5,
        text: "You get absolutely crushed by the trimestral sprint and can't keep up. Elevator wars and facility congestion stress you out every single day.",
      },
      {
        min: 5,
        max: 10,
        text: "You can't maintain the pace of 14-week terms at all. Taft's safety issues and urban chaos scare you constantly.",
      },
      {
        min: 10,
        max: 15,
        text: "You're terrified by CCS mortality rates and dropout statistics. The lack of semester breaks exhausts you with no recovery time.",
      },
      {
        min: 15,
        max: 20,
        text: "You struggle hard with the corporate pace and competitive environment. Happy Thursday relief isn't enough to offset your weekly stress.",
      },
      {
        min: 20,
        max: 25,
        text: "You like the modern facilities and infrastructure. However, green exclusivity and subtle hierarchies feel weird and uncomfortable to you.",
      },
      {
        min: 25,
        max: 30,
        text: "You genuinely enjoy Agno food and the dining options. The trimestral system still overwhelms you despite small comforts.",
      },
      {
        min: 30,
        max: 35,
        text: "You're slowly improving your time management and efficiency skills. Condo culture and the independent lifestyle work decently for you.",
      },
      {
        min: 35,
        max: 40,
        text: "You're catching the work-hard-play-hard rhythm that defines Lasallian life. The pace feels more manageable as you adapt your systems.",
      },
      {
        min: 40,
        max: 50,
        text: "You find Henry Sy libraries genuinely helpful for your productivity. Animo energy starts building in you through org involvement and events.",
      },
      {
        min: 50,
        max: 65,
        text: "You've completely locked into the trimestral rhythm and workflow. Corporate simulations and business training feel natural to your skillset.",
      },
      {
        min: 65,
        max: 101,
        text: "You run like a well-oiled efficiency machine. The facilities and infrastructure actively elevate your performance and output.",
      },
    ],
  },
  up: {
    winner:
      "UP is where you belong. You turn CRS chaos into diskarte victories. Terror profs make you stronger instead of breaking you down. Area 2 becomes your second home instantly. Grandstand activism fires up your critical mind. Taxpayer responsibility drives you forward with purpose.",
    ranges: [
      {
        min: 0,
        max: 5,
        text: "You break down completely during CRS enlistment hell. You don't have the raw grit needed to survive terror professors.",
      },
      {
        min: 5,
        max: 10,
        text: "You feel deeply humiliated begging professors for prerog slots. Burgis versus scholarship tensions drain you emotionally every day.",
      },
      {
        min: 10,
        max: 15,
        text: "You get traumatized by intense org application processes and hazing culture. The level of activism and political engagement completely overwhelms you.",
      },
      {
        min: 15,
        max: 20,
        text: "You struggle badly with the independent learning requirements. Daily jeepney delays and commute issues ruin your schedule and mood.",
      },
      {
        min: 20,
        max: 25,
        text: "You bond okay with Area 2 friends and find some community. The enlistment lottery system still feels deeply unfair to you.",
      },
      {
        min: 25,
        max: 30,
        text: "You use some diskarte strategies to survive and get by. Red-tagging concerns and political tensions worry you significantly.",
      },
      {
        min: 30,
        max: 35,
        text: "You experience trauma bonding with batchmates that actually works for you. Your resilience grows through shared struggles and collective support.",
      },
      {
        min: 35,
        max: 40,
        text: "You question systems and structures naturally without fear. You handle professor roulette and academic uncertainty without panicking.",
      },
      {
        min: 40,
        max: 50,
        text: "You participate in Grandstand rallies and activism comfortably. Sink-or-swim culture becomes manageable as your grit develops.",
      },
      {
        min: 50,
        max: 65,
        text: "You feel genuinely motivated by taxpayer duty and public service. Your raw grit and resilience clearly emerge as defining traits.",
      },
      {
        min: 65,
        max: 101,
        text: "You lead org initiatives effectively and embrace leadership challenges. Your resilience becomes your greatest strength in UP's environment.",
      },
    ],
  },
  ust: {
    winner:
      "UST matches your endurance style. You handle 7-7 block schedules without breaking down. Your blockmates become your ride-or-die support system. Paskuhan makes every bit of suffering worth it for you. Dapitan rewards your grind and debarment pressure motivates you to excel.",
    ranges: [
      {
        min: 0,
        max: 5,
        text: "You get completely destroyed by rigid 7-7 block schedules. Debarment warnings and academic probation terrify you constantly.",
      },
      {
        min: 5,
        max: 10,
        text: "You find volume-heavy exams impossible to manage or study for. OSA rules and administrative strictness suffocate your freedom.",
      },
      {
        min: 10,
        max: 15,
        text: "You're constantly annoyed by mandatory uniform policies. España floods disrupt your routine and commute regularly.",
      },
      {
        min: 15,
        max: 20,
        text: "You feel absolutely crushed by FOP/AMV workload requirements. You have zero work-life balance and burnout hits hard.",
      },
      {
        min: 20,
        max: 25,
        text: "You genuinely love Dapitan food and the affordable dining scene. The brutal 7-7 schedules still feel overwhelming despite this comfort.",
      },
      {
        min: 25,
        max: 30,
        text: "You get valuable help and support from your blockmates. However, terror professors and volume exams still push you past your limits.",
      },
      {
        min: 30,
        max: 35,
        text: "You find that Paskuhan celebrations redeem some of your academic suffering. The lights and festivities give you something to look forward to.",
      },
      {
        min: 35,
        max: 40,
        text: "You start experiencing real trauma bonding with your block. Your endurance builds steadily through shared struggles and support.",
      },
      {
        min: 40,
        max: 50,
        text: "You handle Summer Capital quirks and España chaos just fine. Kanal humor and UST memes match your communication style perfectly.",
      },
      {
        min: 50,
        max: 65,
        text: "You manage volume workload effectively with good systems. Your block loyalty becomes unbreakable through thick and thin.",
      },
      {
        min: 65,
        max: 101,
        text: "You feel actively motivated by debarment pressure to push harder. USTe rhythm and Go USTe spirit flow naturally through you.",
      },
    ],
  },
};
