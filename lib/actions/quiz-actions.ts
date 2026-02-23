"use server";

import { saveQuizResult } from "@/lib/dal/queries";
import { revalidatePath } from "next/cache";

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
    revalidatePath("/stats");
    revalidatePath("/api/stats");
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to save quiz result:", error);
    return { success: false, error: "Failed to save quiz result" };
  }
}
