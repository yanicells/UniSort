import { Button } from "../ui/button";

export default function Choice({
  choices,
}: {
  choices: Array<{
    text: string;
    admu: number;
    dlsu: number;
    up: number;
    ust: number;
  }>;
}) {
  return (
    <>
      {choices.map((choice) => (
        <div key={choice.text}>
          <Button>{choice.text}</Button>
        </div>
      ))}
    </>
  );
}
