export interface ShortLessonInterface {
  id: number,
  name: string,
  slug: string,
}

export interface UserProgramInterface {
  user: string,
  lessons_done: Array<ShortLessonInterface>,
  lessons_available: Array<ShortLessonInterface>
}

export interface ProgramInterface {
  name: string,
  slug: string,
  description: string,
  lessons: Array<ShortLessonInterface>
  user_program: UserProgramInterface|null
}

export interface SlideInterface {
  id: number,
  slide_number: number,
  content: string
}

export interface LessonInterface {
  id: number,
  user_level: number,
  name: string,
  slug: string,
  slides: SlideInterface[],
  article: string,
  order: number,
  category: number
  program: any
}
