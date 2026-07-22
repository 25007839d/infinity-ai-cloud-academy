import { supabase } from "../../services/supabase";

// Get all leads
export async function getAllLeads() {
  const { data, error } = await supabase
    .from("demo_registrations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

// Latest 10 Leads
export async function getRecentLeads() {
  const { data, error } = await supabase
    .from("demo_registrations")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) throw error;

  return data;
}

// Get Single Lead
export async function getLead(id) {
  const { data, error } = await supabase
    .from("demo_registrations")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

// Update Status
export async function updateLeadStatus(id, status) {
  const { data, error } = await supabase
    .from("demo_registrations")
    .update({ status })
    .eq("id", id)
    .select();

  if (error) throw error;

  return data;
}

// Delete Lead
export async function deleteLead(id) {
  const { error } = await supabase
    .from("demo_registrations")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

// Dashboard Counts
export async function getDashboardStats() {
  const { data, error } = await supabase
    .from("demo_registrations")
    .select("created_at");

  if (error) throw error;

  const today = new Date();

  const todayString = today.toDateString();

  let todayCount = 0;
  let weekCount = 0;
  let monthCount = 0;

  data.forEach((lead) => {
    const date = new Date(lead.created_at);

    if (date.toDateString() === todayString) {
      todayCount++;
    }

    const diffDays =
      (today - date) / (1000 * 60 * 60 * 24);

    if (diffDays <= 7) {
      weekCount++;
    }

    if (
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      monthCount++;
    }
  });

  return {
    today: todayCount,
    week: weekCount,
    month: monthCount,
    total: data.length,
  };
}
// Update complete lead
export async function updateLead(id, payload) {

  const { data, error } = await supabase
    .from("demo_registrations")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;

}

// Get lead by ID
export async function getLeadById(id) {
  const { data, error } = await supabase
    .from("demo_registrations")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}