import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useIonViewWillEnter } from '@ionic/react';
import { getLessons } from '../../../services/api';
import AbstractExplorer from '../abstract';

const ExploreLessons: React.FC =  () => {
 
  const obj: {periodSlug: string, categorySlug: string} = useParams();
  const periodSlug = obj['periodSlug'];
  const categorySlug = obj['categorySlug'];
  const [lessons, setLessons] = useState([]);
  
  useIonViewWillEnter(() => {
    getLessons(periodSlug, categorySlug).then((response: any) => {
      setLessons(response.data.map(
	(lesson: any) => ({...lesson, 'link': `/page/explore/periods/${periodSlug}/categories/${categorySlug}/lessons/${lesson.slug}`})
      ))
    })
  })
  
  return (
    <AbstractExplorer
      elements={lessons}
    />
  )
}

export default ExploreLessons;

