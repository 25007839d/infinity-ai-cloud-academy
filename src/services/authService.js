import { apiRequest } from './api';

export async function signUp(email, password, profile = {}) {
  return apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      full_name: profile.full_name || '',
      phone: profile.phone || '',
    }),
  });
}

export async function signIn(email, password) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function signOut() {
  return apiRequest('/auth/logout', { method: 'POST' });
}

export async function getCurrentUser() {
  try {
    return await apiRequest('/auth/me');
  } catch (error) {
    if (error.status === 401) return null;
    throw error;
  }
}

export async function resetPassword(email) {
  return apiRequest('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}
