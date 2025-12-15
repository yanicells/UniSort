import AdminPosts from "@/components/admin/admin-posts";
import { requireAdmin } from "@/lib/auth-helper";

export default async function AdminPage() {
  await requireAdmin();
  return (
    <main>
      <AdminPosts />
    </main>
  );
}
