import { apiRequest } from './api';

export async function registerDemo(formData) {
  return apiRequest('/demo-registrations', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
}
