"use server";

import { createPost as createPostQuery } from "@/lib/dal/queries";
import { revalidatePath } from "next/cache";

export async function createPostAction(data: {
  content: string;
  tags: string[];
  parentId?: string | null;
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
