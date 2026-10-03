import { apiRequest } from './api';
export const getLessonExperience = (courseSlug, lessonSlug) => apiRequest(`/learn/courses/${encodeURIComponent(courseSlug)}/lessons/${encodeURIComponent(lessonSlug)}/experience`);
export const submitQuizAttempt = (quizId, answers) => apiRequest(`/learn/quizzes/${quizId}/attempts`, { method:'POST', body:JSON.stringify({answers}) });
export const submitAssignment = (assignmentId, data) => apiRequest(`/learn/assignments/${assignmentId}/submissions`, { method:'POST', body:JSON.stringify(data) });
