import { apiRequest } from '../../services/api';

export async function getAllLeads() {
  return apiRequest('/admin/leads');
}

export async function getRecentLeads() {
  return apiRequest('/admin/leads/recent');
}

export async function getLead(id) {
  return apiRequest(`/admin/leads/${id}`);
}

export async function updateLeadStatus(id, status) {
  return apiRequest(`/admin/leads/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export async function deleteLead(id) {
  await apiRequest(`/admin/leads/${id}`, { method: 'DELETE' });
}

export async function getDashboardStats() {
  return apiRequest('/admin/stats');
}

export async function updateLead(id, payload) {
  return apiRequest(`/admin/leads/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function getLeadById(id) {
  return getLead(id);
}
