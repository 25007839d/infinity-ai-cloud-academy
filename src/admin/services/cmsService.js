import { apiRequest } from '../../services/api';

export const cms = {
  courses: {
    list: () => apiRequest('/admin/courses'),
    get: (id) => apiRequest(`/admin/courses/${id}`),
    create: (data) => apiRequest('/admin/courses', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => apiRequest(`/admin/courses/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    remove: (id) => apiRequest(`/admin/courses/${id}`, { method: 'DELETE' }),
  },
  posts: {
    list: () => apiRequest('/admin/posts'),
    get: (id) => apiRequest(`/admin/posts/${id}`),
    create: (data) => apiRequest('/admin/posts', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => apiRequest(`/admin/posts/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    remove: (id) => apiRequest(`/admin/posts/${id}`, { method: 'DELETE' }),
  },
  pages: {
    list: () => apiRequest('/admin/pages'),
    get: (id) => apiRequest(`/admin/pages/${id}`),
    create: (data) => apiRequest('/admin/pages', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => apiRequest(`/admin/pages/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    remove: (id) => apiRequest(`/admin/pages/${id}`, { method: 'DELETE' }),
  },
  seo: {
    get: () => apiRequest('/admin/seo'),
    update: (data) => apiRequest('/admin/seo', { method: 'PUT', body: JSON.stringify(data) }),
  },
};
