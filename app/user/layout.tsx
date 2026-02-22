import ProtectedRoute from "@/components/auth/ProtectedRoute";
import UserSidebar from "@/components/UserLayout/UserSidebar";
import UserTopbar from "@/components/UserLayout/UserTopbar";
import { SearchProvider } from "@/contexts/SearchContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <SearchProvider>
        <div className="min-h-screen bg-gray-50 font-['Inter']">
          <UserSidebar />
          <div className="lg:ml-58.75 min-h-screen flex flex-col">
            <UserTopbar />
            <main className="flex-1 p-4 lg:p-8">{children}</main>
          </div>
        </div>
      </SearchProvider>
    </ProtectedRoute>
  );
}
