"use server";

import { createPost as createPostQuery } from "@/lib/dal/queries";
import { deletePost as deletePostQuery } from "@/lib/dal/queries";
import { revalidatePath } from "next/cache";

export async function createPostAction(data: {
  content: string;
  tags: string[];
  parentId?: string | null;
  imageUrl?: string;
}) {
  try {
    const newPost = await createPostQuery(data);
    revalidatePath("/freedom-wall");
    return { success: true, post: newPost };
  } catch (error) {
    console.error("Error creating post:", error);
    return { success: false, error: "Failed to create post" };
  }
}

export async function deletePostAction(postId: string) {
  try {
    await deletePostQuery(postId);
    revalidatePath("/freedom-wall");
    return { success: true };
  } catch (error) {
    console.error("Error deleting post:", error);
    return { success: false, error: "Failed to delete post" };
  }
}
