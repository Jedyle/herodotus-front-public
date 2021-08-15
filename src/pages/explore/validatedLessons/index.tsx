import { useState } from 'react';
import { useIonViewWillEnter } from '@ionic/react';

import { getValidatedLessons } from '../../../services/api';

import AbstractExplorer from '../abstract';

import Page from '../../Page';

interface LessonInterface {
  id: number,
  name: string,
  slug: string;
  order: number,
  link: string
}

const ValidatedLessons: React.FC =  () => {
 
  const [lessons, setLessons] = useState([]);
  
  useIonViewWillEnter(() => {
    getValidatedLessons().then((response: any) => {
      setLessons(response.data.map(
	(lesson: LessonInterface) => ({...lesson, 'link': `/page/explore/lessons/${lesson.slug}`})
      ))
    }).catch(() => {})    
  })
  
  return (
    <Page
      name="Previous Lessons"
      content={
	<AbstractExplorer elements={lessons} />
      }
    />
  )
}

export default ValidatedLessons;

