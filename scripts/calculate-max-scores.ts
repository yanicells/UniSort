
import { questions } from "@/lib/quiz/quiz-data";
import { CATEGORY_MAPPING, getCategoryForSection, CategoryName } from "@/lib/quiz/categories";

type University = "admu" | "dlsu" | "up" | "ust";

function calculateMaxScores() {
  const maxScores: Record<University, number> = {
    admu: 0,
    dlsu: 0,
    up: 0,
    ust: 0,
  };

  questions.questions.forEach((q) => {
    let maxAdmu = 0;
    let maxDlsu = 0;
    let maxUp = 0;
    let maxUst = 0;

    q.choices.forEach((c) => {
      if (c.admu > maxAdmu) maxAdmu = c.admu;
      if (c.dlsu > maxDlsu) maxDlsu = c.dlsu;
      if (c.up > maxUp) maxUp = c.up;
      if (c.ust > maxUst) maxUst = c.ust;
    });

    maxScores.admu += maxAdmu;
    maxScores.dlsu += maxDlsu;
    maxScores.up += maxUp;
    maxScores.ust += maxUst;
  });

  return maxScores;
}

function calculateMinScores() {
  const minScores: Record<University, number> = {
    admu: 0,
    dlsu: 0,
    up: 0,
    ust: 0,
  };

  questions.questions.forEach((q) => {
    let minAdmu = Infinity;
    let minDlsu = Infinity;
    let minUp = Infinity;
    let minUst = Infinity;

    q.choices.forEach((c) => {
      if (c.admu < minAdmu) minAdmu = c.admu;
      if (c.dlsu < minDlsu) minDlsu = c.dlsu;
      if (c.up < minUp) minUp = c.up;
      if (c.ust < minUst) minUst = c.ust;
    });

    minScores.admu += minAdmu;
    minScores.dlsu += minDlsu;
    minScores.up += minUp;
    minScores.ust += minUst;
  });

  return minScores;
}

function calculateCategoryScores() {
  const unis: University[] = ["admu", "dlsu", "up", "ust"];
  const categories = Object.keys(CATEGORY_MAPPING) as CategoryName[];

  const categoryMaxScores: Record<University, Record<CategoryName, number>> = {
    admu: {} as Record<CategoryName, number>,
    dlsu: {} as Record<CategoryName, number>,
    up: {} as Record<CategoryName, number>,
    ust: {} as Record<CategoryName, number>,
  };

  const categoryMinScores: Record<University, Record<CategoryName, number>> = {
    admu: {} as Record<CategoryName, number>,
    dlsu: {} as Record<CategoryName, number>,
    up: {} as Record<CategoryName, number>,
    ust: {} as Record<CategoryName, number>,
  };

  // Initialize all categories to 0 for max and Infinity for min
  unis.forEach(uni => {
    categories.forEach(cat => {
      categoryMaxScores[uni][cat] = 0;
      categoryMinScores[uni][cat] = 0;
    });
  });

  questions.questions.forEach((q) => {
    const categoryName = getCategoryForSection(q.section);
    if (!categoryName) return;

    let maxAdmu = 0;
    let maxDlsu = 0;
    let maxUp = 0;
    let maxUst = 0;

    let minAdmu = Infinity;
    let minDlsu = Infinity;
    let minUp = Infinity;
    let minUst = Infinity;

    q.choices.forEach((c) => {
      // Max scores
      if (c.admu > maxAdmu) maxAdmu = c.admu;
      if (c.dlsu > maxDlsu) maxDlsu = c.dlsu;
      if (c.up > maxUp) maxUp = c.up;
      if (c.ust > maxUst) maxUst = c.ust;

      // Min scores
      if (c.admu < minAdmu) minAdmu = c.admu;
      if (c.dlsu < minDlsu) minDlsu = c.dlsu;
      if (c.up < minUp) minUp = c.up;
      if (c.ust < minUst) minUst = c.ust;
    });

    categoryMaxScores.admu[categoryName] += maxAdmu;
    categoryMaxScores.dlsu[categoryName] += maxDlsu;
    categoryMaxScores.up[categoryName] += maxUp;
    categoryMaxScores.ust[categoryName] += maxUst;

    categoryMinScores.admu[categoryName] += minAdmu;
    categoryMinScores.dlsu[categoryName] += minDlsu;
    categoryMinScores.up[categoryName] += minUp;
    categoryMinScores.ust[categoryName] += minUst;
  });

  return { categoryMaxScores, categoryMinScores };
}

const maxScores = calculateMaxScores();
const minScores = calculateMinScores();
const { categoryMaxScores, categoryMinScores } = calculateCategoryScores();

console.log("=== TOTAL SCORES ===\n");

console.log("MAX_SCORES = {");
console.log(`  admu: ${maxScores.admu},`);
console.log(`  dlsu: ${maxScores.dlsu},`);
console.log(`  up: ${maxScores.up},`);
console.log(`  ust: ${maxScores.ust},`);
console.log("} as const;\n");

console.log("MIN_SCORES = {");
console.log(`  admu: ${minScores.admu},`);
console.log(`  dlsu: ${minScores.dlsu},`);
console.log(`  up: ${minScores.up},`);
console.log(`  ust: ${minScores.ust},`);
console.log("} as const;\n");

console.log("=== CATEGORY SCORES ===\n");

console.log("CATEGORY_MAX_SCORES = {");
const unis: University[] = ["admu", "dlsu", "up", "ust"];
unis.forEach((uni, idx) => {
  console.log(`  ${uni}: {`);
  const categories = Object.keys(CATEGORY_MAPPING) as CategoryName[];
  categories.forEach((cat, catIdx) => {
    const isLast = catIdx === categories.length - 1;
    console.log(`    "${cat}": ${categoryMaxScores[uni][cat]}${isLast ? "" : ","}`);
  });
  const isLastUni = idx === unis.length - 1;
  console.log(`  }${isLastUni ? "" : ","}`);
});
console.log("} as const;\n");

console.log("CATEGORY_MIN_SCORES = {");
unis.forEach((uni, idx) => {
  console.log(`  ${uni}: {`);
  const categories = Object.keys(CATEGORY_MAPPING) as CategoryName[];
  categories.forEach((cat, catIdx) => {
    const isLast = catIdx === categories.length - 1;
    console.log(`    "${cat}": ${categoryMinScores[uni][cat]}${isLast ? "" : ","}`);
  });
  const isLastUni = idx === unis.length - 1;
  console.log(`  }${isLastUni ? "" : ","}`);
});
console.log("} as const;\n");
