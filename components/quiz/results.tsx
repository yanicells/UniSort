export default function Results({ score }: { score: { admu: number; dlsu: number; up: number; ust: number } }) {
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

    return (
        <div>
            <h2>Your Recommended University:</h2>
            <p>{recommendedUniversity}</p>
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