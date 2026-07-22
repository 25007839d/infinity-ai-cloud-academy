import { useEffect, useState } from "react";
import { getAllLeads } from "../../services/leadService";
import { exportLeadsToCSV } from "../../utils/csvExport";

import LeadFilters from "./LeadFilters";
import LeadActions from "./LeadActions";
import LeadDetailsDrawer from "./LeadDetailsDrawer";

export default function LeadTable() {
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState([]);

  const [search, setSearch] = useState("");
  const [course, setCourse] = useState("");
  const [status, setStatus] = useState("");

  const [selectedLead, setSelectedLead] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    loadLeads();
  }, []);

  async function loadLeads() {
    try {
      setLoading(true);

      const data = await getAllLeads();

      setLeads(data || []);
    } catch (err) {
      console.error("Lead Loading Error:", err);
    } finally {
      setLoading(false);
    }
  }

  function getStatusColor(status) {
    switch (status) {
      case "New":
        return "bg-blue-600";

      case "Contacted":
        return "bg-orange-500";

      case "Demo Scheduled":
        return "bg-purple-600";

      case "Follow Up":
        return "bg-yellow-500 text-black";

      case "Joined":
        return "bg-green-600";

      case "Not Interested":
        return "bg-red-600";

      default:
        return "bg-slate-600";
    }
  }

  const filteredLeads = leads.filter((lead) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      lead.full_name?.toLowerCase().includes(keyword) ||
      lead.email?.toLowerCase().includes(keyword) ||
      lead.phone?.includes(search);

    const matchesCourse =
      !course || lead.course === course;

    const matchesStatus =
      !status || lead.status === status;

    return (
      matchesSearch &&
      matchesCourse &&
      matchesStatus
    );
  });

  if (loading) {
    return (
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-10 text-center">
        Loading Leads...
      </div>
    );
  }

  return (
    <>
      <LeadFilters
        search={search}
        setSearch={setSearch}
        course={course}
        setCourse={setCourse}
        status={status}
        setStatus={setStatus}
        onRefresh={loadLeads}
        onExport={() => exportLeadsToCSV(filteredLeads)}
      />

      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">

        <div className="flex justify-between items-center p-6 border-b border-slate-800">

          <div>

            <h2 className="text-2xl font-bold text-white">
              Demo Registrations
            </h2>

            <p className="text-slate-400 mt-2">
              Showing {filteredLeads.length} of {leads.length} Leads
            </p>

          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-800">

              <tr>

                <th className="text-left p-4">Name</th>

                <th className="text-left p-4">Phone</th>

                <th className="text-left p-4">Email</th>

                <th className="text-left p-4">Course</th>

                <th className="text-left p-4">Experience</th>

                <th className="text-left p-4">Status</th>

                <th className="text-left p-4">Created</th>

                <th className="text-center p-4">Actions</th>

              </tr>

            </thead>

            <tbody>

              {filteredLeads.length === 0 ? (

                <tr>

                  <td
                    colSpan={8}
                    className="text-center p-10 text-slate-400"
                  >
                    No Leads Found
                  </td>

                </tr>

              ) : (

                filteredLeads.map((lead) => (

                  <tr
                    key={lead.id}
                    className="border-b border-slate-800 hover:bg-slate-800"
                  >

                    <td className="p-4 font-semibold">
                      {lead.full_name}
                    </td>

                    <td className="p-4">
                      {lead.phone}
                    </td>

                    <td className="p-4">
                      {lead.email}
                    </td>

                    <td className="p-4">
                      {lead.course}
                    </td>

                    <td className="p-4">
                      {lead.experience}
                    </td>

                    <td className="p-4">

                      <span
                        className={`${getStatusColor(
                          lead.status
                        )} px-3 py-1 rounded-full text-sm`}
                      >
                        {lead.status}
                      </span>

                    </td>

                    <td className="p-4">
                      {new Date(
                        lead.created_at
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-4">

                      <LeadActions
                        lead={lead}
                        onView={(lead) => {
                          setSelectedLead(lead);
                          setDrawerOpen(true);
                        }}
                        onEdit={(lead) => {
                          setSelectedLead(lead);
                          setDrawerOpen(true);
                        }}
                      />

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

      <LeadDetailsDrawer
        open={drawerOpen}
        lead={selectedLead}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedLead(null);
        }}
        onUpdated={loadLeads}
      />
    </>
  );
}