import { useState, useEffect } from "react";
import { X, Save } from "lucide-react";
import { updateLead } from "../../services/leadService";

export default function LeadDetailsDrawer({
  open,
  lead,
  onClose,
  onUpdated,
}) {
  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState("");

  const [notes, setNotes] = useState("");

  const [followUpDate, setFollowUpDate] = useState("");

  useEffect(() => {
    if (lead) {
      setStatus(lead.status || "New");
      setNotes(lead.notes || "");

      setFollowUpDate(
        lead.follow_up_date
          ? lead.follow_up_date.substring(0, 10)
          : ""
      );
    }
  }, [lead]);

  if (!open || !lead) return null;

  async function handleSave() {
    try {
      setLoading(true);

      await updateLead(lead.id, {
        status,
        notes,
        follow_up_date: followUpDate || null,
      });

      alert("Lead Updated Successfully.");

      if (onUpdated) {
        onUpdated();
      }

      onClose();
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50">

      <div className="absolute right-0 top-0 h-full w-[500px] bg-slate-900 overflow-y-auto shadow-2xl">

        <div className="flex justify-between items-center p-6 border-b border-slate-800">

          <h2 className="text-2xl font-bold text-white">
            Lead Details
          </h2>

          <button onClick={onClose}>
            <X className="text-white" />
          </button>

        </div>

        <div className="p-6 space-y-6">

          {/* Basic Information */}

          <div className="bg-slate-800 rounded-xl p-5">

            <h3 className="text-xl font-bold text-white">
              {lead.full_name}
            </h3>

            <p className="text-slate-400 mt-2">
              📧 {lead.email}
            </p>

            <p className="text-slate-400">
              📞 {lead.phone}
            </p>

            <p className="text-slate-400">
              📚 {lead.course}
            </p>

            <p className="text-slate-400">
              💼 {lead.experience}
            </p>

          </div>

          {/* Status */}

          <div>

            <label className="block mb-2 text-white">
              Lead Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-xl bg-slate-800 p-3 text-white"
            >
              <option>New</option>
              <option>Contacted</option>
              <option>Demo Scheduled</option>
              <option>Follow Up</option>
              <option>Joined</option>
              <option>Not Interested</option>
            </select>

          </div>

          {/* Follow Up */}

          <div>

            <label className="block mb-2 text-white">
              Follow Up Date
            </label>

            <input
              type="date"
              value={followUpDate}
              onChange={(e) =>
                setFollowUpDate(e.target.value)
              }
              className="w-full rounded-xl bg-slate-800 p-3 text-white"
            />

          </div>

          {/* Notes */}

          <div>

            <label className="block mb-2 text-white">
              Counselor Notes
            </label>

            <textarea
              rows="6"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-xl bg-slate-800 p-3 text-white"
              placeholder="Write follow-up notes..."
            />

          </div>

          {/* Save */}

          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl py-4 text-white font-semibold flex justify-center gap-3"
          >
            <Save size={20} />

            {loading ? "Saving..." : "Save Changes"}

          </button>

        </div>

      </div>

    </div>
  );
}