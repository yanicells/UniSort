"use server";

import { addReaction } from "@/lib/dal/queries";

const MAX_RETRIES = 2;

export async function handleAddReaction(postId: string, reaction: string) {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      await addReaction(postId, reaction);
      return { success: true };
    } catch (error) {
      lastError = error as Error;
      console.error(`Failed to add reaction (attempt ${attempt + 1}):`, error);
      
      // Wait before retry with exponential backoff
      if (attempt < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 300));
      }
    }
  }
  
  console.error("All retries failed for adding reaction:", lastError);
  return { success: false, error: "Failed to add reaction" };
}
