import AdminLayout from "../layouts/AdminLayout";
import DashboardStats from "../components/dashboard/DashboardStats";
import RecentLeads from "../components/dashboard/RecentLeads";

export default function Dashboard() {
  return (
    <AdminLayout>

      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      <DashboardStats />

      <RecentLeads />

    </AdminLayout>
  );
}