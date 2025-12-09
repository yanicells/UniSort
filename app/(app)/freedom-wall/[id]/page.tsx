import SinglePostPage from "@/components/freedom-wall/single-post-page";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const paramsResolved = await params;

  return <SinglePostPage postId={paramsResolved.id} />;
}
