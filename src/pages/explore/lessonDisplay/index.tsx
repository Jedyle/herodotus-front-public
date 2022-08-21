import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useIonViewWillEnter } from '@ionic/react';
import { retrieveLesson } from 'services/api';
import { LessonInterface } from 'interfaces/lessons';

import Page from 'pages/Page';
import LessonDisplay from 'components/lessonDisplay';

const Lesson: React.FC =  () => {
 
  const obj: {lessonSlug: string} = useParams();
  const lessonSlug = obj['lessonSlug'];
  const [lesson, setLesson] = useState<LessonInterface|null>(null);
  const location = useLocation();
  
  useIonViewWillEnter(() => {
    retrieveLesson(lessonSlug).then((response: any) => {
      setLesson(response.data)
    }).catch(() => {})
  })
  
  return (
    <Page
      key={"lesson" + lessonSlug}
      name={lesson?.name}
      content={
	lesson && <LessonDisplay lesson={lesson} />
      }
    />
  )
}

export default Lesson;

