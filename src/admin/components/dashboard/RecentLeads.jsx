import { useEffect, useState } from "react";
import { getRecentLeads } from "../../services/leadService";

export default function RecentLeads() {

  const [leads, setLeads] = useState([]);

  useEffect(() => {
    loadLeads();
  }, []);

  async function loadLeads() {
    try {
      const data = await getRecentLeads();
      setLeads(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="mt-10 bg-slate-900 rounded-2xl border border-slate-800">

      <div className="p-6 border-b border-slate-800">

        <h2 className="text-2xl font-bold text-white">
          Recent Demo Registrations
        </h2>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="text-left border-b border-slate-800">

              <th className="p-4">Name</th>

              <th className="p-4">Course</th>

              <th className="p-4">Experience</th>

              <th className="p-4">Status</th>

              <th className="p-4">Date</th>

            </tr>

          </thead>

          <tbody>

            {leads.map((lead) => (

              <tr
                key={lead.id}
                className="border-b border-slate-800 hover:bg-slate-800"
              >

                <td className="p-4">
                  {lead.full_name}
                </td>

                <td className="p-4">
                  {lead.course}
                </td>

                <td className="p-4">
                  {lead.experience}
                </td>

                <td className="p-4">

                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">

                    {lead.status}

                  </span>

                </td>

                <td className="p-4">

                  {new Date(lead.created_at).toLocaleDateString()}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}