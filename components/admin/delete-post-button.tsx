"use client";

import { Button } from "../ui/button";
import { deletePostAction } from "@/lib/actions/post-actions";

type DeleteButtonProps = {
  postId: string;
};

export function DeletePostButton({ postId }: DeleteButtonProps) {
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      await deletePostAction(postId);
    }
  };

  return <Button onClick={handleDelete}>Delete</Button>;
}
