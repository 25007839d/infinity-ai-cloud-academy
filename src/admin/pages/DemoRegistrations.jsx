import AdminLayout from "../layouts/AdminLayout";
import LeadTable from "../components/leads/LeadTable";

export default function DemoRegistrations() {

  return (

    <AdminLayout>

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Demo Registrations
          </h1>

          <p className="text-slate-400 mt-2">

            Manage all incoming demo requests.

          </p>

        </div>

      </div>

      <LeadTable />

    </AdminLayout>

  );

}