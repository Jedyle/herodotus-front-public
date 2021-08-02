import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useIonViewWillEnter } from '@ionic/react';
import { getLessons, retrieveCategory } from '../../../services/api';
import AbstractExplorer from '../abstract';

import Page from '../../Page';

const ExploreLessons: React.FC =  () => {
 
  const obj: {periodSlug: string, categorySlug: string} = useParams();
  const periodSlug = obj['periodSlug'];
  const categorySlug = obj['categorySlug'];
  const [lessons, setLessons] = useState([]);
  const [category, setCategory] = useState<any>({name: ''});
  
  useIonViewWillEnter(() => {
    getLessons(periodSlug, categorySlug).then((response: any) => {
      setLessons(response.data.map(
	(lesson: any) => ({...lesson, 'link': `/page/explore/periods/${periodSlug}/categories/${categorySlug}/lessons/${lesson.slug}`})
      ))
    })
    retrieveCategory(periodSlug, categorySlug).then((response: any) => {
      setCategory(response.data)
    })
    
  })
  
  return (
    <Page
      key={periodSlug + "/" + categorySlug}
      name={category.name}
      content={
	<AbstractExplorer elements={lessons} />
      }
    />
  )
}

export default ExploreLessons;

