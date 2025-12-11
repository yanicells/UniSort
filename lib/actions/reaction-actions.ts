"use server";

import { revalidatePath } from "next/cache";
import { addReaction } from "@/lib/dal/queries";

export async function handleAddReaction(postId: string, reaction: string) {
  try {
    await addReaction(postId, reaction);

    // Revalidate the freedom wall page to show updated reactions
    revalidatePath("/freedom-wall");
    // Also revalidate the single post page if viewing it
    revalidatePath(`/freedom-wall/${postId}`);
  } catch (error) {
    console.error("Failed to add reaction:", error);
    throw error;
  }
}
