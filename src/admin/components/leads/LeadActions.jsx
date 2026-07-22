import {
  Eye,
  Pencil,
  Phone,
  MessageCircle,
  Mail,
} from "lucide-react";

export default function LeadActions({
  lead,
  onView,
  onEdit,
}) {
  const phone = lead.phone || "";
  const email = lead.email || "";

  // Remove spaces and non-digits
  const whatsappPhone = phone.replace(/\D/g, "");

  return (
    <div className="flex justify-center items-center gap-3">

      {/* View */}

      <button
        onClick={() => onView(lead)}
        title="View Lead"
        className="text-blue-400 hover:text-blue-300"
      >
        <Eye size={18} />
      </button>

      {/* Edit */}

      <button
        onClick={() => onEdit(lead)}
        title="Edit Lead"
        className="text-green-400 hover:text-green-300"
      >
        <Pencil size={18} />
      </button>

      {/* Call */}

      <a
        href={`tel:${phone}`}
        title="Call Student"
        className="text-cyan-400 hover:text-cyan-300"
      >
        <Phone size={18} />
      </a>

      {/* WhatsApp */}

      <a
        href={`https://wa.me/91${whatsappPhone}`}
        target="_blank"
        rel="noreferrer"
        title="Open WhatsApp"
        className="text-green-500 hover:text-green-400"
      >
        <MessageCircle size={18} />
      </a>

      {/* Email */}

      <a
        href={`mailto:${email}`}
        title="Send Email"
        className="text-red-400 hover:text-red-300"
      >
        <Mail size={18} />
      </a>

    </div>
  );
}