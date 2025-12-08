import Wall from "@/components/freedom-wall/wall";

export default function FreedomWall() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Freedom Wall</h1>
      <Wall></Wall>
    </main>
  );
}
