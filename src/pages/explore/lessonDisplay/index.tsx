import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useIonViewWillEnter, IonButton } from '@ionic/react';
import { retrieveLesson } from '../../../services/api';

const LessonDisplay: React.FC =  () => {
 
  const obj: {periodSlug: string, categorySlug: string, lessonSlug: string} = useParams();
  const periodSlug = obj['periodSlug'];
  const categorySlug = obj['categorySlug'];
  const lessonSlug = obj['lessonSlug'];
  const [lesson, setLesson] = useState({name: null, article: ""});
  const location = useLocation();
  
  useIonViewWillEnter(() => {
    retrieveLesson(periodSlug, categorySlug, lessonSlug).then((response: any) => {
      setLesson(response.data)
    })
  })
  
  return (
    <div style={{margin: "20px"}}>
      <h1>{lesson?.name}</h1>

      <div dangerouslySetInnerHTML={{__html: lesson.article}} ></div>

      <IonButton color="success" href={`${location.pathname}/questions`}>Validate this lesson !</IonButton>
     
    </div>
  )
}

export default LessonDisplay;

