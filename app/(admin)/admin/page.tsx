import AdminPosts from "@/components/admin/admin-posts";
import { requireAdmin } from "@/lib/auth-helper";

export default async function AdminPage() {
  await requireAdmin();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Admin</h1>
      <p className="mt-4 text-lg text-gray-600">
        Admin Page
      </p>
      <AdminPosts />
    </main>
  );
}
