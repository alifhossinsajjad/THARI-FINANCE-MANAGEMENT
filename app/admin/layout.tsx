import AdminSidebar from "@/components/layout/AdminSidebar";
import AdminTopbar from "@/components/layout/AdminTopbar";
import { SearchProvider } from "@/contexts/SearchContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SearchProvider>
      <div className="min-h-screen bg-gray-50 font-['Inter']">
        <AdminSidebar />
        <div className="lg:ml-58.75 min-h-screen flex flex-col">
          <AdminTopbar />
          <main className="flex-1 p-4 lg:p-8">{children}</main>
        </div>
      </div>
    </SearchProvider>
  );
}
