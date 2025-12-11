export default function Results({
  score,
  name,
}: {
  score: { admu: number; dlsu: number; up: number; ust: number };
  name: string;
}) {
  const maxScore = Math.max(score.admu, score.dlsu, score.up, score.ust);
  let recommendedUniversity = "";

  if (maxScore === score.admu) {
    recommendedUniversity = "Ateneo de Manila University (ADMU)";
  } else if (maxScore === score.dlsu) {
    recommendedUniversity = "De La Salle University (DLSU)";
  } else if (maxScore === score.up) {
    recommendedUniversity = "University of the Philippines (UP)";
  } else if (maxScore === score.ust) {
    recommendedUniversity = "University of Santo Tomas (UST)";
  }

  const isAnonymous = name === "Anonymous";
  const greeting = isAnonymous
    ? `Congrats! Welcome to ${recommendedUniversity}!`
    : `Congrats, ${name}! Welcome to ${recommendedUniversity}!`;

  return (
    <div>
      <h2>{greeting}</h2>
      <h3>Your Scores:</h3>
      <ul>
        <li>ADMU: {score.admu}</li>
        <li>DLSU: {score.dlsu}</li>
        <li>UP: {score.up}</li>
        <li>UST: {score.ust}</li>
      </ul>
    </div>
  );
}
