"use server";

import { addReaction } from "@/lib/dal/queries";

export async function handleAddReaction(postId: string, reaction: string) {
  try {
    await addReaction(postId, reaction);
    return { success: true };
  } catch (error) {
    console.error("Failed to add reaction:", error);
    return { success: false, error: "Failed to add reaction" };
  }
}
