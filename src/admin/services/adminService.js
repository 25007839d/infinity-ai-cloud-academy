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
