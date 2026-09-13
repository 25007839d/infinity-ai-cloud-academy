import { apiRequest } from '../../services/api';

export async function login(email, password) {
  return apiRequest('/admin/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function logout() {
  return apiRequest('/admin/logout', { method: 'POST' });
}

export async function getCurrentUser() {
  try {
    return await apiRequest('/admin/me');
  } catch (error) {
    if (error.status === 401) return null;
    throw error;
  }
}


export async function listStudents() { return apiRequest('/admin/users'); }
export async function getStudent(id) { return apiRequest(`/admin/users/${id}`); }
export async function updateStudent(id, data) { return apiRequest(`/admin/users/${id}`, { method: 'PATCH', body: JSON.stringify(data) }); }
