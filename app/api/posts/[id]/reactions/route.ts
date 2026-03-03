import { NextResponse } from "next/server";
import { addReaction, getPostById } from "@/lib/dal/queries";

export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { reaction } = body;

    if (
      !reaction ||
      !["like", "love", "haha", "wow", "sad", "angry"].includes(reaction)
    ) {
      return NextResponse.json(
        { error: "Invalid reaction type" },
        { status: 400 },
      );
    }

    await addReaction(id, reaction);

    // Return updated post reactions so client can validate optimistic update
    const updatedPost = await getPostById(id);

    if (!updatedPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ reactions: updatedPost.reactions });
  } catch (error) {
    console.error("Error adding reaction:", error);
    return NextResponse.json(
      { error: "Failed to add reaction" },
      { status: 500 },
    );
  }
}
