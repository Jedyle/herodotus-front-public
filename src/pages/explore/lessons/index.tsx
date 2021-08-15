import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useIonViewWillEnter, IonList, IonItem, IonLabel, IonIcon } from '@ionic/react';

import { checkmarkOutline, checkmarkSharp } from 'ionicons/icons';

import { getLessons, retrieveCategory } from '../../../services/api';

import Page from '../../Page';

interface LessonInterface {
  id: number,
  name: string,
  slug: string;
  order: number,
  link: string,
  user_level: number
}

interface LessonExplorerInterface {
  lessons: Array<LessonInterface>
}


const LessonExplorer: React.FC<LessonExplorerInterface> = ({lessons}) => {
  return (
    <IonList>
      {lessons.map((item: LessonInterface) => (
	<IonItem routerLink={item.link} key={item.order}>
	  <IonIcon slot="start" ios={item.user_level ? checkmarkOutline : null} md={item.user_level ? checkmarkSharp : null}/>
	  <IonLabel>{item.name}</IonLabel>
	</IonItem>
      ))}
    </IonList>
  )
}

const ExploreLessons: React.FC =  () => {
 
  const obj: {periodSlug: string, categorySlug: string} = useParams();
  const periodSlug = obj['periodSlug'];
  const categorySlug = obj['categorySlug'];
  const [lessons, setLessons] = useState([]);
  const [category, setCategory] = useState<any>({name: ''});
  
  useIonViewWillEnter(() => {
    getLessons(periodSlug, categorySlug).then((response: any) => {
      setLessons(response.data.map(
	(lesson: any) => ({...lesson, 'link': `/page/explore/lessons/${lesson.slug}`})
      ))
    }).catch(() => {})
    retrieveCategory(periodSlug, categorySlug).then((response: any) => {
      setCategory(response.data)
    }).catch(() => {})
    
  })
  
  return (
    <Page
      key={periodSlug + "/" + categorySlug}
      name={category.name}
      content={
	<LessonExplorer lessons={lessons} />
      }
    />
  )
}

export default ExploreLessons;

