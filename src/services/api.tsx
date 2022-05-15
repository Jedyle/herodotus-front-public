import { api } from './axios';

const changePassword = (oldPassword: string, newPassword1: string, newPassword2: string) => api.post('/rest-auth/password/change/', {
  old_password: oldPassword,
  new_password1: newPassword1,
  new_password2: newPassword2
})


// this is a special article present on the 'About' page
const getAboutPage = () => api.get("/api/articles/about/");

const getPeriods = () => api.get('/api/periods/');
const retrievePeriod = (periodSlug: string) => api.get(`/api/periods/${periodSlug}/`);
const getCategories = (periodSlug: string) => api.get(`/api/periods/${periodSlug}/categories/`);
const retrieveCategory = (periodSlug: string, categorySlug: string) => api.get(`/api/periods/${periodSlug}/categories/${categorySlug}`);
const getLessons = (periodSlug: string, categorySlug: string) => api.get(`/api/periods/${periodSlug}/categories/${categorySlug}/lessons/`);

const retrieveLesson = (lessonSlug: string) => api.get(`/api/lessons/${lessonSlug}/`);

const getQuestions = (lessonSlug: string) => api.get(`/api/lessons/${lessonSlug}/questions/`);

const getValidatedLessons = () => api.get('/api/lessons/validated');

// todo : allow validation of different levels
const validateLesson = (lessonSlug: string, level: string = "difficult") => api.post(
  `/api/studies/validate/`, {
    lesson: lessonSlug,
    level: level
  }
)

const getNewReviewSession = () => api.get("/api/studies/new_session/")
const validateSession = (questionIds: string[]) => api.post("/api/studies/validate_session", {
  questions: questionIds.join(",")
})

export { changePassword, getAboutPage, getPeriods, retrievePeriod, getCategories, retrieveCategory, getLessons, retrieveLesson, getQuestions, getValidatedLessons, validateLesson, getNewReviewSession, validateSession };
