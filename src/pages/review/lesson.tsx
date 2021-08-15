import { useState } from 'react';

import { useIonViewWillEnter, useIonAlert, IonButtons, IonContent, IonHeader, IonMenuButton, IonBackButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import { useParams, useHistory } from 'react-router-dom';

import { retrieveLesson, getQuestions, validateLesson } from 'services/api';

import ReviewSession from 'components/reviewSession';

interface LessonParams {
  lessonSlug: string;
}

const ReviewLesson: React.FC = () => {

  const {lessonSlug} = useParams<LessonParams>();
  const [lesson, setLesson] = useState({name: null, article: "", slug: ""});
  const [questions, setQuestions] = useState([]);
  const [present] = useIonAlert();
  const history = useHistory();
  
  useIonViewWillEnter(() => {
    getQuestions(lessonSlug).then((response: any) => {
      setQuestions(response.data);
    }).catch(() => {})
    retrieveLesson(lessonSlug).then((response: any) => {
      setLesson(response.data);
    }).catch(() => {})
  })

  const onReviewIsOver = () => {
    validateLesson(lesson.slug).then(() => {
      present({
	message: "You have successfully validated this lesson!",
	buttons: [
	  {text: "Continue", handler: () => history.replace("/page/explore")}
	]
      })
    }).catch(() => {})
  }
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{lesson.name}</IonTitle>
	  <IonButtons slot="end">
	    <IonBackButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>            
      <IonContent fullscreen>
	{questions.length > 0 &&
	 (
	   <ReviewSession
	     questions={questions}
	     onReviewIsOver={onReviewIsOver}
	   />
	 )
	}
      </IonContent>
    </IonPage>
  );
}

export default ReviewLesson;
