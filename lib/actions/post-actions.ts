"use server";

import { createPost as createPostQuery } from "@/lib/dal/queries";
import { deletePost as deletePostQuery } from "@/lib/dal/queries";

const MAX_RETRIES = 2;

export async function createPostAction(data: {
  content: string;
  tags: string[];
  parentId?: string | null;
  imageUrl?: string;
}) {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const newPost = await createPostQuery(data);
      // No revalidatePath - client handles its own refresh
      return { success: true, post: newPost };
    } catch (error) {
      lastError = error as Error;
      console.error(`Error creating post (attempt ${attempt + 1}):`, error);
      
      // Wait before retry with exponential backoff
      if (attempt < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 300));
      }
    }
  }
  
  console.error("All retries failed for creating post:", lastError);
  return { success: false, error: "Failed to create post" };
}

export async function deletePostAction(postId: string) {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      await deletePostQuery(postId);
      // No revalidatePath - client handles its own refresh
      return { success: true };
    } catch (error) {
      lastError = error as Error;
      console.error(`Error deleting post (attempt ${attempt + 1}):`, error);
      
      // Wait before retry with exponential backoff
      if (attempt < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 300));
      }
    }
  }
  
  console.error("All retries failed for deleting post:", lastError);
  return { success: false, error: "Failed to delete post" };
}
