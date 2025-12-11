"use server";

import { saveQuizResult } from "@/lib/dal/queries";

export async function saveQuizResultAction(data: {
  name: string;
  topMatch: "admu" | "dlsu" | "up" | "ust";
  scores: {
    admu: number;
    dlsu: number;
    up: number;
    ust: number;
  };
}) {
  try {
    const result = await saveQuizResult(data);
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to save quiz result:", error);
    return { success: false, error: "Failed to save quiz result" };
  }
}
