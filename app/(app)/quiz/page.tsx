import QuizHandler from "@/components/quiz/quiz";
import { Container } from "@/components/layout/Container";

export const metadata = {
  title: "Take the Quiz - UniSort",
  description:
    "Take our 2-minute personality quiz to find your perfect university match among ADMU, DLSU, UP, and UST.",
};

export default function Quiz() {
  return (
    <Container className="pt-24">
      <QuizHandler />
    </Container>
  );
}