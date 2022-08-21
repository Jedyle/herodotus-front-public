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
}
