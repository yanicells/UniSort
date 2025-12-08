import { Button } from "../ui/button";

export default function Choice({
  choices,
  setSelectedChoice,
  selectedChoice,
}: {
  choices: Array<{
    text: string;
    admu: number;
    dlsu: number;
    up: number;
    ust: number;
  }>;
  setSelectedChoice: (choice: string) => void;
  selectedChoice: string | null;
}) {
  return (
    <>
      {choices.map((choice) => (
        <div key={choice.text}>
          {selectedChoice === choice.text ? (
            <strong>{choice.text}</strong>
          ) : (
            <Button
              onClick={() => {
                setSelectedChoice(choice.text);
              }}
            >
              {choice.text}
            </Button>
          )}
        </div>
      ))}
    </>
  );
}
