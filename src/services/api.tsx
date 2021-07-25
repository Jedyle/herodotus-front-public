import { api } from './axios';

const getPeriods = () => api.get('/periods');
const getCategories = (periodSlug: string) => api.get(`/periods/${periodSlug}/categories`);
const getLessons = (periodSlug: string, categorySlug: string) => api.get(`/periods/${periodSlug}/categories/${categorySlug}/lessons`);
const retrieveLesson = (periodSlug: string, categorySlug: string, lessonSlug: string) => api.get(`/periods/${periodSlug}/categories/${categorySlug}/lessons/${lessonSlug}`);

export { getPeriods, getCategories, getLessons, retrieveLesson };
