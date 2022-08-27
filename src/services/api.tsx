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

// const retrieveLesson = (lessonSlug: string) => api.get(`/api/lessons/${lessonSlug}/`);

// const getQuestions = (lessonSlug: string) => api.get(`/api/lessons/${lessonSlug}/questions/`);

const getPrograms = () => api.get("/api/programs/");
const retrieveProgram = (programSlug: string) => api.get(`/api/programs/${programSlug}/`);
const retrieveLesson = (programSlug: string, lessonSlug: string) => api.get(`/api/programs/${programSlug}/lessons/${lessonSlug}/`);
const getQuestions = (programSlug: string, lessonSlug: string) => api.get(`/api/programs/${programSlug}/lessons/${lessonSlug}/questions/`);

// to remove
const getValidatedLessons = () => api.get('/api/lessons/validated');


// todo : allow validation of different levels
const validateLesson = (lessonSlug: string, level: string = "difficult") => api.post(
  `/api/studies/validate/`, {
    lesson: lessonSlug,
    level: level
  }
)

const getNewReviewSession = () => api.get("/api/studies/new_session/")
const validateRevision = (question: number, first_answer_was_correct: boolean) => api.post("/api/studies/validate_revision", {
  question: question,
  first_answer_was_correct: first_answer_was_correct	 
})


const sendFeedback = (data: any) => api.post("/api/feedbacks/", data);

export { changePassword, getAboutPage, getPeriods, retrievePeriod, getCategories, retrieveCategory, getLessons, retrieveLesson, getQuestions, getPrograms, retrieveProgram, getValidatedLessons, validateLesson, getNewReviewSession, validateRevision, sendFeedback };
