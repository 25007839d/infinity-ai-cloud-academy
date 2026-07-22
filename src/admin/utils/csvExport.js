export function exportLeadsToCSV(leads) {
  if (!leads || leads.length === 0) {
    alert("No data available to export.");
    return;
  }

  const headers = [
    "Name",
    "Email",
    "Phone",
    "Course",
    "Experience",
    "Status",
    "Created At",
    "Follow Up Date",
    "Notes",
  ];

  const rows = leads.map((lead) => [
    lead.full_name ?? "",
    lead.email ?? "",
    lead.phone ?? "",
    lead.course ?? "",
    lead.experience ?? "",
    lead.status ?? "",
    lead.created_at
      ? new Date(lead.created_at).toLocaleString()
      : "",
    lead.follow_up_date
      ? new Date(lead.follow_up_date).toLocaleDateString()
      : "",
    (lead.notes ?? "").replace(/\n/g, " "),
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) =>
      row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = `demo_registrations_${new Date()
    .toISOString()
    .split("T")[0]}.csv`;

  link.click();

  URL.revokeObjectURL(url);
}