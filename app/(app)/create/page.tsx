import { PostForm } from "@/components/freedom-wall/freedom-wall-form";
import { Container } from "@/components/layout/Container";

export const metadata = {
  title: "Create Post - Freedom Wall | UniSort",
  description: "Share your thoughts anonymously on the UniSort freedom wall.",
};

export default function createPost() {
  return (
    <Container className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Create a Post</h1>
        <p className="text-foreground/60">
          Share your story anonymously. Choose at least one tag.
        </p>
      </div>
      <PostForm />
    </Container>
  );
}