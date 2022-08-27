const displayProgramLink = (programSlug: string) => `/page/explore/programs/${programSlug}`;

const displayLessonLink = (programSlug: string, lessonSlug: string) => `/page/explore/programs/${programSlug}/lessons/${lessonSlug}`;

const reviewLessonLink = (programSlug: string, lessonSlug: string) => `/page/explore/programs/${programSlug}/lessons/${lessonSlug}/questions`;

export { displayProgramLink, displayLessonLink, reviewLessonLink };
