import { useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { useIonViewWillEnter, IonButton } from '@ionic/react';
import { retrieveLesson } from 'services/api';

import Page from 'pages/Page';

const LessonDisplay: React.FC =  () => {
 
  const obj: {lessonSlug: string} = useParams();
  const history = useHistory();
  const lessonSlug = obj['lessonSlug'];
  const [lesson, setLesson] = useState({name: null, article: ""});
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
      content={<div style={{margin: "20px"}}>
	<h1>{lesson?.name}</h1>
	<div dangerouslySetInnerHTML={{__html: lesson.article}} ></div>
	<IonButton
	  color="success"
	  onClick={() => history.push(`${location.pathname}/questions`)}
	>Review this lesson !</IonButton>     
      </div>}
    />
  )
}

export default LessonDisplay;

