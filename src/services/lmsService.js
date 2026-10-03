import { apiRequest } from './api';

export const getStudentDashboard = () => apiRequest('/student/dashboard');
export const getCourseAccess = (slug) => apiRequest(`/courses/${encodeURIComponent(slug)}/access`);
export const enrollCourse = (slug) => apiRequest(`/courses/${encodeURIComponent(slug)}/enroll`, { method:'POST' });
export const getPreviewLesson = (courseSlug, lessonSlug) => apiRequest(`/courses/${encodeURIComponent(courseSlug)}/preview/${encodeURIComponent(lessonSlug)}`);
export const getLearningCourse = (slug) => apiRequest(`/learn/courses/${encodeURIComponent(slug)}`);
export const getLearningLesson = (courseSlug, lessonSlug) => apiRequest(`/learn/courses/${encodeURIComponent(courseSlug)}/lessons/${encodeURIComponent(lessonSlug)}`);
export const saveLessonProgress = (lessonId, progressPercent) => apiRequest(`/learn/lessons/${lessonId}/progress`, { method:'POST', body:JSON.stringify({ progressPercent }) });

export const adminEnrollStudent = (courseId, data) => apiRequest(`/admin/courses/${courseId}/enroll`, { method:'POST', body:JSON.stringify(data) });
export const listEnrollments = () => apiRequest('/admin/enrollments');
export const updateEnrollment = (id, data) => apiRequest(`/admin/enrollments/${id}`, { method:'PATCH', body:JSON.stringify(data) });
