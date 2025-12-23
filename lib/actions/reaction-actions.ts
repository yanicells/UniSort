"use server";

import { revalidatePath } from "next/cache";
import { addReaction } from "@/lib/dal/queries";

export async function handleAddReaction(postId: string, reaction: string) {
  try {
    await addReaction(postId, reaction);

    // Revalidate both the freedom wall list and individual post pages
    revalidatePath("/freedom-wall", "page");
    revalidatePath(`/freedom-wall/${postId}`, "page");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to add reaction:", error);
    throw error;
  }
}
