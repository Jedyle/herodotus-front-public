import { api } from './axios';

const getPeriods = () => api.get('/periods');
const getCategories = (periodSlug: string) => api.get(`/periods/${periodSlug}/categories`);
const getLessons = (periodSlug: string, categorySlug: string) => api.get(`/periods/${periodSlug}/categories/${categorySlug}/lessons`);
const retrieveLesson = (periodSlug: string, categorySlug: string, lessonSlug: string) => api.get(`/periods/${periodSlug}/categories/${categorySlug}/lessons/${lessonSlug}`);
const getQuestions = (periodSlug: string, categorySlug: string, lessonSlug: string) => api.get(`/periods/${periodSlug}/categories/${categorySlug}/lessons/${lessonSlug}/questions`);

// todo : allow validation of different levels
const validateLesson = (lessonSlug: string, level: string = "difficult") => api.post(
  `/studies/validate/`, {
    lesson: lessonSlug,
    level: level
  }
)

export { getPeriods, getCategories, getLessons, retrieveLesson, getQuestions, validateLesson };
