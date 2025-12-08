import QuizView from "@/components/quiz/quiz-view"

export default function Quiz(){
    return(
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
          <h1 className="text-4xl font-bold">Quiz Page</h1>
          <p className="mt-4 text-lg text-gray-600">Welcome to the Quiz!</p>
          <QuizView />
        </main>
    )
}